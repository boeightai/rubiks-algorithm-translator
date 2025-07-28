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

const CACHE_NAME = 'rubiks-translator-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/AlgorithmSelectorRefactored.jsx',
  '/src/VisualSequence.jsx',
  '/src/data/algorithms.json',
  '/src/data/moves.json',
  '/src/styles/designSystem.js'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.error('Service Worker installation failed:', error)
      })
  )
})

// Fetch event - serve from cache when offline with mobile optimization
self.addEventListener('fetch', (event) => {
  // Handle image requests with cache-first strategy for better mobile performance
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request)
            .then((fetchResponse) => {
              if (fetchResponse.status === 200) {
                return caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, fetchResponse.clone())
                    return fetchResponse
                  })
              }
              return fetchResponse
            })
            .catch(() => {
              // Return a fallback for failed image loads
              return new Response('', {
                status: 404,
                statusText: 'Image not found'
              })
            })
        })
    )
    return
  }
  
  // Handle data files with cache-first strategy
  if (event.request.url.includes('/data/') || event.request.url.includes('/images/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request)
            .then((fetchResponse) => {
              if (fetchResponse.status === 200) {
                return caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, fetchResponse.clone())
                    return fetchResponse
                  })
              }
              return fetchResponse
            })
        })
    )
    return
  }
  
  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          return caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, response.clone())
              return response
            })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html')
        }
        // Return cached version if available
        return caches.match(event.request)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
}) 