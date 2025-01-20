import { toast } from 'sonner'
import { client } from '@/lib/rpc'
import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type ResponseType = InferResponseType<(typeof client.api.tasks)[':taskId']['$patch'], 200>
type RequestType = InferRequestType<(typeof client.api.tasks)[':taskId']['$patch']>

export const useUpdateTasks = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.tasks[':taskId']['$patch']({ json, param })

      if (!response.ok) {
        throw new Error('Произошла ошибка при обновлении задачи')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Задача успешно обновлена')

      queryClient.invalidateQueries({ queryKey: ['project-analytics'] })
      queryClient.invalidateQueries({ queryKey: ['workspace-analytics'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', data.$id] })
    },
    onError: () => {
      toast.error('Произошла ошибка при обновлении задачи')
    },
  })

  return mutation
}
