import { returnDashboardBranch } from "./machine";
import type { ApplicantStatus, MachineInput } from "./types";

const PAST = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
const FUTURE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

function makeInput(overrides: {
  user?: Partial<ApplicantStatus>;
  dates?: { registrationOpen: Date; confirmBy: Date };
  showDecision?: boolean;
  now?: Date;
} = {}): MachineInput {
  return {
    user: {
      userId: "test-user",
      applicationStatus: "not-started",
      rsvpStatus: "unconfirmed",
      ...overrides.user,
    },
    dates: overrides.dates ?? {
      registrationOpen: PAST,
      confirmBy: FUTURE,
    },
    showDecision: overrides.showDecision ?? true,
    now: overrides.now ?? new Date(),
  };
}
describe("returnDashboardBranch", () => {
  test("pre-registration: now < registrationOpen regardless of other fields", () => {
    const input = makeInput({
      user: { applicationStatus: "submitted", decisionStatus: "admitted" },
      dates: { registrationOpen: FUTURE, confirmBy: FUTURE },
    });
    expect(returnDashboardBranch(input)).toBe("pre-registration");
  });

  test("in-progress: applicationStatus incomplete and now >= registrationOpen", () => {
    const input = makeInput({ user: { applicationStatus: "incomplete" } });
    expect(returnDashboardBranch(input)).toBe("in-progress");
  });

  test("not-started after open returns in-progress", () => {
    const input = makeInput({ user: { applicationStatus: "not-started" } });
    expect(returnDashboardBranch(input)).toBe("in-progress");
  });

  test("submitted with decisions hidden returns submitted", () => {
    const input = makeInput({
      user: { applicationStatus: "submitted", decisionStatus: "admitted" },
      showDecision: false,
    });
    expect(returnDashboardBranch(input)).toBe("submitted");
  });

  test("submitted with decisionStatus pending returns submitted", () => {
    const input = makeInput({
      user: { applicationStatus: "submitted", decisionStatus: "pending" },
      showDecision: true,
    });
    expect(returnDashboardBranch(input)).toBe("submitted");
  });

  test("admitted: submitted + admitted + showDecision true", () => {
    const input = makeInput({
      user: { applicationStatus: "submitted", decisionStatus: "admitted" },
      showDecision: true,
    });
    expect(returnDashboardBranch(input)).toBe("admitted");
  });

  test("waitlisted: submitted + waitlisted + showDecision true", () => {
    const input = makeInput({
      user: { applicationStatus: "submitted", decisionStatus: "waitlisted" },
      showDecision: true,
    });
    expect(returnDashboardBranch(input)).toBe("waitlisted");
  });

  test("declined: submitted + declined + showDecision true", () => {
    const input = makeInput({
      user: { applicationStatus: "submitted", decisionStatus: "declined" },
      showDecision: true,
    });
    expect(returnDashboardBranch(input)).toBe("declined");
  });
});