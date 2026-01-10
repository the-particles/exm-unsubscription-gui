import {
  type ComponentType,
  type Dispatch,
  type SetStateAction,
  createContext,
} from 'react'

export interface HeaderState {
  Action: ComponentType | null
  setAction: Dispatch<SetStateAction<ComponentType | null>>
}

const INITIAL_STATE: HeaderState = {
  Action: null,
  setAction: () => {},
}

const HeaderContext = createContext<HeaderState>(INITIAL_STATE)

export default HeaderContext
