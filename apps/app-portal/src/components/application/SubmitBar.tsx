"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface SubmitBarProps {
  onSubmit: () => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  isFormValid?: boolean;
  isSaving?: boolean;
  lastSaved?: Date | null;
}

function formatSaved(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 5) return "just now";
  if (secs < 60) return `${String(secs)}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${String(mins)}m ago`;
  return `${String(Math.floor(mins / 60))}h ago`;
}

export function SubmitBar({
  onSubmit,
  isSubmitting,
  disabled,
  isFormValid,
  isSaving,
  lastSaved,
}: SubmitBarProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!lastSaved) return;
    const id = setInterval(() => setTick((t) => t + 1), 10_000);
    return () => clearInterval(id);
  }, [lastSaved]);

  const saveLabel = isSaving
    ? "Saving…"
    : lastSaved
      ? `Saved ${formatSaved(lastSaved)}`
      : "Changes are saved automatically.";

  return (
    <div className="flex flex-col gap-3 border-t border-heather pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-charcoalFogLight">{saveLabel}</p>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={
          (disabled ?? false) ||
          (isSubmitting ?? false) ||
          !(isFormValid ?? true)
        }
      >
        {isSubmitting ? "Submitting…" : "Submit application"}
      </Button>
    </div>
  );
}
