/* eslint-disable no-console -- CLI script; console output is intentional. */
/**
 * Create the Mongo indexes required by the applicant list endpoint.
 * Idempotent: createIndex is a no-op when an index already exists.
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
 *   { applicationStatus: 1 }   — equality filter (?status=)
 *   { decisionStatus: 1 }      — equality filter (?decision=)
 *   { rsvpStatus: 1 }          — equality filter (?rsvp=)
 *   { appSubmissionTime: -1 }  — default sort (desc)
 *   { email: 1 }               — email sort and exact lookups
 */
import type { Collection } from "mongodb";

import { getDb, resolveCollectionName } from "@/lib/db";

const COLLECTION = resolveCollectionName("applicant_data");

export async function ensureApplicantIndexes(col: Collection): Promise<void> {
  await Promise.all([
    col.createIndex({ applicationStatus: 1 }),
    col.createIndex({ decisionStatus: 1 }),
    col.createIndex({ rsvpStatus: 1 }),
    col.createIndex({ appSubmissionTime: -1 }),
    col.createIndex({ email: 1 }),
  ]);
}

async function main() {
  const db = await getDb();
  const col = db.collection(COLLECTION);
  await ensureApplicantIndexes(col);
  console.log(`Indexes ensured on ${COLLECTION}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
