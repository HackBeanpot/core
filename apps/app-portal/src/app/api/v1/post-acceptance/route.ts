import { NextResponse } from "next/server";
import { z } from "zod";
import { saveRsvp } from "../../../../lib/status/service";

const rsvpSchema = z.object({
  attending: z.enum(["yes", "no"]),
  dietaryRestrictions: z.string().max(240),
  tshirtSize: z.enum(["xs", "s", "m", "l", "xl"]),
  accessibilityNeeds: z.string().max(240),
  additionalNotes: z.string().max(400),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = rsvpSchema.parse(body);

    await saveRsvp("mock-user", parsed);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to save RSVP right now" },
      { status: 400 },
    );
  }
}
