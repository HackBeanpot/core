import { NextRequest, NextResponse } from "next/server";

import { parseApplicantQuery } from "@/lib/applicants/params";
import { listApplicants } from "@/lib/applicants/service";

export async function GET(req: NextRequest) {
  // TODO: gate with requireAdmin() once Ticket 1 ships its helpers
  const parsed = parseApplicantQuery(new URL(req.url).searchParams);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const result = await listApplicants(parsed.value);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to list applicants: ${err}` },
      { status: 500 },
    );
  }
}
