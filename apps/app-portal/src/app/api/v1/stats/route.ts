import { NextResponse } from "next/server";

import { getStats } from "@/lib/stats/service";

export const dynamic = "force-dynamic";

// GET aggregate stats
// TODO: gate with requireAdmin() once Ticket 1 ships its helpers.
export async function GET() {
  try {
    const payload = await getStats();
    return NextResponse.json(payload);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to load stats: ${err}` },
      { status: 500 },
    );
  }
}
