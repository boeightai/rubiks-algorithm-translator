import { useState, useEffect } from 'react'

export function useTutorialImage(selectedAlgorithm) {
  const [tutorialImageExists, setTutorialImageExists] = useState(false)

  // Check if tutorial image exists for selected algorithm
  useEffect(() => {
    if (selectedAlgorithm) {
      const img = new Image()
      img.onload = () => setTutorialImageExists(true)
      img.onerror = () => setTutorialImageExists(false)
      img.src = `/images/moves/${selectedAlgorithm.id}-tutorial.png`
    } else {
      setTutorialImageExists(false)
    }
  }, [selectedAlgorithm])

  return {
    tutorialImageExists,
    tutorialImageSrc: selectedAlgorithm ? `/images/moves/${selectedAlgorithm.id}-tutorial.png` : null
  }
} 