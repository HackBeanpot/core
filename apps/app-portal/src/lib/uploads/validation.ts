// allowed MIME types, max size, filename sanitization

export const ALLOWED_MIME_TYPES = [];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export function sanitizeFileName(filename: string): string {
  void filename;
  return "";
}
