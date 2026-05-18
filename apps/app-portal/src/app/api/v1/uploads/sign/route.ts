// POST --> returns signed upload URL for GCS; stub returns 501

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return NextResponse.json(
        { message: "Not implemented" }, 
        { status: 501 },
    );
}