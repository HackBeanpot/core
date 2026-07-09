import React from "react";

import type { StatsPayload } from "@/lib/stats/types";

import { DemographicsChart } from "./DemographicsChart";
import { RefreshBar } from "./RefreshBar";
import { StatCard } from "./StatCard";
import { StatusBreakdownChart } from "./StatusBreakdownChart";
import { SubmissionTimeline } from "./SubmissionTimeline";

interface StatsDashboardProps {
  payload: StatsPayload;
  generatedAt: string;
}

export function StatsDashboard({
  payload,
  generatedAt,
}: StatsDashboardProps): JSX.Element {
  return (
    <div className="flex flex-col gap-8 p-6">
      <header className="flex items-baseline gap-4 justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Stats Dashboard
        </h1>
        <RefreshBar generatedAt={generatedAt} />
      </header>

      <section className="grid grid-cols-4 gap-4 tablet:grid-cols-2 mobile-xl:grid-cols-2 mobile:grid-cols-2">
        {payload.metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-2 gap-4 mobile:grid-cols-1 mobile-xl:grid-cols-1">
        <StatusBreakdownChart breakdown={payload.statusBreakdown} />
        <DemographicsChart breakdown={payload.demographics} />
        <div className="col-span-2">
          <SubmissionTimeline timeline={payload.timeline} />
        </div>
      </section>
    </div>
  );
}
