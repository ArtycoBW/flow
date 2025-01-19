'use client'

import { useTaskId } from '@/features/tasks/hooks/use-task-id'
import { useGetTask } from '@/features/tasks/api/use-get-task'
import { PageLoader } from '@/features/tasks/components/page-loader'
import { PageError } from '@/features/tasks/components/page-error'
import { TaskBreadCrumbs } from '@/features/tasks/components/task-breadcrumbs'
import { DottedSeparator } from '@/components/dotted-separator'
import { TaskOverview } from '@/features/tasks/components/task-overview'
import { TaskDescription } from '@/features/tasks/components/task-description'

export const TaskIdClient = () => {
  const taskId = useTaskId()
  const { data, isLoading } = useGetTask({ taskId })

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return <PageError message="Задача не найдена" />
  }

  return (
    <div className="flex flex-col">
      <TaskBreadCrumbs project={data?.project} task={data} />
      <DottedSeparator className="my-4" />
      <div className="grid grid-cols-1 lg:grid:cols-2 gap-4">
        <TaskOverview task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  )
}
