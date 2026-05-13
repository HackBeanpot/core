"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type {
  DemographicsBreakdown,
  DemographicsDimension,
} from "@/lib/stats/types";

interface DemographicsChartProps {
  breakdown: DemographicsBreakdown;
  dimension?: DemographicsDimension;
}

// undos type camelCase to regular word format
function formatCamelCase(key: DemographicsDimension): string {
  const spaced = key.replace(/([A-Z])/g, " $1").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const config: ChartConfig = {
  count: {
    label: "Count",
    color: "#0f172a",
  },
};

export function DemographicsChart({
  breakdown,
  dimension = "school",
}: DemographicsChartProps): JSX.Element {
  const entries = breakdown[dimension];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatCamelCase(dimension)}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="aspect-video max-h-64 w-full"
        >
          <BarChart
            data={entries}
            margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
