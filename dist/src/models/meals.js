"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeal = exports.updateMeal = exports.createMeal = exports.getMealsCount = exports.getMealInDiet = exports.getMeal = exports.getAllMeals = void 0;
const database_1 = require("../database");
const CustomError_1 = require("../utils/CustomError");
async function getAllMeals(user_id) {
    try {
        const meals = await (0, database_1.knex)('meals')
            .where({
            user_id
        })
            .select([
            'id',
            'name',
            'description',
            'in_diet',
            'time',
            'created_at',
            'user_id'
        ]);
        return {
            meals,
            total: meals.length
        };
    }
    catch (error) {
        throw error;
    }
}
exports.getAllMeals = getAllMeals;
async function getMeal(id, user_id) {
    try {
        const meal = await (0, database_1.knex)('meals')
            .where({
            id,
            user_id
        })
            .select([
            'id',
            'name',
            'description',
            'in_diet',
            'time',
            'created_at',
            'user_id'
        ])
            .first();
        if (!meal) {
            throw new CustomError_1.CustomError({
                code: 500,
                message: 'Refeição não encontrada!'
            });
        }
        return meal;
    }
    catch (error) {
        throw error;
    }
}
exports.getMeal = getMeal;
async function getMealInDiet(in_diet, user_id) {
    try {
        const meals = await (0, database_1.knex)('meals')
            .where({
            in_diet,
            user_id
        })
            .select([
            'id',
            'name',
            'description',
            'in_diet',
            'time',
            'created_at',
            'user_id'
        ]);
        if (!meals) {
            throw new CustomError_1.CustomError({
                code: 500,
                message: 'Refeição não encontrada!'
            });
        }
        return {
            meals,
            total: meals.length
        };
    }
    catch (error) {
        throw error;
    }
}
exports.getMealInDiet = getMealInDiet;
async function getMealsCount(user_id, in_diet) {
    try {
        const mealsCount = await (0, database_1.knex)("meals").where((builder) => {
            if (in_diet != null) {
                builder.where({
                    user_id,
                    in_diet
                });
            }
            builder.where({ user_id });
        }).count({ count: '*' });
        return mealsCount[0].count ?? 0;
    }
    catch (error) {
        throw error;
    }
}
exports.getMealsCount = getMealsCount;
async function createMeal(meal) {
    try {
        await (0, database_1.knex)('meals').insert(meal);
    }
    catch (error) {
        throw error;
    }
}
exports.createMeal = createMeal;
async function updateMeal(newMeal) {
    try {
        const updatedMeal = await (0, database_1.knex)('meals')
            .where({
            id: newMeal.id,
        })
            .update({
            name: newMeal.name,
            description: newMeal.description,
            in_diet: newMeal.in_diet ? 1 : 0,
            user_id: newMeal.user_id,
            updated_at: new Date().toISOString()
        }, [
            'id',
            'name',
            'description',
            'in_diet',
            'time',
            'created_at',
            'user_id'
        ]);
        return updatedMeal[0];
    }
    catch (error) {
        throw error;
    }
}
exports.updateMeal = updateMeal;
async function deleteMeal(id, user_id) {
    try {
        await (0, database_1.knex)('meals')
            .where({
            id,
            user_id
        })
            .del();
    }
    catch (error) {
        throw error;
    }
}
exports.deleteMeal = deleteMeal;
