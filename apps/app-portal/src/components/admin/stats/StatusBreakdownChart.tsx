"use client";

import React from "react";
import { Pie, PieChart } from "recharts";

import { colors } from "@repo/tailwind-config/tokens";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
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

// colors assigned positionally from brand palette
const PALETTE = [
  colors.green,
  colors.torchlightOrange,
  colors.firecrackerRed,
  colors.teal,
  colors.grapePurple,
  colors.skyBlue,
];

export function StatusBreakdownChart({
  breakdown,
  kind = "application",
}: StatusBreakdownChartProps): JSX.Element {
  const entries = breakdown[kind];
  const total = entries.reduce((sum, e) => sum + e.count, 0);

  const rows = entries.map((e, i) => ({
    ...e,
    fill: PALETTE[i % PALETTE.length],
    pct: total ? Math.round((e.count / total) * 100) : 0,
  }));

  const config = rows.reduce<ChartConfig>((acc, r) => {
    acc[r.status] = { label: r.status.replace("-", " "), color: r.fill };
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{TITLES[kind]}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <ChartContainer
            config={config}
            className="aspect-square h-48 w-48 shrink-0"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="status"
                    formatter={(value, _name, _item, _index, payload) => {
                      const { fill, pct } = payload as unknown as {
                        fill: string;
                        pct: number;
                      };
                      return (
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                            style={{ backgroundColor: fill }}
                          />
                          <span className="font-mono font-medium tabular-nums">
                            {Number(value).toLocaleString()} ({pct}%)
                          </span>
                        </div>
                      );
                    }}
                  />
                }
              />
              <Pie
                data={rows}
                dataKey="count"
                nameKey="status"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              />
            </PieChart>
          </ChartContainer>

          <ul className="flex w-full flex-col gap-2 text-sm sm:w-auto">
            {rows.map((row) => (
              <li key={row.status} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-sm"
                  style={{ backgroundColor: row.fill }}
                />
                <span className="capitalize">
                  {row.status.replace("-", " ")}
                </span>
                <span className="ml-auto pl-4 tabular-nums">
                  {row.count.toLocaleString()} ({row.pct}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
