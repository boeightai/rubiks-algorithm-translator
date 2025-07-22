// Performance utility functions

/**
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
 * Check if an image exists at the given URL
 * @param {string} url - The image URL to check
 * @returns {Promise<boolean>} - Whether the image exists
 */
export function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image()
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