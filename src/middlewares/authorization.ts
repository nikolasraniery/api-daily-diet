import { FastifyReply, FastifyRequest } from "fastify";
import { getSession } from "../models/user_sessions";
import { CustomError } from "../utils/CustomError";
import { validateToken } from "../utils/jwtService";

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

export async function authorize(req: FastifyRequest, reply: FastifyReply) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new CustomError({
        code: HTTP_STATUS.BAD_REQUEST,
        message: "Envie um token de autenticação!",
      });
    }

    const decode = validateToken(token);
    const sessionId = decode.jti;

    if (!sessionId) {
      throw new CustomError({
        code: HTTP_STATUS.UNAUTHORIZED,
        message: "Sem permissão, faça login!",
      });
    }

    const session = await getSession(sessionId);

    if (!session) {
      throw new CustomError({
        code: HTTP_STATUS.UNAUTHORIZED,
        message: "Sessão expirada, faça login novamente!",
      });
    }

    req.user = {
      id: session.user_id,
      session_id: session.id,
    };
  } catch (error: any) {
    console.error(error);

    if (error instanceof CustomError) {
      reply.status(error.code).send({ message: error.message });
    } else if (error?.name === "JsonWebTokenError") {
      reply.status(400).send({ message: "Token inválido" });
    } else {
      reply
        .status(HTTP_STATUS.BAD_REQUEST)
        .send({ message: "Erro durante a autenticação" });
    }
  }
}
