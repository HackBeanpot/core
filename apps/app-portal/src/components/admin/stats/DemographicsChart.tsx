"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@repo/tailwind-config/tokens";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEMOGRAPHICS_DIMENSIONS,
  type DemographicsBreakdown,
  type DemographicsDimension,
} from "@/lib/stats/types";

import { ChartEmpty } from "./ChartEmpty";
import { TooltipRow } from "./TooltipRow";

interface DemographicsChartProps {
  breakdown: DemographicsBreakdown;
  dimension?: DemographicsDimension;
}

// turns a snake_case dimension key into a readable label
function formatDimension(key: DemographicsDimension): string {
  const spaced = key.replace(/_/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const config: ChartConfig = {
  count: {
    label: "Count",
    color: colors.grapePurple,
  },
};

const EMPTY_MESSAGE = "No data yet";

// splits a long label into two balanced lines on a word boundary
function splitLabel(label: string): [string, string?] {
  const words = label.split(" ");
  if (words.length < 2) return [label];

  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export function DemographicsChart({
  breakdown,
  dimension = "school",
}: DemographicsChartProps): JSX.Element {
  const [selected, setSelected] =
    React.useState<DemographicsDimension>(dimension);
  const entries = breakdown[selected];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle>Demographics</CardTitle>
        <Select
          value={selected}
          onValueChange={(value) => setSelected(value as DemographicsDimension)}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DEMOGRAPHICS_DIMENSIONS.map((dimension) => (
              <SelectItem key={dimension} value={dimension}>
                {formatDimension(dimension)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <ChartEmpty message={EMPTY_MESSAGE} />
        ) : (
          <ChartContainer
            config={config}
            className="aspect-[2] w-full"
          >
            <BarChart
              data={entries}
              barCategoryGap={8}
              margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                interval={0}
                height={48}
                tickMargin={8}
                tick={({ x, y, payload }) => {
                  const [line1, line2] = splitLabel(
                    String(payload.value ?? ""),
                  );
                  return (
                    <text
                      x={x}
                      y={y}
                      dy={12}
                      textAnchor="middle"
                      fontSize={12}
                      fill="currentColor"
                    >
                      <tspan x={x}>{line1}</tspan>
                      {line2 ? (
                        <tspan x={x} dy={14}>
                          {line2}
                        </tspan>
                      ) : null}
                    </text>
                  );
                }}
              />
              <YAxis tickLine={false} axisLine={false} width={32} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <TooltipRow
                        label={config[name as string]?.label ?? name}
                        value={Number(value).toLocaleString()}
                      />
                    )}
                  />
                }
              />
              <Bar
                dataKey="count"
                fill="var(--color-count)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
