import { getDb } from "@/lib/db";
import type {
  ApplicationDraft,
  ApplicationResponses,
  ApplicationSubmission,
  RegistrationState,
} from "./types";

/*
 * Mongo collection: applicant_data
 *
 * Document shape:
 *   userId:               string                           — unique per applicant
 *   applicationResponses: Record<string, string | string[] | null>
 *   applicationStatus:    'in-progress' | 'submitted'
 *   lastSavedAt:          Date
 *   appSubmissionTime:    Date | null                      — null until submitted
 *
 * Requires env vars: MONGO_PROD_CONNECTION_STRING, MONGO_SERVER_DBNAME
 */
const COLLECTION = "applicant_data";

// Change these values to test every application state end-to-end.
// registrationStatus: "before_open" | "open" | "closed"
// applicationStatus:  "draft" | "submitted"
const MOCK_REGISTRATION_STATE: RegistrationState = {
  registrationStatus: "open",
  opensAt: "2026-09-01T00:00:00Z",
  closesAt: "2026-12-01T00:00:00Z",
  applicationStatus: "draft",
  responses: {},
  updatedAt: null,
};

export async function getRegistrationState(): Promise<RegistrationState> {
  return MOCK_REGISTRATION_STATE;
}

export async function isRegistrationOpen(): Promise<boolean> {
  const state = await getRegistrationState();
  return state.registrationStatus === "open";
}

export async function getDraft(
  userId: string,
): Promise<ApplicationDraft | null> {
  const db = await getDb();
  const doc = await db.collection(COLLECTION).findOne({ userId });
  if (!doc) return null;
  return {
    responses: doc.applicationResponses as ApplicationResponses,
    updatedAt: (doc.lastSavedAt as Date).toISOString(),
    status: "draft",
  };
}

export async function saveDraft(
  userId: string,
  responses: ApplicationResponses,
): Promise<ApplicationDraft> {
  const db = await getDb();
  const now = new Date();
  await db.collection(COLLECTION).updateOne(
    { userId },
    {
      $set: { applicationResponses: responses, lastSavedAt: now },
      // $setOnInsert never overwrites an existing applicationStatus,
      // which prevents a draft save from downgrading a submitted application.
      $setOnInsert: {
        userId,
        applicationStatus: "in-progress",
        appSubmissionTime: null,
      },
    },
    { upsert: true },
  );
  return { responses, updatedAt: now.toISOString(), status: "draft" };
}

/** @todo Persist submission to MongoDB */
export async function submit(
  userId: string,
  responses: ApplicationResponses,
): Promise<ApplicationSubmission> {
  void userId;
  return {
    responses,
    submittedAt: new Date().toISOString(),
    status: "submitted",
  };
}
