import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('login').unique();
    table.string('name');
    table.string('password');
    table.string('picture').nullable();
    table.string('created_at');
    table.string('updated_at').nullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

