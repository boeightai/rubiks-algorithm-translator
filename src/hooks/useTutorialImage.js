import { useState, useEffect } from 'react'

export function useTutorialImage(selectedAlgorithm) {
  const [tutorialImageExists, setTutorialImageExists] = useState(false)
  const [patternImageExists, setPatternImageExists] = useState(false)

  // Check if tutorial image exists for selected algorithm
  useEffect(() => {
    if (selectedAlgorithm) {
      const tutorialImg = new Image()
      tutorialImg.onload = () => setTutorialImageExists(true)
      tutorialImg.onerror = () => setTutorialImageExists(false)
      tutorialImg.src = `/images/moves/${selectedAlgorithm.id}-tutorial.png`
      
      const patternImg = new Image()
      patternImg.onload = () => setPatternImageExists(true)
      patternImg.onerror = () => setPatternImageExists(false)
      patternImg.src = `/images/patterns/${selectedAlgorithm.id}-pattern.png`
    } else {
      setTutorialImageExists(false)
      setPatternImageExists(false)
    }
  }, [selectedAlgorithm])

  return {
    tutorialImageExists,
    tutorialImageSrc: selectedAlgorithm ? `/images/moves/${selectedAlgorithm.id}-tutorial.png` : null,
    patternImageExists,
    patternImageSrc: selectedAlgorithm ? `/images/patterns/${selectedAlgorithm.id}-pattern.png` : null
  }
}