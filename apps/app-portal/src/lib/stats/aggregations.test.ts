import { MongoClient } from "mongodb";
import type { Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

import {
  getDecisionBreakdown,
  getDemographics,
  getRsvpBreakdown,
  getStatusBreakdown,
  getTimeline,
  getTotals,
} from "./aggregations";

// NODE_ENV in jest defaults to "test", so resolveCollectionName() picks the
// "_test" suffixed collection name.
const COLLECTION_NAME = "applicant_data_test";

// Canonical lowercase-hyphenated casing — matches the real enums in lib/types/user.ts and
// the values every actual write path (submit(), admin decision/RSVP edits, saveRsvp()) is
// restricted to via zod z.enum(...). A previous version of this fixture used
// capitalized/space-separated values ("Submitted", "Not Attending") that no real write path
// can ever produce — that happened to make the aggregations bug (matching those same wrong
// literals) look like it passed, without actually exercising real-world data shapes. One
// record below keeps mixed casing (see #2) specifically to prove getTotals/getDecisionBreakdown
// are still case-insensitive, not just literal-matching the canonical casing.
const APPLICANTS = [
  // 1: not-started, no decision/rsvp, no submission
  { applicationStatus: "not-started" },
  // 2 — mixed casing, to prove case-insensitivity rather than just canonical-casing matching
  {
    applicationStatus: "Submitted",
    decisionStatus: "Admitted",
    rsvpStatus: "Confirmed",
    appSubmissionTime: "2024-01-01T00:00:00.000Z",
    applicationResponses: { school: "NEU" },
  },
  // 3
  {
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2024-01-02T00:00:00.000Z",
    applicationResponses: { school: "NEU" },
  },
  // 4 — includes a multi_select ("race") field to exercise the $unwind path for the
  // now-corrected demographics dimension name (was "races", doesn't exist on real docs)
  {
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "not-attending",
    appSubmissionTime: "2024-01-02T00:00:00.000Z",
    applicationResponses: { school: "BU", race: ["white", "asian"] },
  },
  // 5
  {
    applicationStatus: "submitted",
    decisionStatus: "waitlisted",
    appSubmissionTime: "2024-01-03T00:00:00.000Z",
    applicationResponses: { school: "BU" },
  },
  // 6
  {
    applicationStatus: "submitted",
    decisionStatus: "declined",
    appSubmissionTime: "2024-01-03T00:00:00.000Z",
    applicationResponses: { school: "MIT" },
  },
  // 7
  {
    applicationStatus: "submitted",
    decisionStatus: "declined",
    appSubmissionTime: "2024-01-04T00:00:00.000Z",
    applicationResponses: { school: "MIT" },
  },
  // 8
  {
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2024-01-04T00:00:00.000Z",
    applicationResponses: { school: "NEU" },
  },
  // 9: in-progress, no decision/rsvp, no submission
  { applicationStatus: "in-progress" },
  // 10
  {
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2024-01-05T00:00:00.000Z",
    applicationResponses: { school: "BU" },
  },
];

let mongod: MongoMemoryServer;
let client: MongoClient;
let db: Db;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  client = await MongoClient.connect(mongod.getUri());
  db = client.db("stats_test");
  await db.collection(COLLECTION_NAME).insertMany(APPLICANTS);
});

afterAll(async () => {
  await client.close();
  await mongod.stop();
});

const byLabel = <T extends { label?: string; status?: string }>(
  rows: T[],
): T[] =>
  [...rows].sort((a, b) =>
    (a.label ?? a.status ?? "").localeCompare(b.label ?? b.status ?? ""),
  );

describe("getTotals", () => {
  it("computes counts across all fields", async () => {
    expect(await getTotals(db)).toEqual({
      applicants: 10,
      submitted: 8,
      admitted: 5,
      waitlisted: 1,
      declined: 2,
      rsvpYes: 3,
      rsvpNo: 1,
      rsvpUnconfirmed: 1,
    });
  });
});

describe("getStatusBreakdown", () => {
  it("groups by applicationStatus", async () => {
    expect(await getStatusBreakdown(db)).toEqual([
      { status: "in-progress", count: 1 },
      { status: "not-started", count: 1 },
      { status: "submitted", count: 8 },
    ]);
  });
});

describe("getDecisionBreakdown", () => {
  it("groups decisionStatus among submitted applicants", async () => {
    expect(await getDecisionBreakdown(db)).toEqual([
      { status: "admitted", count: 5 },
      { status: "declined", count: 2 },
      { status: "waitlisted", count: 1 },
    ]);
  });
});

describe("getRsvpBreakdown", () => {
  it("groups rsvpStatus among admitted applicants", async () => {
    expect(await getRsvpBreakdown(db)).toEqual([
      { status: "confirmed", count: 3 },
      { status: "not-attending", count: 1 },
      { status: "unconfirmed", count: 1 },
    ]);
  });
});

describe("getTimeline", () => {
  it("groups submissions by day", async () => {
    expect(await getTimeline(db)).toEqual([
      { date: "2024-01-01", count: 1 },
      { date: "2024-01-02", count: 2 },
      { date: "2024-01-03", count: 2 },
      { date: "2024-01-04", count: 2 },
      { date: "2024-01-05", count: 1 },
    ]);
  });
});

describe("getDemographics", () => {
  it("groups the school dimension from applicationResponses", async () => {
    const demographics = await getDemographics(db);
    expect(byLabel(demographics.school)).toEqual([
      { label: "BU", count: 3 },
      { label: "MIT", count: 2 },
      { label: "NEU", count: 3 },
    ]);
  });

  it("returns no rows for dimensions with no data", async () => {
    const demographics = await getDemographics(db);
    expect(demographics.gender).toEqual([]);
  });

  it("unwinds the multi_select race dimension", async () => {
    const demographics = await getDemographics(db);
    expect(byLabel(demographics.race)).toEqual([
      { label: "asian", count: 1 },
      { label: "white", count: 1 },
    ]);
  });
});
