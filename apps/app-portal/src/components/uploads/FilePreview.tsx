"use client";
import {
  DEFAULT_ICON,
  formatBytes,
  MIME_TYPE_ICONS,
} from "@/lib/uploads/utils";
import React from "react";

/**
 * @param fileName - Name of the uploaded file.
 * @param fileSize - Size of the uploaded file in bytes.
 * @param mimeType - MIME type of the uploaded file (e.g. "application/pdf").
 * @param onReplace - Called when the user clicks Replace; reopens the file picker.
 * @param onRemove - Called when the user clicks Remove; clears the upload from form state.
 */
interface FilePreviewProps {
  fileName: string;
  fileSize: number;
  mimeType: string;
  onReplace: () => void;
  onRemove: () => void;
}

export default function FilePreview({
  fileName,
  fileSize,
  mimeType,
  onReplace,
  onRemove,
}: FilePreviewProps): JSX.Element {
  const Icon =
    (MIME_TYPE_ICONS as Record<string, React.ElementType>)[mimeType] ??
    DEFAULT_ICON;
  return (
    <div className="flex items-center justify-between p-4 w-full max-w-md gap-8">
      <div className="flex items-center gap-3">
        <Icon className="size-6 shrink-0 text-starlightBlue" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{fileName}</span>
          <span className="text-xs text-gray-500">
            {formatBytes(fileSize)} · {mimeType}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onReplace}
          className="text-sm text-starlightBlue bg-ribbonBlue px-3 py-1 rounded-md hover:opacity-80"
        >
          Replace
        </button>
        <button
          onClick={onRemove}
          className="text-sm text-black bg-firecrackerRedLight px-3 py-1 rounded-md hover:opacity-80"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
