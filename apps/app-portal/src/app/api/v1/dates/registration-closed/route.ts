import { NextResponse } from "next/server";
import { SingletonKey } from "@/lib/types/singleton";
import { requireAdmin } from "@/lib/auth/guards";
import {
  getSingleton,
  setSingleton,
  validateDateSingleton,
} from "@/lib/admin/singleton-service";

export async function GET() {
  const value = await getSingleton(SingletonKey.RegistrationClosed);

  return NextResponse.json({
    value,
  });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();

  if (!admin.email) {
    return NextResponse.json(
      { error: "Admin email is required." },
      { status: 400 },
    );
  }

  const body = await req.json();
  const { value } = body;

  const result = validateDateSingleton(value);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  await setSingleton(
    SingletonKey.RegistrationClosed,
    result.value,
    admin.email,
  );

  return NextResponse.json({
    ok: true,
    value: result.value,
  });
}
