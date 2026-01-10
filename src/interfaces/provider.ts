import type { ReactNode } from 'react'

export type ProviderProps<T extends object = {}> = {
  children: ReactNode
} & T
