import type { Document } from "mongodb";

import type { DemographicsDimension } from "./types";

type StatusField = "applicationStatus" | "decisionStatus" | "rsvpStatus";

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

export const topLevelCountsPipeline: Document[] = [
  {
    $facet: {
      totalApplications: [{ $count: "count" }],
      submitted: [
        { $match: lowerEq("applicationStatus", "submitted") },
        { $count: "count" },
      ],
      admitted: [
        { $match: lowerEq("decisionStatus", "admitted") },
        { $count: "count" },
      ],
      confirmed: [
        { $match: lowerEq("rsvpStatus", "confirmed") },
        { $count: "count" },
      ],
    },
  },
];
