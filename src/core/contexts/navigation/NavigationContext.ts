import { type Dispatch, type SetStateAction, createContext } from 'react'

interface NavigationState {
  current: string
  setCurrent: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
}

const INITIAL_STATE: NavigationState = {
  current: 'dashboard',
  setCurrent: () => {},
  description: '',
  setDescription: () => {},
}
const NavigationContext = createContext<NavigationState>(INITIAL_STATE)

export default NavigationContext
