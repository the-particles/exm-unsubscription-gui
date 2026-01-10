import { useContext } from 'react'
import { NavigationContext } from '@pars/providers/navigation-provider'

export const useNavigation = () => {
  const context = useContext(NavigationContext)

  if (context === undefined)
    throw new Error(
      `${useNavigation.name} must be used within a its corresponding context`,
    )

  return context
}
