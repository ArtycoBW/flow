'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { RiAddCircleFill } from 'react-icons/ri'

import { useGetProjects } from '@/features/projects/api/use-get-projects'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useCreateProjectModal } from '@/features/projects/hook/use-create-projects-modal'
import { ProjectsAvatar } from '@/features/projects/components/projects-avatar'
import { cn } from '@/lib/utils'

export const Projects = () => {
  const projectId = null
  const { open } = useCreateProjectModal()
  const pathname = usePathname()
  const workspaceId = useWorkspaceId()
  const { data } = useGetProjects({ workspaceId })

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Проекты</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {data?.documents.map(project => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`
        const isActive = pathname === href

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                'flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500',
                isActive && 'bg-white shadow-sm hover:opacity-100 text-primary',
              )}>
              <ProjectsAvatar name={project.name} image={project.imageUrl} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
