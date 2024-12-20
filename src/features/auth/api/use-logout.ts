import { client } from '@/lib/rpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferResponseType } from 'hono'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.auth.logout)['$post']>

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout['$post']()

      if (!response.ok) {
        throw new Error('Произошла ошибка при выходе из аккаунта')
      }

      return await response.json()
    },

    onSuccess: () => {
      toast.success('Вы успешно вышли из аккаунта')
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['current'] })
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
    },
    onError: () => {
      toast.error('Произошла ошибка при выходе из аккаунта')
    },
  })

  return mutation
}
