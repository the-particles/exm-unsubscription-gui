import NavigationFallback from '@pars/core/components/NavigationFallback'
import type { RouteObject } from 'react-router-dom'

export const settingRoutes: RouteObject[] = [
  {
    path: '/setting',
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
      {
        path: 'details',
        lazy: () =>
          import('./SettingDetails').then((m) => ({
            Component: m.default,
          })),
        HydrateFallback: NavigationFallback,
      },
    ],
  },
]
