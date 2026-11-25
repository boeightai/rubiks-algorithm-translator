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
 * along with this program.  If not, see &lt;https://www.gnu.org/licenses/&gt;.
 */

import { useState, useEffect, lazy, Suspense } from 'react'
import YouTubeEmbed from './components/YouTubeEmbed'
import AlgorithmCarousel from './components/AlgorithmCarousel'
import PatternDisplay from './components/PatternDisplay'
import tutorialAlgorithms from './data/tutorialAlgorithms.json'
import { getPatternImages } from './utils/patternMapping'
import { colors, spacing, typography } from './styles/designSystem'
import { useMobileDetection } from './hooks/useMobileDetection'
import Header from './components/Header'
import { canAnimateNotation } from './utils/cubeMoves'
import { resolveAlgorithmByName } from './utils/algorithmLookup'

const InteractiveCubeDemo = lazy(() => import('./components/InteractiveCubeDemo'))

function TutorialMode({ onModeToggle }) {
  const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState(0)
  const [activeDemoMoveIndex, setActiveDemoMoveIndex] = useState(null)
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
        Math.min(prev + 1, tutorialAlgorithms.length - 1)
      )
    }
  }

  const handlePrevious = () => {
    if (tutorialAlgorithms && tutorialAlgorithms.length > 0) {
      setCurrentAlgorithmIndex((prev) => Math.max(prev - 1, 0))
    }
  }
  
  const handleGoToIndex = (targetIndex) => {
    if (tutorialAlgorithms && tutorialAlgorithms.length > 0 && 
        targetIndex >= 0 && targetIndex < tutorialAlgorithms.length) {
      setCurrentAlgorithmIndex(targetIndex)
    }
  }
  
  // Determine if we're on desktop for compact layout
  const isDesktop = !isMobile && !isTablet
  
  // Get current algorithm and pattern information
  const currentAlgorithm = tutorialAlgorithms && tutorialAlgorithms.length > 0 
    ? tutorialAlgorithms[currentAlgorithmIndex] 
    : null
  
  const patternImages = currentAlgorithm ? getPatternImages(currentAlgorithm.id) : null
  const hasMultiplePatterns = patternImages && patternImages.length > 1
  const resolvedAlgorithm = currentAlgorithm ? resolveAlgorithmByName(currentAlgorithm) : null
  const demoNotation = resolvedAlgorithm?.notation || currentAlgorithm?.notation
  const shouldShowInteractiveDemo = canAnimateNotation(demoNotation)
  
  const patternCount = patternImages ? patternImages.length : 0

  // Responsive layout decision
  // Desktop always uses the three-column layout (pattern slot | media | pattern slot),
  // and mobile/tablet always reserves a pattern row, so the card height stays stable
  // whether a lesson has zero, one, or two pattern images.
  const shouldUseHorizontalLayout = isDesktop

  useEffect(() => {
    setActiveDemoMoveIndex(null)
  }, [currentAlgorithmIndex])

  const renderCubeLoadingState = () => (
    <div style={{
      width: '100%',
      maxWidth: isMobile ? '100%' : isTablet ? '600px' : '500px',
      margin: '0 auto',
      backgroundColor: colors.background.secondary,
      border: `1px solid ${colors.border.light}`,
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      <div style={{
        minHeight: isMobile || isTablet ? '260px' : '280px',
        aspectRatio: '16 / 9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.neutral[50],
        color: colors.neutral[700],
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
      }}>
        Loading cube demo...
      </div>
    </div>
  )

  const renderLessonMedia = () => {
    if (!shouldShowInteractiveDemo || !currentAlgorithm) {
      return <YouTubeEmbed />
    }

    return (
      <Suspense fallback={renderCubeLoadingState()}>
        <InteractiveCubeDemo
          algorithmId={currentAlgorithm.id}
          notation={demoNotation}
          onActiveMoveChange={setActiveDemoMoveIndex}
        />
      </Suspense>
    )
  }
  
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
          title="A Visual Way to Solve Rubik's Cubes"
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
        {/* Pattern Display and YouTube Video Section */}
        {shouldUseHorizontalLayout && currentAlgorithm ? (
          // Desktop: fixed three-column grid; empty pattern slots keep their width
          <div className="horizontal-layout tutorial-stable-layout">
            {patternCount > 0 ? (
              <PatternDisplay algorithmId={currentAlgorithm.id} position="left" patternIndex={0} />
            ) : (
              <div className="pattern-slot-empty" aria-hidden="true" />
            )}
            {renderLessonMedia()}
            {hasMultiplePatterns ? (
              <PatternDisplay algorithmId={currentAlgorithm.id} position="right" patternIndex={1} />
            ) : (
              <div className="pattern-slot-empty" aria-hidden="true" />
            )}
          </div>
        ) : (
          // Mobile/Tablet Portrait: video above a fixed-height pattern row
          <div className="vertical-layout">
            {renderLessonMedia()}
            {currentAlgorithm && (
              <div className="pattern-container-mobile tutorial-pattern-row">
                {patternCount > 0 ? (
                  <>
                    <PatternDisplay algorithmId={currentAlgorithm.id} position="left" patternIndex={0} />
                    {hasMultiplePatterns && (
                      <PatternDisplay algorithmId={currentAlgorithm.id} position="right" patternIndex={1} />
                    )}
                  </>
                ) : (
                  <div className="pattern-display pattern-placeholder">
                    <div className="pattern-label">Pattern to Look For</div>
                    <div className="pattern-placeholder-box">No pattern needed for this step</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Algorithm Carousel Section */}
        <AlgorithmCarousel
          algorithms={tutorialAlgorithms}
          currentIndex={currentAlgorithmIndex}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onGoToIndex={handleGoToIndex}
          activeMoveIndex={shouldShowInteractiveDemo ? activeDemoMoveIndex : null}
        />
      </div>
    </div>
  )
}

export default TutorialMode
