import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/rpc'

interface UseGetProjectProps {
  projectId: string
}

export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  const query = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await client.api.projects[':projectId'].$get({ param: { projectId } })

      if (!response.ok) {
        throw new Error('Произошла ошибка при получении проектов')
      }

      const { data } = await response.json()

      return data
    },
  })

  return query
}
