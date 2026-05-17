import PWAStatus from '@pars/core/components/PWAStatus'
import {
  useHeaderAction,
  useHeaderDescription,
} from '@pars/core/contexts/header/useHeader'
import { useTheme } from '@pars/core/contexts/theme/useTheme'
import { ArrowRight, Palette, SettingsIcon, Trash } from 'lucide-react'
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
  const { theme, setTheme } = useTheme()
  useHeaderDescription('The Settings')
  useHeaderAction(PWAStatus)

  const topInset = getComputedStyle(document.documentElement).getPropertyValue(
    '--safe-area-inset-top',
  )
  const bottomInset = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--safe-area-inset-bottom')

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
        <div className="mt-5 flex flex-col gap-2">
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

          <SettingItem
            Icon={SettingsIcon}
            title="Top Safe Area"
            rightContent={topInset}
            onClick={() => {}}
          />

          <SettingItem
            Icon={SettingsIcon}
            title="Bottom Safe Area"
            rightContent={bottomInset}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}

export default Settings
