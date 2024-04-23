"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const user_sessions_1 = require("../models/user_sessions");
const CustomError_1 = require("../utils/CustomError");
const jwtService_1 = require("../utils/jwtService");
const HTTP_STATUS = {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
};
async function authorize(req, reply) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new CustomError_1.CustomError({
                code: HTTP_STATUS.BAD_REQUEST,
                message: "Envie um token de autenticação!",
            });
        }
        const decode = (0, jwtService_1.validateToken)(token);
        const sessionId = decode.jti;
        if (!sessionId) {
            throw new CustomError_1.CustomError({
                code: HTTP_STATUS.UNAUTHORIZED,
                message: "Sem permissão, faça login!",
            });
        }
        const session = await (0, user_sessions_1.getSession)(sessionId);
        if (!session) {
            throw new CustomError_1.CustomError({
                code: HTTP_STATUS.UNAUTHORIZED,
                message: "Sessão expirada, faça login novamente!",
            });
        }
        req.user = {
            id: session.user_id,
            session_id: session.id,
        };
    }
    catch (error) {
        console.error(error);
        if (error instanceof CustomError_1.CustomError) {
            reply.status(error.code).send({ message: error.message });
        }
        else if (error?.name === "JsonWebTokenError") {
            reply.status(400).send({ message: "Token inválido" });
        }
        else {
            reply
                .status(HTTP_STATUS.BAD_REQUEST)
                .send({ message: "Erro durante a autenticação" });
        }
    }
}
exports.authorize = authorize;
