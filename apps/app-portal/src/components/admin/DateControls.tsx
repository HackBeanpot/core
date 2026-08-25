"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  label: string;
  endpoint: string;
  initialValue?: string;
};

export default function DateControls({ label, endpoint, initialValue }: Props) {
  const initialDate = initialValue ? new Date(initialValue) : undefined;

  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [time, setTime] = React.useState<string>(
    initialDate
      ? `${String(initialDate.getHours()).padStart(2, "0")}:${String(
          initialDate.getMinutes(),
        ).padStart(2, "0")}`
      : "",
  );

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [savedMessage, setSavedMessage] = React.useState<string | null>(null);

  async function handleSave() {
    if (!date || !time) return;

    setLoading(true);
    setError(null);
    setSavedMessage(null);

    const previousDate = date;
    const previousTime = time;

    try {
      const [hours, minutes] = time.split(":").map(Number);

      const combined = new Date(date);
      combined.setHours(hours);
      combined.setMinutes(minutes);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: combined.toISOString() }),
      });

      const body = await res.json().catch(() => null);

      // Show the real server error (e.g. "Registration cannot close before it opens.")
      // instead of a generic message — this previously relied on sonner's toast, but
      // no <Toaster /> is mounted anywhere in the admin layout, so those calls were
      // silent no-ops: the request failed (visible in the console/network tab) with
      // nothing shown on screen.
      if (!res.ok) {
        throw new Error(
          typeof body?.error === "string"
            ? body.error
            : `Failed to save ${label}.`,
        );
      }

      setSavedMessage(`${label} saved.`);
    } catch (err) {
      setDate(previousDate);
      setTime(previousTime);
      setError(err instanceof Error ? err.message : `Failed to save ${label}.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4">
      <div className="text-sm font-semibold">{label}</div>

      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start">
              {date ? format(date, "PPP") : "Pick date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              style={{ backgroundColor: "white" }}
              selected={date}
              onSelect={setDate}
            />
          </PopoverContent>
        </Popover>

        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <Button
          style={{ backgroundColor: "#1890ff" }}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>

      {error && <p className="text-sm text-firecrackerRed">{error}</p>}
      {savedMessage && <p className="text-sm text-darkGreen">{savedMessage}</p>}
    </div>
  );
}
