export const APPLICATION_STATUSES = [
  "not-started",
  "incomplete",
  "submitted",
] as const;
export const DECISION_STATUSES = [
  "pending",
  "admitted",
  "waitlisted",
  "declined",
] as const;
export const RSVP_STATUSES = [
  "unconfirmed",
  "confirmed",
  "not-attending",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type DecisionStatus = (typeof DECISION_STATUSES)[number];
export type RsvpStatus = (typeof RSVP_STATUSES)[number];

export interface PortalUser {
  email: string;
  isAdmin: boolean;
  applicationStatus: ApplicationStatus;
  decisionStatus?: DecisionStatus;
  rsvpStatus: RsvpStatus;
  applicationResponses?: Record<string, unknown>;
  postAcceptanceResponses?: Record<string, unknown>;
  appSubmissionTime?: string;
  rsvpSubmissionTime?: string;
}
