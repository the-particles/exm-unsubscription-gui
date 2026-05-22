import { useEffect, useState } from 'react'
import type { ProviderProps } from '@pars/core/interfaces/ContextProvider'
import { refreshPage } from '@pars/core/utils/document'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@pars/shared/components/ui/alert-dialog'
import { Toaster } from '@pars/shared/components/ui/sonner'
import PWAContext from './PWAContext'

const HAS_NEW_UPDATE_KEY = 'unsubscription-new-update'
const SPLASH_SCREEN_TIMEOUT = 2000
const hideSplashScreen = () =>
  setTimeout(() => {
    const splashScreen = document.getElementById('splash')
    if (splashScreen) {
      splashScreen.style.opacity = '0'
      splashScreen.style.visibility = 'hidden'
    }
  }, SPLASH_SCREEN_TIMEOUT)

const PWAProvider = ({ children }: ProviderProps) => {
  // States
  const [isReadyOffline, setIsReadyOffline] = useState(false)
  const [hasNewWorker, setHasNewWorker] = useState(() =>
    Boolean(localStorage.getItem(HAS_NEW_UPDATE_KEY)),
  )
  const [newWorker, setNewWorker] = useState<ServiceWorker | null>(null)

  // Effects
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing

          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (
                installingWorker.state === 'installed' &&
                registration.waiting
              ) {
                localStorage.setItem(HAS_NEW_UPDATE_KEY, 'true')
                setHasNewWorker(true)
                setNewWorker(installingWorker)
              }
            })
          }
        })

        if (registration.active) {
          setIsReadyOffline(true)
        }
      })

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data === 'SKIP_WAITING_ACK') {
          refreshPage()
          return
        }

        toast.info(event.data)
      })
    }
  }, [])
  useEffect(() => {
    const isPWA =
      'serviceWorker' in navigator &&
      window.matchMedia('(display-mode: standalone)').matches

    if (!isPWA || isReadyOffline) {
      const timeoutId = hideSplashScreen()

      return () => clearTimeout(timeoutId)
    }
  }, [isReadyOffline])

  // Prevent default swipe-to-go-back behavior on iOS PWA
  // Should not override the behavior of iOS
  // But nah, that's okay.
  // It will not work 100%
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator).standalone === true

    if (isIOS && isStandalone) {
      const handleTouchStart = (e: TouchEvent) => {
        const threshold = 20
        const touch = e.touches[0]
        if (!touch) return

        const clientX = touch.clientX

        // Check if touch starts near the screen margins (left or right edge)
        if (clientX < threshold || clientX > window.innerWidth - threshold) {
          const target = e.target as HTMLElement | null
          if (target) {
            // Do not prevent default if the user is interacting with form controls or buttons
            const isInteractive =
              target.closest(
                'button, a, input, select, textarea, [role="button"]',
              ) !== null || target.onclick !== null
            if (isInteractive) {
              return
            }
          }
          e.preventDefault()
        }
      }

      window.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      })
      return () => {
        window.removeEventListener('touchstart', handleTouchStart)
      }
    }
  }, [])

  // Functions
  const _skipWaiting = () => {
    if (newWorker) {
      newWorker.postMessage({ type: 'SKIP_WAITING' })
    }
    localStorage.removeItem(HAS_NEW_UPDATE_KEY)
  }

  return (
    <PWAContext.Provider value={{ isReadyOffline, hasNewWorker }}>
      {children}
      <Toaster position={'bottom-center'} />
      <AlertDialog open={hasNewWorker} onOpenChange={setHasNewWorker}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              There is a new version available
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please update to ensure a seamless experience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={_skipWaiting}>Update</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PWAContext.Provider>
  )
}

export default PWAProvider
