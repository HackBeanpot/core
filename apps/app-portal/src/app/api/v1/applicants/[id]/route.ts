import { NextRequest, NextResponse } from "next/server";

import { getApplicant } from "@/lib/applicants/service";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const applicant = await getApplicant(params.id);
  if (!applicant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(applicant);
}

export async function POST() {
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
