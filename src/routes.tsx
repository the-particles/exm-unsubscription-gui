import RootLayout from '@pars/core/layouts/RootLayout'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Spinner } from './shared/components/ui/spinner'

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
        hydrateFallbackElement: (
          <div className="w-full h-full grow flex justify-center items-center">
            <Spinner />
          </div>
        ),
      },
      {
        path: '/subscriptions',
        lazy: () => LazySubscriptions,
        hydrateFallbackElement: (
          <div className="w-full h-full grow flex justify-center items-center">
            <Spinner />
          </div>
        ),
      },
      {
        path: '/settings',
        lazy: () => LazySettings,
        hydrateFallbackElement: (
          <div className="w-full h-full grow flex justify-center items-center">
            <Spinner />
          </div>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default router
