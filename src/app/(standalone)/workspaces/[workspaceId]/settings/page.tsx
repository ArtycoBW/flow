import React from 'react'
import { redirect } from 'next/navigation'

import { getCurrent } from '@/features/auth/queries'
import { getWorkspace } from '@/features/workspaces/queries'
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form'

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string
  }
}

const WorkspaceIdSettingsPage = async ({ params }: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent()

  if (!user) return redirect('/sign-in')

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId })

  return (
    <div className="w-full lg:max-w-2xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  )
}

export default WorkspaceIdSettingsPage
