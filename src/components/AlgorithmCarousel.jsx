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

import { colors, typography, spacing, borderRadius, shadows } from '../styles/designSystem'
import VisualSequence from '../VisualSequence'
import { useMobileDetection } from '../hooks/useMobileDetection'

function AlgorithmCarousel({ algorithms, currentIndex, onNext, onPrevious, onGoToIndex }) {
  const { isMobile, isTablet } = useMobileDetection()
  
  // Validate inputs
  if (!algorithms || !Array.isArray(algorithms) || algorithms.length === 0) {
    return (
      <div style={{
        backgroundColor: colors.background.secondary,
        borderRadius: borderRadius.xl,
        padding: spacing[6],
        boxShadow: shadows.md,
        border: `1px solid ${colors.border.light}`,
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
          No algorithms available
        </div>
      </div>
    )
  }
  
  // Ensure currentIndex is within bounds
  const safeIndex = Math.max(0, Math.min(currentIndex, algorithms.length - 1))
  const currentAlgorithm = algorithms[safeIndex]
  
  // Determine if we're on desktop for compact layout
  const isDesktop = !isMobile && !isTablet
  
  if (!currentAlgorithm) {
    return (
      <div style={{
        backgroundColor: colors.background.secondary,
        borderRadius: borderRadius.xl,
        padding: spacing[6],
        boxShadow: shadows.md,
        border: `1px solid ${colors.border.light}`,
        textAlign: 'center',
        color: colors.error[600],
      }}>
        <div style={{
          fontSize: typography.fontSize.xl,
          marginBottom: spacing[2],
        }}>
          ⚠️
        </div>
        <div style={{
          fontSize: typography.fontSize.sm,
        }}>
          Algorithm not found
        </div>
      </div>
    )
  }
  
  return (
    <div style={{
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.xl,
      padding: isDesktop ? spacing[4] : spacing[6], // Reduced padding for desktop
      boxShadow: shadows.md,
      border: `1px solid ${colors.border.light}`,
    }}>
      {/* Header with navigation - responsive layout */}
      <div style={{
        display: isDesktop ? 'flex' : 'block',
        alignItems: isDesktop ? 'center' : 'initial',
        justifyContent: isDesktop ? 'space-between' : 'initial',
        marginBottom: isDesktop ? spacing[4] : spacing[4],
      }}>
        {isDesktop ? (
          <>
            {/* Desktop: Previous button */}
            <button
              onClick={onPrevious}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                backgroundColor: colors.white,
                border: `2px solid ${colors.border.medium}`,
                borderRadius: borderRadius.full,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.neutral[50]
                e.target.style.borderColor = colors.primary[500]
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.white
                e.target.style.borderColor = colors.border.medium
              }}
              aria-label="Previous algorithm"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.neutral[700]} strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            {/* Desktop: Algorithm title centered */}
            <div style={{
              flex: '1 1 auto',
              textAlign: 'center',
              minWidth: '200px',
              maxWidth: '100%',
              overflow: 'hidden',
              padding: `0 ${spacing[3]}`,
            }}>
              <h2 style={{
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[900],
                margin: 0,
                lineHeight: '1.3',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {currentAlgorithm.name}
              </h2>
            </div>
            
            {/* Desktop: Next button */}
            <button
              onClick={onNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                backgroundColor: colors.white,
                border: `2px solid ${colors.border.medium}`,
                borderRadius: borderRadius.full,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.neutral[50]
                e.target.style.borderColor = colors.primary[500]
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.white
                e.target.style.borderColor = colors.border.medium
              }}
              aria-label="Next algorithm"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.neutral[700]} strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        ) : (
          <>
            {/* Mobile: Algorithm title first (full width) */}
            <div style={{
              width: '100%',
              textAlign: 'center',
              marginBottom: spacing[3],
            }}>
              <h2 style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[900],
                margin: 0,
                lineHeight: '1.3',
                wordWrap: 'break-word',
              }}>
                {currentAlgorithm.name}
              </h2>
            </div>
            
            {/* Mobile: Navigation buttons centered below title */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing[4],
            }}>
              {/* Previous button */}
              <button
                onClick={onPrevious}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  backgroundColor: colors.white,
                  border: `2px solid ${colors.border.medium}`,
                  borderRadius: borderRadius.full,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.neutral[50]
                  e.target.style.borderColor = colors.primary[500]
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.white
                  e.target.style.borderColor = colors.border.medium
                }}
                aria-label="Previous algorithm"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.neutral[700]} strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              {/* Next button */}
              <button
                onClick={onNext}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  backgroundColor: colors.white,
                  border: `2px solid ${colors.border.medium}`,
                  borderRadius: borderRadius.full,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.neutral[50]
                  e.target.style.borderColor = colors.primary[500]
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.white
                  e.target.style.borderColor = colors.border.medium
                }}
                aria-label="Next algorithm"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.neutral[700]} strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Visual sequence */}
      <VisualSequence notation={currentAlgorithm.notation} />
      
      {/* Dots indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: spacing[2],
        marginTop: isDesktop ? spacing[4] : spacing[6], // Reduced margin for desktop
      }}>
        {algorithms.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === safeIndex ? '24px' : '8px',
              height: '8px',
              backgroundColor: index === safeIndex ? colors.primary[500] : colors.neutral[300],
              borderRadius: borderRadius.full,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onClick={() => {
              // Use direct navigation if available, otherwise skip
              if (typeof onGoToIndex === 'function') {
                onGoToIndex(index)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AlgorithmCarousel