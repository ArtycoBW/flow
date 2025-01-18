import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  image: z.union([z.instanceof(File), z.string().transform(value => (value === '' ? undefined : value))]).optional(),
  workspaceId: z.string(),
})
