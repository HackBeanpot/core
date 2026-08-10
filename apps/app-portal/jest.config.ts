import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/lib/db$": "<rootDir>/src/lib/db.stub.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
