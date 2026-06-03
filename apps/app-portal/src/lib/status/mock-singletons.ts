import type { ApplicantStatus, DecisionDates } from "./types";

export const mockApplicantStatus: ApplicantStatus = {
  userId: "mock-user",
  applicationStatus: "in-progress",
  decisionStatus: "admitted",
  rsvpStatus: "not-submitted",
};

export const decisionDates: DecisionDates = {
  registrationOpen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  showDecision: new Date(Date.now() - 24 * 60 * 60 * 1000),
  confirmBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
};
