import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireUser } from "@/lib/auth/guards";
import {
  AlreadySubmittedError,
  RegistrationClosedError,
  RegistrationNotOpenError,
  ValidationError,
} from "@/lib/application/errors";
import {
  getDraft,
  getRegistrationState,
  saveDraft,
  submit,
} from "@/lib/application/service";
import type { ApplicationResponses } from "@/lib/application/types";

// Draft saves skip the full per-question schema (drafts are allowed to be incomplete —
// submit() is what enforces required/enum/word-count rules against the live form config),
// but the request body still needs *some* shape validation so garbage (wrong types,
// nested objects, non-string keys) can't get written straight into Mongo.
const draftBodySchema = z.object({
  responses: z.record(
    z.string(),
    z.union([z.string(), z.array(z.string()), z.null()]),
  ),
});

async function parseJsonBody(req: NextRequest): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new SyntaxError("Invalid JSON body");
  }
}

async function getSessionUserId(): Promise<string | null> {
  try {
    const user = await requireUser();
    return (user as { id?: string }).id ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const state = await getRegistrationState(userId);
  const draft = await getDraft(userId);
  if (draft) {
    return NextResponse.json({
      ...state,
      responses: draft.responses,
      updatedAt: draft.updatedAt,
    });
  }
  return NextResponse.json(state);
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawBody = await parseJsonBody(req);
    const parsedBody = draftBodySchema.safeParse(rawBody);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const draft = await saveDraft(
      userId,
      parsedBody.data.responses as ApplicationResponses,
    );
    return NextResponse.json({ ok: true, savedAt: draft.updatedAt });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (
      err instanceof RegistrationNotOpenError ||
      err instanceof RegistrationClosedError
    ) {
      return NextResponse.json({ error: err.message }, { status: 403 });
    }
    throw err;
  }
}

export async function PUT(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await parseJsonBody(req)) as { responses: ApplicationResponses };
    const result = await submit(userId, body.responses);
    return NextResponse.json({ ok: true, submittedAt: result.submittedAt });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (err instanceof ValidationError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.issues },
        { status: 400 },
      );
    }
    if (
      err instanceof RegistrationNotOpenError ||
      err instanceof RegistrationClosedError
    ) {
      return NextResponse.json({ error: err.message }, { status: 403 });
    }
    if (err instanceof AlreadySubmittedError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    throw err;
  }
}
