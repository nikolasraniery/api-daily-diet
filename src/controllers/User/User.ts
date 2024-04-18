import { FastifyReply, FastifyRequest } from "fastify";
import { userSchema } from "../../interfaces/User";
import { createUser, getUserById, updateUser } from "../../models/user";
import { CustomError } from "../../utils/CustomError";
import { generateHash } from "../../utils/cryptoService";
import { generateShortUUID } from "../../utils/generateShorUUID";
import {
  getUserParamsSchema,
  newUserBodySchema,
  updateUserBodySchema,
} from "./schema";
export class User {
  public async register(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = newUserBodySchema.safeParse(req.body);

      if (data.success) {
        const { data: newUserRequest } = data;

        const hashPassword = generateHash(newUserRequest.password);

        const newUser = userSchema.parse({
          ...newUserRequest,
          password: hashPassword,
          id: generateShortUUID(),
        });

        await createUser(newUser);

        return res.status(201).send({
          message: "usuário criado com sucesso!",
        });
      }

      return res.status(400).send();
    } catch (error) {
      res.status(500).send({
        message: "Erro interno no servidor",
      });

      throw error;
    }
  }

  public async getUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new Error("invalid user!");
      }

      const user = await getUserById(id);
      return res.status(200).send({ user });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.code).send({
          message: error.message,
        });
      }
      res.status(500).send();
      throw error;
    }
  }

  public async updateUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = getUserParamsSchema.parse(req.params);
      if (id !== req.user?.id) {
        throw new CustomError({
          code: 404,
          message: "Usuário inválido",
        });
      }

      const data = updateUserBodySchema.parse(req.body);
      const userUpdated = await updateUser({
        ...data,
        id,
      });

      return res.status(200).send({
        user: userUpdated,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.code).send({ message: error.message });
      } else {
        res.status(500).send();
        throw error;
      }
    }
  }
}
