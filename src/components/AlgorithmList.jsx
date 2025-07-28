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

import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/designSystem'
import StarButton from './ui/StarButton'
import WiredButton from './ui/WiredButton'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useImageLoader } from '../hooks/useImageLoader'

const AlgorithmList = ({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm,
  isFavorite,
  onToggleFavorite,
  isWired
}) => {
  // Track which algorithms have pattern images
  const [patternImageStatus, setPatternImageStatus] = useState({})
  // Track hover state for each algorithm
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState(null)

  // Memoized function to check pattern images
  const checkPatternImages = useCallback(async (algorithmList) => {
    const status = {}
    const imagePromises = []
    
    for (const algorithm of algorithmList) {
      const img = new Image()
      const promise = new Promise((resolve) => {
        img.onload = () => {
          status[algorithm.id] = true
          resolve()
        }
        img.onerror = () => {
          status[algorithm.id] = false
          resolve()
        }
        img.src = `/images/patterns/${algorithm.id}-pattern.png`
      })
      imagePromises.push(promise)
    }
    
    await Promise.all(imagePromises)
    return status
  }, [])

  // Check for pattern images for each algorithm
  useEffect(() => {
    if (algorithms.length > 0) {
      checkPatternImages(algorithms).then(setPatternImageStatus)
    } else {
      setPatternImageStatus({})
    }
  }, [algorithms, checkPatternImages])

  // Enhanced pattern image component with retry logic
  const EnhancedPatternImage = ({ algorithmId, algorithmName }) => {
    const imageSrc = `/images/patterns/${algorithmId}-pattern.png`
    const { isLoading, isLoaded, hasError, retry } = useImageLoader(imageSrc, {
      mobileOptimized: false, // Disable mobile optimizations for desktop
      maxRetries: 2,
      retryDelay: 500
    })

    const handleError = (e) => {
      e.target.style.display = 'none'
      if (e.target.nextSibling) {
        e.target.nextSibling.style.display = 'block'
      }
    }

    const handleRetry = () => {
      retry()
    }

    return (
      <div style={{ position: 'relative' }}>
        {/* Loading state */}
        {isLoading && (
          <div style={{
            width: '70px',
            height: '70px',
            border: `1px solid ${colors.border.light}`,
            borderRadius: borderRadius.base,
            background: colors.background.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: `2px solid ${colors.neutral[300]}`,
              borderTop: `2px solid ${colors.primary[500]}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
        )}

        {/* Main image */}
        <img
          src={imageSrc}
          alt={`${algorithmName} pattern`}
          className="responsive-pattern-image"
          style={{
            width: '70px',
            height: '70px',
            border: `1px solid ${colors.border.light}`,
            borderRadius: borderRadius.base,
            background: colors.background.primary,
            maxWidth: '100%',
            display: isLoaded ? 'block' : 'none',
            loading: 'eager',
          }}
          onError={handleError}
        />

        {/* Fallback for failed images */}
        <div style={{
          display: hasError ? 'block' : 'none',
          fontSize: typography.fontSize.xs,
          color: colors.neutral[500],
          textAlign: 'center',
          cursor: 'pointer',
          padding: spacing[2],
        }}
        onClick={handleRetry}
        title="Click to retry loading image"
        >
          Image unavailable
        </div>
      </div>
    )
  }

  // Memoized algorithm list to prevent unnecessary re-renders
  const algorithmItems = useMemo(() => {
    return algorithms.map(algorithm => {
      const isSelected = selectedAlgorithm?.id === algorithm.id
      const isFav = isFavorite(algorithm.id)
      const hasPatternImage = patternImageStatus[algorithm.id]
      
      return {
        ...algorithm,
        isSelected,
        isFav,
        hasPatternImage
      }
    })
  }, [algorithms, selectedAlgorithm, isFavorite, patternImageStatus])

  // Memoized empty state to prevent re-renders
  const emptyState = useMemo(() => (
    <div style={{
      textAlign: 'center',
      padding: spacing[8],
      color: colors.neutral[500],
    }}>
      <div style={{
        fontSize: typography.fontSize.xl,
        marginBottom: spacing[2],
        color: colors.neutral[400],
      }}>
        🔍
      </div>
      <div style={{
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.medium,
        marginBottom: spacing[1],
      }}>
        No algorithms found
      </div>
      <div style={{
        fontSize: typography.fontSize.sm,
        color: colors.neutral[500],
      }}>
        Try adjusting your search or filters
      </div>
    </div>
  ), [])

  return (
    <div 
      className="responsive-algorithm-list"
      style={{ 
        maxHeight: 'calc(100vh - 400px)', 
        overflowY: 'auto', 
        paddingRight: spacing[4],
        scrollbarWidth: 'thin',
        scrollbarColor: `${colors.neutral[300]} transparent`,
      }}
    >
      {algorithms.length === 0 ? emptyState : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3],
        }}>
          {algorithmItems.map(algorithm => {
            const isHovered = hoveredAlgorithm === algorithm.id
            
            return (
              <div
                key={algorithm.id}
                onClick={() => onSelectAlgorithm(algorithm)}
                onMouseEnter={() => setHoveredAlgorithm(algorithm.id)}
                onMouseLeave={() => setHoveredAlgorithm(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectAlgorithm(algorithm)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select ${algorithm.name} algorithm`}
                aria-describedby={`algorithm-${algorithm.id}-description`}
                style={{
                  background: algorithm.isSelected ? colors.primary[50] : colors.background.primary,
                  border: algorithm.isSelected ? `2px solid ${colors.primary[500]}` : `1px solid ${colors.border.light}`,
                  borderRadius: borderRadius.xl,
                  padding: spacing[4],
                  cursor: 'pointer',
                  transition: transitions.normal,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isHovered ? shadows.lg : (algorithm.isSelected ? shadows.lg : shadows.sm),
                  borderColor: isHovered ? (algorithm.isSelected ? colors.primary[600] : colors.border.medium) : (algorithm.isSelected ? colors.primary[500] : colors.border.light),
                  outline: 'none',
                  minHeight: '44px', // Touch target optimization
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: spacing[3],
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[2],
                      marginBottom: spacing[2],
                    }}>
                      <h3 style={{
                        fontSize: typography.fontSize.lg,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.neutral[900],
                        margin: 0,
                        lineHeight: typography.lineHeight.tight,
                      }}>
                        {algorithm.name}
                      </h3>
                    </div>

                    {/* Category */}
                    <div style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.neutral[600],
                      marginBottom: spacing[2],
                      fontWeight: typography.fontWeight.medium,
                    }}>
                      {algorithm.category}
                    </div>

                    {/* Description */}
                    <div 
                      id={`algorithm-${algorithm.id}-description`}
                      style={{
                        fontSize: typography.fontSize.sm,
                        color: colors.neutral[700],
                        marginBottom: spacing[2],
                        lineHeight: typography.lineHeight.normal,
                      }}
                    >
                      {algorithm.description}
                    </div>

                    {/* Nicknames */}
                    {algorithm.nicknames && algorithm.nicknames.length > 0 && (
                      <div style={{
                        fontSize: typography.fontSize.xs,
                        color: colors.primary[600],
                        fontStyle: 'italic',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: spacing[1],
                        alignItems: 'center',
                        marginBottom: spacing[2],
                      }}>
                        <span style={{ fontWeight: typography.fontWeight.medium }}>Also known as:</span>
                        {algorithm.nicknames.map((nickname, index) => (
                          <span key={index} style={{
                            background: colors.primary[50],
                            padding: `${spacing[1]} ${spacing[2]}`,
                            borderRadius: borderRadius.base,
                            fontSize: typography.fontSize.xs,
                          }}>
                            {nickname}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pattern Image and Notation preview */}
                    <div 
                      className="responsive-pattern-section"
                      style={{
                        marginTop: spacing[3],
                        padding: spacing[3],
                        background: colors.neutral[50],
                        borderRadius: borderRadius.lg,
                        border: `1px solid ${colors.border.light}`,
                        minHeight: '120px',
                      }}
                    >
                      {algorithm.hasPatternImage ? (
                        <div 
                          className="responsive-pattern-layout"
                          style={{
                            display: 'flex',
                            gap: spacing[4],
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* Pattern Image Section */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: spacing[2],
                            flex: '0 0 auto',
                          }}>
                            <div style={{
                              fontSize: typography.fontSize.xs,
                              color: colors.neutral[500],
                              fontWeight: typography.fontWeight.medium,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}>
                              Pattern
                            </div>
                            <EnhancedPatternImage 
                              algorithmId={algorithm.id}
                              algorithmName={algorithm.name}
                            />
                          </div>
                          
                          {/* Notation Section */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: spacing[2],
                            flex: '1 1 auto',
                          }}>
                            <div style={{
                              fontSize: typography.fontSize.xs,
                              color: colors.neutral[500],
                              fontWeight: typography.fontWeight.medium,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}>
                              Notation
                            </div>
                            <div style={{
                              fontSize: typography.fontSize.sm,
                              fontFamily: typography.fontFamily.mono,
                              color: colors.neutral[800],
                              fontWeight: typography.fontWeight.medium,
                              textAlign: 'center',
                              lineHeight: typography.lineHeight.normal,
                            }}>
                              {algorithm.notation}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: spacing[2],
                          width: '100%',
                          height: '100%',
                        }}>
                          <div style={{
                            fontSize: typography.fontSize.xs,
                            color: colors.neutral[500],
                            fontWeight: typography.fontWeight.medium,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}>
                            Notation
                          </div>
                          <div style={{
                            fontSize: typography.fontSize.sm,
                            fontFamily: typography.fontFamily.mono,
                            color: colors.neutral[800],
                            fontWeight: typography.fontWeight.medium,
                            textAlign: 'center',
                            lineHeight: typography.lineHeight.normal,
                          }}>
                            {algorithm.notation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Wired and Star buttons */}
                  <div style={{
                    flexShrink: 0,
                    marginTop: spacing[1],
                    display: 'flex',
                    gap: spacing[2],
                    alignItems: 'center',
                  }}>
                    <WiredButton
                      isWired={isWired(algorithm.id)}
                      size={16}
                    />
                    <StarButton
                      isFavorite={algorithm.isFav}
                      onToggle={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(algorithm.id)
                      }}
                      size={20}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Mobile-responsive styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .responsive-algorithm-list {
            max-height: none !important;
            padding-right: 0 !important;
            overflow-y: visible !important;
          }
          
          .responsive-pattern-layout {
            flex-direction: column !important;
            gap: 16px !important;
            align-items: center !important;
          }
          
          .responsive-pattern-image {
            width: 60px !important;
            height: 60px !important;
          }
          
          .responsive-pattern-section {
            min-height: auto !important;
            padding: 16px !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-pattern-layout {
            gap: 12px !important;
          }
          
          .responsive-pattern-image {
            width: 50px !important;
            height: 50px !important;
          }
          
          .responsive-pattern-section {
            padding: 12px !important;
          }
        }
        
        @media (max-width: 360px) {
          .responsive-pattern-image {
            width: 45px !important;
            height: 45px !important;
          }
          
          .responsive-pattern-section {
            padding: 8px !important;
          }
        }
        
        /* Landscape orientation adjustments */
        @media (max-width: 768px) and (orientation: landscape) {
          .responsive-pattern-layout {
            flex-direction: row !important;
            gap: 12px !important;
          }
          
          .responsive-pattern-image {
            width: 55px !important;
            height: 55px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AlgorithmList