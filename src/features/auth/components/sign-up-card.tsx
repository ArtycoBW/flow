import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { registerSchema } from '../schema'
import { useRegister } from '../api/use-register'

export const SignUpCard = () => {
  const { mutate } = useRegister()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({
      json: values,
    })
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Регистрация</CardTitle>
        <CardDescription>
          Подписываясь, вы соглашаетесь с нашей{' '}
          <Link href="/privacy">
            <span className="text-orange-500">политикой конфиденциальности</span>
          </Link>{' '}
          и{' '}
          <Link href="/privacy">
            <span className="text-orange-500">условиями предоставления услуг</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Введите ваше имя" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Введите ваш email" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Введите ваш пароль" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={false} size="lg" className="w-full">
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-4">
        <Button variant="secondary" disabled={false} size="lg" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Войти с Google
        </Button>
        <Button variant="secondary" disabled={false} size="lg" className="w-full">
          <FaGithub className="mr-2 size-5" />
          Войти с Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>Уже есть аккаунт? </p>
        <Link href="/sign-in">
          <span className="text-orange-500">&nbsp;Войти</span>
        </Link>
      </CardContent>
    </Card>
  )
}
