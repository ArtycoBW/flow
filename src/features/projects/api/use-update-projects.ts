import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type ResponseType = InferResponseType<(typeof client.api.projects)[':projectId']['$patch'], 200>
type RequestType = InferRequestType<(typeof client.api.projects)[':projectId']['$patch']>

export const useUpdateProjects = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.projects[':projectId']['$patch']({ form, param })

      if (!response.ok) {
        throw new Error('Произошла ошибка при обновлении проекта')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Проект успешно обновлен')
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', data.$id] })
    },
    onError: () => {
      toast.error('Произошла ошибка при обновлении проекта')
    },
  })

  return mutation
}
