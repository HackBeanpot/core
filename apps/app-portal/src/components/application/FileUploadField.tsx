"use client";

import React from "react";

import FileUpload from "@/components/uploads/FileUpload";
import type { Question } from "@/lib/application/types";

interface FileUploadFieldProps {
  question: Question;
  /** The upload ID returned by /api/v1/uploads/sign once the file has finished uploading. */
  value: string | null | undefined;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export function FileUploadField({
  question,
  value,
  onChange,
  disabled,
}: FileUploadFieldProps) {
  if (disabled) {
    return (
      <p className="text-sm text-charcoalFogLight">
        {value
          ? "A file was uploaded for this question."
          : "No file was uploaded for this question."}
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {value && (
        <p className="text-xs text-charcoalFogLight">
          A file is already uploaded for this question. Uploading a new one will
          replace it.
        </p>
      )}
      <FileUpload
        accept={question.accept}
        onUploadComplete={(uploadId) => onChange(uploadId)}
        onUploadRemoved={() => onChange(null)}
      />
    </div>
  );
}
