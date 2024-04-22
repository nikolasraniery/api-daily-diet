import setupKnex, { Knex } from "knex";

export const config: Knex.Config = {
  client: "postgresql",
  connection: {
    database: process.env.DATABASE_URL,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knex = setupKnex(config);
