"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ShowDecisionToggle() {
  const [enabled, setEnabled] = React.useState(false);
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
        body: JSON.stringify({ enabled: nextValue }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }
    } catch (err) {
      setEnabled(previous);
      console.error(err);
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
        style={{ backgroundColor: "#1890ff" }}
        id="show-decisions"
        checked={enabled}
        disabled={loading}
        onCheckedChange={updateSetting}
      />
    </div>
  );
}
