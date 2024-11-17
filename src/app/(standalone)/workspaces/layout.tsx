import UserButton from '@/features/auth/components/user-button'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface StandloneLayoutProps {
  children: ReactNode
}
const StandloneLayout = ({ children }: StandloneLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={152} height={54} />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">{children}</div>
      </div>
    </main>
  )
}

export default StandloneLayout