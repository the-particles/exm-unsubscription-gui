import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import HeaderProvider from '@pars/providers/header-provider'
import NavigationProvider from '@pars/providers/navigation-provider'
import PWAProvider from '@pars/providers/pwa-provider'
import ThemeProvider from '@pars/providers/theme-provider'
import DimensionProvider from './providers/dimension-provider'
import router from './routes'
import queryClient from './states/query-client'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
