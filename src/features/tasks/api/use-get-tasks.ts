import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/rpc'
import { TaskStatus } from '@/features/tasks/types'

interface useGetTasksProps {
  workspaceId: string
  projectId?: string | null
  search?: string | null
  status?: TaskStatus | null
  assigneeId?: string | null
  dueDate?: string | null
}

export const useGetTasks = ({ workspaceId, projectId, search, status, assigneeId, dueDate }: useGetTasksProps) => {
  const query = useQuery({
    queryKey: ['tasks', workspaceId, projectId, status, search, assigneeId, dueDate],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          search: search ?? undefined,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      })

      if (!response.ok) {
        throw new Error('Произошла ошибка при получении задач')
      }

      const { data } = await response.json()
      return data
    },
  })

  return query
}
