import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from 'react'

type DimensionState = {
  navigationBarHeight: number
  setNavigationBarHeight: Dispatch<SetStateAction<number>>
}

const INITIAL_STATE: DimensionState = {
  navigationBarHeight: 0,
  setNavigationBarHeight: () => {},
}

export const DimensionContext = createContext<DimensionState>(INITIAL_STATE)

export const useDimension = () => {
  const context = useContext(DimensionContext)

  if (context === undefined) {
    throw new Error(
      'useServiceWorker must be used within a ServiceWorkerProvider',
    )
  }
  return context
}
