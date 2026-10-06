import { NextResponse } from "next/server";
import { requireUser } from "../../../../lib/auth/guards";
import { getPortalStatus, StatusError } from "../../../../lib/status/service";

export async function GET() {
  try {
    await requireUser();
    return NextResponse.json(await getPortalStatus());
  } catch (error) {
    if (error instanceof StatusError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "error 501" }, { status: 501 });
}
