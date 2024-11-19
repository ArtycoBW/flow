'use client'

import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useJoinWorkspace } from '../api/use-join-workspace'
import { useInviteCode } from '../hooks/use-invite-code'
import { useWorkspaceId } from '../hooks/use-workspace-id'
import { useRouter } from 'next/navigation'

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string
  }
}

export const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const inviteCode = useInviteCode()
  const { mutate, isPending } = useJoinWorkspace()

  const onSubmit = () =>
    mutate(
      { param: { workspaceId }, json: { code: inviteCode } },
      { onSuccess: ({ data }) => router.push(`/workspaces/${data.$id}`) },
    )

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Присоединиться к проекту</CardTitle>
        <CardDescription>
          Вас пригласили присоединиться к <strong>{initialValues.name}</strong> проекту
        </CardDescription>
      </CardHeader>
      <DottedSeparator className="px-7" />
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button className="w-full lg:w-fit" variant="secondary" type="button" size="lg" asChild>
            <Link href="/">Отмена</Link>
          </Button>
          <Button className="w-full lg:w-fit" disabled={isPending} type="button" size="lg" onClick={onSubmit}>
            Присоединиться
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
