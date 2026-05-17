import { type Dispatch, type SetStateAction, createContext } from 'react'

interface NavigationState {
  current: string
  setCurrent: Dispatch<SetStateAction<string>>
}

const INITIAL_STATE: NavigationState = {
  current: 'dashboard',
  setCurrent: () => {},
}
const NavigationContext = createContext<NavigationState>(INITIAL_STATE)

export default NavigationContext
