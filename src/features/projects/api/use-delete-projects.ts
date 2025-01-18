import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type ResponseType = InferResponseType<(typeof client.api.projects)[':projectId']['$delete'], 200>
type RequestType = InferRequestType<(typeof client.api.projects)[':projectId']['$delete']>

export const useDeleteProjects = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[':projectId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Произошла ошибка при удалении проекта')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Проект удален')
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', data.$id] })
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении проекта')
    },
  })

  return mutation
}
