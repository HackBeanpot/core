import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/guards";
import { parseApplicantQuery } from "@/lib/applicants/params";
import { listApplicants } from "@/lib/applicants/service";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    // Stopgap 403 mapping until the (separate, in-flight) auth ticket lands
    // typed errors distinguishing unauthenticated (401) from non-admin (403).
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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
