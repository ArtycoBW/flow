import { z } from 'zod'

export const createWorkspaceSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  image: z.union([z.instanceof(File), z.string().transform((value) => (value === '' ? undefined : value))]).optional(),
})

export const editWorkspaceSchema = z.object({
  name: z.string().min(2, 'Должно быть не менее 2 символов'),
  image: z.union([z.instanceof(File), z.string().transform((value) => (value === '' ? undefined : value))]).optional(),
})
