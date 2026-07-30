import React from "react";
import { ArrowDown, ArrowUp, Info } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatMetric } from "@/lib/stats/types";

// single metric tile (big number, label, optional delta + definition tooltip)
interface StatCardProps {
  metric: StatMetric;
}

export function StatCard({ metric }: StatCardProps): JSX.Element {
  const { label, value, delta, description } = metric;
  const isNegative = delta < 0;
  const DeltaArrow = isNegative ? ArrowDown : ArrowUp;

  return (
    <Card>
      <CardContent className="!pt-10">
        {value === null ? (
          <span className="text-3xl font-semibold tracking-tight text-heather">
            —
          </span>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight">
              {value.toLocaleString()}
            </span>
            {delta !== 0 && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  isNegative ? "text-firecrackerRed" : "text-green",
                )}
              >
                <DeltaArrow className="h-3 w-3" />
                {Math.abs(delta).toLocaleString()} from yesterday
              </span>
            )}
          </div>
        )}

        <div className="mt-1 flex items-center gap-1 text-sm font-medium text-neutral-500">
          <span>{label}</span>
          {description && (
            <span title={description} className="cursor-help">
              <Info className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
