import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    !!process.env.USE_HTTPS && mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: {
        name: 'Unsubscription',
        short_name: 'Unsubscription',
        description: "EXM's (Expense Management) subscriptions manager",
        display: 'standalone',
        icons: [
          {
            src: '/images/icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      includeAssets: ['**/*'],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@pars': path.resolve(__dirname, './src'),
    },
  },
})
