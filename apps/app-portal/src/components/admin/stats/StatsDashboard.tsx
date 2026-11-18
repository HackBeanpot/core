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

      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {payload.metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatusBreakdownChart
          entries={payload.statusBreakdown}
          title="Applications by Status"
          emptyMessage="No applications yet"
        />
        <StatusBreakdownChart
          entries={payload.decisionBreakdown}
          title="Decisions by Status"
          emptyMessage="No decisions yet"
        />
        <StatusBreakdownChart
          entries={payload.rsvpBreakdown}
          title="RSVPs by Status"
          emptyMessage="No RSVPs yet"
        />
        <DemographicsChart breakdown={payload.demographics} />
        <div className="col-span-2">
          <SubmissionTimeline timeline={payload.timeline} />
        </div>
      </section>
    </div>
  );
}
