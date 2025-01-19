'use client'

import React from 'react'
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form'
import { PageLoader } from '@/features/tasks/components/page-loader'
import { PageError } from '@/features/tasks/components/page-error'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'

export const WorkspaceIdSettingsClient = () => {
  const workspaceId = useWorkspaceId()
  const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!initialValues) {
    return <PageError message="проект не найдена" />
  }

  return (
    <div className="w-full lg:max-w-2xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  )
}
