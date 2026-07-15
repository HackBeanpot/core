import { getDb } from "@/lib/db";
import { decisionDates, mockApplicantStatus } from "./mock-singletons";
import { returnDashboardBranch } from "./machine";
import type {
  ApplicantStatus,
  PortalStatusResponse,
  RsvpPayload,
  RsvpStatus,
} from "./types";

export async function getApplicantStatus(userId: string): Promise<ApplicantStatus> {
  const db = await getDb();
  const doc = await db.collection("applicant_data").findOne({ userId });

  if (!doc) {
    return {
      userId,
      applicationStatus: "not-started",
      decisionStatus: undefined,
      rsvpStatus: "unconfirmed",
    };
  }

  return {
    userId,
    applicationStatus: doc.applicationStatus ?? "not-started",
    decisionStatus: doc.decisionStatus,
    rsvpStatus: doc.rsvpStatus ?? "unconfirmed",
  };
}

export async function getPortalStatus(userId: string): Promise<PortalStatusResponse> {
  const user = await getApplicantStatus(userId);

  // TODO: replace with getSingleton() calls once Ticket 5 lands real singleton service
  const showDecision = new Date() >= decisionDates.showDecision;

  const branch = returnDashboardBranch({
    user,
    dates: {
      registrationOpen: decisionDates.registrationOpen,
      confirmBy: decisionDates.confirmBy,
    },
    showDecision,
    now: new Date(),
  });

  return {
    branch,
    status: user,
    decisionDates: {
      registrationOpen: decisionDates.registrationOpen.toISOString(),
      confirmBy: decisionDates.confirmBy.toISOString(),
      showDecision: decisionDates.showDecision.toISOString(),
    },
  };
}

export async function saveRsvp(
  userId: string,
  payload: RsvpPayload,
): Promise<RsvpStatus> {
  void userId;
  void payload;
  mockApplicantStatus.rsvpStatus = "confirmed";
  return "confirmed";
}