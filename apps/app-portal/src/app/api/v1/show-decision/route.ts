import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/guards";
import { getSingleton, setSingleton } from "@/lib/admin/singleton-service";
import { SingletonKey } from "@/lib/types/singleton";

export async function GET() {
  try {
    await requireAdmin();
    const value = await getSingleton(SingletonKey.ShowDecision);

    return NextResponse.json({
      key: SingletonKey.ShowDecision,
      value: value ?? false,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAdmin();
    const body = await req.json();

    if (typeof body.enabled !== "boolean") {
      return NextResponse.json(
        { error: "enabled must be a boolean" },
        { status: 400 },
      );
    }

    await setSingleton(
      SingletonKey.ShowDecision,
      body.enabled,
      (user as { id?: string; email?: string }).email ??
        (user as { id?: string }).id ??
        "unknown",
    );

    return NextResponse.json({ ok: true, value: body.enabled });
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
