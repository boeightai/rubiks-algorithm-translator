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

/**
 * Performance utility functions
 * 
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to limit
 * @returns {Function} - The throttled function
 */
export function throttle(func, limit) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Enhanced image loading with retry logic and mobile optimization
 * @param {string} src - The image source URL
 * @param {Object} options - Loading options
 * @param {number} options.maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} options.retryDelay - Delay between retries in ms (default: 1000)
 * @param {boolean} options.mobileOptimized - Whether to use mobile-specific optimizations
 * @param {boolean} options.preload - Whether to preload the image
 * @returns {Promise<HTMLImageElement>} - Promise that resolves with the loaded image
 */
export function loadImageWithRetry(src, options = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    mobileOptimized = true,
    preload = false
  } = options

  return new Promise((resolve, reject) => {
    let retryCount = 0
    let timeoutId = null
    let abortController = null

    const attemptLoad = () => {
      // Create abort controller for cleanup
      abortController = new AbortController()
      
      const img = new Image()
      
      // Mobile-specific optimizations
      if (mobileOptimized) {
        // Set loading priority for mobile
        img.loading = preload ? 'eager' : 'lazy'
        // Add crossOrigin for better mobile compatibility - except iPad Safari
        const isIPadSafari = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document
        if (!isIPadSafari) {
          img.crossOrigin = 'anonymous'
        }
        // Add decoding hint for better performance
        img.decoding = 'async'
      }

      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        img.onload = null
        img.onerror = null
      }

      img.onload = () => {
        cleanup()
        if (!abortController.signal.aborted) {
          resolve(img)
        }
      }

      img.onerror = () => {
        cleanup()
        
        if (abortController.signal.aborted) {
          return
        }
        
        retryCount++
        
        // Check if we're on localhost and reduce retry attempts
        const isLocalhost = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        const effectiveMaxRetries = isLocalhost ? Math.min(maxRetries, 1) : maxRetries
        
        if (retryCount < effectiveMaxRetries) {
          // Exponential backoff for retries (reduced delay for localhost)
          const delay = isLocalhost ? retryDelay : retryDelay * Math.pow(2, retryCount - 1)
          timeoutId = setTimeout(attemptLoad, delay)
        } else {
          reject(new Error(`Failed to load image after ${effectiveMaxRetries} attempts: ${src}`))
        }
      }

      // Set a timeout for the entire loading process
      timeoutId = setTimeout(() => {
        abortController.abort()
        cleanup()
        reject(new Error(`Image loading timeout: ${src}`))
      }, 10000) // 10 second timeout

      img.src = src
    }

    attemptLoad()

    // Return abort function for cleanup
    return () => {
      if (abortController) {
        abortController.abort()
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  })
}

/**
 * Check if an image exists at the given URL with enhanced mobile support
 * @param {string} url - The image URL to check
 * @param {Object} options - Checking options
 * @returns {Promise<boolean>} - Whether the image exists
 */
export function checkImageExists(url, options = {}) {
  const { mobileOptimized = true } = options
  
  return new Promise((resolve) => {
    if (!url) {
      resolve(false)
      return
    }

    const img = new Image()
    let timeoutId = null
    
    if (mobileOptimized) {
      img.loading = 'eager'
      // Check for iPad Safari specifically
      const isIPadSafari = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document
      if (!isIPadSafari) {
        img.crossOrigin = 'anonymous'
      }
    }
    
    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      img.onload = null
      img.onerror = null
    }
    
    img.onload = () => {
      cleanup()
      resolve(true)
    }
    
    img.onerror = () => {
      cleanup()
      resolve(false)
    }
    
    // Add timeout for mobile browsers
    timeoutId = setTimeout(() => {
      cleanup()
      resolve(false)
    }, 5000) // 5 second timeout for mobile
    
    try {
      img.src = url
    } catch {
      cleanup()
      resolve(false)
    }
  })
}

/**
 * Batch check multiple images for existence
 * @param {string[]} urls - Array of image URLs to check
 * @returns {Promise<Object>} - Object with URL as key and boolean as value
 */
export async function batchCheckImages(urls) {
  if (!Array.isArray(urls) || urls.length === 0) {
    return {}
  }

  const results = {}
  const promises = urls.map(async (url) => {
    try {
      const exists = await checkImageExists(url)
      results[url] = exists
    } catch {
      results[url] = false
    }
  })
  
  await Promise.all(promises)
  return results
} 

/**
 * Preload images for better mobile performance
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {Promise<void>} - Promise that resolves when all images are preloaded
 */
export function preloadImages(imageUrls) {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return Promise.resolve()
  }

  const preloadPromises = imageUrls.map(url => 
    loadImageWithRetry(url, { mobileOptimized: true })
      .catch(() => {
        // Silently fail for preloading - we don't want to break the app
        // Failed to preload image - handled silently
      })
  )
  
  return Promise.allSettled(preloadPromises)
}

/**
 * Get optimized image URL for mobile devices
 * @param {string} originalUrl - The original image URL
 * @param {Object} options - Optimization options
 * @returns {string} - Optimized image URL
 */
export function getOptimizedImageUrl(originalUrl, options = {}) {
  const { mobileOptimized = true, version = '1.0.0' } = options
  
  if (!originalUrl || !mobileOptimized) {
    return originalUrl
  }
  
  // Add version-based cache busting for mobile browsers
  const separator = originalUrl.includes('?') ? '&' : '?'
  return `${originalUrl}${separator}v=${version}`
} 