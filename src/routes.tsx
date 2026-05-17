import RootLayout from '@pars/core/layouts/RootLayout'
import { Navigate, createBrowserRouter } from 'react-router-dom'

const LazyHome = import('./features/home').then((module) => ({
  Component: module.default,
}))
const LazySubscriptions = import('./features/subscriptions').then((module) => ({
  Component: module.default,
}))
const LazySettings = import('./features/settings').then((module) => ({
  Component: module.default,
}))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: () => LazyHome,
      },
      {
        path: '/subscriptions',
        lazy: () => LazySubscriptions,
      },
      {
        path: '/settings',
        lazy: () => LazySettings,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default router
