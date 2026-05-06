export type ApplicationStatus = "not-started" | "incomplete" | "submitted";

export type DecisionStatus = "pending" | "admitted" | "waitlisted" | "declined";

export type RsvpStatus = "unconfirmed" | "confirmed" | "not-attending";

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
