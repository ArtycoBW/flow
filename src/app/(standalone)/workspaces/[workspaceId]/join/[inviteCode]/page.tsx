import { getCurrent } from '@/features/auth/queries'
import { JoinWorkspaceForm } from '@/features/workspaces/components/join-workspace-form'
import { getWorkspaceInfo } from '@/features/workspaces/queries'

import { redirect } from 'next/navigation'

interface WorkspaceIdJoinPageProps {
  params: {
    workspaceId: string
  }
}

const WorkspaceJoinPage = async ({ params }: WorkspaceIdJoinPageProps) => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  const initialValues = await getWorkspaceInfo({ workspaceId: params.workspaceId })

  if (!initialValues) return redirect('/')

  return (
    <div className="w-full lg:max-w-2xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  )
}

export default WorkspaceJoinPage
