//Mongo adapter instance
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import type { Adapter } from "next-auth/adapters";
import { mongoClientPromise } from "@/lib/db";
import { authLog, redact } from "./log";

// Stores users, accounts, sessions, and the magic-link verification tokens
// that EmailProvider depends on.
const baseAdapter = MongoDBAdapter(mongoClientPromise, {
  databaseName: process.env.MONGO_SERVER_DBNAME,
});

// Wrap every adapter method so each DB operation in the auth flow is logged.
// The two that matter most for magic-link debugging:
//   • createVerificationToken → the temp token is WRITTEN to Mongo (at sign-in)
//   • useVerificationToken     → the temp token is READ + CONSUMED (on link click)
function withLogging(adapter: Adapter): Adapter {
  const wrapped: Record<string, unknown> = {};
  for (const key of Object.keys(adapter) as (keyof Adapter)[]) {
    const fn = adapter[key];
    if (typeof fn !== "function") {
      wrapped[key] = fn;
      continue;
    }
    wrapped[key] = async (...args: unknown[]) => {
      authLog("adapter", `→ ${key}`, args.map(redact));
      try {
        const result = await (fn as (...a: unknown[]) => Promise<unknown>)(...args);
        authLog("adapter", `✓ ${key}`, redact(result));
        return result;
      } catch (err) {
        authLog("adapter", `✗ ${key} threw: ${(err as Error).message}`);
        throw err;
      }
    };
  }
  return wrapped as Adapter;
}

export const authAdapter = withLogging(baseAdapter);
