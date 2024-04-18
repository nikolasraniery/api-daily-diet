import { z } from "zod";

export const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  in_diet: z.coerce.boolean().default(false),
  time: z.string()
})

export const updateMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  time: z.string(),
  in_diet: z.coerce.boolean(),
})

export const idMealParamSchema = z.object({
  id: z.string().min(5),
})

export const inDietQueryParamSchema = z.object({
  in_diet: z.coerce.number()
})

export const mealsCountParamSchema = z.object({
  in_diet: z.coerce.number().optional()
})