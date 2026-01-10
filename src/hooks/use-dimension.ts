import { useContext } from 'react'
import { DimensionContext } from '@pars/providers/dimension-provider'

export const useDimension = () => {
  const context = useContext(DimensionContext)

  if (context === undefined) {
    throw new Error(
      `${useDimension.name} must be used within a its corresponding context`,
    )
  }
  return context
}
