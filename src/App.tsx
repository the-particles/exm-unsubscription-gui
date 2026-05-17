import DimensionProvider from '@pars/core/contexts/dimension/DimensionProvider'
import HeaderProvider from '@pars/core/contexts/header/HeaderProvider'
import NavigationProvider from '@pars/core/contexts/navigation/NavigationProvider'
import PWAProvider from '@pars/core/contexts/pwa/PWAProvider'
import ThemeProvider from '@pars/core/contexts/theme/ThemeProvider'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

const App = () => {
  return (
    <DimensionProvider>
      <HeaderProvider>
        <ThemeProvider>
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
