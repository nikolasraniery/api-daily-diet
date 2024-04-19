"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
const knex_1 = __importDefault(require("knex"));
const env_1 = require("./env");
exports.config = {
    client: "sqlite",
    connection: {
        filename: env_1.env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: "./db/migrations",
    },
};
exports.knex = (0, knex_1.default)(exports.config);
