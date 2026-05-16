"use client";

import React from "react";
import { Cell, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { StatusBreakdown, StatusKind } from "@/lib/stats/types";

interface StatusBreakdownChartProps {
  breakdown: StatusBreakdown;
  kind?: StatusKind;
}

const TITLES: Record<StatusKind, string> = {
  application: "Applications by Status",
  decision: "Decisions by Status",
  rsvp: "RSVPs by Status",
};

const STATUS_COLORS: Record<string, string> = {
  "not-started": "#94a3b8",
  incomplete: "#cbd5e1",
  submitted: "#0f172a",
};

export function StatusBreakdownChart({
  breakdown,
  kind = "application",
}: StatusBreakdownChartProps): JSX.Element {
  const entries = breakdown[kind];

  const config = entries.reduce<ChartConfig>((acc, e) => {
    acc[e.status] = {
      label: e.status.replace("-", " "),
      color: STATUS_COLORS[e.status] ?? "#94a3b8",
    };
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{TITLES[kind]}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-64"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="status" />} />
            <Pie
              data={entries}
              dataKey="count"
              nameKey="status"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {entries.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={`var(--color-${entry.status})`}
                />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="status" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
