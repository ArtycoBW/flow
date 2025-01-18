'use client'
import Link from 'next/link'
import { Fragment } from 'react'
import { ArrowLeftIcon, MoreVerticalIcon } from 'lucide-react'

import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useGetMembers } from '@/features/members/api/use-get-members'
import { MemberAvatar } from '@/features/members/components/member-avatar'
import { useDeleteMember } from '@/features/members/api/use-delete-member'
import { useUpdateMember } from '@/features/members/api/use-update-member'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DottedSeparator } from '@/components/dotted-separator'
import { Separator } from '@/components/ui/separator'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MemberRole } from '@/features/members/types'
import { useConfirm } from '@/hooks/use-confirm'

export const MembersList = () => {
  const workspaceId = useWorkspaceId()
  const [ConfirmDialog, confirm] = useConfirm('Удалить участника', 'Этот участник будет удален из пространства')

  const { data } = useGetMembers({ workspaceId })
  const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember()
  const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember()

  const hadnleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({
      json: { role },
      param: { memberId },
    })
  }

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm()
    if (!ok) return

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload()
        },
      },
    )
  }

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="size-4 mr-0.5" />
            Назад
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Список участников</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar className="size-10" name={member.name} />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="ml-auto">
                    <MoreVerticalIcon className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() => hadnleUpdateMember(member.$id, MemberRole.ADMIN)}
                    disabled={isUpdatingMember}>
                    Сделать администратором
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() => hadnleUpdateMember(member.$id, MemberRole.MEMBER)}
                    disabled={isUpdatingMember}>
                    Сделать участником
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-amber-700"
                    onClick={() => handleDeleteMember(member.$id)}
                    disabled={isDeletingMember}>
                    Удалить {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && <Separator className="my-2.5 bg-neutral-500" />}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  )
}
