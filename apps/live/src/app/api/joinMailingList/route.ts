import { NextResponse, NextRequest } from "next/server";

const PUBLICATION = "pub_e065c094-6f4b-4e8d-91d2-e39de7201fd4";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const airtableUrl = `https://api.beehiiv.com/v2/publications/${PUBLICATION}/subscriptions`;
  try {
    const response = await fetch(`${airtableUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return NextResponse.json({
      success: "Successfully subscribed to mailing list",
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Request to post email to beehiiv failed ${err}` },
      { status: 500 },
    );
  }
}
