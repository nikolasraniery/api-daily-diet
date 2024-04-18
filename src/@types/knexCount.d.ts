import 'knex'

declare module "knex/types/result" {
  interface Registry {
      Count: number;
  }
}
