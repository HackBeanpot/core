"use client";

import React from "react";

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
    <label
      htmlFor={question.id}
      className={[
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-heather px-6 py-8 text-center transition-colors",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:border-charcoalFogLight hover:bg-cream",
      ].join(" ")}
    >
      <svg
        className="h-8 w-8 text-charcoalFogLight"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>

      {value instanceof File ? (
        <p className="text-sm font-medium text-pavement">{value.name}</p>
      ) : (
        <>
          <p className="text-sm font-medium text-pavement">
            Click to upload a PDF
          </p>
          <p className="text-xs text-charcoalFogLight">
            File upload will be connected to storage in a future release.
          </p>
        </>
      )}

      <input
        id={question.id}
        type="file"
        accept=".pdf,.doc,.docx"
        disabled={disabled}
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        aria-required={question.required}
      />
    </label>
  );
}
