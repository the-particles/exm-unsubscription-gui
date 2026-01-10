import { type Dispatch, type SetStateAction, createContext } from 'react'

interface DimensionState {
  navigationBarHeight: number
  setNavigationBarHeight: Dispatch<SetStateAction<number>>
}

const INITIAL_STATE: DimensionState = {
  navigationBarHeight: 0,
  setNavigationBarHeight: () => {},
}

const DimensionContext = createContext<DimensionState>(INITIAL_STATE)

export default DimensionContext
