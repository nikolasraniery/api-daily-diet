"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealsController = void 0;
const meals_1 = require("../../models/meals");
const bestSequenceMealsInDiet_1 = require("../../services/bestSequenceMealsInDiet");
const CustomError_1 = require("../../utils/CustomError");
const generateShorUUID_1 = require("../../utils/generateShorUUID");
const schema_1 = require("./schema");
class MealsController {
    async createMeal(req, reply) {
        try {
            if (!req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 400,
                    message: "Sem permissão, faça login"
                });
            }
            const newMeal = schema_1.createMealBodySchema.parse(req.body);
            await (0, meals_1.createMeal)({
                ...newMeal,
                user_id: req.user?.id,
                id: (0, generateShorUUID_1.generateShortUUID)(),
            });
            reply.status(201).send({
                message: "Refeição cadastrada com sucesso!"
            });
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                reply.status(error.code).send({
                    message: error.message
                });
            }
            reply.status(500).send();
            throw error;
        }
    }
    async updateMeal(req, reply) {
        try {
            if (!req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 400,
                    message: "Sem permissão, faça login"
                });
            }
            const receivedMeal = schema_1.updateMealBodySchema.parse(req.body);
            const { id: mealId } = schema_1.idMealParamSchema.parse(req.params);
            const updatedMeal = await (0, meals_1.updateMeal)({
                ...receivedMeal,
                id: mealId,
                user_id: req.user.id
            });
            reply.status(200).send({ updatedMeal });
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                reply.status(error.code).send({
                    message: error.message
                });
            }
            reply.status(500).send();
        }
    }
    async getAllMeals(req, reply) {
        try {
            if (!req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 400,
                    message: "Sem permissão, faça login"
                });
            }
            const meals = await (0, meals_1.getAllMeals)(req.user.id);
            reply.status(200).send(meals);
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                reply.status(error.code).send({
                    message: error.message
                });
            }
            reply.status(500).send();
        }
    }
    async getMealsCount(req, reply) {
        try {
            if (!req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 400,
                    message: "Sem permissão, faça login"
                });
            }
            const { in_diet } = schema_1.mealsCountParamSchema.parse(req.query);
            const mealsCount = await (0, meals_1.getMealsCount)(req.user.id, in_diet);
            return reply.status(200).send({
                count: mealsCount
            });
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                reply.status(error.code).send({
                    message: error.message
                });
            }
            reply.status(500).send();
        }
    }
    async getMeal(req, reply) {
        try {
            if (!req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 400,
                    message: "Sem permissão, faça login"
                });
            }
            const { id: mealId } = schema_1.idMealParamSchema.parse(req.params);
            const meal = await (0, meals_1.getMeal)(mealId, req.user?.id);
            if (!meal) {
                throw new CustomError_1.CustomError({
                    code: 404,
                    message: "Não foi encontrada nenhuma refeição com este ID"
                });
            }
            reply.status(200).send({
                meal
            });
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                reply.status(error.code).send({
                    message: error.message
                });
            }
            reply.status(500).send();
        }
    }
    async getMealInDiet(req, reply) {
        try {
            if (!req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 400,
                    message: "Sem permissão, faça login"
                });
            }
            const { in_diet } = schema_1.inDietQueryParamSchema.parse(req.query);
            const meals = await (0, meals_1.getMealInDiet)(!!in_diet, req.user?.id);
            reply.status(200).send(meals);
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                reply.status(error.code).send({
                    message: error.message
                });
            }
            reply.status(500).send();
        }
    }
    async getBestSequenceMealInDiet(req, reply) {
        try {
            if (!req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 400,
                    message: "Sem permissão, faça login"
                });
            }
            const mealsSequence = await (0, bestSequenceMealsInDiet_1.bestSequenceMealsInDiet)(req.user.id);
            reply.status(200).send({
                bestSequence: mealsSequence
            });
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                reply.status(error.code).send({
                    message: error.message
                });
            }
            reply.status(500).send();
        }
    }
    async deleteMeal(req, reply) {
        try {
            if (!req.user?.id) {
                throw new CustomError_1.CustomError({
                    code: 400,
                    message: "Sem permissão, faça login"
                });
            }
            const { id: mealId } = schema_1.idMealParamSchema.parse(req.params);
            await (0, meals_1.deleteMeal)(mealId, req.user.id);
            reply.status(204).send();
        }
        catch (error) {
            if (error instanceof CustomError_1.CustomError) {
                reply.status(error.code).send({
                    message: error.message
                });
            }
            reply.status(500).send();
        }
    }
}
exports.MealsController = MealsController;
