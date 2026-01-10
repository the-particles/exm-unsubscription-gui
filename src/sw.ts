/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

clientsClaim()

self.addEventListener('push', (event) => {
  const data = event.data?.text()

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(data)
    })
  })
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
    return
  }

  if (Notification.permission === 'granted') {
    self.registration.showNotification('Service Worker Message', {
      body: `Received message: ${event.data}`,
    })
  } else {
    Notification.requestPermission()
  }
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim().then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage('SKIP_WAITING_ACK')
        })
      })
    }),
  )
})
