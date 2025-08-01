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

import { useState, useEffect } from 'react'
import YouTubeEmbed from './components/YouTubeEmbed'
import AlgorithmCarousel from './components/AlgorithmCarousel'
import tutorialAlgorithms from './data/tutorialAlgorithms.json'
import { colors, spacing, typography } from './styles/designSystem'
import { useMobileDetection } from './hooks/useMobileDetection'
import Header from './components/Header'

function TutorialMode({ onModeToggle }) {
  const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isMobile, isTablet } = useMobileDetection()
  
  // Ensure algorithms are loaded properly
  useEffect(() => {
    try {
      if (tutorialAlgorithms && Array.isArray(tutorialAlgorithms) && tutorialAlgorithms.length > 0) {
        setIsLoading(false)
        setError(null)
      } else {
        setError('No tutorial algorithms found')
        setIsLoading(false)
      }
    } catch {
      setError('Failed to load tutorial algorithms')
      setIsLoading(false)
    }
  }, [])
  
  const handleNext = () => {
    if (tutorialAlgorithms && tutorialAlgorithms.length > 0) {
      setCurrentAlgorithmIndex((prev) => 
        prev === tutorialAlgorithms.length - 1 ? 0 : prev + 1
      )
    }
  }
  
  const handlePrevious = () => {
    if (tutorialAlgorithms && tutorialAlgorithms.length > 0) {
      setCurrentAlgorithmIndex((prev) => 
        prev === 0 ? tutorialAlgorithms.length - 1 : prev - 1
      )
    }
  }
  
  // Determine if we're on desktop for compact layout
  const isDesktop = !isMobile && !isTablet
  
  // Loading state
  if (isLoading) {
    return (
      <div style={{
        backgroundColor: colors.background.primary,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          textAlign: 'center',
          color: colors.neutral[600],
        }}>
          <div style={{
            fontSize: typography.fontSize.xl,
            marginBottom: spacing[2],
          }}>
            🔄
          </div>
          <div style={{
            fontSize: typography.fontSize.sm,
          }}>
            Loading tutorial...
          </div>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div style={{
        backgroundColor: colors.background.primary,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[4],
      }}>
        <div style={{
          textAlign: 'center',
          color: colors.error[600],
          maxWidth: '400px',
        }}>
          <div style={{
            fontSize: typography.fontSize.xl,
            marginBottom: spacing[2],
          }}>
            ⚠️
          </div>
          <div style={{
            fontSize: typography.fontSize.sm,
            marginBottom: spacing[3],
          }}>
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: `${spacing[2]} ${spacing[4]}`,
              backgroundColor: colors.primary[500],
              color: colors.white,
              border: 'none',
              borderRadius: '8px',
              fontSize: typography.fontSize.sm,
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
  
  // Ensure we have algorithms to display
  if (!tutorialAlgorithms || tutorialAlgorithms.length === 0) {
    return (
      <div style={{
        backgroundColor: colors.background.primary,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          textAlign: 'center',
          color: colors.neutral[600],
        }}>
          <div style={{
            fontSize: typography.fontSize.xl,
            marginBottom: spacing[2],
          }}>
            📚
          </div>
          <div style={{
            fontSize: typography.fontSize.sm,
          }}>
            No tutorial algorithms available
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div style={{
      backgroundColor: colors.background.primary,
      minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `${spacing[4]} ${spacing[4]} 0`,
      }}>
        <Header 
          title="Learn to Solve a Rubik's Cube"
          subtitle="Step-by-step tutorial using Bo and Hailey's Visual Notation System"
          onModeToggle={onModeToggle}
          currentMode="tutorial"
        />
      </div>
      
      {/* Content Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${spacing[4]}`,
        paddingTop: isDesktop ? spacing[4] : spacing[6], // Reduced padding after header
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