import { usePWA } from '@pars/core/contexts/pwa/usePWA'
import { CloudAlert, CloudCheck } from 'lucide-react'

const PWAStatus = () => {
  // Contexts
  const { isReadyOffline } = usePWA()

  return <div>{isReadyOffline ? <CloudCheck /> : <CloudAlert />}</div>
}

export default PWAStatus
