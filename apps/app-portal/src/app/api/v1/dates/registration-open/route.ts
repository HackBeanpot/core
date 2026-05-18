import { NextResponse } from "next/server";
import { SingletonKey } from "@/lib/admin/singleton-keys";

type SingletonResponse = {
  key: SingletonKey;
  value: string;
};

export async function GET() {
  const data: SingletonResponse = {
    key: "registration-open",
    value: "2026-06-15T23:59:00Z",
  };

  return NextResponse.json(data);
}

export async function POST() {
  return NextResponse.json(
    {
      message: "Not implemented",
    },
    {
      status: 501,
    },
  );
}
