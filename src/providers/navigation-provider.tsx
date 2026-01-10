import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
} from 'react'
import type { ProviderProps } from '@pars/interfaces/provider'

interface NavigationState {
  current: string
  setCurrent: Dispatch<SetStateAction<string>>
}

const INITIAL_STATE: NavigationState = {
  current: 'dashboard',
  setCurrent: () => {},
}
export const NavigationContext = createContext<NavigationState>(INITIAL_STATE)

const NavigationProvider = ({ children }: ProviderProps) => {
  // States
  const [current, setCurrent] = useState(
    () => window.location.pathname.split('/')[1] || 'dashboard',
  )

  return (
    <NavigationContext.Provider value={{ current, setCurrent }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
