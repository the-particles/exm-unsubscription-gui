import { createBrowserRouter } from 'react-router-dom'
import NavigationDefault from './core/components/NavigationDefault'
import NavigationFallback from './core/components/NavigationFallback'
import RootLayout from './core/layouts/RootLayout'
import { dashboardRoutes } from './features/dashboard/routes'
import { settingRoutes } from './features/setting/routes'
import { subscriptionRoutes } from './features/subscription/routes'

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    HydrateFallback: NavigationFallback,
    children: [
      { index: true, Component: NavigationDefault },
      ...dashboardRoutes,
      ...subscriptionRoutes,
      ...settingRoutes,
    ],
  },
  {
    path: '*',
    Component: NavigationDefault,
  },
])

export default router
