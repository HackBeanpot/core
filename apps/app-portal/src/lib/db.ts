import { Db, MongoClient } from "mongodb";

const DEFAULT_DBNAME = "HackbeanpotCluster";

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
const dbName = process.env.MONGO_SERVER_DBNAME ?? DEFAULT_DBNAME;

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);
const clientPromise = global.__mongoClientPromise__ ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  global.__mongoClientPromise__ = clientPromise;
}

export async function getDb(): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
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
