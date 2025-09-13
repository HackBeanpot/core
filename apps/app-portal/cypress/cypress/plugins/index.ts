/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import { Collection, Db, MongoClient } from 'mongodb';
import { SingletonDefinition, User, ApplicationStatus, RSVPStatus } from '../../common/types';
import { CreateUserInBackendArg } from '../types';

type NextAuthVerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};
type CypressMongoCtx = {
  client: MongoClient;
  serverDb: {
    db: Db;
    userDataCollection: Collection<User>;
    singletonDataCollection: Collection<SingletonDefinition>;
  };
  nextAuthDb: {
    db: Db;
    verificationTokens: Collection<NextAuthVerificationToken>;
  };
};

// can't use normal connectToDatabase because we don't have access to env vars
const cypressConnectToDatabase = async (env: Record<string, string>): Promise<CypressMongoCtx> => {
  const port = env['MONGO_DEV_PORT'];
  const username = env['MONGO_DEV_USERNAME'];
  const password = env['MONGO_DEV_PASSWORD'];
  const connectionString = `mongodb://${username}:${password}@localhost:${port}`;
  const client = await new MongoClient(connectionString).connect();
  const serverDb = client.db(env['MONGO_SERVER_DBNAME']);
  const nextAuthDb = client.db('next-auth');
  return {
    client,
    serverDb: {
      db: serverDb,
      userDataCollection: serverDb.collection('applicant_data'),
      singletonDataCollection: serverDb.collection('singleton_data'),
    },
    nextAuthDb: {
      db: nextAuthDb,
      verificationTokens: nextAuthDb.collection('verification_tokens'),
    },
  };
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): void | Cypress.ConfigOptions | Promise<Cypress.ConfigOptions> => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    createUserInBackend: async (arg: CreateUserInBackendArg) => {
      const ctx = await cypressConnectToDatabase(config.env);
      // make sure there are no duplicate tokens/users
      const deleteUserTask = ctx.serverDb.userDataCollection.deleteMany({ email: arg.email });
      const deleteTokenTask = ctx.nextAuthDb.verificationTokens.deleteMany({
        identifier: arg.email,
      });
      await Promise.all([deleteUserTask, deleteTokenTask]);
      const userFields = arg.user ?? {};
      const insertUserTask = ctx.serverDb.userDataCollection.insertOne({
        email: arg.email,
        isAdmin: arg.isAdmin,
        applicationStatus: ApplicationStatus.Incomplete,
        rsvpStatus: RSVPStatus.Unconfirmed,
        applicationResponses: {},
        ...userFields,
      });
      const insertTokenTask = ctx.nextAuthDb.verificationTokens.insertOne({
        identifier: arg.email,
        token: arg.token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      await Promise.all([insertUserTask, insertTokenTask]);
      return null;
    },
  });
};
