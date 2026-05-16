import type { ApplicantStatus, DashboardBranch, DecisionDates } from "./types";

export function returnDashboardBranch(
  user: ApplicantStatus,
  dates: DecisionDates,
  showDecision: boolean,
): DashboardBranch {
  void dates;

  if (!showDecision) {
    return "pre-registration";
  }

  switch (user.decisionStatus) {
    case "admitted":
      return "admitted";
    case "waitlisted":
      return "waitlisted";
    case "declined":
      return "declined";
    default:
      return "submitted";
  }
}
