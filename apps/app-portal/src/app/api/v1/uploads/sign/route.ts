// POST --> returns signed upload URL for GCS

import { requireUser } from "@/lib/auth/guards";
import {
  createSignedUploadUrl,
  InvalidUploadError,
} from "@/lib/uploads/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json(
      { error: "Requester not allowed" },
      { status: 403 },
    );
  }

  const userId = (user as { id: string }).id;

  const { filename, mime, size } = await request.json();

  try {
    const { uploadId, uploadUrl, expiresAt } = await createSignedUploadUrl({
      userId,
      filename,
      mime,
      size,
    });
    return NextResponse.json({ uploadId, uploadUrl: uploadUrl, expiresAt });
  } catch (err) {
    if (err instanceof InvalidUploadError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
