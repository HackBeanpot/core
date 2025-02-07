import { NextResponse, NextRequest } from "next/server";

const BASE_URL = "https://api.airtable.com/v0";
const TABLE_NAME = "2025mentors";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const isDev = searchParams.get("isDev") === "true";
  const MENTOR_BASE_ID = process.env.MENTOR_BASE_ID;
  const airtableUrl = `${BASE_URL}/${MENTOR_BASE_ID}/${TABLE_NAME}${isDev ? "?isDev=true" : ""}`;
  try {
    const response = await fetch(`${airtableUrl}`, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN_ID}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: `Request to get airtable data failed ${err}` },
      { status: 500 },
    );
  }
}
