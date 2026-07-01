/* eslint-disable no-console -- CLI script; console output is intentional. */
/**
 * Create the Mongo indexes required by the applicant list endpoint.
 * Idempotent: createIndex is a no-op when an index already exists.
 *
 * Usage (from apps/app-portal, or `yarn workspace app-portal setup-indexes`):
 *   yarn db-up                 # if targeting local dev Mongo
 *   yarn setup-indexes
 *
 * Reads connection config from .env (loaded via `node --env-file=.env`).
 * Works against both the local Docker Mongo and prod Atlas.
 *
 * Required indexes on `applicant_data`:
 *   { applicationStatus: 1 }   — equality filter (?status=)
 *   { decisionStatus: 1 }      — equality filter (?decision=)
 *   { rsvpStatus: 1 }          — equality filter (?rsvp=)
 *   { appSubmissionTime: -1 }  — default sort (desc)
 *   { email: 1 }               — email sort and exact lookups
 */
import type { Collection } from "mongodb";

import { getDb } from "@/lib/db";

const COLLECTION = "applicant_data";

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
