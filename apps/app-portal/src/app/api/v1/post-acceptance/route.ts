import { NextResponse } from "next/server";
import { requireUser } from "../../../../lib/auth/guards";
import { StatusError, saveRsvp } from "../../../../lib/status/service";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    await saveRsvp((user as { id?: string }).id ?? "", body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Unable to save RSVP right now" },
        { status: 400 },
      );
    }

    if (error instanceof StatusError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Unable to save RSVP right now" },
      { status: 400 },
    );
  }
}
