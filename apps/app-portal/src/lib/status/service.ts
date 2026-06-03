import { mockApplicantStatus } from "./mock-singletons";
import type { ApplicantStatus, RsvpPayload, RsvpStatus } from "./types";

export async function getApplicantStatus(
  userId: string,
): Promise<ApplicantStatus> {
  void userId;
  return { ...mockApplicantStatus };
}

export async function saveRsvp(
  userId: string,
  payload: RsvpPayload,
): Promise<RsvpStatus> {
  void userId;
  void payload;
  mockApplicantStatus.rsvpStatus = "submitted";
  return "submitted";
}
