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

import { useState } from 'react'
import YouTubeEmbed from './components/YouTubeEmbed'
import AlgorithmCarousel from './components/AlgorithmCarousel'
import tutorialAlgorithms from './data/tutorialAlgorithms.json'
import { colors, spacing } from './styles/designSystem'

function TutorialMode() {
  const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState(0)
  
  const handleNext = () => {
    setCurrentAlgorithmIndex((prev) => 
      prev === tutorialAlgorithms.length - 1 ? 0 : prev + 1
    )
  }
  
  const handlePrevious = () => {
    setCurrentAlgorithmIndex((prev) => 
      prev === 0 ? tutorialAlgorithms.length - 1 : prev - 1
    )
  }
  
  return (
    <div style={{
      backgroundColor: colors.background.primary,
      minHeight: '100vh',
      paddingTop: spacing[20], // Space for fixed mode toggle
    }}>
      {/* Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${spacing[4]}`,
      }}>
        {/* YouTube Video Section */}
        <div style={{
          marginBottom: spacing[8],
        }}>
          <YouTubeEmbed />
        </div>
        
        {/* Algorithm Carousel Section */}
        <AlgorithmCarousel
          algorithms={tutorialAlgorithms}
          currentIndex={currentAlgorithmIndex}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  )
}

export default TutorialMode