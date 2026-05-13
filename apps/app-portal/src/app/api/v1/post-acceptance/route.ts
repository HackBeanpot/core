import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "error 501" }, { status: 501 });
}
