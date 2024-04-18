import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.dateTime('created_at').defaultTo(knex.fn.now()).alter()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.string('created_at').alter()
  })
}

