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

function AlgorithmCarousel({ algorithms, currentIndex, onNext, onPrevious }) {
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
      {/* Header with navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: isDesktop ? spacing[4] : spacing[6], // Reduced margin for desktop
        flexWrap: 'wrap',
        gap: spacing[3],
      }}>
        {/* Previous button */}
        <button
          onClick={onPrevious}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '44px' : '48px',
            height: isMobile ? '44px' : '48px',
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
        
        {/* Algorithm info */}
        <div style={{
          flex: '1 1 auto',
          textAlign: 'center',
          minWidth: '200px',
        }}>
          {/* Title Container */}
          <div style={{
            position: 'relative',
            marginBottom: isDesktop ? spacing[1] : spacing[2], // Reduced margin for desktop
          }}>
            <h2 style={{
              fontSize: isMobile ? typography.fontSize.xl : typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
              margin: 0,
              textAlign: 'center',
            }}>
              {currentAlgorithm.name}
            </h2>
          </div>
        </div>
        
        {/* Next button */}
        <button
          onClick={onNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '44px' : '48px',
            height: isMobile ? '44px' : '48px',
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
              if (index > safeIndex) {
                for (let i = safeIndex; i < index; i++) {
                  onNext()
                }
              } else if (index < safeIndex) {
                for (let i = safeIndex; i > index; i--) {
                  onPrevious()
                }
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AlgorithmCarousel