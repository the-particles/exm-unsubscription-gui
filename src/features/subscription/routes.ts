import NavigationFallback from '@pars/core/components/NavigationFallback'
import type { RouteObject } from 'react-router-dom'

export const subscriptionRoutes: RouteObject[] = [
  {
    path: '/subscription',
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
        path: 'creation',
        lazy: () =>
          import('./SubscriptionCreation').then((m) => ({
            Component: m.default,
          })),
        HydrateFallback: NavigationFallback,
      },
      {
        path: 'details',
        lazy: () =>
          import('./SubscriptionDetails').then((m) => ({
            Component: m.default,
          })),
        HydrateFallback: NavigationFallback,
      },
    ],
  },
]
