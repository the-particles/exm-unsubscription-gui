import { RouterProvider } from 'react-router-dom'
import HeaderProvider from '@pars/providers/header-provider'
import NavigationProvider from '@pars/providers/navigation-provider'
import PWAProvider from '@pars/providers/pwa-provider'
import ThemeProvider from '@pars/providers/theme-provider'
import DimensionProvider from './providers/dimension-provider'
import router from './routes'

const App = () => {
  return (
    <DimensionProvider>
      <HeaderProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <PWAProvider>
            <NavigationProvider>
              <RouterProvider router={router} />
            </NavigationProvider>
          </PWAProvider>
        </ThemeProvider>
      </HeaderProvider>
    </DimensionProvider>
  )
}

export default App
