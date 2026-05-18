"use client";

import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { TimelinePoint } from "@/lib/stats/types";

interface SubmissionTimelineProps {
  timeline: TimelinePoint[];
}

const config: ChartConfig = {
  submissions: {
    label: "Submissions",
    color: "#0f172a",
  },
};

export function SubmissionTimeline({
  timeline,
}: SubmissionTimelineProps): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions Over Time</CardTitle>
      </CardHeader>
      <CardContent>
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
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="submissions"
              stroke="var(--color-submissions)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
