import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.tasks)['$post'], 200>
type RequestType = InferRequestType<(typeof client.api.tasks)['$post']>

export const useCreateTasks = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks['$post']({ json })

      if (!response.ok) {
        throw new Error('Произошла ошибка при создании задачи')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Задача успешно создана')

      queryClient.invalidateQueries({ queryKey: ['project-analytics'] })
      queryClient.invalidateQueries({ queryKey: ['workspace-analytics'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => {
      toast.error('Произошла ошибка при создании задачи')
    },
  })

  return mutation
}
