'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { DottedSeparator } from '@/components/dotted-separator'
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal'

export const TaskViewSwitcher = () => {
  const { open } = useCreateTaskModal()

  return (
    <Tabs className="flex-1 w-full border rounded-lg">
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
        filters
        <DottedSeparator className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            Данные таблицы
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            Данные доски
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            Данные календаря
          </TabsContent>
        </>
      </div>
    </Tabs>
  )
}
