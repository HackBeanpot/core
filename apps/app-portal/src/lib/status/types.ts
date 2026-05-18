export type DashboardBranch =
  | "pre-registration"
  | "in-progress"
  | "submitted"
  | "admitted"
  | "waitlisted"
  | "declined";

export type ApplicantStatus = {
  userId: string;
  decisionStatus: DecisionStatus;
  rsvpStatus: RsvpStatus;
};

export type DecisionStatus = "admitted" | "waitlisted" | "declined";

export type RsvpStatus = "not-submitted" | "submitted";

export type RsvpPayload = {
  attending: boolean;
};

export type DecisionDates = {
  confirmBy: Date;
  showDecision: Date;
};
