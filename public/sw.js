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

// Update version number to force cache refresh on deployment
const CACHE_VERSION = 'v9'
const CACHE_NAME = `rubiks-translator-${CACHE_VERSION}`
const STATIC_CACHE_NAME = `rubiks-translator-static-${CACHE_VERSION}`
const DYNAMIC_CACHE_NAME = `rubiks-translator-dynamic-${CACHE_VERSION}`

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/src/main.jsx',
  '/src/AppWithModes.jsx',
  '/src/TutorialMode.jsx',
  '/src/components/AlgorithmCarousel.jsx',
  '/src/components/YouTubeEmbed.jsx',
  '/src/components/ModeToggle.jsx',
  '/src/VisualSequence.jsx',
  '/src/data/tutorialAlgorithms.json',
  '/src/data/moves.json',
  '/src/data/algorithms.json',
  '/src/styles/designSystem.js',
  '/src/hooks/useMobileDetection.js',
  '/src/index.css'
]

// Image files to cache
const IMAGE_FILES = [
  '/public/images/moves/',
  '/public/images/icons/',
  '/public/images/patterns/'
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  // Skip waiting to activate new service worker immediately
  self.skipWaiting()
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        // Caching static files
        return cache.addAll(STATIC_FILES)
      })
      .catch(() => {
        // Failed to cache static files
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Take control of all pages immediately
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              // Deleting old cache
              return caches.delete(cacheName)
            }
          })
        )
      })
    ])
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // In development, don't cache JSON files to allow for live updates
  const isDevelopment = url.hostname.includes('localhost') || url.hostname.includes('127.0.0.1')
  if (isDevelopment && (url.pathname.endsWith('.json') || url.pathname.includes('/src/data/'))) {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Handle different types of requests
  if (url.pathname === '/' || url.pathname === '/index.html') {
    // Main page - serve from cache first
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request)
        })
        .catch(() => {
          return caches.match('/index.html')
        })
    )
  } else if (url.pathname.includes('/src/data/') || url.pathname.includes('.json')) {
    // JSON data files - cache and serve
    event.respondWith(
      caches.open(DYNAMIC_CACHE_NAME)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              if (response) {
                return response
              }
              return fetch(request)
                .then((networkResponse) => {
                  cache.put(request, networkResponse.clone())
                  return networkResponse
                })
            })
        })
    )
  } else if (url.pathname.includes('/images/') || url.pathname.includes('.png') || url.pathname.includes('.svg')) {
    // Images - cache and serve with fallback
    event.respondWith(
      caches.open(DYNAMIC_CACHE_NAME)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              if (response) {
                return response
              }
              return fetch(request)
                .then((networkResponse) => {
                  if (networkResponse.ok) {
                    cache.put(request, networkResponse.clone())
                  }
                  return networkResponse
                })
                .catch(() => {
                  // Return a placeholder for failed image loads
                  return new Response('', {
                    status: 404,
                    statusText: 'Image not found'
                  })
                })
            })
        })
    )
  } else if (url.pathname.includes('/src/') || url.pathname.includes('.jsx') || url.pathname.includes('.js')) {
    // Source files - serve from cache first
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request)
        })
    )
  } else {
    // Other requests - network first, cache fallback
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone)
              })
          }
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
  }
})

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background sync tasks
      // Background sync triggered
    )
  }
})

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/favicon.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon.svg'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Rubik\'s Cube Translator', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/')
    )
  }
})

// Listen for skip waiting message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
}) 