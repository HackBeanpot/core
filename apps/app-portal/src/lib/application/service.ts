import { getSingleton } from "@/lib/admin/singleton-service";
import { getDb } from "@/lib/db";
import { SingletonKey } from "@/lib/types/singleton";

import {
  AlreadySubmittedError,
  RegistrationClosedError,
  RegistrationNotOpenError,
  ValidationError,
} from "./errors";
import { applicationSubmissionSchema } from "./schema";
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

// const MOCK_REGISTRATION_STATE: RegistrationState = {
//   registrationStatus: "open",
//   opensAt: "2026-01-01T00:00:00Z",
//   closesAt: "2026-12-01T00:00:00Z",
//   applicationStatus: "submitted",
//   responses: {},
//   updatedAt: null,
// };

async function getRegistrationWindow(): Promise<{
  opensAt: string | null;
  closesAt: string | null;
}> {
  const [opensAt, closesAt] = await Promise.all([
    getSingleton(SingletonKey.RegistrationOpen),
    getSingleton(SingletonKey.RegistrationClosed),
  ]);
  return { opensAt, closesAt };
}

export async function getRegistrationState(
  userId?: string,
): Promise<RegistrationState> {
  const { opensAt, closesAt } = await getRegistrationWindow();
  const now = new Date();

  let registrationStatus: RegistrationState["registrationStatus"] = "open";
  if (opensAt && now < new Date(opensAt)) {
    registrationStatus = "before_open";
  } else if (closesAt && now > new Date(closesAt)) {
    registrationStatus = "closed";
  }

  let applicationStatus: RegistrationState["applicationStatus"] = "draft";
  if (userId) {
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({ userId });
    if (doc?.applicationStatus === "submitted") {
      applicationStatus = "submitted";
    }
  }

  return {
    registrationStatus,
    opensAt: opensAt ?? "",
    closesAt: closesAt ?? "",
    applicationStatus,
    responses: {},
    updatedAt: null,
  };
}

export async function isRegistrationOpen(): Promise<boolean> {
  const state = await getRegistrationState();
  return state.registrationStatus === "open";
}

// Enforces the admin-configured registration window against real time. Throws before any draft save or submission is written.
async function assertRegistrationWindowOpen(): Promise<void> {
  const { opensAt, closesAt } = await getRegistrationWindow();
  const now = new Date();
  if (opensAt && now < new Date(opensAt)) {
    throw new RegistrationNotOpenError();
  }
  if (closesAt && now > new Date(closesAt)) {
    throw new RegistrationClosedError();
  }
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
  await assertRegistrationWindowOpen();
  const db = await getDb();
  const now = new Date();
  await db.collection(COLLECTION).updateOne(
    { userId },
    {
      $set: { applicationResponses: responses, lastSavedAt: now },
      // $setOnInsert never overwrites an existing applicationStatus,which prevents a draft save from downgrading a submitted application.
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

export async function submit(
  userId: string,
  responses: ApplicationResponses,
): Promise<ApplicationSubmission> {
  await assertRegistrationWindowOpen();

  const db = await getDb();
  const existing = await db.collection(COLLECTION).findOne({ userId });
  if (existing?.applicationStatus === "submitted") {
    throw new AlreadySubmittedError();
  }

  const parsed = applicationSubmissionSchema.safeParse(responses);
  if (!parsed.success) {
    throw new ValidationError(parsed.error);
  }

  const now = new Date();
  await db.collection(COLLECTION).updateOne(
    { userId },
    {
      $set: {
        applicationResponses: parsed.data,
        applicationStatus: "submitted",
        appSubmissionTime: now,
        lastSavedAt: now,
      },
      $setOnInsert: { userId },
    },
    { upsert: true },
  );

  return {
    responses: parsed.data as ApplicationResponses,
    submittedAt: now.toISOString(),
    status: "submitted",
  };
}
