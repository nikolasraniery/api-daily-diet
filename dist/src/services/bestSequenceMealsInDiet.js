"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bestSequenceMealsInDiet = void 0;
const meals_1 = require("../models/meals");
async function bestSequenceMealsInDiet(user_id) {
    const { meals } = await (0, meals_1.getAllMeals)(user_id);
    let currentSequence = 0;
    let bestSequence = 0;
    for (const meal of meals) {
        if (meal.in_diet) {
            currentSequence++;
            bestSequence = Math.max(currentSequence, bestSequence);
        }
        else {
            currentSequence = 0;
        }
    }
    return bestSequence;
}
exports.bestSequenceMealsInDiet = bestSequenceMealsInDiet;
