"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBodySchema = exports.getUserParamsSchema = exports.newUserBodySchema = void 0;
const zod_1 = require("zod");
exports.newUserBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    login: zod_1.z.string(),
    password: zod_1.z.coerce.string()
});
exports.getUserParamsSchema = zod_1.z.object({
    id: zod_1.z.string()
});
exports.updateUserBodySchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    login: zod_1.z.coerce.string().optional(),
    password: zod_1.z.coerce.string().optional(),
    picture: zod_1.z.string().optional(),
});
