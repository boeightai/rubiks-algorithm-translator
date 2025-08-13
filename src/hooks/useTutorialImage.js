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

export function useTutorialImage(selectedAlgorithm) {
  const [tutorialImageExists, setTutorialImageExists] = useState(false)
  const [patternImageExists, setPatternImageExists] = useState(false)
  const abortControllerRef = useRef(null)

  // Check if tutorial image exists for selected algorithm
  useEffect(() => {
    // Abort any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Create new AbortController for this effect
    abortControllerRef.current = new AbortController()
    
    // Store image references for cleanup
    let tutorialImg = null
    let patternImg = null

    if (selectedAlgorithm && selectedAlgorithm.id) {
      // Sanitize algorithm ID to prevent XSS
      const sanitizedId = String(selectedAlgorithm.id).replace(/[^a-zA-Z0-9-_]/g, '')
      
      // Create tutorial image with optimized loading for localhost
      tutorialImg = new Image()
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
      
      // Use consistent loading behavior for all environments
      tutorialImg.loading = 'eager'
      tutorialImg.decoding = 'async'
      
      tutorialImg.src = `/images/moves/${sanitizedId}-tutorial.png`
      
      // Create pattern image with optimized loading for localhost
      patternImg = new Image()
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
      
      // Use consistent loading behavior for all environments
      patternImg.loading = 'eager'
      patternImg.decoding = 'async'
      
      patternImg.src = `/images/patterns/${sanitizedId}-pattern.png`
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
      
      // Clean up image references
      if (tutorialImg) {
        tutorialImg.onload = null
        tutorialImg.onerror = null
        tutorialImg.src = ''
        tutorialImg = null
      }
      
      if (patternImg) {
        patternImg.onload = null
        patternImg.onerror = null
        patternImg.src = ''
        patternImg = null
      }
    }
  }, [selectedAlgorithm])

  return {
    tutorialImageExists,
    tutorialImageSrc: selectedAlgorithm && selectedAlgorithm.id 
      ? `/images/moves/${String(selectedAlgorithm.id).replace(/[^a-zA-Z0-9-_]/g, '')}-tutorial.png` 
      : null,
    patternImageExists,
    patternImageSrc: selectedAlgorithm && selectedAlgorithm.id 
      ? `/images/patterns/${String(selectedAlgorithm.id).replace(/[^a-zA-Z0-9-_]/g, '')}-pattern.png` 
      : null
  }
}