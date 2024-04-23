"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const User_1 = require("../../interfaces/User");
const user_1 = require("../../models/user");
const CustomError_1 = require("../../utils/CustomError");
const cryptoService_1 = require("../../utils/cryptoService");
const generateShorUUID_1 = require("../../utils/generateShorUUID");
const schema_1 = require("./schema");
class User {
    async register(req, res) {
        try {
            const data = schema_1.newUserBodySchema.safeParse(req.body);
            if (data.success) {
                const { data: newUserRequest } = data;
                const hashPassword = (0, cryptoService_1.generateHash)(newUserRequest.password);
                const newUser = User_1.userSchema.parse({
                    ...newUserRequest,
                    password: hashPassword,
                    id: (0, generateShorUUID_1.generateShortUUID)(),
                });
                await (0, user_1.createUser)(newUser);
                return res.status(201).send({
                    message: "usuário criado com sucesso!",
                });
            }
            return res.status(400).send();
        }
        catch (error) {
            res.status(500).send({
                message: "Erro interno no servidor",
            });
            throw error;
        }
    }
    async getUser(req, res) {
        try {
            const id = req.user?.id;
            if (!id) {
                throw new Error("invalid user!");
            }
            const user = await (0, user_1.getUserById)(id);
            return res.status(200).send({ user });
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                res.status(error.code).send({
                    message: error.message,
                });
            }
            res.status(500).send();
            throw error;
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = schema_1.getUserParamsSchema.parse(req.params);
            if (id !== req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 404,
                    message: "Usuário inválido",
                });
            }
            const data = schema_1.updateUserBodySchema.parse(req.body);
            const userUpdated = await (0, user_1.updateUser)({
                ...data,
                id,
            });
            return res.status(200).send({
                user: userUpdated,
            });
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                res.status(error.code).send({ message: error.message });
            }
            else {
                res.status(500).send();
                throw error;
            }
        }
    }
}
exports.User = User;
