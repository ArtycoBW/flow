import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PencilIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { getCurrent } from '@/features/auth/queries'
import { getProject } from '@/features/projects/queries'
import { ProjectsAvatar } from '@/features/projects/components/projects-avatar'
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher'

interface ProjectIdPageProps {
  params: { projectId: string }
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  const initialValues = await getProject({
    projectId: params.projectId,
  })

  if (!initialValues) {
    throw new Error('Проект не найден')
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ProjectsAvatar
            name={initialValues?.name ?? 'Название проекта'}
            image={initialValues?.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{initialValues?.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}>
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

export default ProjectIdPage
