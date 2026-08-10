import { type NextRequest, NextResponse } from "next/server";

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

  const body = (await req.json()) as { responses: ApplicationResponses };
  try {
    const draft = await saveDraft(userId, body.responses);
    return NextResponse.json({ ok: true, savedAt: draft.updatedAt });
  } catch (err) {
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

  const body = (await req.json()) as { responses: ApplicationResponses };
  try {
    const result = await submit(userId, body.responses);
    return NextResponse.json({ ok: true, submittedAt: result.submittedAt });
  } catch (err) {
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
