// GET --> returns signed download URL (plus filename/mime/size) for an uploaded file.
// With ?redirect=1 it redirects straight to the file instead, so it can be used as a link.

import { requireUser } from "@/lib/auth/guards";
import {
  createSignedDownloadUrl,
  UploadNotFoundError,
} from "@/lib/uploads/service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const uploadId = params.id;

  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json(
      { error: "Requester not allowed" },
      { status: 403 },
    );
  }

  const requester = {
    userId: (user as { id: string }).id,
    isAdmin: !!(user as { isAdmin?: boolean }).isAdmin,
  };

  try {
    const res = await createSignedDownloadUrl({ uploadId, requester });
    if (res === null) {
      return NextResponse.json(
        { error: "Requester not allowed" },
        { status: 403 },
      );
    }
    if (new URL(request.url).searchParams.has("redirect")) {
      return NextResponse.redirect(res.url);
    }
    return NextResponse.json(res);
  } catch (err) {
    if (err instanceof UploadNotFoundError) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
