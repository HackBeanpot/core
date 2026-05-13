import { NextResponse } from "next/server";
import { getApplicantStatus } from "../../../../lib/status/service";

export async function GET() {
  const status = await getApplicantStatus("mock-user");
  return NextResponse.json(status);
}

export async function POST() {
  return NextResponse.json({ error: "error 501" }, { status: 501 });
}
