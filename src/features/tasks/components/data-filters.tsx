'use client'

import { useGetProjects } from '@/features/projects/api/use-get-projects'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useGetMembers } from '@/features/members/api/use-get-members'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FolderIcon, ListChecksIcon, UserIcon } from 'lucide-react'
import { SelectSeparator } from '@/components/ui/select'
import { TaskStatus } from '@/features/tasks/types'
import { useTaskFilters } from '@/features/tasks/hooks/use-task-filters'
import { DatePicker } from '@/components/date-picker'

interface DataFilterProps {
  hideProjectFilter?: boolean
}

export const DataFilters = ({ hideProjectFilter }: DataFilterProps) => {
  const workspaceId = useWorkspaceId()

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId })
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId })

  const isLoading = isLoadingProjects || isLoadingMembers

  const projectOptions = projects?.documents.map(project => ({
    value: project.$id,
    label: project.name,
  }))

  const memberOptions = members?.documents.map(member => ({
    value: member.$id,
    label: member.name,
  }))

  const [{ status, assigneeId, projectId, dueDate }, setFilters] = useTaskFilters()

  const onStatusChange = (value: string) => {
    setFilters({ status: value === 'all' ? null : (value as TaskStatus) })
  }

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === 'all' ? null : (value as string) })
  }

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === 'all' ? null : (value as string) })
  }

  if (isLoading) return null

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select defaultValue={status ?? undefined} onValueChange={value => onStatusChange(value)}>
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 h-4 w-4 mr-2" />
            <SelectValue placeholder="Все статусы" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все статусы</SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>Бэклог</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>В работе</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>На ревью</SelectItem>
          <SelectItem value={TaskStatus.TODO}>Открыто</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Готово</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue={assigneeId ?? undefined} onValueChange={value => onAssigneeChange(value)}>
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 h-4 w-4 mr-2" />
            <SelectValue placeholder="Все наблюдатели" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все наблюдатели</SelectItem>
          <SelectSeparator />
          {memberOptions?.map(member => (
            <SelectItem value={member.value} key={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {!hideProjectFilter && (
        <Select defaultValue={projectId ?? undefined} onValueChange={value => onProjectChange(value)}>
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <FolderIcon className="size-4 h-4 w-4 mr-2" />
              <SelectValue placeholder="Все проекты" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все проекты</SelectItem>
            <SelectSeparator />
            {projectOptions?.map(project => (
              <SelectItem value={project.value} key={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        placeholder="Дата завершения"
        className="h-8 2-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={date => {
          setFilters({ dueDate: date ? date.toISOString() : null })
        }}
      />
    </div>
  )
}
