"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealsCountParamSchema = exports.inDietQueryParamSchema = exports.idMealParamSchema = exports.updateMealBodySchema = exports.createMealBodySchema = void 0;
const zod_1 = require("zod");
exports.createMealBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    in_diet: zod_1.z.coerce.boolean().default(false),
    time: zod_1.z.string()
});
exports.updateMealBodySchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    time: zod_1.z.string(),
    in_diet: zod_1.z.coerce.boolean(),
});
exports.idMealParamSchema = zod_1.z.object({
    id: zod_1.z.string().min(5),
});
exports.inDietQueryParamSchema = zod_1.z.object({
    in_diet: zod_1.z.coerce.number()
});
exports.mealsCountParamSchema = zod_1.z.object({
    in_diet: zod_1.z.coerce.number().optional()
});
