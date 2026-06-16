// POST --> returns signed upload URL for GCS; stub returns 501

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await request.json();
  return NextResponse.json({
    uploadId: "mock-upload-id-67",
    url: "https://mock.gcs.example.com/fake-signed-url",
  });
}
