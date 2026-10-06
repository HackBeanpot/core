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
  const [error, setError] = React.useState<string | null>(null);

  async function updateSetting(nextValue: boolean) {
    setLoading(true);
    setError(null);

    const previous = enabled;
    setEnabled(nextValue);

    try {
      const res = await fetch("/api/v1/show-decision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // The route expects `{ enabled }`, not `{ value }` — sending the wrong key meant
        // body.enabled was always undefined, so the route always rejected with 400.
        body: JSON.stringify({ enabled: nextValue }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          typeof body?.error === "string"
            ? body.error
            : "Failed to update this setting.",
        );
      }
    } catch (err) {
      setEnabled(previous);
      setError(
        err instanceof Error ? err.message : "Failed to update this setting.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center gap-2">
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

      {error && <p className="text-sm text-firecrackerRed">{error}</p>}
    </div>
  );
}
