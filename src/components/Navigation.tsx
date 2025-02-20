'use client'

import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { cn } from '@/lib/utils'
import { SettingsIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go'

const routes = [
  {
    label: 'Главная',
    href: '',
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: 'Мои задачи',
    href: '/tasks',
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: 'Настройки',
    href: '/settings',
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },

  {
    label: 'Участники',
    href: '/members',
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
]

export const Navigation = () => {
  const workspaceId = useWorkspaceId()
  const pathname = usePathname()

  return (
    <ul className="flex flex-col">
      {routes.map(route => {
        const fullHref = `/workspaces/${workspaceId}${route.href}`
        const isActive = pathname === fullHref
        const Icon = isActive ? route.activeIcon : route.icon

        return (
          <Link key={route.href} href={fullHref}>
            <div
              className={cn(
                'flex items-center gap-2.5 p-2.5 rounded-md font-medium text-neutral-500 hover:text-primary transition',
                isActive && 'bg-white shadow-sm hover:opacity-100 text-primary',
              )}>
              <Icon className={cn('size-5 text-neutral-500', isActive && 'text-primary')} />
              {route.label}
            </div>
          </Link>
        )
      })}
    </ul>
  )
}
