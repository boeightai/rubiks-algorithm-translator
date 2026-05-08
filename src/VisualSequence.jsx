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
 * MERCHANTABILITY or FITNESS FOR ANY PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useMemo, useCallback } from 'react'
import { colors, typography, spacing, borderRadius, shadows } from './styles/designSystem'
import moves from './data/moves.json'
import { useMobileDetection } from './hooks/useMobileDetection'

function VisualSequence({ notation, algorithmId, activeMoveIndex = null }) {
  const { isMobile, isTablet } = useMobileDetection()
  const isDesktop = !isMobile && !isTablet
  const isMobileDevice = isMobile || isTablet
  const isKiteOLL = (algorithmId === 'kite-oll') || (typeof notation === 'string' && notation.trim() === "F U R U' R' F'")

  // Parse the notation string into individual moves
  const parseNotation = useCallback((notation) => {
    if (!notation) return []
    return notation.split(' ').filter(move => move.trim() !== '')
  }, [])

  // Memoized move list and pattern detection
  const { moveList, highlightedMoves, leftTriggerMoves, triggerGroups } = useMemo(() => {
    if (!notation || typeof notation !== 'string') {
      return { 
        moveList: [], 
        highlightedMoves: new Set(), 
        leftTriggerMoves: new Set(), 
        triggerGroups: [] 
      }
    }
    
    const parsedMoves = parseNotation(notation)
    const rightTriggerPattern = ['R', 'U', "R'", "U'"]
    const leftTriggerPattern = ["L'", "U'", 'L', 'U']
    const highlighted = new Set()
    const leftTrigger = new Set()
    const groups = []
    
    const arraysEqual = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])
    
    // Check for right triggers
    for (let i = 0; i <= parsedMoves.length - 4; i++) {
      const sequence = parsedMoves.slice(i, i + 4)
      if (arraysEqual(sequence, rightTriggerPattern)) {
        // Always highlight trigger moves
        for (let j = 0; j < 4; j++) highlighted.add(i + j)
        
        // Always create trigger boxes for 5-move algorithms that contain triggers
        // This ensures algorithms like "Second Layer Right Edge" show their trigger patterns
        groups.push({ type: 'right', start: i, end: i + 3, indices: [i, i + 1, i + 2, i + 3] })
      }
    }
    
    // Check for left triggers
    for (let i = 0; i <= parsedMoves.length - 4; i++) {
      const sequence = parsedMoves.slice(i, i + 4)
      if (arraysEqual(sequence, leftTriggerPattern)) {
        // Always highlight trigger moves
        for (let j = 0; j < 4; j++) {
          highlighted.add(i + j)
          leftTrigger.add(i + j)
        }
        
        // Always create trigger boxes for 5-move algorithms that contain triggers
        // This ensures algorithms like "Second Layer Left Edge" show their trigger patterns
        groups.push({ type: 'left', start: i, end: i + 3, indices: [i, i + 1, i + 2, i + 3] })
      }
    }
    
    return { 
      moveList: parsedMoves, 
      highlightedMoves: highlighted, 
      leftTriggerMoves: leftTrigger, 
      triggerGroups: groups 
    }
  }, [notation, parseNotation])

  // Pattern color helpers
  const isPartOfRightTrigger = useCallback(index => highlightedMoves.has(index), [highlightedMoves])
  const isPartOfLeftTrigger = useCallback(index => leftTriggerMoves.has(index), [leftTriggerMoves])
  
  const getMoveNumberBackground = useCallback(index => {
    if (isPartOfRightTrigger(index) && isPartOfLeftTrigger(index)) return colors.neutral[200]
    if (isPartOfRightTrigger(index)) return colors.success[100]
    if (isPartOfLeftTrigger(index)) return colors.info[100]
    return colors.neutral[100]
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])
  
  const getMoveNumberColor = useCallback(index => {
    if (isPartOfRightTrigger(index) && isPartOfLeftTrigger(index)) return colors.neutral[800]
    if (isPartOfRightTrigger(index)) return colors.success[700]
    if (isPartOfLeftTrigger(index)) return colors.info[700]
    return colors.neutral[600]
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])
  
  const getMoveNumberBorder = useCallback(index => {
    if (isPartOfRightTrigger(index) && isPartOfLeftTrigger(index)) return colors.neutral[400]
    if (isPartOfRightTrigger(index)) return colors.success[300]
    if (isPartOfLeftTrigger(index)) return colors.info[300]
    return colors.border.light
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])
  
  const getMoveImageBorder = useCallback(index => {
    if (index === activeMoveIndex) return colors.primary[500]
    if (isPartOfRightTrigger(index) && isPartOfLeftTrigger(index)) return colors.neutral[500]
    if (isPartOfRightTrigger(index)) return colors.success[400]
    if (isPartOfLeftTrigger(index)) return colors.info[400]
    return colors.border.light
  }, [activeMoveIndex, isPartOfRightTrigger, isPartOfLeftTrigger])
  
  const getMoveLabelColor = useCallback(index => {
    if (index === activeMoveIndex) return colors.primary[700]
    if (isPartOfRightTrigger(index) && isPartOfLeftTrigger(index)) return colors.neutral[800]
    if (isPartOfRightTrigger(index)) return colors.success[700]
    if (isPartOfLeftTrigger(index)) return colors.info[700]
    return colors.neutral[900]
  }, [activeMoveIndex, isPartOfRightTrigger, isPartOfLeftTrigger])

  const getActiveTileStyle = useCallback(index => {
    if (index !== activeMoveIndex) return {}
    return {
      transform: 'translateY(-3px)',
      filter: 'drop-shadow(0 10px 12px rgba(59, 130, 246, 0.22))',
    }
  }, [activeMoveIndex])

  const renderNotationKey = () => (
    <details className="notation-key" style={{
      marginBottom: spacing[4],
      border: `1px solid ${colors.border.light}`,
      borderRadius: borderRadius.lg,
      background: colors.neutral[50],
      overflow: 'hidden',
    }}>
      <summary style={{
        cursor: 'pointer',
        padding: `${spacing[3]} ${spacing[4]}`,
        color: colors.neutral[800],
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
      }}>
        Picture move key
      </summary>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobileDevice ? '1fr' : 'repeat(4, minmax(0, 1fr))',
        gap: spacing[3],
        padding: `${spacing[1]} ${spacing[4]} ${spacing[4]}`,
      }}>
        {[
          ['1', 'Step number'],
          ['↻', 'Turn picture'],
          ['R', 'Letter code'],
          ['▣', 'Trigger group'],
        ].map(([symbol, label], index) => (
          <div key={label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            color: colors.neutral[700],
            fontSize: typography.fontSize.sm,
          }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: index === 0 ? borderRadius.full : borderRadius.md,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '0 0 auto',
              background: index === 3 ? colors.success[100] : colors.background.primary,
              border: `1px solid ${index === 3 ? colors.success[300] : colors.border.medium}`,
              color: index === 3 ? colors.success[700] : colors.neutral[700],
              fontFamily: index === 2 ? typography.fontFamily.mono : typography.fontFamily.primary,
              fontWeight: typography.fontWeight.bold,
            }}>
              {symbol}
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </details>
  )

  // Calculate optimal sizes for mobile to fit exactly 5 moves per row
  const getMobileImageSize = useCallback(() => {
    if (!isMobileDevice) return '64px'
    
    // More robust mobile sizing calculation
    // Account for different mobile screen sizes and orientations
    let baseSize = 48 // Default mobile size
    
    // Adjust based on screen width for better responsiveness
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth
      
      if (screenWidth <= 380) {
        // Extra small phones
        baseSize = 40
      } else if (screenWidth <= 480) {
        // Small phones
        baseSize = 44
      } else if (screenWidth <= 768) {
        // Medium phones and small tablets
        baseSize = 48
      } else if (screenWidth <= 1024) {
        // Large tablets and iPad
        baseSize = 52
      }
    }
    
    return baseSize + 'px'
  }, [isMobileDevice])

  // Mobile-specific image size for trigger boxes (slightly smaller than regular moves)
  const getTriggerImageSize = useCallback(() => {
    if (!isMobileDevice) return '60px'
    
    // Trigger moves should be slightly smaller than regular moves
    const regularSize = parseInt(getMobileImageSize())
    return Math.max(36, regularSize - 4) + 'px'
  }, [isMobileDevice, getMobileImageSize])

  // Mobile-specific gap for trigger boxes
  const getTriggerGap = useCallback(() => {
    return isMobileDevice ? spacing[2] : spacing[2] // Use consistent spacing
  }, [isMobileDevice])


  // Enhanced MoveImage component with mobile trigger sizing
  const MoveImage = ({ move, index, isInTrigger = false }) => {
    const imageSrc = moves[move]
    // Use calculated mobile sizes for optimal 5-moves-per-row layout
    const regularImageSize = getMobileImageSize()
    const imageSize = isInTrigger ? getTriggerImageSize() : regularImageSize
    
    if (!move || !imageSrc) {
      return (
        <div style={{
          width: imageSize, 
          height: imageSize, 
          border: '2px solid red', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '12px', 
          backgroundColor: 'yellow',
        }}>
          {move || '?'}
        </div>
      )
    }
    
    return (
      <img
        src={imageSrc}
        alt={move}
        className="move-image"
        style={{
          width: imageSize, 
          height: imageSize, 
          border: `${index === activeMoveIndex ? '3px' : '2px'} solid ${getMoveImageBorder(index)}`, 
          objectFit: 'contain', 
          borderRadius: borderRadius.lg, 
          boxShadow: shadows.sm, 
          display: 'block', 
          flexShrink: 0,
          transition: 'border-color 0.2s ease, border-width 0.2s ease, transform 0.2s ease',
        }}
        draggable="false"
      />
    )
  }

  // Ensure the container reserves enough vertical space for the special 3+3 layout
  const specialKiteMinHeight = useMemo(() => {
    if (!(isMobileDevice && isKiteOLL)) return null
    // If there are 6 moves, compute min height for two rows with gap
    const moveCount = notation ? notation.split(' ').filter(Boolean).length : 0
    if (moveCount !== 6) return null
    const movePx = parseInt(getMobileImageSize()) || 48
    // Match the exact tile height used in the renderer (image + number + label spacing)
    const tileHeight = movePx + 80
    // Two rows of tiles plus the consistent spacing[2] row gap (8px)
    return tileHeight * 2 + 8
  }, [isMobileDevice, isKiteOLL, notation, getMobileImageSize])

  return (
    <div style={{
      background: colors.background.primary,
      borderRadius: borderRadius.xl,
      border: `1px solid ${colors.border.light}`,
      padding: isDesktop ? spacing[4] : spacing[6],
      boxShadow: shadows.sm,
    }}>
      
      {moveList.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: isDesktop ? spacing[6] : spacing[8], 
          color: colors.neutral[500] 
        }}>
          <div style={{ 
            fontSize: typography.fontSize.xl, 
            marginBottom: spacing[2], 
            color: colors.neutral[400] 
          }}>
            🎯
          </div>
          <div style={{ 
            fontSize: typography.fontSize.sm, 
            color: colors.neutral[500] 
          }}>
            {!notation || typeof notation !== 'string' ? 'Select a move to see the picture steps' : 'No moves to display'}
          </div>
          {isMobile && (
            <div style={{ 
              fontSize: typography.fontSize.xs, 
              color: colors.neutral[400], 
              marginTop: spacing[2] 
            }}>
              Tip: Switch to Picture Steps to see the cards.
            </div>
          )}
          {!isMobile && (
            <div style={{ 
              fontSize: typography.fontSize.xs, 
              color: colors.neutral[400], 
              marginTop: spacing[2] 
            }}>
              Tip: Pick a move to see Bo and Hailey's picture steps.
            </div>
          )}
        </div>
      ) : (
        <>
        {renderNotationKey()}
        <div className="responsive-cube-grid" style={{ 
          display: 'flex', 
          flexWrap: isMobileDevice && isKiteOLL && moveList.length === 6 ? 'nowrap' : 'wrap', 
          gap: isDesktop ? spacing[2] : spacing[2], // Consistent spacing for mobile
          justifyContent: 'center', // Always center horizontally
          // Center-align all items for consistent vertical alignment
          alignItems: isDesktop ? 'center' : 'flex-start',
          // Reserve enough vertical space for the 3x2 Kite layout on mobile
          minHeight: specialKiteMinHeight ? `${specialKiteMinHeight}px` : (isDesktop ? '100px' : 'auto'), 
          width: '100%',
          // Mobile-specific layout constraints
          ...(isMobileDevice && {
            maxWidth: '100%',
            padding: '0 8px', // Increased padding for better mobile spacing
            boxSizing: 'border-box',
            position: 'relative' // Ensure proper positioning context
          })
        }}>
          {(() => {
            // Special 3x3 mobile layout for Kite OLL only in tutorial carousel
            if (isMobileDevice && isKiteOLL && moveList.length === 6) {
              const tileMinHeight = parseInt(getMobileImageSize()) + 80 // Increased height for better separation
              const renderTile = (i) => (
                <div key={i} style={{ 
                  textAlign: 'center', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: isDesktop ? spacing[1] : spacing[2], 
                  position: 'relative',
                  transition: 'transform 0.2s ease, filter 0.2s ease',
                  height: tileMinHeight + 'px', // Fixed height instead of minHeight
                  minWidth: 'fit-content',
                  ...getActiveTileStyle(i)
                }}>
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
                    border: `1px solid ${getMoveNumberBorder(i)}` 
                  }}>
                    {i + 1}
                  </div>
                  <MoveImage move={moveList[i]} index={i} />
                  <div style={{ 
                    fontSize: isMobileDevice ? typography.fontSize.sm : typography.fontSize.xl, 
                    color: getMoveLabelColor(i), 
                    fontWeight: typography.fontWeight.bold, 
                    fontFamily: typography.fontFamily.mono, 
                    letterSpacing: '0.05em', 
                    maxWidth: isMobileDevice ? '50px' : '80px', 
                    textAlign: 'center', 
                    lineHeight: typography.lineHeight.tight,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    {moveList[i]}
                  </div>
                </div>
              )

              return (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    {/* First row: moves 1, 2, 3 */}
                    <div style={{
                      display: 'flex',
                      gap: spacing[2],
                      justifyContent: 'center',
                      marginBottom: spacing[2] // Use consistent spacing with main grid
                    }}>
                      {renderTile(0)}
                      {renderTile(1)}
                      {renderTile(2)}
                    </div>
                    {/* Second row: moves 4, 5, 6 */}
                    <div style={{
                      display: 'flex',
                      gap: spacing[2],
                      justifyContent: 'center'
                    }}>
                      {renderTile(3)}
                      {renderTile(4)}
                      {renderTile(5)}
                    </div>
                  </div>
                </div>
              )
            }

            const renderedMoves = []
            // Render standalone moves first, then grouped trigger sequences
            
            // First, render all moves that are not part of trigger groups
            for (let i = 0; i < moveList.length; i++) {
              const move = moveList[i]
              const isInTriggerGroup = triggerGroups.some(group => 
                group.start <= i && group.end >= i
              )
              
              if (!isInTriggerGroup) {
                renderedMoves.push(
                  <div key={i} style={{ 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: isDesktop ? spacing[1] : spacing[2], 
                    position: 'relative',
                    transition: 'transform 0.2s ease, filter 0.2s ease',
                    // Mobile-specific layout constraints
                    ...(isMobileDevice && {
                      flex: '0 0 auto',
                      minWidth: 'fit-content',
                      maxWidth: 'fit-content',
                      margin: '0',
                      padding: '0',
                      // Center singleton tiles vertically against taller trigger groups
                      alignSelf: 'center'
                    }),
                    // Desktop: Center-align with other items
                    ...(isDesktop && {
                      alignSelf: 'center'
                    }),
                    ...getActiveTileStyle(i)
                  }}>
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
                      border: `1px solid ${getMoveNumberBorder(i)}` 
                    }}>
                      {i + 1}
                    </div>
                    <MoveImage move={move} index={i} />
                    <div style={{ 
                      fontSize: isMobileDevice ? typography.fontSize.sm : typography.fontSize.xl, 
                      color: getMoveLabelColor(i), 
                      fontWeight: typography.fontWeight.bold, 
                      fontFamily: typography.fontFamily.mono, 
                      letterSpacing: '0.05em', 
                      maxWidth: isMobileDevice ? '50px' : '80px', 
                      textAlign: 'center', 
                      lineHeight: typography.lineHeight.tight,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      {move}
                    </div>
                  </div>
                )
              }
            }
            
            // Then, render all trigger groups
            triggerGroups.forEach((triggerGroup, groupIndex) => {
              const triggerType = triggerGroup.type
              const triggerColor = triggerType === 'right' ? colors.success[300] : colors.info[300]
              const triggerBackground = triggerType === 'right' ? colors.success[50] : colors.info[50]
              const startIndex = triggerGroup.start
              const endIndex = triggerGroup.end
              const triggerMoves = []
              
              for (let j = startIndex; j <= endIndex; j++) {
                triggerMoves.push(
                  <div key={j} style={{ 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: isDesktop ? spacing[1] : spacing[2], 
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease, filter 0.2s ease',
                    // Ensure consistent sizing for trigger moves in mobile layout
                    ...(isMobileDevice && {
                      flex: '0 0 auto',
                      minWidth: 'fit-content',
                      margin: '0',
                      padding: '0'
                    }),
                    ...getActiveTileStyle(j)
                  }}>
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
                      border: `1px solid ${getMoveNumberBorder(j)}` 
                    }}>
                      {j + 1}
                    </div>
                    <MoveImage move={moveList[j]} index={j} isInTrigger={true} />
                    <div style={{ 
                      fontSize: isMobileDevice ? typography.fontSize.sm : typography.fontSize.xl, 
                      color: getMoveLabelColor(j), 
                      fontWeight: typography.fontWeight.bold, 
                      fontFamily: typography.fontFamily.mono, 
                      letterSpacing: '0.05em', 
                      maxWidth: isMobileDevice ? '50px' : '80px', 
                      textAlign: 'center', 
                      lineHeight: typography.lineHeight.tight,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      {moveList[j]}
                    </div>
                  </div>
                )
              }
              
              renderedMoves.push(
                <div key={`trigger-${groupIndex}`} className={`trigger-box trigger-${triggerType}`} style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: spacing[2],
                  width: 'fit-content', // Always use fit-content for consistent layout
                  flexShrink: 0,
                  // Mobile-specific constraints
                  ...(isMobileDevice && {
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    // Center the group vertically relative to neighboring items
                    alignSelf: 'center'
                  })
                }}>
                  
                  {/* Colored trigger box - optimized for mobile 5-moves-per-row layout */}
                  <div style={{ 
                    display: 'flex', 
                    gap: getTriggerGap(), 
                    padding: isDesktop ? spacing[2] : spacing[3], 
                    background: triggerBackground, 
                    border: `3px solid ${triggerColor}`, 
                    borderRadius: borderRadius.lg, 
                    boxShadow: shadows.md, 
                    flexWrap: 'nowrap', // Always nowrap for consistent layout
                    justifyContent: 'center',
                    width: 'fit-content',
                    overflow: 'visible', // Allow overflow for better mobile handling
                    minWidth: 'fit-content',
                    // Mobile-specific constraints
                    ...(isMobileDevice && {
                      maxWidth: '100%',
                      boxSizing: 'border-box'
                    })
                  }}>
                    {triggerMoves}
                  </div>
                </div>
              )
                         })
            return renderedMoves
          })()}
        </div>
        </>
      )}
    </div>
  )
}

export default VisualSequence
