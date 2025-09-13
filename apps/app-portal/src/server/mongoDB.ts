import { MongoClient, Db, Collection, ServerApiVersion } from 'mongodb';
import { SingletonDefinition, User } from '../common/types';

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
type MongoCtx = {
  client: MongoClient;
  db: Db;
  userDataCollection: Collection<User>;
  singletonDataCollection: Collection<SingletonDefinition>;
};

type GlobalWithMongo = {
  mongo?: {
    client?: MongoClient;
    conn?: MongoCtx;
    promise?: Promise<MongoCtx>;
  };
};

const retrieveEnvVarChecked = (s: string) => {
  const envVar = process.env[s] || '';
  if (envVar === '') {
    throw new Error(`Add this variable inside .env: ${s}`);
  }
  return envVar;
};


  let uri: string;
  if (process.env.MONGO_PROD_CONNECTION_STRING) {
    uri = process.env.MONGO_PROD_CONNECTION_STRING;
  }
  else {
    const port = retrieveEnvVarChecked('MONGO_DEV_PORT');
    const username = retrieveEnvVarChecked('MONGO_DEV_USERNAME');
    const password = retrieveEnvVarChecked('MONGO_DEV_PASSWORD');
    uri = `mongodb://${username}:${password}@localhost:${port}`
}

let client: MongoClient
const dbName = retrieveEnvVarChecked('MONGO_SERVER_DBNAME');

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

const g = global as typeof globalThis & GlobalWithMongo
if (!g.mongo) {
  g.mongo = {};
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!g.mongo.client) {
    g.mongo.client = new MongoClient(uri, options)
    // g.mongo.client = new MongoClient(uri)
  }
  client = g.mongo.client
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  // client = new MongoClient(uri)
}
 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client

export async function connectToDatabase(): Promise<MongoCtx> {
  // we know because of L36 that this is defined
  const cached = g.mongo!;

  // if there already is a connection, then use it
  if (cached.conn) {
    return cached.conn;
  }

  // instantiate to a promise resolved with the context
  if (!cached.promise) {
    const newClient = new MongoClient(uri, options)
    // const newClient = new MongoClient(uri)
    cached.client = newClient;
    cached.promise = cached.client.connect().then((client) => {
      const db = client.db(dbName);
      const userDataCollection = db.collection<User>('applicant_data');

      const singletonDataCollection = db.collection<SingletonDefinition>('singleton_data');
      return {
        client,
        db,
        userDataCollection,
        singletonDataCollection,
      };
    });
  }

  // after connection is resolved, set the connection & return
  // this might happen multiple times, but that's ok
  cached.conn = await cached.promise;
  return cached.conn;
}