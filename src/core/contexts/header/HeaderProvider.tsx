import { type ComponentType, useState } from 'react'
import HeaderContext from '@pars/core/contexts/HeaderContext'
import type { ProviderProps } from '@pars/core/interfaces/ContextProvider'

const HeaderProvider = ({ children }: ProviderProps) => {
  // States
  const [Action, setAction] = useState<ComponentType | null>(null)

  return (
    <HeaderContext.Provider value={{ Action, setAction }}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderProvider
