import { createContext } from 'react'

type Theme = 'dark' | 'light' | 'system'
interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const INITIAL_STATE: ThemeState = {
  theme: 'system',
  setTheme: () => null,
}
const ThemeContext = createContext<ThemeState>(INITIAL_STATE)

export default ThemeContext
