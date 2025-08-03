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
 * MERCHANTABILITY or FITNESS FOR ANY PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useState, useEffect, useRef } from 'react'

// Centralized environment detection
const isLocalhost = () => {
  return window.location.hostname.includes('localhost') || 
         window.location.hostname.includes('127.0.0.1') ||
         window.location.hostname.includes('0.0.0.0')
}

export function useTutorialImage(selectedAlgorithm) {
  const [tutorialImageExists, setTutorialImageExists] = useState(false)
  const [patternImageExists, setPatternImageExists] = useState(false)
  const abortControllerRef = useRef(null)
  const isLocalhostEnv = useRef(isLocalhost())

  // Check if tutorial image exists for selected algorithm
  useEffect(() => {
    // Abort any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Create new AbortController for this effect
    abortControllerRef.current = new AbortController()

    if (selectedAlgorithm) {
      // Create tutorial image with optimized loading for localhost
      const tutorialImg = new Image()
      tutorialImg.onload = () => {
        if (!abortControllerRef.current?.signal.aborted) {
          setTutorialImageExists(true)
        }
      }
      tutorialImg.onerror = () => {
        if (!abortControllerRef.current?.signal.aborted) {
          setTutorialImageExists(false)
        }
      }
      
      // Optimize loading for localhost
      if (isLocalhostEnv.current) {
        tutorialImg.loading = 'lazy'
        tutorialImg.decoding = 'sync'
      } else {
        tutorialImg.loading = 'eager'
        tutorialImg.decoding = 'async'
      }
      
      tutorialImg.src = `/images/moves/${selectedAlgorithm.id}-tutorial.png`
      
      // Create pattern image with optimized loading for localhost
      const patternImg = new Image()
      patternImg.onload = () => {
        if (!abortControllerRef.current?.signal.aborted) {
          setPatternImageExists(true)
        }
      }
      patternImg.onerror = () => {
        if (!abortControllerRef.current?.signal.aborted) {
          setPatternImageExists(false)
        }
      }
      
      // Optimize loading for localhost
      if (isLocalhostEnv.current) {
        patternImg.loading = 'lazy'
        patternImg.decoding = 'sync'
      } else {
        patternImg.loading = 'eager'
        patternImg.decoding = 'async'
      }
      
      patternImg.src = `/images/patterns/${selectedAlgorithm.id}-pattern.png`
    } else {
      setTutorialImageExists(false)
      setPatternImageExists(false)
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
    }
  }, [selectedAlgorithm])

  return {
    tutorialImageExists,
    tutorialImageSrc: selectedAlgorithm ? `/images/moves/${selectedAlgorithm.id}-tutorial.png` : null,
    patternImageExists,
    patternImageSrc: selectedAlgorithm ? `/images/patterns/${selectedAlgorithm.id}-pattern.png` : null
  }
}