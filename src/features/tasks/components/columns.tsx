'use client'

import { ArrowUpDown, MoreVertical } from 'lucide-react'

import { ColumnDef } from '@tanstack/table-core'
import { Task } from '@/features/tasks/types'
import { Button } from '@/components/ui/button'
import { ProjectsAvatar } from '@/features/projects/components/projects-avatar'
import { MemberAvatar } from '@/features/members/components/member-avatar'
import { TaskDate } from '@/features/tasks/components/task-date'
import { Badge } from '@/components/ui/badge'
import { snakeCaseToTitleCase } from '@/lib/utils'
import { TaskActions } from '@/features/tasks/components/task-actions'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="border-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Название задачи
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.original.name

      return <p className="line-clamp-1">{name}</p>
    },
  },
  {
    accessorKey: 'project',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="border-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Проект
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const project = row.original.project

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <ProjectsAvatar className="size-6" name={project.name} image={project.imageUrl} />
          <p className="line-clamp-1">{project?.name ?? 'Название проекта'}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="border-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Наблюдатель
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <MemberAvatar fallbackClassName="text-xs" className="size-6" name={assignee.name} />
          <p className="line-clamp-1">{assignee?.name ?? 'Наблюдатель'}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="border-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Дата окончания
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate

      return <TaskDate value={dueDate} />
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="border-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Статус
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.status

      //TODO: works but should be fixed
      // @ts-ignore
      return <Badge variant={status}>{snakeCaseToTitleCase(status)}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.$id
      const projectId = row.original.projectId

      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      )
    },
  },
]
