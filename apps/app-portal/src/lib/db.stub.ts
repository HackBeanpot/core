// Test-only stand-in for "@/lib/db". The real module opens a live Mongo
// connection at import time, which crashes Jest after tests finish. Tests
// that need a real database use their own mongodb-memory-server instance and
// only need resolveCollectionName's naming behavior from this module.
export function resolveCollectionName(baseName: string): string {
  return `${baseName}_test`;
}

export async function getDb(): Promise<never> {
  throw new Error(
    "getDb() is not available in tests; pass a Db instance directly.",
  );
}
