import type {
  ApplicationStatus,
  DecisionStatus,
  RsvpStatus,
} from "@/lib/types/user";

export type { ApplicationStatus, DecisionStatus, RsvpStatus };

export type DashboardBranch =
  | "pre-registration"
  | "in-progress"
  | "submitted"
  | "admitted"
  | "waitlisted"
  | "declined";

export type ApplicantStatus = {
  userId: string;
  applicationStatus: ApplicationStatus;
  decisionStatus?: DecisionStatus;
  rsvpStatus: RsvpStatus;
};

export type MachineInput = {
  user: ApplicantStatus;
  dates: {
    registrationOpen: Date;
    confirmBy: Date;
  };
  showDecision: boolean;
  now: Date;
};

export type RsvpPayload = {
  attending: "yes" | "no";
  dietaryRestrictions: string;
  tshirtSize: "xs" | "s" | "m" | "l" | "xl";
  accessibilityNeeds: string;
  additionalNotes: string;
};

export type DecisionDates = {
  registrationOpen: Date;
  confirmBy: Date;
  showDecision: Date;
};

export type SerializedDecisionDates = {
  registrationOpen: string;
  confirmBy: string;
  showDecision: string;
};

export type PortalStatusResponse = {
  branch: DashboardBranch;
  status: ApplicantStatus;
  decisionDates: SerializedDecisionDates;
  /** Real completion % of the application draft; only meaningful for the "in-progress" branch. */
  completionPercent: number;
};
