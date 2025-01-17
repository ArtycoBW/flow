import { z } from 'zod'
import { TaskStatus } from '@/features/tasks/types'

export const createTaskSchema = z.object({
  name: z.string().min(1, 'Минимум 1 символ'),
  status: z.nativeEnum(TaskStatus, { required_error: 'Статус задачи обязателен' }),
  workspaceId: z.string().trim().min(1, 'Минимум 1 символ'),
  projectId: z.string().trim().min(1, 'Минимум 1 символ'),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, 'Минимум 1 символ'),
  description: z.string().optional(),
})
