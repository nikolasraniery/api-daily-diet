"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUserByLogin = exports.createUser = void 0;
const database_1 = require("../database");
//
async function createUser(user) {
    try {
        await (0, database_1.knex)('users').insert(user);
    }
    catch (error) {
        throw error;
    }
}
exports.createUser = createUser;
async function getUserByLogin(login) {
    try {
        const user = await (0, database_1.knex)('users')
            .select('*')
            .where({
            login
        })
            .first();
        if (user) {
            return user;
        }
    }
    catch (error) {
        throw error;
    }
}
exports.getUserByLogin = getUserByLogin;
async function getUserById(id) {
    try {
        const user = await (0, database_1.knex)('users')
            .select('id', 'name', 'login', 'picture')
            .where({
            id
        })
            .first();
        if (user) {
            return user;
        }
        throw new Error('Usuário não encontrado');
    }
    catch (error) {
        throw error;
    }
}
exports.getUserById = getUserById;
async function updateUser(user) {
    try {
        const updatedUser = await (0, database_1.knex)('users')
            .where({
            id: user.id
        })
            .update({
            name: user?.name,
            login: user?.login,
            picture: user?.picture,
            password: user?.password,
            updated_at: new Date().toISOString()
        }, ['login', 'name', 'picture']);
        return updatedUser[0];
    }
    catch (error) {
        throw error;
    }
}
exports.updateUser = updateUser;
//
async function deleteUser(userId) {
}
exports.deleteUser = deleteUser;
