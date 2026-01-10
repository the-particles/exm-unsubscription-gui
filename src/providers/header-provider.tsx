import {
  type ComponentType,
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
} from 'react'
import type { ProviderProps } from '@pars/interfaces/provider'

export interface HeaderState {
  Action: ComponentType | null
  setAction: Dispatch<SetStateAction<ComponentType | null>>
}

const INITIAL_STATE: HeaderState = {
  Action: null,
  setAction: () => {},
}

export const HeaderContext = createContext<HeaderState>(INITIAL_STATE)

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
