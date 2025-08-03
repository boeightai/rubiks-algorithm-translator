/*
 * Rubik's Cube Algorithm Translator
 * Copyright (C) 2025 Bo Nam
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWithModes from './AppWithModes.jsx'
import './index.css'

// Initialize theme before app renders
const savedTheme = localStorage.getItem('theme')
// Default to light mode unless user has explicitly chosen dark mode
const initialTheme = savedTheme || 'light'
document.documentElement.setAttribute('data-theme', initialTheme)

// Register service worker for offline support (disabled in development)
if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // Check for updates every 5 minutes
        setInterval(() => {
          registration.update()
        }, 300000)
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Auto-reload when new version is available
              newWorker.postMessage({ type: 'SKIP_WAITING' })
              navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload()
              })
            }
          })
        })
      })
      .catch(() => {
        // Service worker registration failed - continue without offline support
      })
  })
}

// Error boundary for the entire app
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithModes />
  </StrictMode>,
)
