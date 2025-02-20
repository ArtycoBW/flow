import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface WorkspaceAvatarProps {
  image?: string
  name: string
  className?: string
}

export const WorkspaceAvatar = ({ image, name, className }: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div className={cn('relative size-10 overflow-hidden rounded-md', className)}>
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    )
  }
  return (
    <Avatar className={cn('size-10', className)}>
      <AvatarFallback className="text-white bg-orange-500 font-semibold text-lg uppercase">{name[0]}</AvatarFallback>
    </Avatar>
  )
}
