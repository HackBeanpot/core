import { Collection, FindCursor, ObjectId } from "mongodb";
import { z } from "zod";

import { getDb, resolveCollectionName } from "@/lib/db";
import { getUploadRecord } from "@/lib/uploads/service";
import { DECISION_STATUSES, RSVP_STATUSES } from "@/lib/types/user";

import { buildApplicantQuery } from "./queries";
import type {
  ApplicantDetail,
  ApplicantListParams,
  ApplicantListResult,
  ApplicantSummary,
  ApplicantDoc,
  ApplicantUpdate,
  UploadedFile,
} from "./types";

const APPLICANT_COLLECTION = resolveCollectionName("applicant_data");

async function applicantCollection(): Promise<Collection<ApplicantDoc>> {
  const db = await getDb();
  return db.collection<ApplicantDoc>(APPLICANT_COLLECTION);
}

// The 2026 application form splits name into "first_name"/"last_name" (the older
// "legal_name" single-field question no longer exists) — combine them for display,
// sorting, search, and CSV export so all of those stay in sync with the live form.
export function getApplicantName(
  responses: ApplicantDoc["applicationResponses"],
): string | undefined {
  const first = responses?.["first_name"];
  const last = responses?.["last_name"];
  const parts = [first, last].filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );
  return parts.length > 0 ? parts.join(" ") : undefined;
}

function docToSummary(doc: ApplicantDoc): ApplicantSummary {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: getApplicantName(doc.applicationResponses),
    applicationStatus: doc.applicationStatus,
    decisionStatus: doc.decisionStatus,
    rsvpStatus: doc.rsvpStatus,
    appSubmissionTime: doc.appSubmissionTime,
    lastSavedAt: doc.lastSavedAt,
  };
}

async function resolveResume(
  doc: ApplicantDoc,
): Promise<UploadedFile | undefined> {
  const uploadId = doc.applicationResponses?.["resume"];
  if (typeof uploadId !== "string" || uploadId.length === 0) return undefined;
  const record = await getUploadRecord(uploadId);
  // Fall back to the raw id as the label if the upload record is missing (e.g. it
  // was somehow deleted) rather than hiding the resume link entirely.
  return { id: uploadId, filename: record?.filename ?? uploadId };
}

async function docToDetail(doc: ApplicantDoc): Promise<ApplicantDetail> {
  return {
    ...docToSummary(doc),
    applicationResponses: doc.applicationResponses,
    postAcceptanceResponses: doc.postAcceptanceResponses,
    rsvpSubmissionTime: doc.rsvpSubmissionTime,
    resume: await resolveResume(doc),
    updatedAt: doc.updatedAt,
    updatedBy: doc.updatedBy,
  };
}

export async function listApplicants(
  params: ApplicantListParams,
): Promise<ApplicantListResult> {
  const { filters, sortBy, sortDir, page, pageSize } = params;
  const col = await applicantCollection();
  const filter = buildApplicantQuery(filters);
  const dir = sortDir === "asc" ? 1 : -1;
  // `name` lives under the application response, not a top-level doc field.
  const sort: Record<string, 1 | -1> =
    sortBy === "name"
      ? {
          "applicationResponses.last_name": dir,
          "applicationResponses.first_name": dir,
        }
      : { [sortBy]: dir };

  const [total, docs] = await Promise.all([
    col.countDocuments(filter),
    col
      .find(filter)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray(),
  ]);

  return {
    rows: docs.map(docToSummary),
    total,
    page,
    pageSize,
  };
}

export async function getApplicant(
  id: string,
): Promise<ApplicantDetail | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await applicantCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return await docToDetail(doc);
}

export class InvalidApplicantUpdateError extends Error {}
// Thrown when a patch would put an applicant into an inconsistent state — e.g. giving
// them an RSVP status without them actually being admitted (mirrors the same rule the
// applicant-facing RSVP flow enforces in lib/status/service.ts's saveRsvp).
export class InvalidApplicantStateError extends Error {}

const updateSchema = z
  .object({
    decisionStatus: z.enum(DECISION_STATUSES).optional(),
    rsvpStatus: z.enum(RSVP_STATUSES).optional(),
  })
  .strict()
  .refine((v) => v.decisionStatus !== undefined || v.rsvpStatus !== undefined, {
    message: "At least one of decisionStatus or rsvpStatus is required",
  });

export async function updateApplicant(
  id: string,
  patch: unknown,
  updatedBy: string,
): Promise<ApplicantDetail | null> {
  if (!ObjectId.isValid(id)) return null;

  const parsed = updateSchema.safeParse(patch);
  if (!parsed.success) {
    throw new InvalidApplicantUpdateError(
      parsed.error.issues.map((i) => i.message).join("; "),
    );
  }

  const patchValue: ApplicantUpdate = parsed.data;
  const col = await applicantCollection();

  if (patchValue.rsvpStatus && patchValue.rsvpStatus !== "unconfirmed") {
    const existing = await col.findOne({ _id: new ObjectId(id) });
    if (!existing) return null;
    const resultingDecisionStatus =
      patchValue.decisionStatus ?? existing.decisionStatus;
    if (resultingDecisionStatus !== "admitted") {
      throw new InvalidApplicantStateError(
        "Only admitted applicants can have an RSVP status other than unconfirmed.",
      );
    }
  }

  const updatedAt = new Date().toISOString();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...patchValue, updatedBy, updatedAt } },
    { returnDocument: "after" },
  );
  if (!result.value) return null;
  return await docToDetail(result.value);
}

/** Full, unfiltered cursor for streaming CSV export — never buffer into an array. */
export async function getApplicantCursor(): Promise<FindCursor<ApplicantDoc>> {
  const col = await applicantCollection();
  return col.find({}).sort({ _id: 1 });
}

// Indexes for this collection are managed in scripts/setup-indexes.ts.
// Run `yarn setup-indexes` (or `yarn seed`) when provisioning a new environment.
