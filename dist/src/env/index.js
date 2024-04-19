"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "test", "production"]).default("production"),
    DATABASE_URL: zod_1.z.string(),
    PORT: zod_1.z.string().default("3333"),
    HOST: zod_1.z.string().default("localhost"),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error("Invalid environmnet variables", _env.error.format());
    throw new Error("Invalid environmnet variables");
}
exports.env = _env.data;
