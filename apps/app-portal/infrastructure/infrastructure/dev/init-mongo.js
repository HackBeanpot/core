// API reference:
// https://docs.mongodb.com/mongodb-shell/
// had trouble finding good docs, so a lot of writing this was trial and error.
// for development, don't run docker in detached mode (remove the -d from dev:db:up in package.json).

// https://stackoverflow.com/questions/39444467/how-to-pass-environment-variable-to-mongo-script
// backwards compatibility note: _getEnv is not part of official API,
// so double-check this still works when upgrading:
const MONGO_SERVER_DBNAME = _getEnv('MONGO_SERVER_DBNAME');

// maybe later, change the name to something not camel cased
const applicationPortal = new Mongo().getDB(MONGO_SERVER_DBNAME);
const authDb = new Mongo().getDB('next-auth');

applicationPortal.createCollection('singleton_data');
applicationPortal.createCollection('applicant_data');

authDb.createCollection('verification_tokens');

// initialize portal dates
applicationPortal.singleton_data.insertMany([
  { type: 'registration-open', value: '2021-11-15T00:00:00.000Z' },
  { type: 'registration-closed', value: '2022-01-15T04:59:59.000Z' },
  { type: 'confirm-by', value: '2022-01-22T23:59:59.000Z' },
]);
