import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.workspaces)[':workspaceId']['$delete'], 200>
type RequestType = InferRequestType<(typeof client.api.workspaces)[':workspaceId']['$delete']>

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[':workspaceId']['$delete']({ param })

      if (!response.ok) {
        throw new Error('Произошла ошибка при удалении рабочего пространства')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Рабочее пространство успешно удалён')
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      queryClient.invalidateQueries({ queryKey: ['workspace', data.$id] })
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении рабочего пространства')
    },
  })

  return mutation
}
