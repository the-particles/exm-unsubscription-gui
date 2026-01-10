import { createContext, useContext } from 'react'

type PWAState = {
  isReadyOffline: boolean
  hasNewWorker: boolean
}

const INITIAL_STATE: PWAState = {
  isReadyOffline: false,
  hasNewWorker: false,
}

export const PWAContext = createContext<PWAState>(INITIAL_STATE)

export const usePWA = () => {
  const context = useContext(PWAContext)

  if (context === undefined) {
    throw new Error(
      'useServiceWorker must be used within a ServiceWorkerProvider',
    )
  }
  return context
}
