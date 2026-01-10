import { createContext } from 'react'

interface PWAState {
  isReadyOffline: boolean
  hasNewWorker: boolean
}

const INITIAL_STATE: PWAState = {
  isReadyOffline: false,
  hasNewWorker: false,
}
const PWAContext = createContext<PWAState>(INITIAL_STATE)

export default PWAContext
