import { useContext } from 'react'
import ThemeContext from './ThemeContext'

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined)
    throw new Error(
      `${useTheme.name} must be used within a its corresponding context`,
    )

  return context
}
