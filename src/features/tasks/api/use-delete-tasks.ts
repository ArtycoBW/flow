import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type ResponseType = InferResponseType<(typeof client.api.tasks)[':taskId']['$delete'], 200>
type RequestType = InferRequestType<(typeof client.api.tasks)[':taskId']['$delete']>

export const useDeleteTasks = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.tasks[':taskId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Произошла ошибка при удалении задачи')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Задача успешно удалена')

      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', data.$id] })
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении задачи')
    },
  })

  return mutation
}
