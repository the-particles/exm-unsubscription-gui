import NavigationFallback from '@pars/core/components/NavigationFallback'
import type { RouteObject } from 'react-router-dom'

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    HydrateFallback: NavigationFallback,
    children: [
      {
        index: true,
        lazy: () =>
          import('./index').then((m) => ({
            Component: m.default,
          })),
        HydrateFallback: NavigationFallback,
      },
    ],
  },
]
