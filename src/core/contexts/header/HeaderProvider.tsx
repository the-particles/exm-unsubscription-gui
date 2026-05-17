import { type ComponentType, useState } from 'react'
import type { ProviderProps } from '@pars/core/interfaces/ContextProvider'
import HeaderContext from './HeaderContext'

const HeaderProvider = ({ children }: ProviderProps) => {
  // States
  const [Action, setAction] = useState<ComponentType | null>(null)
  const [description, setDescription] = useState<string>('')
  const _value = {
    Action,
    setAction,
    description,
    setDescription,
  }

  return (
    <HeaderContext.Provider value={_value}>{children}</HeaderContext.Provider>
  )
}

export default HeaderProvider
