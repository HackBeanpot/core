"use client";

import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { colors } from "@repo/tailwind-config/tokens";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { TimelinePoint } from "@/lib/stats/types";

import { ChartEmpty } from "./ChartEmpty";
import { TooltipRow } from "./TooltipRow";

interface SubmissionTimelineProps {
  timeline: TimelinePoint[];
}

const config: ChartConfig = {
  count: {
    label: "Submissions",
    color: colors.green,
  },
};

const EMPTY_MESSAGE = "No submissions yet";

// formats an ISO date string (yyyy-mm-dd) as mm-dd-yy
function formatDateTooltip(date: string): string {
  const [year, month, day] = date.split("-");
  return `${month}-${day}-${year.slice(2)}`;
}

export function SubmissionTimeline({
  timeline,
}: SubmissionTimelineProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        {timeline.length === 0 ? (
          <ChartEmpty message={EMPTY_MESSAGE} />
        ) : (
          <ChartContainer
            config={config}
            className="aspect-video max-h-64 w-full"
          >
            <LineChart
              data={timeline}
              margin={{ left: 0, right: 8, top: 8, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(d) => d.slice(5)}
              />
              <YAxis tickLine={false} axisLine={false} width={32} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => formatDateTooltip(String(label))}
                    formatter={(value, name) => (
                      <TooltipRow
                        label={config[name as string]?.label ?? name}
                        value={Number(value).toLocaleString()}
                      />
                    )}
                  />
                }
              />
              <Line
                dataKey="count"
                stroke="var(--color-count)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
