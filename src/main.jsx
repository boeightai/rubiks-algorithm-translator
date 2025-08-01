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

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // Check for updates periodically - less frequent to avoid disrupting image loading
        setInterval(() => {
          registration.update()
        }, 300000) // Check every 5 minutes instead of every minute
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available - automatically reload
              console.log('New version available! Reloading...')
              // Send skip waiting message to new service worker
              newWorker.postMessage({ type: 'SKIP_WAITING' })
              // Reload the page once the new service worker takes control
              navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload()
              })
            }
          })
        })
        
        // Also check for updates on page focus - but throttled to avoid disrupting user experience
        let lastUpdateCheck = 0
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden) {
            const now = Date.now()
            // Only check for updates if it's been at least 2 minutes since last check
            if (now - lastUpdateCheck > 120000) {
              registration.update()
              lastUpdateCheck = now
            }
          }
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
