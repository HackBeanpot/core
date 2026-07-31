//GET current session user; returns 401 if no session
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/guards";

export async function GET() {
  try {
    const user = (await requireUser()) as {
      email?: string | null;
      id?: string;
      isAdmin?: boolean;
    };
    return NextResponse.json({
      email: user.email ?? null,
      id: user.id,
      isAdmin: user.isAdmin ?? false,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
