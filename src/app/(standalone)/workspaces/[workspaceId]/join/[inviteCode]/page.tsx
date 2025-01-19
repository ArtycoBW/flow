import { getCurrent } from '@/features/auth/queries'

import { redirect } from 'next/navigation'
import { WorkspaceIdJoinClient } from '@/app/(standalone)/workspaces/[workspaceId]/join/[inviteCode]/client'

const WorkspaceJoinPage = async () => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  return <WorkspaceIdJoinClient />
}

export default WorkspaceJoinPage
