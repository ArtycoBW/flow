import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInviteCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charLength = characters.length
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)

  const codeArray = new Array(length)
  for (let i = 0; i < length; i++) {
    codeArray[i] = characters[randomValues[i] % charLength]
  }

  return codeArray.join('')
}

export function snakeCaseToTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, '')
    .replace(/\b\w/g, char => char.toUpperCase())
}
