import React from "react";
import { Inbox } from "lucide-react";

// placeholder shown inside a chart card when a metric has no data yet
interface ChartEmptyProps {
  message?: string;
}

export function ChartEmpty({
  message = "No data yet",
}: ChartEmptyProps): JSX.Element {
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
      <Inbox className="h-8 w-8 text-heather" />
      <p className="text-sm text-pavement">{message}</p>
    </div>
  );
}
