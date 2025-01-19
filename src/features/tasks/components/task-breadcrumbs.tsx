import { Project } from '@/features/projects/types'
import { Task } from '@/features/tasks/types'
import { ProjectsAvatar } from '@/features/projects/components/projects-avatar'
import Link from 'next/link'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import { useDeleteTasks } from '@/features/tasks/api/use-delete-tasks'
import { useConfirm } from '@/hooks/use-confirm'
import { useRouter } from 'next/navigation'

interface TaskBreadcrumbsProps {
  project: Project
  task: Task
}

export const TaskBreadCrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()

  const { mutate, isPending } = useDeleteTasks()
  const [ConfirmDialog, confirm] = useConfirm('Удалить задачу', 'Это действие необратимо', 'destructive')

  const handleDeleteTask = async () => {
    const ok = await confirm()
    if (!ok) return

    mutate(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`)
        },
      },
    )
  }

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <ProjectsAvatar name={project?.name} image={project?.imageUrl} className="size-6 lg:size-8" />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project?.name}
        </p>
      </Link>
      <ChevronRightIcon className="text-sm lg:text-lg font-semibold" />
      <p className="text-sm lg:text-lg font-semibold">{task?.name}</p>
      <Button onClick={handleDeleteTask} disabled={isPending} className="ml-auto" variant="destructive" size="sm">
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Удалить задачу</span>
      </Button>
    </div>
  )
}
