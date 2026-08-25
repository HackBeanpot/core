import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/guards";
import {
  getFormConfig,
  updateFormConfig,
} from "@/lib/admin/form-config-service";

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = await getFormConfig();

  return NextResponse.json(config);
}

export async function POST(req: Request) {
  const admin = await requireAdmin();

  if (!admin.email) {
    return NextResponse.json(
      { error: "Admin email is required." },
      { status: 400 },
    );
  }

  const config = await req.json();

  try {
    await updateFormConfig(config, admin.email);

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Invalid form configuration.",
      },
      { status: 400 },
    );
  }
}
