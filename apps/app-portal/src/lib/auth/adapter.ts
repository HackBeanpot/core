//Mongo adapter instance
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { mongoClientPromise } from "@/lib/db";

export const authAdapter = MongoDBAdapter(mongoClientPromise, {
  databaseName: process.env.MONGO_SERVER_DBNAME,
});
