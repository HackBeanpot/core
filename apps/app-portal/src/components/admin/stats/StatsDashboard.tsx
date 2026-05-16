import React from "react";

import type { StatsPayload } from "@/lib/stats/types";

import { DemographicsChart } from "./DemographicsChart";
import { StatCard } from "./StatCard";
import { StatusBreakdownChart } from "./StatusBreakdownChart";
import { SubmissionTimeline } from "./SubmissionTimeline";

interface StatsDashboardProps {
  payload: StatsPayload;
}

export function StatsDashboard({ payload }: StatsDashboardProps): JSX.Element {
  return (
    <div className="flex flex-col gap-8 p-6">
      <header className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Stats Dashboard
        </h1>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {payload.metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatusBreakdownChart breakdown={payload.statusBreakdown} />
        <DemographicsChart breakdown={payload.demographics} />
        <SubmissionTimeline timeline={payload.timeline} />
      </section>
    </div>
  );
}
