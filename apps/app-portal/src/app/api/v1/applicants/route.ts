import { NextResponse } from "next/server";

import { listApplicants } from "@/lib/applicants/service";

export async function GET() {
  const result = await listApplicants();
  return NextResponse.json(result);
}
