import { Task } from '@/features/tasks/types'
import { Button } from '@/components/ui/button'
import { PencilIcon, XIcon } from 'lucide-react'
import { DottedSeparator } from '@/components/dotted-separator'
import { useState } from 'react'
import { useUpdateTasks } from '@/features/tasks/api/use-update-tasks'
import { Textarea } from '@/components/ui/textarea'

interface TaskDescriptionProps {
  task: Task
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(task?.description)

  const { mutate, isPending } = useUpdateTasks()

  const handleSave = () => {
    mutate(
      {
        json: { description: value },
        param: { taskId: task?.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    )
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Описание</p>
        <Button size="sm" variant="secondary" onClick={() => setIsEditing(prev => !prev)}>
          {isEditing ? <XIcon className="size-4 mr-2" /> : <PencilIcon className="size-4 mr-2" />}
          {isEditing ? 'Отменить' : 'Изменить'}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Добавьте описание"
            value={value}
            rows={4}
            onChange={e => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button size="sm" className="w-fit ml-auto" onClick={handleSave} disabled={isPending}>
            {isPending ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </div>
      ) : (
        <div>{task?.description || <span className="text-muted-foreground">Нет описания</span>}</div>
      )}
    </div>
  )
}
