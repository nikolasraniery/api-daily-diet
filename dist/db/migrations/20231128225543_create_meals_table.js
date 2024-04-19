"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('meals', (table) => {
        table.string('id').primary();
        table.string('name');
        table.string('description');
        table.integer('in_diet');
        table.string('time');
        table.string('user_id');
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.string('updated_at').nullable();
        table.foreign('user_id').references('id').inTable('users');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('meals');
}
exports.down = down;
