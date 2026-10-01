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
import type { BreakdownEntry } from "@/lib/stats/types";

import { ChartEmpty } from "./ChartEmpty";
import { TooltipRow } from "./TooltipRow";

interface StatusBreakdownChartProps {
  entries: BreakdownEntry[];
  title: string;
  emptyMessage: string;
}

// colors assigned positionally from brand palette
const PALETTE = [
  colors.green,
  colors.torchlightOrange,
  colors.teal,
  colors.firecrackerRed,
  colors.grapePurple,
  colors.skyBlue,
  colors.heather,
];

export function StatusBreakdownChart({
  entries,
  title,
  emptyMessage,
}: StatusBreakdownChartProps): JSX.Element {
  const total = entries.reduce((sum, e) => sum + e.count, 0);

  const rows = entries.map((e, i) => ({
    ...e,
    label: e.status.replace("-", " "),
    fill: PALETTE[i % PALETTE.length],
    pct: total ? Math.round((e.count / total) * 100) : 0,
  }));

  const config = rows.reduce<ChartConfig>((acc, r) => {
    acc[r.status] = { label: r.label, color: r.fill };
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <ChartEmpty message={emptyMessage} />
        ) : (
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
                        const { fill, label, pct } = payload as unknown as {
                          fill: string;
                          label: string;
                          pct: number;
                        };
                        return (
                          <TooltipRow
                            color={fill}
                            label={label}
                            value={`${Number(value).toLocaleString()} (${pct}%)`}
                          />
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
                  <span className="capitalize">{row.label}</span>
                  <span className="ml-auto pl-4 tabular-nums">
                    {row.count.toLocaleString()} ({row.pct}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
