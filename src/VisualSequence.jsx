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

import { useMemo, useState, useEffect } from 'react'
import { colors, typography, spacing, borderRadius, shadows } from './styles/designSystem'
import moves from './data/moves.json'

function VisualSequence({ notation }) {
  const [imageErrors, setImageErrors] = useState(new Set())
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])



  // Parse the notation string into individual moves
  const parseNotation = (notation) => {
    if (!notation) return []
    // Split by spaces and filter out empty strings
    return notation.split(' ').filter(move => move.trim() !== '')
  }

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
    
    // Find all Right Trigger patterns in the sequence
    for (let i = 0; i <= parsedMoves.length - 4; i++) {
      const sequence = parsedMoves.slice(i, i + 4)
      
      // Check if the sequence matches the Right Trigger pattern
      const isRightTrigger = JSON.stringify(sequence) === JSON.stringify(rightTriggerPattern)
      
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
      const isLeftTrigger = JSON.stringify(sequence) === JSON.stringify(leftTriggerPattern)
      
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
  }, [notation])

  // Function to check if a move is part of a Right Trigger sequence
  const isPartOfRightTrigger = (index) => {
    return highlightedMoves.has(index)
  }

  // Function to check if a move is part of a Left Trigger sequence
  const isPartOfLeftTrigger = (index) => {
    return leftTriggerMoves.has(index)
  }

  // Function to get the move number background color
  const getMoveNumberBackground = (index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[200] // Use neutral background for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[100]
    if (isLeftHighlighted) return colors.info[100]
    return colors.neutral[100]
  }

  // Function to get the move number text color
  const getMoveNumberColor = (index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[800] // Use neutral text for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[700]
    if (isLeftHighlighted) return colors.info[700]
    return colors.neutral[600]
  }

  // Function to get the move number border color
  const getMoveNumberBorder = (index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[400] // Use neutral border for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[300]
    if (isLeftHighlighted) return colors.info[300]
    return colors.border.light
  }

  // Function to get the move image border color
  const getMoveImageBorder = (index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[500] // Use neutral border for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[400]
    if (isLeftHighlighted) return colors.info[400]
    return colors.border.light
  }

  // Function to get the move image background color
  const getMoveImageBackground = (index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[50] // Use neutral background for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[50]
    if (isLeftHighlighted) return colors.info[50]
    return colors.background.primary
  }

  // Function to get the move label color
  const getMoveLabelColor = (index) => {
    const isRightHighlighted = isPartOfRightTrigger(index)
    const isLeftHighlighted = isPartOfLeftTrigger(index)
    
    // If both patterns overlap, use a blended approach
    if (isRightHighlighted && isLeftHighlighted) {
      return colors.neutral[800] // Use neutral text for overlapping patterns
    }
    if (isRightHighlighted) return colors.success[700]
    if (isLeftHighlighted) return colors.info[700]
    return colors.neutral[900]
  }

  // Simplified image component with error handling
  const MoveImage = ({ move, index }) => {
    const imageSrc = moves[move]
    const hasError = imageErrors.has(move)

    const handleError = () => {
      setImageErrors(prev => new Set([...prev, move]))
    }

    const handleLoad = () => {
      // Image loaded successfully
    }

    // Handle missing move in moves.json
    if (!move || !moves[move]) {
      return (
        <div className="responsive-cube-image-fallback" style={{
          border: `2px solid ${colors.warning[300]}`,
          borderRadius: borderRadius.lg,
          backgroundColor: colors.warning[50],
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

    return (
      <img
        src={imageSrc}
        alt={move}
        className="responsive-cube-image"
        style={{
          border: `2px solid ${getMoveImageBorder(index)}`,
          borderRadius: borderRadius.lg,
          backgroundColor: getMoveImageBackground(index),
          boxShadow: shadows.sm,
          transition: 'transform 0.2s ease',
          transform: 'scale(1)',
          maxWidth: '100%',
        }}
        onError={handleError}
        onLoad={handleLoad}
        loading={isMobile ? "eager" : "lazy"}
        decoding="async"
        crossOrigin="anonymous"
        draggable="false"
      />
    )
  }

  return (
    <div style={{
      background: colors.background.primary,
      borderRadius: borderRadius.xl,
      border: `1px solid ${colors.border.light}`,
      padding: spacing[6],
      boxShadow: shadows.sm,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        marginBottom: spacing[4],
        paddingBottom: spacing[3],
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
          padding: spacing[8],
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
            {!notation || typeof notation !== 'string' ? 'No notation provided' : 'No moves to display'}
          </div>
        </div>
      ) : (
        <div 
          className="responsive-cube-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing[3],
            justifyContent: 'center',
            alignItems: 'flex-end',
            minHeight: '120px',
            width: '100%',
          }}
        >
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
                      gap: spacing[2],
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
                    gap: spacing[2],
                    padding: spacing[3],
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
                    gap: spacing[2],
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