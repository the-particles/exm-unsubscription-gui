import { useEffect } from 'react'
import { Button } from '@pars/shared/components/ui/button'
import { useHeader } from '@pars/hooks/use-header'
import OfflineStatus from '@pars/components/offline-status'
import ThemeSwitch from '@pars/components/theme-switch'

const Settings = () => {
  // States
  const { setAction } = useHeader()

  // Effects
  useEffect(() => setAction(() => OfflineStatus), [setAction])

  // Functions
  const _onReset = async () => {
    const databases = await indexedDB.databases()
    databases.forEach(
      (database) => database.name && indexedDB.deleteDatabase(database.name),
    )
  }

  return (
    <div>
      <Button onClick={_onReset}>Reset</Button>
      <ThemeSwitch />
    </div>
  )
}

export default Settings
