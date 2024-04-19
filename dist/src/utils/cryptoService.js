"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Cria um Hash para a string informada
 * @param password String para que seja criado uma hash
 * @returns string Hash
 */
function generateHash(password) {
    const salt = bcrypt_1.default.genSaltSync(10);
    const generatedHash = bcrypt_1.default.hashSync(password, salt);
    return generatedHash;
}
exports.generateHash = generateHash;
/**
 * Faz a comparação de duas HASH para ver são iguais
 * @param hash
 * @param compare
 * @returns True se forem iguais
 */
function compareHash(hash, compare) {
    const isValid = bcrypt_1.default.compareSync(compare, hash);
    return isValid;
}
exports.compareHash = compareHash;
