// POST --> returns signed upload URL for GCS; stub returns 501

import { createSignedUploadUrl, InvalidUploadError } from "@/lib/uploads/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // TODO: gate with requireUser() once Ticket 1 ships its helpers

  const userId = "mock-user-id"; // placeholder until auth lands

  const { filename, mime, size } = await request.json();

  try {
    const { uploadId, uploadUrl, expiresAt } = await createSignedUploadUrl({
      userId, filename, mime, size,
    });
    return NextResponse.json({ uploadId, uploadUrl: uploadUrl, expiresAt });
  } catch (err) {
    if (err instanceof InvalidUploadError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
