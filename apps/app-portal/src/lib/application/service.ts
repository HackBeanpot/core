import { getFormConfig } from "@/lib/admin/form-config-service";
import { getSingleton } from "@/lib/admin/singleton-service";
import { getDb, resolveCollectionName } from "@/lib/db";
import { SingletonKey } from "@/lib/types/singleton";

import {
  AlreadySubmittedError,
  RegistrationClosedError,
  RegistrationNotOpenError,
  ValidationError,
} from "./errors";
import { buildApplicationSchema } from "./schema";
import type {
  ApplicationDraft,
  ApplicationResponses,
  ApplicationSubmission,
  FormSection,
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
const COLLECTION = resolveCollectionName("applicant_data");

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

// The live, admin-editable question set (see /admin/settings + FormConfigEditor). Falls back to
// the code-level default (lib/application/questions.ts) until an admin saves a change.
async function getSections(): Promise<FormSection[]> {
  const config = await getFormConfig();
  return config.sections;
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

  const sections = await getSections();

  return {
    registrationStatus,
    opensAt: opensAt ?? "",
    closesAt: closesAt ?? "",
    applicationStatus,
    responses: {},
    updatedAt: null,
    sections,
  };
}

function isAnswered(value: string | string[] | null | undefined): boolean {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  return value.trim().length > 0;
}

// Real completion percentage for the dashboard's in-progress view, based on how many of the
// live form's questions have an answer saved in the applicant's draft.
export async function getCompletionPercent(userId: string): Promise<number> {
  const sections = await getSections();
  const totalQuestions = sections.reduce(
    (sum, section) => sum + section.questions.length,
    0,
  );
  if (totalQuestions === 0) return 0;

  const draft = await getDraft(userId);
  if (!draft) return 0;

  const answeredQuestions = sections.reduce(
    (sum, section) =>
      sum +
      section.questions.filter((q) => isAnswered(draft.responses[q.id])).length,
    0,
  );

  return Math.round((answeredQuestions / totalQuestions) * 100);
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
  const collection = db.collection(COLLECTION);
  const existing = await collection.findOne({ userId });

  // A submitted application is authoritative. Without this, a stray/delayed autosave
  // request (e.g. one already in flight when the user clicks Submit) would still land
  // here and silently overwrite the submitted responses back to whatever stale draft
  // content was in the field values at the time it was queued — applicationStatus would
  // stay "submitted" the whole time, so nothing would even look wrong to the applicant.
  if (existing?.applicationStatus === "submitted") {
    return {
      responses: existing.applicationResponses as ApplicationResponses,
      updatedAt: (existing.lastSavedAt as Date).toISOString(),
      status: "draft",
    };
  }

  const now = new Date();
  await collection.updateOne(
    // Re-check applicationStatus in the update filter too (not just the read above) to
    // narrow the race window between the findOne and this write.
    { userId, applicationStatus: { $ne: "submitted" } },
    {
      $set: { applicationResponses: responses, lastSavedAt: now },
      // $setOnInsert never overwrites an existing applicationStatus, which prevents a draft save from downgrading a submitted application.
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

  const sections = await getSections();
  const submissionSchema = buildApplicationSchema(sections, "server");
  const parsed = submissionSchema.safeParse(responses);
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
