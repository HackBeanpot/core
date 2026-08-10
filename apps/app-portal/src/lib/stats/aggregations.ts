import type { Db, Document } from "mongodb";

import { resolveCollectionName } from "@/lib/db";

import {
  DEMOGRAPHICS_DIMENSIONS,
  type BreakdownEntry,
  type DemographicsBreakdown,
  type StatsTotals,
  type TimelinePoint,
  type DemographicsDimension,
} from "./types";

type StatusField = "applicationStatus" | "decisionStatus" | "rsvpStatus";

const APPLICANT_COLLECTION = resolveCollectionName("applicant_data");

export function statusBreakdownPipeline(field: StatusField): Document[] {
  return [
    { $match: { [field]: { $exists: true, $ne: null } } },
    {
      $group: {
        _id: { $toLower: `$${field}` },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, status: "$_id", count: 1 } },
    { $sort: { status: 1 } },
  ];
}

export function demographicsBreakdownPipeline(
  dimension: DemographicsDimension,
): Document[] {
  const path = `applicationResponses.${dimension}`;
  return [
    { $match: { [path]: { $exists: true, $nin: [null, ""] } } },
    { $unwind: `$${path}` },
    { $match: { [path]: { $nin: [null, ""] } } },
    { $group: { _id: `$${path}`, count: { $sum: 1 } } },
    { $project: { _id: 0, label: "$_id", count: 1 } },
    { $sort: { count: -1 } },
  ];
}

export const submissionTimelinePipeline: Document[] = [
  { $match: { appSubmissionTime: { $exists: true, $ne: null } } },
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: { $toDate: "$appSubmissionTime" },
        },
      },
      submissions: { $sum: 1 },
    },
  },
  { $project: { _id: 0, date: "$_id", submissions: 1 } },
  { $sort: { date: 1 } },
];

const lowerEq = (field: string, value: string): Document => ({
  $expr: { $eq: [{ $toLower: `$${field}` }, value] },
});

export async function getTotals(db: Db): Promise<StatsTotals> {
  const col = db.collection(APPLICANT_COLLECTION);
  const [
    applicants,
    submitted,
    admitted,
    waitlisted,
    declined,
    rsvpYes,
    rsvpNo,
    rsvpUnconfirmed,
  ] = await Promise.all([
    col.countDocuments({}),
    col.countDocuments({ applicationStatus: "Submitted" }),
    col.countDocuments({ decisionStatus: "Admitted" }),
    col.countDocuments({ decisionStatus: "Waitlisted" }),
    col.countDocuments({ decisionStatus: "Declined" }),
    col.countDocuments({ rsvpStatus: "Confirmed" }),
    col.countDocuments({ rsvpStatus: "Not Attending" }),
    col.countDocuments({ rsvpStatus: "Unconfirmed" }),
  ]);
  return {
    applicants,
    submitted,
    admitted,
    waitlisted,
    declined,
    rsvpYes,
    rsvpNo,
    rsvpUnconfirmed,
  };
}

export async function getStatusBreakdown(db: Db): Promise<BreakdownEntry[]> {
  const col = db.collection(APPLICANT_COLLECTION);
  return col
    .aggregate<BreakdownEntry>(statusBreakdownPipeline("applicationStatus"))
    .toArray();
}

export async function getDecisionBreakdown(db: Db): Promise<BreakdownEntry[]> {
  const col = db.collection(APPLICANT_COLLECTION);
  const pipeline = [
    { $match: { applicationStatus: "Submitted" } },
    ...statusBreakdownPipeline("decisionStatus"),
  ];
  return col.aggregate<BreakdownEntry>(pipeline).toArray();
}

export async function getRsvpBreakdown(db: Db): Promise<BreakdownEntry[]> {
  const col = db.collection(APPLICANT_COLLECTION);
  const pipeline = [
    { $match: lowerEq("decisionStatus", "admitted") },
    ...statusBreakdownPipeline("rsvpStatus"),
  ];
  return col.aggregate<BreakdownEntry>(pipeline).toArray();
}

export async function getDemographics(db: Db): Promise<DemographicsBreakdown> {
  const col = db.collection(APPLICANT_COLLECTION);
  const entries = await Promise.all(
    DEMOGRAPHICS_DIMENSIONS.map(async (dimension) => {
      const rows = await col
        .aggregate<{
          label: string;
          count: number;
        }>(demographicsBreakdownPipeline(dimension))
        .toArray();
      return [dimension, rows] as const;
    }),
  );
  return Object.fromEntries(entries) as DemographicsBreakdown;
}

export async function getTimeline(
  db: Db,
  days?: number,
): Promise<TimelinePoint[]> {
  const col = db.collection(APPLICANT_COLLECTION);
  const match: Document = { appSubmissionTime: { $exists: true, $ne: null } };
  if (days !== undefined) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    match.appSubmissionTime.$gte = since;
  }
  const pipeline = [{ $match: match }, ...submissionTimelinePipeline.slice(1)];
  const rows = await col
    .aggregate<{ date: string; submissions: number }>(pipeline)
    .toArray();
  return rows.map(({ date, submissions }) => ({ date, count: submissions }));
}
