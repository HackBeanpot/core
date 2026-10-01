import type { DashboardBranch, MachineInput } from "./types";

export function returnDashboardBranch(input: MachineInput): DashboardBranch {
  const { user, dates, showDecision, now } = input;

  if (now < dates.registrationOpen) {
    return "pre-registration";
  }

  if (user.applicationStatus !== "submitted") {
    return "in-progress";
  }

  if (
    !showDecision ||
    !user.decisionStatus ||
    user.decisionStatus === "pending"
  ) {
    return "submitted";
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
