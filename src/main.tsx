import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element is not found')

registerSW()

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
