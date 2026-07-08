import { type NextRequest, NextResponse } from "next/server";

import {
  getDraft,
  getRegistrationState,
  saveDraft,
} from "@/lib/application/service";
import type { ApplicationResponses } from "@/lib/application/types";

// TODO: replace with session lookup once auth helpers exist (sprint 4)
function getUserId(req: NextRequest): string | null {
  return (
    req.headers.get("x-user-id") ??
    req.nextUrl.searchParams.get("userId")
  );
}

export async function GET(req: NextRequest) {
  const state = await getRegistrationState();
  const userId = getUserId(req);
  if (userId) {
    const draft = await getDraft(userId);
    if (draft) {
      return NextResponse.json({
        ...state,
        responses: draft.responses,
        updatedAt: draft.updatedAt,
      });
    }
  }
  return NextResponse.json(state);
}

export async function POST(req: NextRequest) {
  const userId = getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const body = (await req.json()) as { responses: ApplicationResponses };
  const draft = await saveDraft(userId, body.responses);
  return NextResponse.json({ ok: true, savedAt: draft.updatedAt });
}

export async function PUT() {
  // submits application — wired in a future ticket
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
