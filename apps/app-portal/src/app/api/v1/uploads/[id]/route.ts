// GET --> returns signed download URL for an uploaded file

import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json(
        { message: "Not implemented" }, 
        { status: 501 },
    );
}
