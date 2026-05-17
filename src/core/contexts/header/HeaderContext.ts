import {
  type ComponentType,
  type Dispatch,
  type SetStateAction,
  createContext,
} from 'react'

export interface HeaderState {
  Action: ComponentType | null
  setAction: Dispatch<SetStateAction<ComponentType | null>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
}

const INITIAL_STATE: HeaderState = {
  Action: null,
  setAction: () => {},
  description: '',
  setDescription: () => {},
}

const HeaderContext = createContext<HeaderState>(INITIAL_STATE)

export default HeaderContext
