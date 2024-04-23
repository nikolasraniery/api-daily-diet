"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users_session", (table) => {
        table.string("id").primary();
        table.string("user_id").unique();
        table.integer("logged_in");
        table.string("created_at");
        table.string("updated_at").nullable();
        table.foreign("user_id").references("id").inTable("users");
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.alterTable("users_session", (table) => {
        table.dropForeign("user_id");
    });
    return knex.schema.dropTable("users_session");
}
exports.down = down;
