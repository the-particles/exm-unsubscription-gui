import { type ReactNode, useEffect, useState } from 'react'
import { type Theme, ThemeContext } from './use-theme'

const THEME_KEY = 'ui-theme'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
}

const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  ...props
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
    <ThemeContext.Provider {...props} value={_value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
