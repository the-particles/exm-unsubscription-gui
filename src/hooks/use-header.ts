import { useContext } from 'react'
import { HeaderContext } from '@pars/providers/header-provider'

export const useHeader = () => {
  const context = useContext(HeaderContext)

  if (context === undefined)
    throw new Error(
      `${useHeader.name} must be used within a its corresponding context`,
    )

  return context
}
