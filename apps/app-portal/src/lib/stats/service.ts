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

const CACHE_TTL_MS = 60_000;

// In-memory cache, per server process only. Fine at this scale (single instance,
// admin-only traffic); won't stay in sync across multiple instances/replicas.
let cache: { result: StatsPayload; timestamp: number } | null = null;

export async function getStats(): Promise<StatsPayload> {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL_MS) {
    return cache.result;
  }

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

  const result: StatsPayload = {
    metrics,
    totals,
    statusBreakdown,
    decisionBreakdown,
    rsvpBreakdown,
    demographics,
    timeline,
    generatedAt: new Date().toISOString(),
  };

  cache = { result, timestamp: Date.now() };
  return result;
}
