// GET --> returns signed download URL for an uploaded file

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    url: "https://mock.gcs.example.com/fake-signed-url",
  });
}
