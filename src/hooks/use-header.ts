import { useContext } from 'react'
import HeaderContext from '@pars/contexts/header-context'

export const useHeader = () => {
  const context = useContext(HeaderContext)

  if (context === undefined)
    throw new Error(
      `${useHeader.name} must be used within a its corresponding context`,
    )

  return context
}
