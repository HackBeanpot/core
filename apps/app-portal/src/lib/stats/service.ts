import { getDb } from "@/lib/db";

import {
  getDecisionBreakdown,
  getDemographics,
  getRsvpBreakdown,
  getStatusBreakdown,
  getTimeline,
  getTotals,
} from "./aggregations";
import type { StatsPayload } from "./types";

export async function getStats(): Promise<StatsPayload> {
  const db = await getDb();

  const [
    totals,
    statusBreakdown,
    decisionBreakdown,
    rsvpBreakdown,
    demographics,
    timeline,
  ] = await Promise.all([
    getTotals(db),
    getStatusBreakdown(db),
    getDecisionBreakdown(db),
    getRsvpBreakdown(db),
    getDemographics(db),
    getTimeline(db),
  ]);

  const metrics = [
    {
      label: "Total Applications",
      value: totals.applicants,
      delta: 0,
      description: "Everyone who has started their application.",
    },
    {
      label: "Submitted",
      value: totals.submitted,
      delta: 0,
      description: "Applications fully submitted and ready for review.",
    },
    {
      label: "Admitted",
      value: totals.admitted,
      delta: 0,
      description: "Applicants who have received an admit decision.",
    },
    {
      label: "RSVP'd",
      value: totals.rsvpYes,
      delta: 0,
      description: "Admitted applicants who have confirmed they'll attend.",
    },
  ];

  return {
    metrics,
    totals,
    statusBreakdown,
    decisionBreakdown,
    rsvpBreakdown,
    demographics,
    timeline,
    generatedAt: new Date().toISOString(),
  };
}
