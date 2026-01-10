import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
} from 'react'
import type { ProviderProps } from '@pars/interfaces/provider'

interface DimensionState {
  navigationBarHeight: number
  setNavigationBarHeight: Dispatch<SetStateAction<number>>
}

const INITIAL_STATE: DimensionState = {
  navigationBarHeight: 0,
  setNavigationBarHeight: () => {},
}
export const DimensionContext = createContext<DimensionState>(INITIAL_STATE)

const DimensionProvider = ({ children }: ProviderProps) => {
  // States
  const [navigationBarHeight, setNavigationBarHeight] = useState<number>(0)

  return (
    <DimensionContext.Provider
      value={{ navigationBarHeight, setNavigationBarHeight }}
    >
      {children}
    </DimensionContext.Provider>
  )
}

export default DimensionProvider
