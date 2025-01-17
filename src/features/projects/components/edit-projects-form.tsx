'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { DottedSeparator } from '@/components/dotted-separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateProjectSchema } from '../schemas'
import { useUpdateProjects } from '../api/use-update-projects'
import { Project } from '../types'
import { useConfirm } from '@/hooks/use-confirm'
import { useDeleteProjects } from '@/features/projects/api/use-delete-projects'

interface EditProjectsFormProps {
  onCancel?: () => void
  initialValues: Project
}

export function EditProjectsForm({ onCancel, initialValues }: EditProjectsFormProps) {
  const router = useRouter()
  const { mutate, isPending } = useUpdateProjects()
  const { mutate: deleteProject, isPending: isDeletingProject } = useDeleteProjects()

  const [DeleteDialog, confirmDelete] = useConfirm('Удаление проекта', 'Это действие необратимо', 'destructive')

  const inputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? '',
    },
  })

  const handleDelete = async () => {
    const ok = await confirmDelete()

    if (!ok) return

    deleteProject(
      {
        param: { projectId: initialValues.$id },
      },
      {
        onSuccess: () => {
          window.location.href = `/workspaces/${initialValues.workspaceId}`
        },
      },
    )
  }

  const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
    const finalValues = { ...values, image: values.image instanceof File ? values.image : '' }

    mutate(
      {
        form: finalValues,
        param: { projectId: initialValues.$id },
      },
      {
        onSuccess: () => {
          form.reset()
        },
      },
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      form.setValue('image', file)
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)
            }>
            <ArrowLeft size={4} />
            Отменить
          </Button>
          <CardTitle className="text-xl font-bold">{initialValues.name}</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название рабочего пространства</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Введите название проекта" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              alt="Logo"
                              fill
                              className="object-cover"
                              src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value}
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Иконка проекта</p>
                          <p className="text-sm text-muted-foreground">JPG, PNG, SVG или JPEG, не более 1МБ</p>
                          {/* TODO: добавить gif, когда будем переносить на potgress */}
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            onChange={handleImageChange}
                            disabled={isPending}
                          />
                          <Button
                            type="button"
                            disabled={isPending}
                            className="w-fit mt-2"
                            size="xs"
                            variant="territory"
                            onClick={() => inputRef.current?.click()}>
                            Изменить иконку
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex items-center justify-end">
                <Button type="submit" size="lg" disabled={isPending}>
                  Изменить проект
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Опасная зона💀</h3>
            <p className="text-sm text-muted-foreground">
              Удаление проекта является необратимым и приводит к удалению всех связанных с ним данных.
            </p>
            <DottedSeparator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              size="default"
              variant="destructive"
              disabled={isPending}
              type="button"
              onClick={handleDelete}>
              Удалить проект
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
