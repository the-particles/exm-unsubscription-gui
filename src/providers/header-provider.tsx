import { type ComponentType, type ReactNode, useState } from 'react'
import { HeaderContext } from './use-header'

interface HeaderProviderProps {
  children: ReactNode
}

const HeaderProvider = ({ children }: HeaderProviderProps) => {
  // States
  const [Action, setAction] = useState<ComponentType | null>(null)

  return (
    <HeaderContext.Provider value={{ Action, setAction }}>
      {children}
    </HeaderContext.Provider>
  )
}

export default HeaderProvider
