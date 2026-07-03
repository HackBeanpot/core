import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGO_PROD_CONNECTION_STRING;
const dbName = process.env.MONGO_SERVER_DBNAME;

if (!uri) {
  throw new Error("Missing MONGO_PROD_CONNECTION_STRING");
}

if (!dbName) {
  throw new Error("Missing MONGO_SERVER_DBNAME");
}

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

// need client promise for the NextAuth MongoDB adapter
export const mongoClientPromise = clientPromise;
