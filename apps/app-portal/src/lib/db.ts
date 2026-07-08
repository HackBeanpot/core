import { Db, MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

// Lazily creates and caches the connection so importing this module
// doesn't throw when MONGO_PROD_CONNECTION_STRING is absent (e.g. in dev
// without a local Mongo instance). The error surfaces only when getDb() is called.
function getClientPromise(uri: string): Promise<MongoClient> {
  if (global.__mongoClientPromise__) return global.__mongoClientPromise__;
  const promise = new MongoClient(uri).connect();
  if (process.env.NODE_ENV !== "production") {
    global.__mongoClientPromise__ = promise;
  }
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
