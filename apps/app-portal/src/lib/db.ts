import { Db, MongoClient } from "mongodb";

function resolveUri(): string {
  const uri = process.env.MONGO_PROD_CONNECTION_STRING;
  if (!uri) {
    throw new Error(
      "Missing Mongo connection config: set MONGO_PROD_CONNECTION_STRING.",
    );
  }
  return uri;
}

const uri = resolveUri();

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

// Lazily creates and caches the connection so importing this module
// doesn't throw when MONGO_PROD_CONNECTION_STRING is absent (e.g. in dev
// without a local Mongo instance). The error surfaces only when getDb() is called.
//
// The cache is always stored on `global` (not just outside production): in dev this
// survives Next.js's module reloads across HMR; in production it's what stops every
// getDb() call from opening a brand-new MongoClient connection that's never closed.
function getClientPromise(uri: string): Promise<MongoClient> {
  if (global.__mongoClientPromise__) return global.__mongoClientPromise__;
  const promise = new MongoClient(uri).connect();
  global.__mongoClientPromise__ = promise;
  return promise;
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGO_PROD_CONNECTION_STRING;
  const dbName = process.env.MONGO_SERVER_DBNAME;
  if (!uri) throw new Error("Missing MONGO_PROD_CONNECTION_STRING");
  if (!dbName) throw new Error("Missing MONGO_SERVER_DBNAME");
  const client = await getClientPromise(uri);
  return client.db(dbName);
}

/**
 * Dev and prod share the same Atlas cluster connection string, so collection
 * names get a `_test` suffix outside production (NODE_ENV !== "production",
 * which Next.js sets automatically for `next dev` vs `next build`/`next start`)
 * to keep local/dev work off real data.
 */
export function resolveCollectionName(baseName: string): string {
  const isDev = process.env.NODE_ENV !== "production";
  return isDev ? `${baseName}_test` : baseName;
}

// need client promise for the NextAuth MongoDB adapter
export const mongoClientPromise = getClientPromise(uri);
