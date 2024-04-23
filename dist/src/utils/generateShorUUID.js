"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortUUID = void 0;
const short_uuid_1 = __importDefault(require("short-uuid"));
function generateShortUUID() {
    return (0, short_uuid_1.default)().generate();
}
exports.generateShortUUID = generateShortUUID;
