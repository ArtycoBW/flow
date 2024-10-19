import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Минимум 8 символов'),
})

export const registerSchema = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
  email: z.string().email(),
  password: z.string().min(8, 'Минимум 8 символов'),
})
