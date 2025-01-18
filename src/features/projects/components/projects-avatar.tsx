import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ProjectsProps {
  image?: string
  name: string
  className?: string
  fallbackClassName?: string
}

export const ProjectsAvatar = ({ image, name, className, fallbackClassName }: ProjectsProps) => {
  if (image) {
    return (
      <div className={cn('relative size-5 overflow-hidden rounded-md', className)}>
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    )
  }
  return (
    <Avatar className={cn('size-5', className)}>
      <AvatarFallback className={cn('text-white bg-orange-500 font-semibold text-sm uppercase', fallbackClassName)}>
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}
