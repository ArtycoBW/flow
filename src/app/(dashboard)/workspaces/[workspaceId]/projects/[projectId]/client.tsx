'use client'

import { ProjectsAvatar } from '@/features/projects/components/projects-avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PencilIcon } from 'lucide-react'
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher'
import { useProjectId } from '@/features/projects/hook/use-project-id'
import { useGetProject } from '@/features/projects/api/use-get-project'
import { PageLoader } from '@/features/tasks/components/page-loader'
import { PageError } from '@/features/tasks/components/page-error'

export const ProjectIdClient = () => {
  const projectId = useProjectId()
  const { data, isLoading } = useGetProject({ projectId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return <PageError message="Проект не найден" />
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ProjectsAvatar name={data?.name ?? 'Название проекта'} image={data?.imageUrl} className="size-8" />
          <p className="text-lg font-semibold">{data?.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}>
              <PencilIcon className="size-4 mr-2" />
              Изменить проект
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher hideProjectFilter />
    </div>
  )
}
