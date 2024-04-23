"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = exports.generateToken = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateShorUUID_1 = require("./generateShorUUID");
/**
 * Valida um tokenJWT enviado.
 * @param token Token para validar
 * @param maxAge Numero maximo para validade do token em dias (Default: 30)
 * @returns Conteudo do token
 */
function validateToken(token, maxAge = 30) {
    try {
        const decode = jsonwebtoken_1.default.verify(token, 'secret', {
            maxAge: `${maxAge} days`,
        });
        return decode;
    }
    catch (error) {
        throw error;
    }
}
exports.validateToken = validateToken;
/**
 * Gera um token JWT
 * @param content Conteudo do token
 * @param tokenId Id para o token (Opcional)
 * @returns token JWT
 */
function generateToken(content, tokenId) {
    const token = jsonwebtoken_1.default.sign({
        content,
    }, 'secret', {
        jwtid: tokenId
    });
    return token;
}
exports.generateToken = generateToken;
function generateAuthToken(userId, sessionId) {
    const tokenId = (0, generateShorUUID_1.generateShortUUID)();
    const token = generateToken({ user_id: userId }, tokenId);
    return {
        auth: token,
        session_id: sessionId ?? tokenId
    };
}
exports.generateAuthToken = generateAuthToken;
