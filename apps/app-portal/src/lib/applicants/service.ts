import { Collection, ObjectId } from "mongodb";

import { getDb, resolveCollectionName } from "@/lib/db";
import type { ApplicationResponse } from "@/lib/types/application";

import { buildApplicantQuery } from "./queries";
import type {
  ApplicantDetail,
  ApplicantDoc,
  ApplicantListParams,
  ApplicantListResult,
  ApplicantSummary,
  ApplicantUpdate,
} from "./types";

const APPLICANT_COLLECTION = resolveCollectionName("applicant_data");

async function applicantCollection(): Promise<Collection<ApplicantDoc>> {
  const db = await getDb();
  return db.collection<ApplicantDoc>(APPLICANT_COLLECTION);
}

function fullName(responses?: ApplicationResponse): string | undefined {
  const first = responses?.["firstName"];
  const last = responses?.["lastName"];
  const parts = [first, last].filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );
  return parts.length ? parts.join(" ") : undefined;
}

function docToSummary(doc: ApplicantDoc): ApplicantSummary {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: fullName(doc.applicationResponses),
    applicationStatus: doc.applicationStatus,
    decisionStatus: doc.decisionStatus,
    rsvpStatus: doc.rsvpStatus,
    appSubmissionTime: doc.appSubmissionTime,
    lastSavedAt: doc.lastSavedAt,
  };
}

export async function listApplicants(
  params: ApplicantListParams,
): Promise<ApplicantListResult> {
  const { filters, sortBy, sortDir, page, pageSize } = params;
  const col = await applicantCollection();
  const filter = buildApplicantQuery(filters);
  const dir = sortDir === "asc" ? 1 : -1;
  // `name` is derived from first/last name fields, so sort on those.
  const sort: Record<string, 1 | -1> =
    sortBy === "name"
      ? {
          "applicationResponses.firstName": dir,
          "applicationResponses.lastName": dir,
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
  return {
    ...docToSummary(doc),
    applicationResponses: doc.applicationResponses,
    postAcceptanceResponses: doc.postAcceptanceResponses,
    rsvpSubmissionTime: doc.rsvpSubmissionTime,
  };
}

// TODO: persist decision/RSVP updates to Mongo (separate ticket — writes).
export async function updateApplicant(
  id: string,
  update: ApplicantUpdate,
): Promise<ApplicantDetail> {
  throw new Error(
    `Not implemented: updateApplicant(${id}, ${JSON.stringify(update)})`,
  );
}

// Indexes for this collection are managed in scripts/setup-indexes.ts.
// Run `yarn setup-indexes` (or `yarn seed`) when provisioning a new environment.
