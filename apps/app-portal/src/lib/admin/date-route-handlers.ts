import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/guards";
import { SingletonKey } from "@/lib/types/singleton";
import {
  getSingleton,
  setSingleton,
  validateDateOrdering,
  validateDateSingleton,
} from "./singleton-service";

// Shared GET/POST implementation for the three date singleton routes
// (registration-open, registration-closed, confirm-by) — they were previously three
// near-identical copies of this logic, which meant a fix (auth error handling, date
// ordering validation) had to be applied three times to stay consistent.
export function createDateSingletonHandlers(key: SingletonKey) {
  async function GET() {
    const value = await getSingleton(key);
    return NextResponse.json({ value });
  }

  async function POST(req: Request) {
    let admin;
    try {
      admin = await requireAdmin();
    } catch (error) {
      if (error instanceof Error && error.message === "Forbidden") {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    const ordering = await validateDateOrdering(key, result.value);
    if (!ordering.ok) {
      return NextResponse.json({ error: ordering.error }, { status: 400 });
    }

    await setSingleton(key, result.value, admin.email);

    return NextResponse.json({ ok: true, value: result.value });
  }

  return { GET, POST };
}
