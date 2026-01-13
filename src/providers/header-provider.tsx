import { type ComponentType, useState } from 'react'
import HeaderContext from '@pars/contexts/header-context'
import type { ProviderProps } from '@pars/interfaces/context-provider'

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
