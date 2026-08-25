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

const DIMENSION_LABELS: Record<DemographicsDimension, string> = {
  school: "School",
  education_year: "Year of Education",
  major: "Major",
  gender: "Gender",
  race: "Race",
  tshirt_size: "Shirt Size",
  hackathon_experience: "Hackathons Attended",
  cs_classes: "CS Classes Taken",
};

function formatDimension(key: DemographicsDimension): string {
  return DIMENSION_LABELS[key];
}

const config: ChartConfig = {
  count: {
    label: "Count",
    color: colors.grapePurple,
  },
};

const EMPTY_MESSAGE = "No data yet";

const MAX_LABEL_LENGTH = 14;

// truncates a long label with an ellipsis so rotated ticks don't overlap
function truncateLabel(label: string): string {
  if (label.length <= MAX_LABEL_LENGTH) return label;
  return `${label.slice(0, MAX_LABEL_LENGTH - 1)}…`;
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
          <ChartContainer config={config} className="aspect-[2] w-full">
            <BarChart
              data={entries}
              barCategoryGap={8}
              margin={{ left: 8, right: 24, top: 8, bottom: 16 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                interval={0}
                height={72}
                tickMargin={8}
                tick={({ x, y, payload }) => (
                  <text
                    x={x}
                    y={y}
                    dy={8}
                    textAnchor="end"
                    fontSize={12}
                    fill="currentColor"
                    transform={`rotate(-35, ${x}, ${y})`}
                  >
                    {truncateLabel(String(payload.value ?? ""))}
                  </text>
                )}
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
