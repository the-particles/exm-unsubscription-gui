import { useContext } from 'react'
import { PWAContext } from '@pars/providers/pwa-provider'

export const usePWA = () => {
  const context = useContext(PWAContext)

  if (context === undefined) {
    throw new Error(
      `${usePWA.name} must be used within a its corresponding context`,
    )
  }
  return context
}
