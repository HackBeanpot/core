/* eslint-disable no-console -- CLI script; console output is intentional. */
/**
 * Create the Mongo collections/indexes required by the applicant list endpoint.
 * Idempotent: createIndex is a no-op when an index already exists, and collection
 * creation is skipped if the collection already exists.
 *
 * Usage (from apps/app-portal, or `yarn workspace app-portal setup-indexes`):
 *   yarn setup-indexes
 *
 * Reads MONGO_PROD_CONNECTION_STRING from .env (loaded via
 * `node --env-file=.env`) — this always points at the shared Atlas cluster.
 * Outside production (NODE_ENV !== "production"), the collection resolves to
 * `applicant_data_test` instead of the real `applicant_data`; see
 * resolveCollectionName in src/lib/db.ts. Run with NODE_ENV=production set to
 * target the real collection when provisioning a new deployment.
 *
 * Required indexes:
 *  applicant_data:
 *   { applicationStatus: 1 }   — equality filter (?status=)
 *   { decisionStatus: 1 }      — equality filter (?decision=)
 *   { rsvpStatus: 1 }          — equality filter (?rsvp=)
 *   { appSubmissionTime: -1 }  — default sort (desc)
 *   { email: 1 }               — email sort and exact lookups
 *  uploads:
 *   { userId: 1 }              - "all this user's uploads" lookup
 */
import type { Collection } from "mongodb";

import { getDb, resolveCollectionName } from "@/lib/db";

const APPLICANT_COLLECTION = resolveCollectionName("applicant_data");
const UPLOADS_COLLECTION = resolveCollectionName("uploads");

export async function ensureApplicantIndexes(col: Collection): Promise<void> {
  await Promise.all([
    col.createIndex({ applicationStatus: 1 }),
    col.createIndex({ decisionStatus: 1 }),
    col.createIndex({ rsvpStatus: 1 }),
    col.createIndex({ appSubmissionTime: -1 }),
    col.createIndex({ email: 1 }),
  ]);
}

export async function ensureUploadsCollection(): Promise<void> {
  const db = await getDb();
  const existing = await db
    .listCollections({ name: UPLOADS_COLLECTION })
    .toArray();

  if (existing.length === 0) {
    await db.createCollection(UPLOADS_COLLECTION);
    console.log(`Created collection ${UPLOADS_COLLECTION}.`);
  } else {
    console.log(`Collection ${UPLOADS_COLLECTION} already exists.`);
  }
}

export async function ensureUploadIndexes(col: Collection): Promise<void> {
  await col.createIndex({ userId: 1 });
}

async function main() {
  const db = await getDb();
  const col = db.collection(APPLICANT_COLLECTION);

  await ensureApplicantIndexes(col);
  await ensureUploadsCollection();
  await ensureUploadIndexes(db.collection(UPLOADS_COLLECTION));

  console.log(
    `Indexes ensured on ${APPLICANT_COLLECTION} and ${UPLOADS_COLLECTION}.`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
