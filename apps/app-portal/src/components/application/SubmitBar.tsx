"use client";

import React from "react";

import { Button } from "@/components/ui/button";

interface SubmitBarProps {
  onSaveDraft: () => void;
  onSubmit: () => void;
  isSaving?: boolean;
  isSubmitting?: boolean;
  disabled?: boolean;
}

export function SubmitBar({
  onSaveDraft,
  onSubmit,
  isSaving,
  isSubmitting,
  disabled,
}: SubmitBarProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-neutral-600">
        You can save a draft and return later to finish your application.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={disabled || isSaving || isSubmitting}
        >
          {isSaving ? "Saving…" : "Save draft"}
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={disabled || isSaving || isSubmitting}
        >
          {isSubmitting ? "Submitting…" : "Submit application"}
        </Button>
      </div>
    </div>
  );
}
