/**
 * Integration tests for the applicant_data persistence layer.
 *
 * Run:
 *   yarn workspace app-portal test:db
 *
 * Requires MONGO_PROD_CONNECTION_STRING and MONGO_SERVER_DBNAME to be set
 * (already in .env.local for local dev).
 *
 * Note: these tests replicate the MongoDB operations from service.ts inline
 * because Node's built-in runner can't resolve TypeScript path aliases (@/).
 * What's under test is the database behavior the service relies on —
 * specifically upsert, $setOnInsert, and the no-downgrade invariant.
 */

import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { type Db, MongoClient } from "mongodb";
import { config } from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";

import type { ApplicationResponses } from "./types.js";

// Load .env and .env.local relative to apps/app-portal
const dir = resolve(fileURLToPath(import.meta.url), "../../../../");
config({ path: resolve(dir, ".env") });
config({ path: resolve(dir, ".env.local"), override: true });

const COLLECTION = "applicant_data";
// Unique per run so parallel runs don't collide and leftover data is identifiable
const TEST_USER = `test-unit-${Date.now()}`;

let client: MongoClient;
let db: Db;

before(async () => {
  const uri = process.env.MONGO_PROD_CONNECTION_STRING;
  const dbName = process.env.MONGO_SERVER_DBNAME;
  if (!uri) throw new Error("MONGO_PROD_CONNECTION_STRING is not set");
  if (!dbName) throw new Error("MONGO_SERVER_DBNAME is not set");
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
});

after(async () => {
  await db.collection(COLLECTION).deleteOne({ userId: TEST_USER });
  await client.close();
});

// ─── Test 1 ──────────────────────────────────────────────────────────────────
// getDraft returns null when no document exists for a user.

test("getDraft returns null when no document exists", async () => {
  const doc = await db.collection(COLLECTION).findOne({ userId: TEST_USER });
  assert.strictEqual(doc, null);
});

// ─── Test 2 ──────────────────────────────────────────────────────────────────
// saveDraft + getDraft round-trip: reading back what was written.

test("saveDraft persists responses and getDraft reads them back", async () => {
  const responses: ApplicationResponses = {
    first_name: "Ada",
    last_name: "Lovelace",
    school: "Northeastern",
  };
  const now = new Date();

  // Mirrors the updateOne in saveDraft()
  await db.collection(COLLECTION).updateOne(
    { userId: TEST_USER },
    {
      $set: { applicationResponses: responses, lastSavedAt: now },
      $setOnInsert: {
        userId: TEST_USER,
        applicationStatus: "in-progress",
        appSubmissionTime: null,
      },
    },
    { upsert: true },
  );

  // Mirrors getDraft()
  const doc = await db.collection(COLLECTION).findOne({ userId: TEST_USER });
  assert.ok(doc !== null, "document should exist after save");
  assert.deepStrictEqual(doc.applicationResponses, responses);
  assert.strictEqual(doc.applicationStatus, "in-progress");
  assert.ok(doc.lastSavedAt instanceof Date, "lastSavedAt should be a Date");
});

// ─── Test 3 ──────────────────────────────────────────────────────────────────
// saveDraft must not downgrade applicationStatus from 'submitted' to 'in-progress'.

test("saveDraft does not downgrade submitted status to in-progress", async () => {
  // Simulate an application that was already submitted
  await db.collection(COLLECTION).updateOne(
    { userId: TEST_USER },
    { $set: { applicationStatus: "submitted" } },
  );

  // Simulate a subsequent autosave (e.g. user opened the read-only view
  // and the form still fired a save)
  const laterResponses: ApplicationResponses = { first_name: "Updated" };
  await db.collection(COLLECTION).updateOne(
    { userId: TEST_USER },
    {
      $set: { applicationResponses: laterResponses, lastSavedAt: new Date() },
      $setOnInsert: {
        userId: TEST_USER,
        applicationStatus: "in-progress",
        appSubmissionTime: null,
      },
    },
    { upsert: true },
  );

  const doc = await db.collection(COLLECTION).findOne({ userId: TEST_USER });
  assert.strictEqual(
    doc.applicationStatus,
    "submitted",
    "a draft save must not overwrite submitted status",
  );
  // Responses and timestamp should still update — only the status is protected
  assert.deepStrictEqual(doc.applicationResponses, laterResponses);
});
