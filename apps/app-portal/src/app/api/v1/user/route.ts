//GET current session user; returns 401 if no session
import { NextResponse } from "next/server";
import {requireUser} from "@/lib/auth/guards.ts";

export async function GET() {
  await requireUser()
  return NextResponse.json({ error: "not implemented" }, { status: 501 });
}
