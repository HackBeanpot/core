import { NextResponse } from "next/server";

import { getRegistrationState } from "@/lib/application/service";

export async function GET() {
  const state = await getRegistrationState();
  return NextResponse.json(state);
}

export async function POST() {
  // save submission
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}

export async function PUT() {
  // submits application
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
