import { getDb } from "@/lib/db";
import { getFormConfig } from "@/lib/admin/form-config-service";
import type { FormSection } from "@/lib/application/types";

import {
  getDecisionBreakdown,
  getDemographics,
  getRsvpBreakdown,
  getStatusBreakdown,
  getTimeline,
  getTotals,
} from "./aggregations";
import type { DemographicsBreakdown, StatsPayload } from "./types";

const CACHE_TTL_MS = 60_000;

// getDemographics groups by the raw stored value (e.g. "black_or_african_american",
// "1st_year") — the option's `value` slug, not its display `label`. Map each dimension's
// entries through the live form config's option list so the dashboard shows the same
// friendly text applicants actually saw ("Black or African American", "1st year")
// instead of the slug. Falls back to the raw value for anything with no matching
// option (free-text dimensions like "major", or a value from a since-removed option).
export function resolveDemographicsLabels(
  demographics: DemographicsBreakdown,
  sections: FormSection[],
): DemographicsBreakdown {
  const optionLabelsByQuestionId = new Map<string, Map<string, string>>();
  for (const section of sections) {
    for (const question of section.questions) {
      if (!question.options) continue;
      optionLabelsByQuestionId.set(
        question.id,
        new Map(question.options.map((o) => [o.value, o.label])),
      );
    }
  }

  const resolved = {} as DemographicsBreakdown;
  for (const dimension of Object.keys(demographics) as Array<
    keyof DemographicsBreakdown
  >) {
    const optionLabels = optionLabelsByQuestionId.get(dimension);
    resolved[dimension] = demographics[dimension].map((entry) => ({
      ...entry,
      label: optionLabels?.get(entry.label) ?? entry.label,
    }));
  }
  return resolved;
}

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
    rawDemographics,
    timeline,
    formConfig,
  ] = await Promise.all([
    getTotals(db),
    getStatusBreakdown(db),
    getDecisionBreakdown(db),
    getRsvpBreakdown(db),
    getDemographics(db),
    getTimeline(db),
    getFormConfig(),
  ]);

  const demographics = resolveDemographicsLabels(
    rawDemographics,
    formConfig.sections,
  );

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
