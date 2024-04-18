import { FastifyReply, FastifyRequest } from "fastify";
import { createMeal, deleteMeal, getAllMeals, getMeal, getMealInDiet, getMealsCount, updateMeal } from "../../models/meals";
import { bestSequenceMealsInDiet } from "../../services/bestSequenceMealsInDiet";
import { CustomError } from "../../utils/CustomError";
import { generateShortUUID } from "../../utils/generateShorUUID";
import { createMealBodySchema, idMealParamSchema, inDietQueryParamSchema, mealsCountParamSchema, updateMealBodySchema } from "./schema";

export class MealsController{
  public async createMeal(req: FastifyRequest, reply: FastifyReply){
    try {
      if (!req.user?.id) {
        throw new CustomError({
          code: 400,
          message: "Sem permissão, faça login"
        })
      }

      const newMeal = createMealBodySchema.parse(req.body)

      await createMeal({
        ...newMeal,
        user_id: req.user?.id,
        id: generateShortUUID(),
      })

      reply.status(201).send({
        message: "Refeição cadastrada com sucesso!"
      })

    } catch (error) {
      if (error instanceof CustomError) { 
        reply.status(error.code).send({
          message: error.message
        })
      }

      reply.status(500).send()
      throw error
    } 
  }

  public async updateMeal(req: FastifyRequest, reply: FastifyReply) { 
    try {
      if (!req.user?.id) {
        throw new CustomError({
          code: 400,
          message: "Sem permissão, faça login"
        })
      }

      const receivedMeal = updateMealBodySchema.parse(req.body)
      const { id: mealId } = idMealParamSchema.parse(req.params)

      const updatedMeal = await updateMeal({
        ...receivedMeal,
        id: mealId,
        user_id: req.user.id
      })

      reply.status(200).send({ updatedMeal })
      
    } catch (error) {
      if (error instanceof CustomError) { 
        reply.status(error.code).send({
          message: error.message
        })
      }

      reply.status(500).send()
    }
  }

  public async getAllMeals(req: FastifyRequest, reply: FastifyReply) {
    try {
      if (!req.user?.id) {
        throw new CustomError({
          code: 400,
          message: "Sem permissão, faça login"
        })
      }

      const meals = await getAllMeals(req.user.id)

      reply.status(200).send(meals)
    } catch (error) {
      if (error instanceof CustomError) { 
        reply.status(error.code).send({
          message: error.message
        })
      }

      reply.status(500).send()
    }
  }

  public async getMealsCount(req: FastifyRequest, reply: FastifyReply) {
    try {
      if (!req.user?.id) {
        throw new CustomError({
          code: 400,
          message: "Sem permissão, faça login"
        })
      }

      const { in_diet } = mealsCountParamSchema.parse(req.query)
      const mealsCount = await getMealsCount(req.user.id, in_diet)

      return reply.status(200).send({
        count: mealsCount
      })

    } catch (error) {
      if (error instanceof CustomError) { 
        reply.status(error.code).send({
          message: error.message
        })
      }

      reply.status(500).send()
    }
  }
  
  public async getMeal(req: FastifyRequest, reply: FastifyReply) {
    try {
      if (!req.user?.id) {
        throw new CustomError({
          code: 400,
          message: "Sem permissão, faça login"
        })
      }

      const { id: mealId } = idMealParamSchema.parse(req.params)
      const meal = await getMeal(mealId, req.user?.id)

      if (!meal) {
        throw new CustomError({
          code: 404,
          message: "Não foi encontrada nenhuma refeição com este ID"
        })
      }

      reply.status(200).send({
        meal
      })

    } catch (error) {
      if (error instanceof CustomError) { 
        reply.status(error.code).send({
          message: error.message
        })
      }
  
      reply.status(500).send()
    }
  }
  public async getMealInDiet(req: FastifyRequest, reply: FastifyReply) {
    try {
      if (!req.user?.id) {
        throw new CustomError({
          code: 400,
          message: "Sem permissão, faça login"
        })
      }

      const { in_diet } = inDietQueryParamSchema.parse(req.query)
      const meals = await getMealInDiet(!!in_diet, req.user?.id)

      reply.status(200).send(meals)

    } catch (error) {
      if (error instanceof CustomError) { 
        reply.status(error.code).send({
          message: error.message
        })
      }
  
      reply.status(500).send()
    }
  }

  public async getBestSequenceMealInDiet(req: FastifyRequest, reply: FastifyReply) {
    try {
      if (!req.user?.id) {
        throw new CustomError({
          code: 400,
          message: "Sem permissão, faça login"
        })
      }

      const mealsSequence = await bestSequenceMealsInDiet(req.user.id)

      reply.status(200).send({
        bestSequence: mealsSequence
      })

    } catch (error) {
      if (error instanceof CustomError) { 
        reply.status(error.code).send({
          message: error.message
        })
      }
  
      reply.status(500).send()
    }
  }

  public async deleteMeal(req: FastifyRequest, reply: FastifyReply) {
    try {
      if (!req.user?.id) {
        throw new CustomError({
          code: 400,
          message: "Sem permissão, faça login"
        })
      }

      const { id: mealId } = idMealParamSchema.parse(req.params)

      await deleteMeal(mealId, req.user.id)

      reply.status(204).send()

    } catch (error) {
      if (error instanceof CustomError) { 
        reply.status(error.code).send({
          message: error.message
        })
      }
  
      reply.status(500).send()
    }
  }
}