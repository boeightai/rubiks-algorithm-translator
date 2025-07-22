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

import { useMemo } from 'react'
import { colors, typography, spacing, borderRadius, shadows } from './styles/designSystem'
import moves from './data/moves.json'

function VisualSequence({ notation }) {
  // Parse the notation string into individual moves
  const parseNotation = (notation) => {
    if (!notation) return []
    // Split by spaces and filter out empty strings
    return notation.split(' ').filter(move => move.trim() !== '')
  }

  // Memoized move list and pattern detection
  const { moveList, highlightedMoves, leftTriggerMoves, triggerGroups } = useMemo(() => {
    const moves = parseNotation(notation)
    const rightTriggerPattern = ['R', 'U', "R'", "U'"]  // Only the standard Right Trigger
    const leftTriggerPattern = ["L'", "U'", 'L', 'U']   // Only the standard Left Trigger
    const highlighted = new Set()
    const leftTrigger = new Set()
    const groups = []
    
    // Find all Right Trigger patterns in the sequence
    for (let i = 0; i <= moves.length - 4; i++) {
      const sequence = moves.slice(i, i + 4)
      
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
    for (let i = 0; i <= moves.length - 4; i++) {
      const sequence = moves.slice(i, i + 4)
      
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
    
    return { moveList: moves, highlightedMoves: highlighted, leftTriggerMoves: leftTrigger, triggerGroups: groups }
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
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            No moves to display
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing[3],
          justifyContent: 'center',
          alignItems: 'flex-end',
          minHeight: '120px',
        }}>
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

                      {/* Move image */}
                      {moves[moveList[j]] ? (
                        <div style={{
                          position: 'relative',
                        }}>
                          <img
                            src={moves[moveList[j]]}
                            alt={moveList[j]}
                            style={{
                              width: '64px',
                              height: '64px',
                              border: `2px solid ${getMoveImageBorder(j)}`,
                              borderRadius: borderRadius.lg,
                              backgroundColor: getMoveImageBackground(j),
                              display: 'block',
                              boxShadow: shadows.sm,
                              transition: 'transform 0.2s ease',
                              transform: 'scale(1)',
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                          <div style={{
                            display: 'none',
                            width: '64px',
                            height: '64px',
                            border: `2px solid ${getMoveImageBorder(j)}`,
                            borderRadius: borderRadius.lg,
                            backgroundColor: getMoveImageBackground(j),
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: typography.fontSize.sm,
                            color: getMoveLabelColor(j),
                            fontWeight: typography.fontWeight.medium,
                          }}>
                            {moveList[j]}
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          width: '64px',
                          height: '64px',
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
                          ?
                        </div>
                      )}

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

                    {/* Move image */}
                    {moves[move] ? (
                      <div style={{
                        position: 'relative',
                      }}>
                        <img
                          src={moves[move]}
                          alt={move}
                          style={{
                            width: '64px',
                            height: '64px',
                            border: `2px solid ${getMoveImageBorder(i)}`,
                            borderRadius: borderRadius.lg,
                            backgroundColor: getMoveImageBackground(i),
                            display: 'block',
                            boxShadow: shadows.sm,
                            transition: 'transform 0.2s ease',
                            transform: 'scale(1)',
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div style={{
                          display: 'none',
                          width: '64px',
                          height: '64px',
                          border: `2px solid ${getMoveImageBorder(i)}`,
                          borderRadius: borderRadius.lg,
                          backgroundColor: getMoveImageBackground(i),
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: typography.fontSize.sm,
                          color: getMoveLabelColor(i),
                          fontWeight: typography.fontWeight.medium,
                        }}>
                          {move}
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        width: '64px',
                        height: '64px',
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
                        ?
                      </div>
                    )}

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
    </div>
  )
}

export default VisualSequence