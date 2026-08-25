import { getDb, resolveCollectionName } from "@/lib/db";
import { requireUser } from "@/lib/auth/guards";
import { getSingleton } from "@/lib/admin/singleton-service";
import { getCompletionPercent } from "@/lib/application/service";
import { SingletonKey } from "@/lib/types/singleton";
import { returnDashboardBranch } from "./machine";
import { rsvpSchema } from "./rsvp";
import type {
  ApplicantStatus,
  PortalStatusResponse,
  RsvpStatus,
} from "./types";

const DEFAULT_FUTURE_DATE = new Date("9999-12-31T23:59:59.999Z");

const APPLICANT_COLLECTION = resolveCollectionName("applicant_data");

export class StatusError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "StatusError";
    this.status = status;
  }
}

async function loadPortalSettings() {
  const [registrationOpenValue, confirmByValue, showDecisionValue] =
    await Promise.all([
      getSingleton(SingletonKey.RegistrationOpen),
      getSingleton(SingletonKey.ConfirmBy),
      getSingleton(SingletonKey.ShowDecision),
    ]);

  return {
    registrationOpen:
      registrationOpenValue !== null
        ? new Date(registrationOpenValue)
        : DEFAULT_FUTURE_DATE,
    confirmBy:
      confirmByValue !== null ? new Date(confirmByValue) : DEFAULT_FUTURE_DATE,
    showDecision: showDecisionValue === true,
  };
}

export async function getApplicantStatus(
  userId: string,
): Promise<ApplicantStatus> {
  const db = await getDb();
  const doc = await db.collection(APPLICANT_COLLECTION).findOne({ userId });

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

export async function getPortalStatus(): Promise<PortalStatusResponse> {
  const sessionUser = await requireUser();
  const userId = (sessionUser as { id?: string }).id;

  if (!userId) {
    throw new StatusError("Unauthorized", 401);
  }

  const user = await getApplicantStatus(userId);
  const settings = await loadPortalSettings();

  const branch = returnDashboardBranch({
    user,
    dates: {
      registrationOpen: settings.registrationOpen,
      confirmBy: settings.confirmBy,
    },
    showDecision: settings.showDecision,
    now: new Date(),
  });

  // Only the in-progress view actually displays this; everything past it means the
  // application is done, so there's nothing to compute.
  const completionPercent =
    branch === "in-progress" ? await getCompletionPercent(userId) : 100;

  return {
    branch,
    status: user,
    decisionDates: {
      registrationOpen: settings.registrationOpen.toISOString(),
      confirmBy: settings.confirmBy.toISOString(),
      showDecision: settings.showDecision
        ? new Date().toISOString()
        : DEFAULT_FUTURE_DATE.toISOString(),
    },
    completionPercent,
  };
}

export async function saveRsvp(
  userId: string,
  payload: unknown,
): Promise<RsvpStatus> {
  const parsedPayload = rsvpSchema.parse(payload);
  const db = await getDb();
  const collection = db.collection(APPLICANT_COLLECTION);
  const applicant = await collection.findOne({ userId });

  if (!applicant || applicant.decisionStatus !== "admitted") {
    throw new StatusError("Only admitted users can RSVP.", 403);
  }

  const confirmByValue = await getSingleton(SingletonKey.ConfirmBy);
  const confirmBy =
    confirmByValue !== null ? new Date(confirmByValue) : DEFAULT_FUTURE_DATE;

  if (Date.now() > confirmBy.getTime()) {
    throw new StatusError("The confirm-by deadline has passed.", 410);
  }

  const rsvpStatus: RsvpStatus =
    parsedPayload.attending === "confirmed" ? "confirmed" : "not-attending";

  await collection.updateOne(
    { userId },
    {
      $set: {
        rsvpStatus,
        postAcceptanceResponses: {
          attending: parsedPayload.attending,
          dietaryRestrictions: parsedPayload.dietaryRestrictions,
          tshirtSize: parsedPayload.tshirtSize,
          accessibilityNeeds: parsedPayload.accessibilityNeeds,
          additionalNotes: parsedPayload.additionalNotes,
        },
        rsvpSubmissionTime: new Date().toISOString(),
      },
    },
  );

  return rsvpStatus;
}
