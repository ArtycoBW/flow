import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import { getProject } from '@/features/projects/queries'
import { EditProjectsForm } from '@/features/projects/components/edit-projects-form'

interface SettingPageProps {
  params: {
    projectId: string
  }
}

const SettingPage = async ({ params }: SettingPageProps) => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  const initialValues = await getProject({
    projectId: params.projectId,
  })

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectsForm initialValues={initialValues} />
    </div>
  )
}

export default SettingPage
