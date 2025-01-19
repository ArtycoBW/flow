'use client'

import { useProjectId } from '@/features/projects/hook/use-project-id'
import { useGetProject } from '@/features/projects/api/use-get-project'
import { PageLoader } from '@/features/tasks/components/page-loader'
import { PageError } from '@/features/tasks/components/page-error'
import { EditProjectsForm } from '@/features/projects/components/edit-projects-form'

export const ProjectIdSettingsClient = () => {
  const projectId = useProjectId()
  const { data: initialValues, isLoading } = useGetProject({ projectId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!initialValues) {
    return <PageError message="проект не найдена" />
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectsForm initialValues={initialValues} />
    </div>
  )
}
