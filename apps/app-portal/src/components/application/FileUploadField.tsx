"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import type { Question } from "@/lib/application/types";

interface FileUploadFieldProps {
  question: Question;
  value: File | null | undefined;
  onChange: (value: File | null) => void;
  disabled?: boolean;
}

export function FileUploadField({
  question,
  value,
  onChange,
  disabled,
}: FileUploadFieldProps) {
  return (
    <div className="space-y-2">
      <Input
        id={question.id}
        type="file"
        accept=".pdf,.doc,.docx"
        disabled={disabled}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        aria-required={question.required}
      />
      {value instanceof File ? (
        <p className="text-sm text-neutral-600">Selected: {value.name}</p>
      ) : (
        <p className="text-sm text-neutral-500">
          File upload is not yet connected to storage.
        </p>
      )}
    </div>
  );
}
