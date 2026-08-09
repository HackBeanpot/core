import { NextResponse } from "next/server";
import { SingletonKey } from "@/lib/types/singleton";
import { requireAdmin } from "@/lib/auth/guards";
import {
  getSingleton,
  setSingleton,
  validateBooleanSingleton,
} from "@/lib/admin/singleton-service";

// type SingletonResponse = {
//   key: SingletonKey;
//   value: boolean;
// };

export async function GET() {
  const value = await getSingleton(SingletonKey.ShowDecision);

  return NextResponse.json({
    key: SingletonKey.ShowDecision,
    value: value ?? false,
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

  const result = validateBooleanSingleton(value);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  await setSingleton(SingletonKey.ShowDecision, result.value, admin.email);

  return NextResponse.json({
    ok: true,
    value: result.value,
  });
}
