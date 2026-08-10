import { z } from "zod";

export const rsvpSchema = z.object({
  attending: z.enum(["confirmed", "unconfirmed"]),
  dietaryRestrictions: z.string().trim().max(240),
  tshirtSize: z.enum(["xs", "s", "m", "l", "xl"]),
  accessibilityNeeds: z.string().trim().max(240),
  additionalNotes: z.string().trim().max(400),
});

export type RsvpSubmission = z.infer<typeof rsvpSchema>;