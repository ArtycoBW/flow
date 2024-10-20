import UserButton from '@/features/auth/components/user-button'
import React from 'react'
import { MobileSidebar } from './mobile-sidebar'

export const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Главная</h1>
        <p className="text-muted-foreground">Отслеживайте все ваши проекты и задачи здесь</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  )
}
