import type { ReactNode } from 'react'

export type ProviderProps<T extends object = object> = {
  children: ReactNode
} & T
