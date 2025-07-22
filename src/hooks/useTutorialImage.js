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

import { useState, useEffect, useRef } from 'react'

export function useTutorialImage(selectedAlgorithm) {
  const [tutorialImageExists, setTutorialImageExists] = useState(false)
  const [patternImageExists, setPatternImageExists] = useState(false)
  const imageRefs = useRef({ tutorial: null, pattern: null })

  // Check if tutorial image exists for selected algorithm
  useEffect(() => {
    const currentRefs = imageRefs.current
    
    // Clean up previous images
    if (currentRefs.tutorial) {
      currentRefs.tutorial.onload = null
      currentRefs.tutorial.onerror = null
      currentRefs.tutorial.src = '' // Stop loading
      currentRefs.tutorial = null
    }
    if (currentRefs.pattern) {
      currentRefs.pattern.onload = null
      currentRefs.pattern.onerror = null
      currentRefs.pattern.src = '' // Stop loading
      currentRefs.pattern = null
    }

    if (selectedAlgorithm) {
      // Create tutorial image
      const tutorialImg = new Image()
      tutorialImg.onload = () => setTutorialImageExists(true)
      tutorialImg.onerror = () => setTutorialImageExists(false)
      tutorialImg.src = `/images/moves/${selectedAlgorithm.id}-tutorial.png`
      currentRefs.tutorial = tutorialImg
      
      // Create pattern image
      const patternImg = new Image()
      patternImg.onload = () => setPatternImageExists(true)
      patternImg.onerror = () => setPatternImageExists(false)
      patternImg.src = `/images/patterns/${selectedAlgorithm.id}-pattern.png`
      currentRefs.pattern = patternImg
    } else {
      setTutorialImageExists(false)
      setPatternImageExists(false)
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (currentRefs.tutorial) {
        currentRefs.tutorial.onload = null
        currentRefs.tutorial.onerror = null
        currentRefs.tutorial.src = '' // Stop loading
        currentRefs.tutorial = null
      }
      if (currentRefs.pattern) {
        currentRefs.pattern.onload = null
        currentRefs.pattern.onerror = null
        currentRefs.pattern.src = '' // Stop loading
        currentRefs.pattern = null
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