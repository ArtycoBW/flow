'use client'

import { Loader, PlusIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DottedSeparator } from '@/components/dotted-separator'

import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useGetTasks } from '@/features/tasks/api/use-get-tasks'
import { DataFilters } from '@/features/tasks/components/data-filters'
import { DataTable } from '@/features/tasks/components/data-table'
import { columns } from '@/features/tasks/components/columns'

import { useCreateTaskModal } from '../hooks/use-create-task-modal'
import { useTaskFilters } from '../hooks/use-task-filters'

export const TaskViewSwitcher = () => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters()
  const [view, setView] = useQueryState('task-view', { defaultValue: 'table' })

  const workspaceId = useWorkspaceId()
  const { open } = useCreateTaskModal()

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    status,
    assigneeId,
    projectId,
    dueDate,
  })

  return (
    <Tabs defaultValue={view} onValueChange={setView} className="flex-1 w-full border rounded-lg">
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              Таблица
            </TabsTrigger>
            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Доска
            </TabsTrigger>
            <TabsTrigger value="calendar" className="h-8 w-full lg:w-auto">
              Календарь
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}
