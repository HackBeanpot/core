import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const PUBLICATION = "pub_e065c094-6f4b-4e8d-91d2-e39de7201fd4";

const joinMailingListSchema = z.object({
  email: z.string().email(),
  reactivate_existing: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = joinMailingListSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "A valid email is required" },
      { status: 400 },
    );
  }

  const beehiivUrl = `https://api.beehiiv.com/v2/publications/${PUBLICATION}/subscriptions`;
  try {
    const response = await fetch(beehiivUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      throw new Error(
        `Beehiiv API request failed with status ${response.status}`,
      );
    }

    return NextResponse.json({
      success: "Successfully subscribed to mailing list",
    });
  } catch (err) {
    // Log the real error server-side, but don't leak internal details to the client.
    // eslint-disable-next-line no-console -- intentional server-side error log
    console.error("joinMailingList: Beehiiv request failed:", err);
    return NextResponse.json(
      { error: "Could not subscribe to the mailing list. Please try again." },
      { status: 502 },
    );
  }
}
