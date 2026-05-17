import { useEffect } from 'react'
import PWAStatus from '@pars/core/components/PWAStatus'
import { useHeader } from '@pars/core/contexts/header/useHeader'
import { useNavigation } from '@pars/core/contexts/navigation/useNavigation'
import { useTheme } from '@pars/core/contexts/theme/useTheme'
import { ArrowRight, Palette, Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@pars/shared/components/ui/alert-dialog'
import SettingItem from './SettingItem'

const Settings = () => {
  // States
  const { setAction } = useHeader()
  const { setDescription } = useNavigation()
  const { theme, setTheme } = useTheme()

  // Effects
  useEffect(() => {
    setDescription('Nah. The description')

    return () => setDescription('')
  }, [setDescription])
  useEffect(() => setAction(() => PWAStatus), [setAction])

  // Functions
  const _onReset = async () => {
    const databases = await indexedDB.databases()
    databases.forEach(
      (database) => database.name && indexedDB.deleteDatabase(database.name),
    )
  }
  const _onChangeAppearance = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else if (theme === 'system') {
      setTheme('light')
    }
  }

  return (
    <div className="relative flex flex-col gap-5 w-full">
      <div>
        <h3 className="text-lg font-bold text-card-text">Appearance</h3>
        <div className="mt-5">
          <SettingItem
            Icon={Palette}
            title={'Appearance'}
            rightContent={theme}
            onClick={_onChangeAppearance}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-card-text">System</h3>
        <div className="mt-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <SettingItem
                Icon={Trash}
                title={'Reset data'}
                rightContent={<ArrowRight className="size-4" />}
                onClick={() => {}}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={_onReset}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default Settings
