//GET current session user; returns 401 if no session
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "not implemented" }, { status: 501 });
}
