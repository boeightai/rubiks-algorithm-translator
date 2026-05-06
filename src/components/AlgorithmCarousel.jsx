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

function AlgorithmCarousel({ algorithms, currentIndex, onNext, onPrevious, onGoToIndex, activeMoveIndex = null }) {
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

  const moveTokens = currentAlgorithm.notation.split(/\s+/).filter(Boolean)
  const activeMoveToken = moveTokens[activeMoveIndex] || 'Move'
  const currentMoveLabel = activeMoveIndex === null
    ? 'Watch the cube, then follow the move cards below.'
    : `Current move ${activeMoveIndex + 1}: ${activeMoveToken}`
  
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
        marginBottom: isDesktop ? spacing[4] : spacing[5],
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
            gap: spacing[2],
            minWidth: isMobile ? '44px' : '116px',
            minHeight: isMobile ? '44px' : '48px',
            padding: isMobile ? 0 : `0 ${spacing[3]}`,
            backgroundColor: colors.background.primary,
            border: `1px solid ${colors.border.medium}`,
            borderRadius: borderRadius.full,
            color: colors.neutral[800],
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.neutral[100]
            e.currentTarget.style.borderColor = colors.primary[500]
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.background.primary
            e.currentTarget.style.borderColor = colors.border.medium
          }}
          aria-label="Previous algorithm"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.neutral[700]} strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {!isMobile && <span>Previous</span>}
        </button>
        
        {/* Algorithm info */}
        <div style={{
          flex: '1 1 auto',
          textAlign: 'center',
          minWidth: isMobile ? '180px' : '200px',
          maxWidth: '100%',
          overflow: 'visible',
          padding: `0 ${spacing[2]}`,
        }}>
          {/* Title Container */}
          <div style={{
            position: 'relative',
            marginBottom: spacing[2],
            width: '100%',
          }}>
            <div style={{
              color: colors.primary[600],
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.bold,
              letterSpacing: '0.08em',
              marginBottom: spacing[1],
              textTransform: 'uppercase',
            }}>
              Lesson {safeIndex + 1} of {algorithms.length}
            </div>
            <h2 style={{
              fontSize: isMobile ? typography.fontSize.lg : typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.neutral[900],
              margin: 0,
              textAlign: 'center',
              lineHeight: typography.lineHeight.tight,
              wordWrap: 'break-word',
              hyphens: 'auto',
              overflow: 'visible',
              whiteSpace: 'normal',
              display: 'block',
            }}>
              {currentAlgorithm.name}
            </h2>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: spacing[3],
              padding: `${spacing[2]} ${spacing[3]}`,
              borderRadius: borderRadius.full,
              backgroundColor: activeMoveIndex === null ? colors.background.primary : colors.primary[50],
              border: `1px solid ${activeMoveIndex === null ? colors.border.medium : colors.primary[200]}`,
              color: activeMoveIndex === null ? colors.neutral[700] : colors.primary[700],
              fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              lineHeight: typography.lineHeight.tight,
            }}>
              {currentMoveLabel}
            </div>
            
            {/* Show contained algorithms if they exist */}
            {currentAlgorithm.containedAlgorithms && currentAlgorithm.containedAlgorithms.length > 0 && (
              <div style={{
                marginTop: spacing[2],
                fontSize: isMobile ? typography.fontSize.xs : typography.fontSize.sm,
                color: colors.primary[600],
                fontWeight: typography.fontWeight.medium,
              }}>
                Contains: {currentAlgorithm.containedAlgorithms.map(algo => algo.name).join(', ')}
              </div>
            )}
          </div>
        </div>
        
        {/* Next button */}
        <button
          onClick={onNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[2],
            minWidth: isMobile ? '44px' : '124px',
            minHeight: isMobile ? '44px' : '48px',
            padding: isMobile ? 0 : `0 ${spacing[3]}`,
            backgroundColor: colors.primary[600],
            border: `1px solid ${colors.primary[600]}`,
            borderRadius: borderRadius.full,
            color: colors.background.primary,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            boxShadow: shadows.sm,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary[700]
            e.currentTarget.style.borderColor = colors.primary[700]
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary[600]
            e.currentTarget.style.borderColor = colors.primary[600]
          }}
          aria-label="Next algorithm"
        >
          {!isMobile && <span>Next Lesson</span>}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.background.primary} strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      
      {/* Visual sequence */}
      <VisualSequence
        notation={currentAlgorithm.notation}
        algorithmId={currentAlgorithm.id}
        activeMoveIndex={activeMoveIndex}
      />
      
      {/* Dots indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: spacing[1],
        marginTop: isDesktop ? spacing[3] : spacing[4],
      }}>
        {algorithms.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === safeIndex ? '18px' : '6px',
              height: '6px',
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
