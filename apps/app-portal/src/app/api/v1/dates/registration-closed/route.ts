import { NextResponse } from "next/server";
import { SingletonKey } from "@/lib/types/singleton";
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
  const body = await req.json();
  const { value } = body;

  const result = validateDateSingleton(value);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: 400 },
    );
  }

  const updatedBy = "unknown"; // TODO: gate with requireAdmin() once Ticket 1 ships its helpers

  await setSingleton(
    SingletonKey.RegistrationClosed,
    result.value,
    updatedBy,
  );

  return NextResponse.json({
    ok: true,
    value: result.value,
  });
}