import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.workspaces)['$post']>
type RequestType = InferRequestType<(typeof client.api.workspaces)['$post']>

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces['$post']({ json })

      if (!response.ok) {
        throw new Error('Произошла ошибка при создании рабочего пространства')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Рабочее пространство успешно создано')
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    },
    onError: () => {
      toast.error('Произошла ошибка при создании рабочего пространства')
    },
  })

  return mutation
}