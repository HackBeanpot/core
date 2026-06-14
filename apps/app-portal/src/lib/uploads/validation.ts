// allowed MIME types, max size, filename sanitization

export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
] as const;

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export function sanitizeFileName(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
}
