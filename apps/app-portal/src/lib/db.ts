import { Db, MongoClient } from "mongodb";

const DEFAULT_DEV_DBNAME = "HackbeanpotCluster";

// Prefer an explicit prod connection string; otherwise build a local dev URI
// from the MONGO_DEV_* vars (matches docker-compose.yml at the repo root).
function resolveUri(): string {
  if (process.env.MONGO_PROD_CONNECTION_STRING) {
    return process.env.MONGO_PROD_CONNECTION_STRING;
  }

  const { MONGO_DEV_USERNAME, MONGO_DEV_PASSWORD } = process.env;
  if (MONGO_DEV_USERNAME && MONGO_DEV_PASSWORD) {
    const host = process.env.MONGO_DEV_HOST ?? "localhost";
    const port = process.env.MONGO_DEV_PORT ?? "27017";
    const user = encodeURIComponent(MONGO_DEV_USERNAME);
    const pass = encodeURIComponent(MONGO_DEV_PASSWORD);
    return `mongodb://${user}:${pass}@${host}:${port}/?authSource=admin`;
  }

  throw new Error(
    "Missing Mongo connection config: set MONGO_PROD_CONNECTION_STRING, " +
      "or MONGO_DEV_USERNAME and MONGO_DEV_PASSWORD for local dev",
  );
}

const uri = resolveUri();
const dbName = process.env.MONGO_SERVER_DBNAME ?? DEFAULT_DEV_DBNAME;

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
