import { RouterProvider } from 'react-router-dom'
import HeaderProvider from './providers/header-provider'
import NavigationProvider from './providers/navigation-provider'
import PWAProvider from './providers/pwa-provider'
import ThemeProvider from './providers/theme-provider'
import router from './routes'

const App = () => {
  return (
    <HeaderProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <PWAProvider>
          <NavigationProvider>
            <RouterProvider router={router} />
          </NavigationProvider>
        </PWAProvider>
      </ThemeProvider>
    </HeaderProvider>
  )
}

export default App
