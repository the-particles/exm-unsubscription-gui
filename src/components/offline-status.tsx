import { CloudAlert, CloudCheck } from 'lucide-react'
import { usePWA } from '@pars/providers/use-pwa'

const OfflineStatus = () => {
  const { isReadyOffline } = usePWA()

  return <div>{isReadyOffline ? <CloudCheck /> : <CloudAlert />}</div>
}

export default OfflineStatus
