import type { ApplicantStatus, DashboardBranch, DecisionDates } from "./types";

export function returnDashboardBranch(
  user: ApplicantStatus,
  dates: DecisionDates,
  showDecision: boolean,
): DashboardBranch {
  const now = new Date();

  if (now < dates.registrationOpen) {
    return "pre-registration";
  }

  if (!showDecision) {
    return user.applicationStatus === "in-progress"
      ? "in-progress"
      : "submitted";
  }

  switch (user.decisionStatus) {
    case "admitted":
      return "admitted";
    case "waitlisted":
      return "waitlisted";
    case "declined":
      return "declined";
    default:
      return user.applicationStatus === "in-progress"
        ? "in-progress"
        : "submitted";
  }
}
