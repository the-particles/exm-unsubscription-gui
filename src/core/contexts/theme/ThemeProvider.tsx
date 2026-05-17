import { useEffect, useState } from 'react'
import ThemeContext from '@pars/core/contexts/theme/ThemeContext'
import type { ProviderProps } from '@pars/core/interfaces/ContextProvider'

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
    const splash = window.document.getElementById('splash')

    root.classList.remove('light', 'dark')
    splash?.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      splash?.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
    splash?.classList.add(theme)
  }, [theme])
  useEffect(() => {
    const handleThemeChange = (event: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem(THEME_KEY)
      if (currentTheme !== 'system') return

      const root = window.document.documentElement
      const splash = window.document.getElementById('splash')
      const _theme = event.matches ? 'dark' : 'light'

      root.classList.remove('light', 'dark')
      splash?.classList.remove('light', 'dark')
      root.classList.add(_theme)
      splash?.classList.add(_theme)
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
