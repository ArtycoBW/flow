'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm">Что-то пошло не так...</p>
      <Button variant="secondary" size="sm">
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
