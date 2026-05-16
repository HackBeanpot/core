import type { ApplicantStatus, RsvpPayload, RsvpStatus } from "./types";

export async function getApplicantStatus(
  userId: string,
): Promise<ApplicantStatus> {
  return {
    userId,
    decisionStatus: "admitted",
    rsvpStatus: "submitted",
  };
}

export async function saveRsvp(
  userId: string,
  payload: RsvpPayload,
): Promise<RsvpStatus> {
  void userId;
  void payload;
  return "submitted";
}
