"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealsRoutes = void 0;
const authorization_1 = require("../middlewares/authorization");
const MealsController_1 = require("../controllers/Meals/MealsController");
const mealController = new MealsController_1.MealsController();
async function mealsRoutes(app) {
    app.addHook('preHandler', async (req, reply) => (0, authorization_1.authorize)(req, reply));
    /**GET ALL MEALS */
    app.get('/', mealController.getAllMeals);
    /**GET A SPECIFIC MEAL */
    app.get('/:id', mealController.getMeal);
    app.get('/in_diet', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    in_diet: {
                        type: 'number',
                        default: 0,
                    }
                }
            }
        }
    }, mealController.getMealInDiet);
    app.get('/count', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    in_diet: {
                        type: ['number', 'null'],
                        default: undefined,
                    }
                }
            }
        }
    }, mealController.getMealsCount);
    /** Metrics for all meals*/
    app.get('/best_sequence', mealController.getBestSequenceMealInDiet);
    /**Create a meal */
    app.post('/', mealController.createMeal);
    /**Update a meal */
    app.patch('/:id', mealController.updateMeal);
    /** Delete a meal */
    app.delete('/:id', mealController.deleteMeal);
}
exports.mealsRoutes = mealsRoutes;
