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
  const { isMobile } = useMobileDetection()
  const currentAlgorithm = algorithms[currentIndex]
  
  if (!currentAlgorithm) {
    return <div>No algorithms available</div>
  }
  
  return (
    <div style={{
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.xl,
      padding: spacing[6],
      boxShadow: shadows.md,
      border: `1px solid ${colors.border.light}`,
    }}>
      {/* Header with navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing[6],
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
          {/* Title and Nicknames Container */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: spacing[2],
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
            
            {/* Nicknames positioned to the right */}
            {currentAlgorithm.nicknames && currentAlgorithm.nicknames.length > 0 && (
              <div style={{
                position: 'absolute',
                left: 'calc(50% + ' + (currentAlgorithm.name.length * 0.6) + 'ch)',
                marginLeft: spacing[2],
                display: 'flex',
                gap: spacing[2],
                flexWrap: 'wrap',
                whiteSpace: 'nowrap',
              }}>
                {currentAlgorithm.nicknames.map((nickname, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: colors.neutral[100],
                      color: colors.neutral[700],
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: borderRadius.full,
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      border: `1px solid ${colors.neutral[200]}`,
                    }}
                  >
                    {nickname}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Progress indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[1],
            marginTop: spacing[2],
          }}>
            <span style={{
              fontSize: typography.fontSize.sm,
              color: colors.neutral[600],
            }}>
              {currentIndex + 1} of {algorithms.length}
            </span>
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
        marginTop: spacing[6],
      }}>
        {algorithms.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === currentIndex ? '24px' : '8px',
              height: '8px',
              backgroundColor: index === currentIndex ? colors.primary[500] : colors.neutral[300],
              borderRadius: borderRadius.full,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (index > currentIndex) {
                for (let i = currentIndex; i < index; i++) {
                  onNext()
                }
              } else if (index < currentIndex) {
                for (let i = currentIndex; i > index; i--) {
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