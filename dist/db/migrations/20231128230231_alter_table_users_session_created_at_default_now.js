"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.alterTable('users_session', (table) => {
        table.dateTime('created_at').defaultTo(knex.fn.now()).alter();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.alterTable('users_session', (table) => {
        table.string('created_at').alter();
    });
}
exports.down = down;
