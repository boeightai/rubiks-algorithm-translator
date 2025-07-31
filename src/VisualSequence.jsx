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

import { useMemo, useState, useCallback, useEffect } from 'react'
import { colors, typography, spacing, borderRadius, shadows } from './styles/designSystem'
import moves from './data/moves.json'
import { useMobileDetection } from './hooks/useMobileDetection'

function VisualSequence({ notation }) {
  const [imageErrors, setImageErrors] = useState(new Set())
  const [forceReload, setForceReload] = useState(0)
  const { isMobile, isTablet, deviceType } = useMobileDetection()
  
  // Determine if we're on desktop for compact layout
  const isDesktop = !isMobile && !isTablet
  
  // Check if we're specifically on an iPad
  const isIPad = deviceType === 'ipad'

  // Handle visibility change to reload images when returning to the app
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && (isMobile || isIPad)) {
        // Clear image errors and force reload when becoming visible
        setImageErrors(new Set())
        setForceReload(prev => prev + 1)
      }
    }

    // Also handle page show event for iOS Safari
    const handlePageShow = (event) => {
      if (event.persisted && (isMobile || isIPad)) {
        // Page was restored from bfcache
        setImageErrors(new Set())
        setForceReload(prev => prev + 1)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pageshow', handlePageShow)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [isMobile, isIPad])

  // Parse the notation string into individual moves
  const parseNotation = useCallback((notation) => {
    if (!notation) return []
    // Split by spaces and filter out empty strings
    return notation.split(' ').filter(move => move.trim() !== '')
  }, [])

  // Preload images for iPad to ensure they're available
  useEffect(() => {
    if (isIPad && notation) {
      const parsedMoves = parseNotation(notation)
      parsedMoves.forEach(move => {
        if (moves[move]) {
          const img = new Image()
          img.src = moves[move]
        }
      })
    }
  }, [notation, isIPad])

  // Memoized move list and pattern detection
  const { moveList, highlightedMoves, leftTriggerMoves, triggerGroups } = useMemo(() => {
    // Early return for invalid notation
    if (!notation || typeof notation !== 'string') {
      return { 
        moveList: [], 
        highlightedMoves: new Set(), 
        leftTriggerMoves: new Set(), 
        triggerGroups: [] 
      }
    }
    const parsedMoves = parseNotation(notation)
    

    const rightTriggerPattern = ['R', 'U', "R'", "U'"]  // Only the standard Right Trigger
    const leftTriggerPattern = ["L'", "U'", 'L', 'U']   // Only the standard Left Trigger
    const highlighted = new Set()
    const leftTrigger = new Set()
    const groups = []
    
    // Helper function to compare arrays
    const arraysEqual = (a, b) => {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false
      }
      return true
    }
    
    // Find all Right Trigger patterns in the sequence
    for (let i = 0; i <= parsedMoves.length - 4; i++) {
      const sequence = parsedMoves.slice(i, i + 4)
      
      // Check if the sequence matches the Right Trigger pattern
      const isRightTrigger = arraysEqual(sequence, rightTriggerPattern)
      
      if (isRightTrigger) {
        // Mark these 4 moves as part of a Right Trigger pattern
        for (let j = 0; j < 4; j++) {
          highlighted.add(i + j)
        }
        
        // Add to groups for visual separation
        groups.push({
          type: 'right',
          start: i,
          end: i + 3,
          indices: [i, i + 1, i + 2, i + 3]
        })
      }
    }
    
    // Find all Left Trigger patterns in the sequence
    for (let i = 0; i <= parsedMoves.length - 4; i++) {
      const sequence = parsedMoves.slice(i, i + 4)
      
      // Check if the sequence matches the Left Trigger pattern
      const isLeftTrigger = arraysEqual(sequence, leftTriggerPattern)
      
      if (isLeftTrigger) {
        // Mark these 4 moves as part of a Left Trigger pattern
        for (let j = 0; j < 4; j++) {
          leftTrigger.add(i + j)
        }
        
        // Add to groups for visual separation
        groups.push({
          type: 'left',
          start: i,
          end: i + 3,
          indices: [i, i + 1, i + 2, i + 3]
        })
      }
    }
    
    return { moveList: parsedMoves, highlightedMoves: highlighted, leftTriggerMoves: leftTrigger, triggerGroups: groups }
  }, [notation, parseNotation])

  // Function to check if a move is part of a Right Trigger sequence
  const isPartOfRightTrigger = useCallback((index) => {
    return highlightedMoves.has(index)
  }, [highlightedMoves])

  // Function to check if a move is part of a Left Trigger sequence
  const isPartOfLeftTrigger = useCallback((index) => {
    return leftTriggerMoves.has(index)
  }, [leftTriggerMoves])

  // Function to get the move number background color
  const getMoveNumberBackground = useCallback((index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[200] // Use neutral background for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[100]
    if (isLeftHighlighted) return colors.info[100]
    return colors.neutral[100]
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])

  // Function to get the move number text color
  const getMoveNumberColor = useCallback((index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[800] // Use neutral text for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[700]
    if (isLeftHighlighted) return colors.info[700]
    return colors.neutral[600]
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])

  // Function to get the move number border color
  const getMoveNumberBorder = useCallback((index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[400] // Use neutral border for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[300]
    if (isLeftHighlighted) return colors.info[300]
    return colors.border.light
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])

  // Function to get the move image border color
  const getMoveImageBorder = useCallback((index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[500] // Use neutral border for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[400]
    if (isLeftHighlighted) return colors.info[400]
    return colors.border.light
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])


  // Function to get the move label color
  const getMoveLabelColor = useCallback((index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[800] // Use neutral text for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[700]
    if (isLeftHighlighted) return colors.info[700]
    return colors.neutral[900]
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])

  // Simplified image component with error handling
  const MoveImage = useCallback(({ move, index }) => {
    const imageSrc = moves[move]
    const hasError = imageErrors.has(move)
    

    


    const handleError = () => {
      setImageErrors(prev => new Set([...prev, move]))
      
      // For iPad, try multiple reload strategies
      if (isIPad) {
        // First retry after 500ms
        setTimeout(() => {
          setForceReload(prev => prev + 1)
        }, 500)
        
        // Second retry after 2 seconds if still failing
        setTimeout(() => {
          setForceReload(prev => prev + 1)
        }, 2000)
        
        // Third retry after 5 seconds
        setTimeout(() => {
          setForceReload(prev => prev + 1)
        }, 5000)
      }
    }

    const handleLoad = () => {
      // Image loaded successfully - remove from error set if it was there
      setImageErrors(prev => {
        const newSet = new Set(prev)
        newSet.delete(move)
        return newSet
      })
    }

    // Handle missing move in moves.json
    if (!move || !moves[move]) {
      return (
        <div className="responsive-cube-image-fallback" style={{
          border: `2px solid ${colors.warning[300]}`,
          borderRadius: borderRadius.lg,
          backgroundColor: colors.warning[50],
          padding: 'var(--move-image-padding)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: typography.fontSize.sm,
          color: colors.warning[700],
          fontWeight: typography.fontWeight.medium,
        }}>
          {move || '?'}
        </div>
      )
    }

    if (!imageSrc || hasError) {
      return (
        <div className="responsive-cube-image-fallback" style={{
          border: `2px solid ${colors.warning[300]}`,
          borderRadius: borderRadius.lg,
          backgroundColor: colors.warning[50],
          padding: 'var(--move-image-padding)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: typography.fontSize.sm,
          color: colors.warning[700],
          fontWeight: typography.fontWeight.medium,
        }}>
          {move}
        </div>
      )
    }

    // Add cache busting for mobile devices to force reload
    const imageUrl = (isMobile || isIPad) && forceReload > 0
      ? `${imageSrc}?v=${forceReload}`
      : imageSrc

    return (
      <img
        key={`${move}-${forceReload}`} // Force remount on reload
        src={imageUrl}
        alt={move}
        className="responsive-cube-image"
        style={{
          border: `2px solid ${getMoveImageBorder(index)}`,
          borderRadius: borderRadius.lg,
          backgroundColor: 'var(--move-image-bg)',
          padding: 'var(--move-image-padding)',
          boxShadow: shadows.sm,
          transition: 'transform 0.2s ease',
          transform: 'scale(1)',
          maxWidth: '100%',
          // iPad-specific optimizations
          ...(isIPad && {
            imageRendering: 'crisp-edges',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }),
        }}
        onError={handleError}
        onLoad={handleLoad}
        loading="eager"
        decoding="async"
        crossOrigin="anonymous"
        draggable="false"
      />
    )
  }, [imageErrors, getMoveImageBorder, isMobile, forceReload])

  return (
    <div style={{
      background: colors.background.primary,
      borderRadius: borderRadius.xl,
      border: `1px solid ${colors.border.light}`,
      padding: isDesktop ? spacing[4] : spacing[6], // Reduced padding for desktop
      boxShadow: shadows.sm,
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        marginBottom: isDesktop ? spacing[3] : spacing[4], // Reduced margin for desktop
        paddingBottom: isDesktop ? spacing[2] : spacing[3], // Reduced padding for desktop
        borderBottom: `1px solid ${colors.border.light}`,
        flexWrap: 'wrap',
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h3 style={{
          color: colors.neutral[900],
          margin: 0,
          fontWeight: typography.fontWeight.semibold,
          fontSize: typography.fontSize.lg,
          flex: '1 1 auto',
        }}>
          Visual Sequence
        </h3>
        <div style={{
          background: colors.neutral[100],
          color: colors.neutral[600],
          padding: `${spacing[1]} ${spacing[2]}`,
          borderRadius: borderRadius.full,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
          flexShrink: 0,
        }}>
          {moveList.length} moves
        </div>
        

        
        {/* Pattern indicators */}
        {highlightedMoves.size > 0 && leftTriggerMoves.size > 0 && (
          <div style={{
            background: colors.neutral[100],
            color: colors.neutral[700],
            padding: `${spacing[1]} ${spacing[2]}`,
            borderRadius: borderRadius.full,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            border: `1px solid ${colors.neutral[200]}`,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1],
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '10px' }}>🎯</span>
            Both Triggers
          </div>
        )}
        
        {/* Right Trigger indicator (only show if not both) */}
        {highlightedMoves.size > 0 && leftTriggerMoves.size === 0 && (
          <div style={{
            background: colors.success[100],
            color: colors.success[700],
            padding: `${spacing[1]} ${spacing[2]}`,
            borderRadius: borderRadius.full,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            border: `1px solid ${colors.success[200]}`,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1],
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '10px' }}>🎯</span>
            Right Trigger
          </div>
        )}
        
        {/* Left Trigger indicator (only show if not both) */}
        {leftTriggerMoves.size > 0 && highlightedMoves.size === 0 && (
          <div style={{
            background: colors.info[100],
            color: colors.info[700],
            padding: `${spacing[1]} ${spacing[2]}`,
            borderRadius: borderRadius.full,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.medium,
            border: `1px solid ${colors.info[200]}`,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[1],
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '10px' }}>🎯</span>
            Left Trigger
          </div>
        )}
      </div>

      {moveList.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: isDesktop ? spacing[6] : spacing[8], // Reduced padding for desktop
          color: colors.neutral[500],
        }}>
          <div style={{
            fontSize: typography.fontSize.xl,
            marginBottom: spacing[2],
            color: colors.neutral[400],
          }}>
            🎯
          </div>
          <div style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[500],
          }}>
            {!notation || typeof notation !== 'string' ? 'Select an algorithm to see the visual sequence' : 'No moves to display'}
          </div>
          {isMobile && (
            <div style={{
              fontSize: typography.fontSize.xs,
              color: colors.neutral[400],
              marginTop: spacing[2],
            }}>
              💡 Tip: Switch to the "Visual" tab to see the sequence
            </div>
          )}
          {!isMobile && (
            <div style={{
              fontSize: typography.fontSize.xs,
              color: colors.neutral[400],
              marginTop: spacing[2],
            }}>
              💡 Tip: Click on an algorithm to see its visual sequence
            </div>
          )}
        </div>
      ) : (
        <div 
          className="responsive-cube-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isDesktop ? spacing[2] : spacing[3], // Reduced gap for desktop
            justifyContent: 'center',
            alignItems: 'flex-end',
            minHeight: isDesktop ? '100px' : '120px', // Reduced min height for desktop
            width: '100%',
          }}
        >
          {/* Loading indicator for images */}
          {imageErrors.size > 0 && (
            <div style={{
              width: '100%',
              textAlign: 'center',
              padding: spacing[2],
              color: colors.warning[600],
              fontSize: typography.fontSize.sm,
            }}>
              {isIPad 
                ? `🔄 Loading images for iPad... (${imageErrors.size} remaining)` 
                : '⚠️ Some images are still loading...'
              }
            </div>
          )}
          {(() => {
            const renderedMoves = []
            let i = 0
            

            
            while (i < moveList.length) {
              const move = moveList[i]
              
              // Check if this is the start of a trigger group using triggerGroups data
              const triggerGroup = triggerGroups.find(group => group.start === i)
              if (triggerGroup) {
                const triggerType = triggerGroup.type
                const triggerColor = triggerType === 'right' ? colors.success[300] : colors.info[300]
                const triggerBackground = triggerType === 'right' ? colors.success[50] : colors.info[50]
                
                // Use the triggerGroup data for the end index
                const endIndex = triggerGroup.end
                
                // Create a container for the entire trigger group
                const triggerMoves = []
                for (let j = i; j <= endIndex; j++) {
                  triggerMoves.push(
                    <div key={j} style={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: isDesktop ? spacing[1] : spacing[2], // Reduced gap for desktop
                      position: 'relative',
                    }}>
                      {/* Move number */}
                      <div style={{
                        background: getMoveNumberBackground(j),
                        color: getMoveNumberColor(j),
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.medium,
                        border: `1px solid ${getMoveNumberBorder(j)}`,
                      }}>
                        {j + 1}
                      </div>

                      {/* Move Image */}
                      <MoveImage 
                        move={moveList[j]} 
                        index={j}
                      />

                      {/* Move label */}
                      <div style={{
                        fontSize: typography.fontSize.xl,
                        color: getMoveLabelColor(j),
                        fontWeight: typography.fontWeight.bold,
                        fontFamily: typography.fontFamily.mono,
                        letterSpacing: '0.05em',
                        maxWidth: '80px',
                        textAlign: 'center',
                        lineHeight: typography.lineHeight.tight,
                      }}>
                        {moveList[j]}
                      </div>
                    </div>
                  )
                }
                
                // Add the trigger group container
                renderedMoves.push(
                  <div key={`trigger-${i}`} style={{
                    display: 'flex',
                    gap: isDesktop ? spacing[1] : spacing[2], // Reduced gap for desktop
                    padding: isDesktop ? spacing[2] : spacing[3], // Reduced padding for desktop
                    background: triggerBackground,
                    border: `3px solid ${triggerColor}`,
                    borderRadius: borderRadius.lg,
                    boxShadow: shadows.md,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                    {triggerMoves}
                  </div>
                )
                
                i = endIndex + 1 // Skip to after the trigger group
              } else {
                // Regular move (not part of a trigger)
                renderedMoves.push(
                  <div key={i} style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: isDesktop ? spacing[1] : spacing[2], // Reduced gap for desktop
                    position: 'relative',
                  }}>
                    {/* Move number */}
                    <div style={{
                      background: getMoveNumberBackground(i),
                      color: getMoveNumberColor(i),
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      border: `1px solid ${getMoveNumberBorder(i)}`,
                    }}>
                      {i + 1}
                    </div>

                    {/* Move Image */}
                    <MoveImage 
                      move={move} 
                      index={i}
                    />

                    {/* Move label */}
                    <div style={{
                      fontSize: typography.fontSize.xl,
                      color: getMoveLabelColor(i),
                      fontWeight: typography.fontWeight.bold,
                      fontFamily: typography.fontFamily.mono,
                      letterSpacing: '0.05em',
                      maxWidth: '80px',
                      textAlign: 'center',
                      lineHeight: typography.lineHeight.tight,
                    }}>
                      {move}
                    </div>
                  </div>
                )
                i++
              }
            }
            
            return renderedMoves
          })()}
        </div>
      )}

      {/* Mobile-responsive styles */}
      <style>{`
        /* Base styles for cube images */
        .responsive-cube-image {
          width: 64px;
          height: 64px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }
        
        .responsive-cube-image-fallback {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        /* Base grid styles */
        .responsive-cube-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: center;
          align-items: flex-end;
          min-height: 120px;
          width: 100%;
          box-sizing: border-box;
        }
        
        /* Desktop optimizations */
        @media (min-width: 1024px) {
          .responsive-cube-image,
          .responsive-cube-image-fallback {
            width: 56px !important;
            height: 56px !important;
          }
          
          .responsive-cube-grid {
            gap: 16px !important;
            min-height: 100px !important;
          }
          
          .responsive-cube-grid > div > div {
            gap: 8px !important;
          }
        }
        
        @media (max-width: 768px) {
          .responsive-cube-grid {
            gap: 16px !important;
            justify-content: center !important;
          }
          
          .responsive-cube-image,
          .responsive-cube-image-fallback {
            width: 48px !important;
            height: 48px !important;
          }
          
          .responsive-cube-grid > div > div {
            gap: 8px !important;
          }
          
          .responsive-cube-grid > div > div > div:last-child {
            font-size: 0.875rem !important;
            max-width: 60px !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-cube-grid {
            gap: 12px !important;
          }
          
          .responsive-cube-image,
          .responsive-cube-image-fallback {
            width: 40px !important;
            height: 40px !important;
          }
          
          .responsive-cube-grid > div > div > div:last-child {
            font-size: 0.75rem !important;
            max-width: 50px !important;
          }
          
          .responsive-cube-grid > div > div > div:first-child {
            width: 20px !important;
            height: 20px !important;
            font-size: 0.625rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .responsive-cube-grid {
            gap: 8px !important;
          }
          
          .responsive-cube-image,
          .responsive-cube-image-fallback {
            width: 36px !important;
            height: 36px !important;
          }
        }
        
        /* Landscape orientation adjustments */
        @media (max-width: 768px) and (orientation: landscape) {
          .responsive-cube-grid {
            gap: 12px !important;
          }
          
          .responsive-cube-image,
          .responsive-cube-image-fallback {
            width: 44px !important;
            height: 44px !important;
          }
        }
        
        /* iPad-specific optimizations */
        @media (min-width: 768px) and (max-width: 1024px) {
          .responsive-cube-grid {
            gap: 20px !important;
          }
          
          .responsive-cube-image,
          .responsive-cube-image-fallback {
            width: 56px !important;
            height: 56px !important;
          }
          
          .responsive-cube-grid > div > div > div:last-child {
            font-size: 1rem !important;
            max-width: 70px !important;
          }
        }
        
        /* Ensure images load properly on mobile */
        .responsive-cube-image {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          will-change: transform;
          contain: layout style paint;
        }
        
        /* Mobile-specific image optimizations */
        @media (max-width: 768px) {
          .responsive-cube-image {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            touch-action: manipulation;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          .responsive-cube-grid {
            touch-action: pan-x pan-y;
            -webkit-overflow-scrolling: touch;
            overflow-x: auto;
            overflow-y: hidden;
          }
          
          .responsive-cube-image {
            min-width: 0;
            min-height: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default VisualSequence