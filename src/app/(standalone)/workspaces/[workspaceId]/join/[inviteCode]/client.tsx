'use client'

import React from 'react'

import { JoinWorkspaceForm } from '@/features/workspaces/components/join-workspace-form'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { PageLoader } from '@/features/tasks/components/page-loader'
import { PageError } from '@/features/tasks/components/page-error'
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info'

export const WorkspaceIdJoinClient = () => {
  const workspaceId = useWorkspaceId()
  const { data: initialValues, isLoading } = useGetWorkspaceInfo({ workspaceId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!initialValues) {
    return <PageError message="проект не найдена" />
  }

  return (
    <div className="w-full lg:max-w-2xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  )
}
