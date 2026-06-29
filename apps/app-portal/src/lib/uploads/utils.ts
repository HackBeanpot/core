import { FileText, File, Image as ImageIcon } from "lucide-react";
import { ALLOWED_MIME_TYPES } from "./validation";
import React from "react";

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const MIME_TYPE_ICONS: Record<AllowedMimeType, React.ElementType> = {
  "application/pdf": FileText,
  "image/png": ImageIcon,
  "image/jpeg": ImageIcon,
};
export const DEFAULT_ICON = File;
