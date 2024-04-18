import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users_session", (table) => {
    table.string("id").primary();
    table.string("user_id").unique();
    table.integer("logged_in");
    table.string("created_at");
    table.string("updated_at").nullable();

    table.foreign("user_id").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users_session", (table) => {
    table.dropForeign("user_id");
  });

  return knex.schema.dropTable("users_session");
}
