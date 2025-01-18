import React from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLinkIcon, PencilIcon } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { useConfirm } from '@/hooks/use-confirm'

import { useDeleteTasks } from '@/features/tasks/api/use-delete-tasks'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useEditTaskModal } from '@/features/tasks/hooks/use-edit-task-modal'

interface TaskActionsProps {
  id: string
  projectId: string
  children: React.ReactNode
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { open } = useEditTaskModal()
  const [ConfirmDialog, confirm] = useConfirm('Удалить задачу', 'Это действие необратимо', 'destructive')

  const { mutate, isPending } = useDeleteTasks()

  const onDelete = async () => {
    const ok = await confirm()
    if (!ok) return

    mutate({ param: { taskId: id } })
  }

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`)
  }

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
  }

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={onOpenTask} className="font-medium p-[10px">
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Открыть задачу
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenProject} className="font-medium p-[10px">
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Открыть проект
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => open(id)} className="font-medium p-[10px">
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Изменить задачу
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px">
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Удалить задачу
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
