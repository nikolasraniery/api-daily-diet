import z from 'zod'

export const loginBodySchema = z.object({
  login: z.string(),
  password: z.coerce.string(),
})