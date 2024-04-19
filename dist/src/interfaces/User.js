"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    login: zod_1.z.string().min(4, {
        message: "O login deve conter 4 caracteres ou mais"
    }),
    password: zod_1.z.string(),
    id: zod_1.z.string(),
    picture: zod_1.z.string().optional(),
});
