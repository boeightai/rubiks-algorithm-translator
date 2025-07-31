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
import { useMobileDetection } from './hooks/useMobileDetection'

function TutorialMode() {
  const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState(0)
  const { isMobile, isTablet } = useMobileDetection()
  
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
  
  // Determine if we're on desktop for compact layout
  const isDesktop = !isMobile && !isTablet
  
  return (
    <div style={{
      backgroundColor: colors.background.primary,
      minHeight: '100vh',
      paddingTop: isDesktop ? spacing[16] : spacing[20], // Reduced top padding for desktop
    }}>
      {/* Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${spacing[4]}`,
      }}>
        {/* YouTube Video Section */}
        <div style={{
          marginBottom: isDesktop ? spacing[4] : spacing[8], // Reduced margin for desktop
          padding: `0 ${spacing[2]}`,
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