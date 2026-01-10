import {
  type ComponentType,
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from 'react'

export interface HeaderState {
  Action: ComponentType | null
  setAction: Dispatch<SetStateAction<ComponentType | null>>
}

const INITIAL_STATE: HeaderState = {
  Action: null,
  setAction: () => {},
}

export const HeaderContext = createContext<HeaderState>(INITIAL_STATE)

export const useHeader = () => {
  const context = useContext(HeaderContext)

  if (context === undefined)
    throw new Error(
      `${useHeader.name} must be used within a its corresponding context`,
    )

  return context
}
