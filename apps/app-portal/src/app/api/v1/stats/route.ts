import { NextResponse } from "next/server";

import { getStats } from "@/lib/stats/service";

// GET aggregate stats
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
