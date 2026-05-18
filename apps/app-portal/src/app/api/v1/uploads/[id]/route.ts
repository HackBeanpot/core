// GET --> returns signed download URL for an uploaded file

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
