"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginBodySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginBodySchema = zod_1.default.object({
    login: zod_1.default.string(),
    password: zod_1.default.coerce.string(),
});
