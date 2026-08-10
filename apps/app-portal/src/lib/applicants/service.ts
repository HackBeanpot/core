import { Collection, FindCursor, ObjectId } from "mongodb";
import { z } from "zod";

import { getDb, resolveCollectionName } from "@/lib/db";
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

function docToSummary(doc: ApplicantDoc): ApplicantSummary {
  const name = doc.applicationResponses?.["legal_name"];
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: typeof name === "string" && name.length > 0 ? name : undefined,
    applicationStatus: doc.applicationStatus,
    decisionStatus: doc.decisionStatus,
    rsvpStatus: doc.rsvpStatus,
    appSubmissionTime: doc.appSubmissionTime,
    lastSavedAt: doc.lastSavedAt,
  };
}

function resolveResume(doc: ApplicantDoc): UploadedFile | undefined {
  const uploadId = doc.applicationResponses?.["resume"];
  if (typeof uploadId !== "string" || uploadId.length === 0) return undefined;
  // Placeholder filename until the (separate, in-flight) uploads ticket lands
  // real upload-record metadata — the id doubles as the displayed label.
  // TODO: fill out with real call to the uploads collection once that ticket lands.
  return { id: uploadId, filename: uploadId };
}

function docToDetail(doc: ApplicantDoc): ApplicantDetail {
  return {
    ...docToSummary(doc),
    applicationResponses: doc.applicationResponses,
    postAcceptanceResponses: doc.postAcceptanceResponses,
    rsvpSubmissionTime: doc.rsvpSubmissionTime,
    resume: resolveResume(doc),
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
      ? { "applicationResponses.legal_name": dir }
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
  return docToDetail(doc);
}

export class InvalidApplicantUpdateError extends Error {}

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
  const updatedAt = new Date().toISOString();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...patchValue, updatedBy, updatedAt } },
    { returnDocument: "after" },
  );
  if (!result.value) return null;
  return docToDetail(result.value);
}

/** Full, unfiltered cursor for streaming CSV export — never buffer into an array. */
export async function getApplicantCursor(): Promise<FindCursor<ApplicantDoc>> {
  const col = await applicantCollection();
  return col.find({}).sort({ _id: 1 });
}

// Indexes for this collection are managed in scripts/setup-indexes.ts.
// Run `yarn setup-indexes` (or `yarn seed`) when provisioning a new environment.
