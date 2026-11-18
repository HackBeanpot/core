import { NextResponse, NextRequest } from "next/server";
import isValidEmail from "@repo/util/functions/isValidEmail";

// Beehiiv publication "Hackbeanpot's Newsletter". Key: BEEHIIV_API_KEY.
const PUBLICATION = "pub_e065c094-6f4b-4e8d-91d2-e39de7201fd4";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const beehiivUrl = `https://api.beehiiv.com/v2/publications/${PUBLICATION}/subscriptions`;
  try {
    const response = await fetch(beehiivUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with ${response.status}`);
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
