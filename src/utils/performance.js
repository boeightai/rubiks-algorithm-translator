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
 * @returns {Promise<HTMLImageElement>} - Promise that resolves with the loaded image
 */
export function loadImageWithRetry(src, options = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    mobileOptimized = true
  } = options

  return new Promise((resolve, reject) => {
    let retryCount = 0
    let timeoutId = null

    const attemptLoad = () => {
      const img = new Image()
      
      // Mobile-specific optimizations
      if (mobileOptimized) {
        // Set loading priority for mobile
        img.loading = 'eager'
        // Add crossOrigin for better mobile compatibility
        img.crossOrigin = 'anonymous'
      }

      img.onload = () => {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        resolve(img)
      }

      img.onerror = () => {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        
        retryCount++
        
        if (retryCount < maxRetries) {
          // Exponential backoff for retries
          const delay = retryDelay * Math.pow(2, retryCount - 1)
          timeoutId = setTimeout(attemptLoad, delay)
        } else {
          reject(new Error(`Failed to load image after ${maxRetries} attempts: ${src}`))
        }
      }

      // Set a timeout for the entire loading process
      timeoutId = setTimeout(() => {
        img.onload = null
        img.onerror = null
        reject(new Error(`Image loading timeout: ${src}`))
      }, 10000) // 10 second timeout

      img.src = src
    }

    attemptLoad()
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
    const img = new Image()
    
    if (mobileOptimized) {
      img.loading = 'eager'
      img.crossOrigin = 'anonymous'
    }
    
    img.onload = () => {
      img.onload = null
      img.onerror = null
      resolve(true)
    }
    
    img.onerror = () => {
      img.onload = null
      img.onerror = null
      resolve(false)
    }
    
    // Add timeout for mobile browsers
    const timeoutId = setTimeout(() => {
      img.onload = null
      img.onerror = null
      resolve(false)
    }, 5000) // 5 second timeout for mobile
    
    img.onload = () => {
      clearTimeout(timeoutId)
      img.onload = null
      img.onerror = null
      resolve(true)
    }
    
    img.onerror = () => {
      clearTimeout(timeoutId)
      img.onload = null
      img.onerror = null
      resolve(false)
    }
    
    img.src = url
  })
}

/**
 * Batch check multiple images for existence
 * @param {string[]} urls - Array of image URLs to check
 * @returns {Promise<Object>} - Object with URL as key and boolean as value
 */
export async function batchCheckImages(urls) {
  const results = {}
  const promises = urls.map(async (url) => {
    const exists = await checkImageExists(url)
    results[url] = exists
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
  const { mobileOptimized = true } = options
  
  if (!mobileOptimized) {
    return originalUrl
  }
  
  // Add cache busting for mobile browsers
  const timestamp = Date.now()
  const separator = originalUrl.includes('?') ? '&' : '?'
  return `${originalUrl}${separator}v=${timestamp}`
} 