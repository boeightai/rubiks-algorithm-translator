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

function VisualSequence({ notation }) {
  const { isMobile, isTablet } = useMobileDetection()
  const isDesktop = !isMobile && !isTablet
  const isMobileDevice = isMobile || isTablet

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
        
        // Only group as trigger box if it's not almost the entire algorithm
        const wouldGroupEntireAlgorithm = (parsedMoves.length === 5 && i === 1)
        
        if (!wouldGroupEntireAlgorithm) {
          groups.push({ type: 'right', start: i, end: i + 3, indices: [i, i + 1, i + 2, i + 3] })
        }
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
        
        // Only group as trigger box if it's not almost the entire algorithm
        const wouldGroupEntireAlgorithm = (parsedMoves.length === 5 && i === 1)
        
        if (!wouldGroupEntireAlgorithm) {
          groups.push({ type: 'left', start: i, end: i + 3, indices: [i, i + 1, i + 2, i + 3] })
        }
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
    if (isPartOfRightTrigger(index) && isPartOfLeftTrigger(index)) return colors.neutral[500]
    if (isPartOfRightTrigger(index)) return colors.success[400]
    if (isPartOfLeftTrigger(index)) return colors.info[400]
    return colors.border.light
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])
  
  const getMoveLabelColor = useCallback(index => {
    if (isPartOfRightTrigger(index) && isPartOfLeftTrigger(index)) return colors.neutral[800]
    if (isPartOfRightTrigger(index)) return colors.success[700]
    if (isPartOfLeftTrigger(index)) return colors.info[700]
    return colors.neutral[900]
  }, [isPartOfRightTrigger, isPartOfLeftTrigger])

  // Mobile-specific image size for trigger boxes (slightly smaller than regular moves)
  const getTriggerImageSize = useCallback(() => {
    return isMobileDevice ? '44px' : '60px'
  }, [isMobileDevice])

  // Mobile-specific gap for trigger boxes
  const getTriggerGap = useCallback(() => {
    return isMobileDevice ? spacing[1] : spacing[2]
  }, [isMobileDevice])

  // Enhanced MoveImage component with mobile trigger sizing
  const MoveImage = ({ move, index, isInTrigger = false }) => {
    const imageSrc = moves[move]
    // Smaller move images for mobile/tablet to fit 5 moves per row
    const regularImageSize = isMobileDevice ? '48px' : '64px'
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
          border: `2px solid ${getMoveImageBorder(index)}`, 
          objectFit: 'contain', 
          borderRadius: borderRadius.lg, 
          boxShadow: shadows.sm, 
          display: 'block', 
          flexShrink: 0,
        }}
        draggable="false"
      />
    )
  }

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
            {!notation || typeof notation !== 'string' ? 'Select an algorithm to see the visual sequence' : 'No moves to display'}
          </div>
          {isMobile && (
            <div style={{ 
              fontSize: typography.fontSize.xs, 
              color: colors.neutral[400], 
              marginTop: spacing[2] 
            }}>
              💡 Tip: Switch to the "Visual" tab to see the sequence
            </div>
          )}
          {!isMobile && (
            <div style={{ 
              fontSize: typography.fontSize.xs, 
              color: colors.neutral[400], 
              marginTop: spacing[2] 
            }}>
              💡 Tip: Click on an algorithm to see its visual sequence
            </div>
          )}
        </div>
      ) : (
        <div className="responsive-cube-grid" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: isDesktop ? spacing[2] : spacing[3], 
          justifyContent: 'center', 
          alignItems: 'flex-end', 
          minHeight: isDesktop ? '100px' : '120px', 
          width: '100%' 
        }}>
          {(() => {
            const renderedMoves = []
            let i = 0
            
            while (i < moveList.length) {
              const move = moveList[i]
              const triggerGroup = triggerGroups.find(group => group.start === i)
              
              if (triggerGroup) {
                const triggerType = triggerGroup.type
                const triggerColor = triggerType === 'right' ? colors.success[300] : colors.info[300]
                const triggerBackground = triggerType === 'right' ? colors.success[50] : colors.info[50]
                const endIndex = triggerGroup.end
                const triggerMoves = []
                
                for (let j = i; j <= endIndex; j++) {
                  triggerMoves.push(
                    <div key={j} style={{ 
                      textAlign: 'center', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: isDesktop ? spacing[1] : spacing[2], 
                      position: 'relative',
                      flexShrink: 0
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
                        fontSize: isMobileDevice ? typography.fontSize.lg : typography.fontSize.xl, 
                        color: getMoveLabelColor(j), 
                        fontWeight: typography.fontWeight.bold, 
                        fontFamily: typography.fontFamily.mono, 
                        letterSpacing: '0.05em', 
                        maxWidth: isMobileDevice ? '60px' : '80px', 
                        textAlign: 'center', 
                        lineHeight: typography.lineHeight.tight 
                      }}>
                        {moveList[j]}
                      </div>
                    </div>
                  )
                }
                
                renderedMoves.push(
                  <div key={`trigger-${i}`} style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: spacing[2],
                    width: isMobileDevice ? '100%' : 'fit-content',
                    flexShrink: 0
                  }}>
                    {/* Trigger label above the colored box */}
                    <div style={{ 
                      background: triggerType === 'right' ? colors.success[100] : colors.info[100], 
                      color: triggerType === 'right' ? colors.success[700] : colors.info[700], 
                      padding: `${spacing[1]} ${spacing[2]}`, 
                      borderRadius: borderRadius.full, 
                      fontSize: typography.fontSize.xs, 
                      fontWeight: typography.fontWeight.medium, 
                      border: `1px solid ${triggerType === 'right' ? colors.success[200] : colors.info[200]}`, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: spacing[1], 
                      flexShrink: 0 
                    }}>
                      <span style={{ fontSize: '10px' }}>🎯</span>
                      {triggerType === 'right' ? 'Right Trigger' : 'Left Trigger'}
                    </div>
                    
                    {/* Colored trigger box - forced single line on mobile */}
                    <div style={{ 
                      display: 'flex', 
                      gap: getTriggerGap(), 
                      padding: isDesktop ? spacing[2] : spacing[3], 
                      background: triggerBackground, 
                      border: `3px solid ${triggerColor}`, 
                      borderRadius: borderRadius.lg, 
                      boxShadow: shadows.md, 
                      flexWrap: isMobileDevice ? 'nowrap' : 'wrap', 
                      justifyContent: 'center',
                      width: isMobileDevice ? '100%' : 'fit-content',
                      overflow: isMobileDevice ? 'hidden' : 'visible',
                      minWidth: isMobileDevice ? 'fit-content' : 'auto'
                    }}>
                      {triggerMoves}
                    </div>
                  </div>
                )
                i = endIndex + 1
              } else {
                renderedMoves.push(
                  <div key={i} style={{ 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: isDesktop ? spacing[1] : spacing[2], 
                    position: 'relative' 
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
                      fontSize: typography.fontSize.xl, 
                      color: getMoveLabelColor(i), 
                      fontWeight: typography.fontWeight.bold, 
                      fontFamily: typography.fontFamily.mono, 
                      letterSpacing: '0.05em', 
                      maxWidth: '80px', 
                      textAlign: 'center', 
                      lineHeight: typography.lineHeight.tight 
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
    </div>
  )
}

export default VisualSequence