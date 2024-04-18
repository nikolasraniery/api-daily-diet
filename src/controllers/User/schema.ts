import { z } from "zod";

export const newUserBodySchema = z.object({
  name: z.string(),
  login: z.string(),
  password: z.coerce.string()
})

export const getUserParamsSchema = z.object({
  id: z.string()
})

export const updateUserBodySchema = z.object({
  name: z.string().optional(),
  login: z.coerce.string().optional(),
  password: z.coerce.string().optional(),
  picture: z.string().optional(),
})