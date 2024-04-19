"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.getSession = exports.checkUserLoggedIn = exports.newSession = void 0;
const database_1 = require("../database");
async function newSession(session) {
    try {
        await (0, database_1.knex)('users_session').insert({
            ...session,
            logged_in: session.logged_in ? 1 : 0
        });
    }
    catch (error) {
        throw error;
    }
}
exports.newSession = newSession;
async function checkUserLoggedIn(user_id) {
    try {
        const session = await (0, database_1.knex)('users_session')
            .select('*')
            .where({
            user_id
        })
            .first();
        return session;
    }
    catch (error) {
        throw error;
    }
}
exports.checkUserLoggedIn = checkUserLoggedIn;
async function getSession(sessionId) {
    try {
        const session = await (0, database_1.knex)('users_session')
            .select('*')
            .where({
            id: sessionId
        })
            .first();
        return session;
    }
    catch (error) {
        throw error;
    }
}
exports.getSession = getSession;
async function deleteSession(sessionId) {
    try {
        await (0, database_1.knex)('users_session').delete().where({
            id: sessionId
        });
    }
    catch (error) {
        throw error;
    }
}
exports.deleteSession = deleteSession;
