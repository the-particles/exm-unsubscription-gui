import DimensionProvider from '@pars/core/contexts/dimension/DimensionProvider'
import HeaderProvider from '@pars/core/contexts/header/HeaderProvider'
import NavigationProvider from '@pars/core/contexts/navigation/NavigationProvider'
import PWAProvider from '@pars/core/contexts/pwa/PWAProvider'
import ThemeProvider from '@pars/core/contexts/theme/ThemeProvider'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@pars/shared/components/ui/sonner'
import router from './routes'

const App = () => {
  return (
    <DimensionProvider>
      <NavigationProvider>
        <HeaderProvider>
          <ThemeProvider>
            <PWAProvider>
              <RouterProvider router={router} />
              <Toaster />
            </PWAProvider>
          </ThemeProvider>
        </HeaderProvider>
      </NavigationProvider>
    </DimensionProvider>
  )
}

export default App
