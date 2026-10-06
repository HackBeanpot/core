//Mongo adapter instance
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import type { Adapter } from "next-auth/adapters";
import { getMongoClientPromise } from "@/lib/db";

// Stores users, accounts, sessions, and the magic-link verification tokens
// that EmailProvider depends on.
//
// MongoDBAdapter awaits the client as soon as it is constructed, so it is built
// on first use rather than at import. Otherwise `next build` (which imports this
// via the auth route) would need a live DB connection to succeed.
let adapter: Adapter | undefined;
function getAdapter(): Adapter {
  adapter ??= MongoDBAdapter(getMongoClientPromise(), {
    databaseName: process.env.MONGO_SERVER_DBNAME,
  });
  return adapter;
}

const methods = [
  "createUser",
  "getUser",
  "getUserByEmail",
  "getUserByAccount",
  "updateUser",
  "deleteUser",
  "linkAccount",
  "unlinkAccount",
  "createSession",
  "getSessionAndUser",
  "updateSession",
  "deleteSession",
  "createVerificationToken",
  "useVerificationToken",
] as const;

export const authAdapter = Object.fromEntries(
  methods.map((name) => [
    name,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: unknown[]) => (getAdapter()[name] as any)(...args),
  ]),
) as Adapter;
