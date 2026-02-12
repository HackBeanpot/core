import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.airtable.com/v0";
const TABLE_NAME = "cabinLeads";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ records: [] });
  }

  const CABIN_BASE_ID = process.env.CABIN_BASE_ID;

  const filterFormula = `OR(${ids
    .split(",")
    .map((id) => `RECORD_ID()='${id}'`)
    .join(",")})`;

  const airtableUrl = `${BASE_URL}/${CABIN_BASE_ID}/${TABLE_NAME}?filterByFormula=${encodeURIComponent(
    filterFormula,
  )}`;

  try {
    const response = await fetch(airtableUrl, {
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
      { error: `Request to get cabin leads failed ${err}` },
      { status: 500 },
    );
  }
}
