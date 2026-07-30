//Mongo adapter instance
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { mongoClientPromise } from "@/lib/db";

// Stores users, accounts, sessions, and the magic-link verification tokens
// that EmailProvider depends on.
export const authAdapter = MongoDBAdapter(mongoClientPromise, {
  databaseName: process.env.MONGO_SERVER_DBNAME,
});
