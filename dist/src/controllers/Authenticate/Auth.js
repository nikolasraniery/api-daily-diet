"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const user_1 = require("../../models/user");
const user_sessions_1 = require("../../models/user_sessions");
const CustomError_1 = require("../../utils/CustomError");
const cryptoService_1 = require("../../utils/cryptoService");
const jwtService_1 = require("../../utils/jwtService");
const schema_1 = require("./schema");
class Authenticate {
    async login(req, reply) {
        try {
            const data = schema_1.loginBodySchema.safeParse(req.body);
            if (data.success) {
                const { login, password } = data.data;
                const user = await (0, user_1.getUserByLogin)(login);
                if (!user) {
                    throw new CustomError_1.CustomError({
                        code: 404,
                        message: "Usuário não encontrado"
                    });
                }
                const isCorrectPassword = (0, cryptoService_1.compareHash)(user.password, password);
                if (!isCorrectPassword) {
                    return reply.status(401).send({ message: "Usuário ou senha inválidos" });
                }
                const lastSession = await (0, user_sessions_1.checkUserLoggedIn)(user.id);
                if (lastSession) {
                    await (0, user_sessions_1.deleteSession)(lastSession.id);
                }
                const { auth, session_id } = (0, jwtService_1.generateAuthToken)(user.id);
                const session = {
                    id: session_id,
                    user_id: user.id,
                    logged_in: true,
                };
                await (0, user_sessions_1.newSession)(session);
                return reply.status(200).send({ auth });
            }
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                return reply.status(error.code).send({
                    message: error.message
                });
            }
            console.error(error);
            reply.status(500).send();
        }
    }
    async logout(req, res) {
        const token = req.headers.authorization;
        if (token) {
            const decode = (0, jwtService_1.validateToken)(token);
            const sessionId = String(decode.jti);
            await (0, user_sessions_1.deleteSession)(sessionId);
            res.status(200);
        }
    }
}
exports.Authenticate = Authenticate;
