import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('meals', (table) => {
    table.string('id').primary()
    table.string('name')
    table.string('description')
    table.integer('in_diet')
    table.string('time')
    table.string('user_id')
    table.dateTime('created_at').defaultTo(knex.fn.now())
    table.string('updated_at').nullable()
    
    table.foreign('user_id').references('id').inTable('users')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('meals')
}

