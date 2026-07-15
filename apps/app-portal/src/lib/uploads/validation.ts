// allowed MIME types, max size, filename sanitization

export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
] as const;

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export function sanitizeFileName(filename: string): string {
  let cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  cleanName = cleanName.replace(/^\.+/, "");
  cleanName = cleanName.slice(0, 255);
  return cleanName || "unnamed";
}

export function validateUploadRequest({
  mime,
  size,
  filename,
}: {
  mime: string;
  size: number;
  filename: string;
}): { ok: true } | { ok: false; error: string } {
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(mime)) {
    return { ok: false, error: "Incorrect mime type" };
  }
  if (size <= 0) {
    return { ok: false, error: "File is empty" };
  }
  if (size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, error: "Size of file is too large (over 5 MB)" };
  }
  if (!filename || filename.trim().length === 0) {
    return { ok: false, error: "Filename is required" };
  }
  return { ok: true };
}
