import { createContext, useEffect, useState } from 'react'
import type { ProviderProps } from '@pars/interfaces/provider'

const THEME_KEY = 'subscription-ui-theme'

type Theme = 'dark' | 'light' | 'system'
interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}
interface ThemeProviderProps extends ProviderProps {
  defaultTheme?: Theme
}

const INITIAL_STATE: ThemeState = {
  theme: 'system',
  setTheme: () => null,
}
export const ThemeContext = createContext<ThemeState>(INITIAL_STATE)

const ThemeProvider = ({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) => {
  // States
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(THEME_KEY) as Theme) || defaultTheme,
  )
  const _value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(THEME_KEY, theme)
      setTheme(theme)
    },
  }

  // Effects
  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={_value}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider
