import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type ResponseType = InferResponseType<(typeof client.api.workspaces)[':workspaceId']['reset-invite-code']['$post'], 200>
type RequestType = InferRequestType<(typeof client.api.workspaces)[':workspaceId']['reset-invite-code']['$post']>

export const useResetInviteCode = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspaces[':workspaceId']['reset-invite-code']['$post']({ param })

      if (!response.ok) {
        throw new Error('Произошла ошибка при сбросе кода приглашения')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Код приглашения успешно сброшен')
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      queryClient.invalidateQueries({ queryKey: ['workspace', data.$id] })
    },
    onError: () => {
      toast.error('Произошла ошибка при сбросе кода приглашения')
    },
  })

  return mutation
}
