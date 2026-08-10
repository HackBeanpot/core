"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type ShowDecisionToggleProps = {
  initialValue: boolean;
};

export default function ShowDecisionToggle({
  initialValue,
}: ShowDecisionToggleProps) {
  const [enabled, setEnabled] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(false);

  async function updateSetting(nextValue: boolean) {
    setLoading(true);

    const previous = enabled;
    setEnabled(nextValue);

    try {
      const res = await fetch("/api/v1/show-decision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: nextValue }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }
    } catch {
      setEnabled(previous);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border p-4">
      <Label htmlFor="show-decisions" className="text-sm font-medium">
        Show Decisions
      </Label>

      <Switch
        id="show-decisions"
        checked={enabled}
        disabled={loading}
        onCheckedChange={updateSetting}
        className={enabled ? "bg-[#1890ff]" : "bg-gray-300"}
      />
    </div>
  );
}
