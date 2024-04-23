"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
const knex_1 = __importDefault(require("knex"));
exports.config = {
    client: "postgresql",
    connection: {
        database: process.env.DATABASE_URL,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: "./db/migrations",
    },
};
exports.knex = (0, knex_1.default)(exports.config);
