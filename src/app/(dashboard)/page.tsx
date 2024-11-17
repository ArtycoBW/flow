import { getCurrent } from '@/features/auth/actions'
import { getWorkspace } from '@/features/workspaces/actions'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getCurrent()
  if (!user) await redirect('/sign-in')

  const workspace = await getWorkspace()
  if (workspace.total === 0) redirect('/workspaces/create')
  else redirect(`/workspaces/${workspace.documents[0].$id}`)
}
