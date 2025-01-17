'use client'

import { ResponsiveModal } from '@/components/responsive-modal'
import { CreateProjectsForm } from './create-projects-form'
import { useCreateProjectModal } from '../hook/use-create-projects-modal'

export const CreateProjectsModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal()

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectsForm onCancel={close} />
    </ResponsiveModal>
  )
}
