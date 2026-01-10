import { useEffect, useState } from 'react'
import ThemeContext from '@pars/contexts/theme-provider'
import type { ProviderProps } from '@pars/interfaces/provider'

const THEME_KEY = 'subscription-ui-theme'

type Theme = 'dark' | 'light' | 'system'
interface ThemeProviderProps extends ProviderProps {
  defaultTheme?: Theme
}

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
  useEffect(() => {
    const handleThemeChange = (event: MediaQueryListEvent) => {
      const root = window.document.documentElement
      const _theme = event.matches ? 'dark' : 'light'

      root.classList.add(_theme)
    }
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (!darkModeMediaQuery.addEventListener) {
      darkModeMediaQuery.addListener(handleThemeChange)
      return () => darkModeMediaQuery.removeListener(handleThemeChange)
    }

    darkModeMediaQuery.addEventListener('change', handleThemeChange)
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [])

  return (
    <ThemeContext.Provider value={_value}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider
