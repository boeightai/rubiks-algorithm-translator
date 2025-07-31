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

import { useState, useEffect, useCallback, useRef } from 'react'
import { loadImageWithRetry, checkImageExists } from '../utils/performance'

/**
 * Custom hook for enhanced image loading with mobile optimization
 * @param {string} imageSrc - The image source URL
 * @param {Object} options - Loading options
 * @returns {Object} - Loading state and handlers
 */
export function useImageLoader(imageSrc, options = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    mobileOptimized = true, // Default to true for mobile compatibility
    preload = false
  } = options

  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    isLoaded: false,
    hasError: false,
    retryCount: 0,
    error: null
  })

  const [imageElement, setImageElement] = useState(null)
  const abortControllerRef = useRef(null)
  const retryTimeoutRef = useRef(null)

  // Cleanup function
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }
  }, [])

  // Load image with retry logic
  const loadImage = useCallback(async () => {
    if (!imageSrc) {
      setLoadingState({
        isLoading: false,
        isLoaded: false,
        hasError: false,
        retryCount: 0,
        error: null
      })
      return
    }

    cleanup()

    setLoadingState(prev => ({
      ...prev,
      isLoading: true,
      hasError: false,
      error: null
    }))

    try {
      abortControllerRef.current = new AbortController()

      const img = await loadImageWithRetry(imageSrc, {
        maxRetries,
        retryDelay,
        mobileOptimized
      })

      if (abortControllerRef.current.signal.aborted) {
        return
      }

      setImageElement(img)
      setLoadingState({
        isLoading: false,
        isLoaded: true,
        hasError: false,
        retryCount: 0,
        error: null
      })

    } catch (error) {
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      setLoadingState(prev => ({
        isLoading: false,
        isLoaded: false,
        hasError: true,
        retryCount: prev.retryCount + 1,
        error: error.message
      }))
    }
  }, [imageSrc, maxRetries, retryDelay, mobileOptimized, cleanup])

  // Retry loading
  const retry = useCallback(() => {
    if (loadingState.retryCount < maxRetries) {
      retryTimeoutRef.current = setTimeout(() => {
        loadImage()
      }, retryDelay * Math.pow(2, loadingState.retryCount))
    }
  }, [loadingState.retryCount, maxRetries, retryDelay, loadImage])

  // Check if image exists
  const checkExists = useCallback(async () => {
    if (!imageSrc) return false
    
    try {
      return await checkImageExists(imageSrc, { mobileOptimized })
    } catch {
      // Silently handle image existence check errors to avoid console spam
      return false
    }
  }, [imageSrc, mobileOptimized])

  // Auto-retry on error
  useEffect(() => {
    if (loadingState.hasError && loadingState.retryCount < maxRetries) {
      retry()
    }
  }, [loadingState.hasError, loadingState.retryCount, maxRetries, retry])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  // Load image when src changes
  useEffect(() => {
    if (preload || imageSrc) {
      loadImage()
    }

    return cleanup
  }, [imageSrc, preload, loadImage, cleanup])

  return {
    ...loadingState,
    imageElement,
    retry,
    checkExists,
    reload: loadImage
  }
}

/**
 * Hook for loading multiple images with mobile optimization
 * @param {string[]} imageSrcs - Array of image source URLs
 * @param {Object} options - Loading options
 * @returns {Object} - Loading state for all images
 */
export function useMultipleImageLoader(imageSrcs, options = {}) {
  const [loadingStates, setLoadingStates] = useState({})
  const [overallState, setOverallState] = useState({
    isLoading: false,
    isLoaded: false,
    hasError: false,
    loadedCount: 0,
    totalCount: 0
  })

  useEffect(() => {
    if (!imageSrcs || imageSrcs.length === 0) {
      setLoadingStates({})
      setOverallState({
        isLoading: false,
        isLoaded: false,
        hasError: false,
        loadedCount: 0,
        totalCount: 0
      })
      return
    }

    const states = {}
    let loadedCount = 0
    let errorCount = 0

    imageSrcs.forEach((src, index) => {
      states[index] = {
        isLoading: true,
        isLoaded: false,
        hasError: false,
        retryCount: 0,
        error: null
      }

      loadImageWithRetry(src, options)
        .then(() => {
          states[index] = {
            isLoading: false,
            isLoaded: true,
            hasError: false,
            retryCount: 0,
            error: null
          }
          loadedCount++
        })
        .catch((error) => {
          states[index] = {
            isLoading: false,
            isLoaded: false,
            hasError: true,
            retryCount: 0,
            error: error.message
          }
          errorCount++
        })
        .finally(() => {
          setLoadingStates({ ...states })
          setOverallState({
            isLoading: loadedCount + errorCount < imageSrcs.length,
            isLoaded: loadedCount === imageSrcs.length,
            hasError: errorCount > 0,
            loadedCount,
            totalCount: imageSrcs.length
          })
        })
    })
  }, [imageSrcs, options])

  return {
    loadingStates,
    overallState
  }
} 