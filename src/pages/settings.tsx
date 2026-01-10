import { useEffect } from 'react'
import { useHeader } from '@pars/providers/use-header'
import OfflineStatus from '@pars/components/offline-status'

const Settings = () => {
  const { setAction } = useHeader()

  useEffect(() => setAction(<OfflineStatus />), [setAction])

  return <div>Settings Page works</div>
}

export default Settings
