import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'

import { useCallback, useState } from 'react'

import { Task, TaskStatus } from '@/features/tasks/types'
import { KanbanColumnHeader } from './kanban-column-header'
import { KanbanCard } from './kanban-card'

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.TODO,
  TaskStatus.DONE,
]

type TasksState = {
  [key in TaskStatus]: Task[]
}

interface DataKanbanProps {
  data: Task[]
}

export const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.DONE]: [],
    }

    data.forEach(task => {
      initialTasks[task.status].push(task)
    })

    Object.keys(initialTasks).forEach(status => {
      initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
    })

    return initialTasks
  })

  const onDradEnd = useCallback((result: DropResult) => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceStatus = source.droppableId as TaskStatus
    const destStatus = destination?.droppableId as TaskStatus

    let updatesPayload: { $id: string; status: TaskStatus; position: number }[] = []

    setTasks(prevTasks => {
      const newTasks = { ...prevTasks }

      // Safety remove the task from the source column
      const sourceColumn = [...newTasks[sourceStatus]]
      const [movedTask] = sourceColumn.splice(source.index, 1)

      // If there's no moved task, return the previous state
      if (!movedTask) {
        console.error('Задача не найдена')
        return prevTasks
      }

      // Create a new task object with potentially updated status
      const updatedMovedTask = sourceStatus !== destStatus ? { ...movedTask, status: destStatus } : movedTask

      // Update the source column
      newTasks[sourceStatus] = sourceColumn

      // Add the task to the destination column
      const destColumn = [...newTasks[destStatus]]
      destColumn.splice(destination?.index, 0, updatedMovedTask)
      newTasks[destStatus] = destColumn

      // Prepare minimal update payloads
      updatesPayload = []

      // Always update the move task
      updatesPayload.push({
        $id: updatedMovedTask.$id,
        status: destStatus,
        position: Math.min((destination?.index + 1) * 1000, 1_000_000),
      })

      // Update positions for affected tasks in the destination column
      newTasks[destStatus].forEach((task, index) => {
        if (task && task.$id !== updatedMovedTask.$id) {
          const newPosition = Math.min((index + 1) * 1000, 1_000_000)
        }
      })
    })
  }, [])

  return (
    <DragDropContext onDragEnd={onDradEnd}>
      <div className="flex overflow-x-auto">
        {boards.map(board => {
          return (
            <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
              <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
              <Droppable droppableId={board}>
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px] py-1.5">
                    {tasks[board].map((task, index) => (
                      <Draggable draggableId={task.$id} index={index} key={task.$id}>
                        {provider => (
                          <div ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps}>
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
