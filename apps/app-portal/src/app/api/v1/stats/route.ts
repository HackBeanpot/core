import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/guards";
import { getStats } from "@/lib/stats/service";

export const dynamic = "force-dynamic";

// GET aggregate stats
export async function GET() {
  try {
    await requireAdmin();
    const payload = await getStats();
    return NextResponse.json(payload);
  } catch (err) {
    if (err instanceof Error && err.message === "Forbidden") {
      return NextResponse.json({ error: err.message }, { status: 403 });
    }

    if (err instanceof Error && err.message === "Unauthorized") {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: `Failed to load stats: ${err}` },
      { status: 500 },
    );
  }
}
