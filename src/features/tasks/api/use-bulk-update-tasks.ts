import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.tasks)['bulk-update']['$post'], 200>
type RequestType = InferRequestType<(typeof client.api.tasks)['bulk-update']['$post']>

export const useBulkUpdateTasks = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks['bulk-update']['$post']({ json })

      if (!response.ok) {
        throw new Error('Произошла ошибка при обновлении задач')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Задачи успешно обновлены')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => {
      toast.error('Произошла ошибка при обновлении задач')
    },
  })

  return mutation
}
