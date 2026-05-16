import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatMetric } from "@/lib/stats/types";

// single metric tile (label, value, delta)
interface StatCardProps {
  metric: StatMetric;
}

export function StatCard({ metric }: StatCardProps): JSX.Element {
  const { label, value, delta } = metric;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-neutral-500">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="flex items-baseline gap-2" // big + small num = baseline
        >
          <span className="text-3xl font-semibold tracking-tight">
            {value.toLocaleString()}
          </span>
          <span
            className={`text-xs font-medium ${delta < 0 ? "text-red-600" : "text-emerald-600"}`}
          >
            {
              // sign prefix for non zero nums
              delta.toLocaleString(undefined, { signDisplay: "exceptZero" })
            }
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
