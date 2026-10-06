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

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

// Lazily creates and caches the connection so importing this module
// doesn't throw when MONGO_PROD_CONNECTION_STRING is absent (e.g. during
// `next build`, which imports every route). The error surfaces only on first use.
function getClientPromise(uri: string): Promise<MongoClient> {
  global.__mongoClientPromise__ ??= new MongoClient(uri).connect();
  return global.__mongoClientPromise__;
}

export async function getDb(): Promise<Db> {
  const dbName = process.env.MONGO_SERVER_DBNAME;
  if (!dbName) throw new Error("Missing MONGO_SERVER_DBNAME");
  const client = await getMongoClientPromise();
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
export function getMongoClientPromise(): Promise<MongoClient> {
  return getClientPromise(resolveUri());
}
