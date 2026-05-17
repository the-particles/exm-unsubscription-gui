import { useContext } from 'react'
import NavigationContext from './NavigationContext'

export const useNavigation = () => {
  const context = useContext(NavigationContext)

  if (context === undefined)
    throw new Error(
      `${useNavigation.name} must be used within a its corresponding context`,
    )

  return context
}
