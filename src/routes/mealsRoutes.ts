import { FastifyInstance } from "fastify"
import { authorize } from "../middlewares/authorization"
import { MealsController } from "../controllers/Meals/MealsController"

const mealController = new MealsController()
export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req, reply) => authorize(req, reply))
  
    /**GET ALL MEALS */
  app.get('/', mealController.getAllMeals)
  /**GET A SPECIFIC MEAL */
  app.get('/:id', mealController.getMeal)
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
  } ,mealController.getMealInDiet)
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
  } ,mealController.getMealsCount)
  /** Metrics for all meals*/
  app.get('/best_sequence', mealController.getBestSequenceMealInDiet)
  /**Create a meal */
  app.post('/', mealController.createMeal)
  /**Update a meal */
  app.patch('/:id', mealController.updateMeal)
  /** Delete a meal */
  app.delete('/:id', mealController.deleteMeal)

}