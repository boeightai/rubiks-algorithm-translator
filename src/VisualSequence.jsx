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
    for (let i = 0; i <= parsedMoves.length - 4; i++) {
      const sequence = parsedMoves.slice(i, i + 4)
      if (arraysEqual(sequence, rightTriggerPattern)) {
        for (let j = 0; j < 4; j++) highlighted.add(i + j)
        groups.push({ type: 'right', start: i, end: i + 3, indices: [i, i + 1, i + 2, i + 3] })
      }
    }
    for (let i = 0; i <= parsedMoves.length - 4; i++) {
      const sequence = parsedMoves.slice(i, i + 4)
      if (arraysEqual(sequence, leftTriggerPattern)) {
        for (let j = 0; j < 4; j++) leftTrigger.add(i + j)
        groups.push({ type: 'left', start: i, end: i + 3, indices: [i, i + 1, i + 2, i + 3] })
      }
    }
    return { moveList: parsedMoves, highlightedMoves: highlighted, leftTriggerMoves: leftTrigger, triggerGroups: groups }
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

  // Simple, robust image component
  const MoveImage = ({ move, index }) => {
    const imageSrc = moves[move]
    if (!move || !imageSrc) {
      return (
        <div style={{
          width: '64px', height: '64px', border: '2px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', backgroundColor: 'yellow',
        }}>{move || '?'}</div>
      )
    }
    return (
      <img
        src={imageSrc}
        alt={move}
        style={{
          width: '64px', height: '64px', border: `2px solid ${getMoveImageBorder(index)}`, objectFit: 'contain', borderRadius: borderRadius.lg, backgroundColor: 'transparent', padding: 0, boxShadow: shadows.sm, display: 'block', flexShrink: 0,
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
      <div style={{
        display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: isDesktop ? spacing[3] : spacing[4], paddingBottom: isDesktop ? spacing[2] : spacing[3], borderBottom: `1px solid ${colors.border.light}`, flexWrap: 'wrap',
      }}>
        <div style={{ width: '24px', height: '24px', background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <h3 style={{ color: colors.neutral[900], margin: 0, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.lg, flex: '1 1 auto' }}>Visual Sequence</h3>
        <div style={{ background: colors.neutral[100], color: colors.neutral[600], padding: `${spacing[1]} ${spacing[2]}`, borderRadius: borderRadius.full, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, flexShrink: 0 }}>{moveList.length} moves</div>
        {highlightedMoves.size > 0 && leftTriggerMoves.size > 0 && (
          <div style={{ background: colors.neutral[100], color: colors.neutral[700], padding: `${spacing[1]} ${spacing[2]}`, borderRadius: borderRadius.full, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, border: `1px solid ${colors.neutral[200]}`, display: 'flex', alignItems: 'center', gap: spacing[1], flexShrink: 0 }}><span style={{ fontSize: '10px' }}>🎯</span>Both Triggers</div>
        )}
        {highlightedMoves.size > 0 && leftTriggerMoves.size === 0 && (
          <div style={{ background: colors.success[100], color: colors.success[700], padding: `${spacing[1]} ${spacing[2]}`, borderRadius: borderRadius.full, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, border: `1px solid ${colors.success[200]}`, display: 'flex', alignItems: 'center', gap: spacing[1], flexShrink: 0 }}><span style={{ fontSize: '10px' }}>🎯</span>Right Trigger</div>
        )}
        {leftTriggerMoves.size > 0 && highlightedMoves.size === 0 && (
          <div style={{ background: colors.info[100], color: colors.info[700], padding: `${spacing[1]} ${spacing[2]}`, borderRadius: borderRadius.full, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, border: `1px solid ${colors.info[200]}`, display: 'flex', alignItems: 'center', gap: spacing[1], flexShrink: 0 }}><span style={{ fontSize: '10px' }}>🎯</span>Left Trigger</div>
        )}
      </div>
      {moveList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: isDesktop ? spacing[6] : spacing[8], color: colors.neutral[500] }}>
          <div style={{ fontSize: typography.fontSize.xl, marginBottom: spacing[2], color: colors.neutral[400] }}>🎯</div>
          <div style={{ fontSize: typography.fontSize.sm, color: colors.neutral[500] }}>{!notation || typeof notation !== 'string' ? 'Select an algorithm to see the visual sequence' : 'No moves to display'}</div>
          {isMobile && (<div style={{ fontSize: typography.fontSize.xs, color: colors.neutral[400], marginTop: spacing[2] }}>💡 Tip: Switch to the "Visual" tab to see the sequence</div>)}
          {!isMobile && (<div style={{ fontSize: typography.fontSize.xs, color: colors.neutral[400], marginTop: spacing[2] }}>💡 Tip: Click on an algorithm to see its visual sequence</div>)}
        </div>
      ) : (
        <div className="responsive-cube-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: isDesktop ? spacing[2] : spacing[3], justifyContent: 'center', alignItems: 'flex-end', minHeight: isDesktop ? '100px' : '120px', width: '100%' }}>
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
                    <div key={j} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isDesktop ? spacing[1] : spacing[2], position: 'relative' }}>
                      <div style={{ background: getMoveNumberBackground(j), color: getMoveNumberColor(j), width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, border: `1px solid ${getMoveNumberBorder(j)}` }}>{j + 1}</div>
                      <MoveImage move={moveList[j]} index={j} />
                      <div style={{ fontSize: typography.fontSize.xl, color: getMoveLabelColor(j), fontWeight: typography.fontWeight.bold, fontFamily: typography.fontFamily.mono, letterSpacing: '0.05em', maxWidth: '80px', textAlign: 'center', lineHeight: typography.lineHeight.tight }}>{moveList[j]}</div>
                    </div>
                  )
                }
                renderedMoves.push(
                  <div key={`trigger-${i}`} style={{ display: 'flex', gap: isDesktop ? spacing[1] : spacing[2], padding: isDesktop ? spacing[2] : spacing[3], background: triggerBackground, border: `3px solid ${triggerColor}`, borderRadius: borderRadius.lg, boxShadow: shadows.md, flexWrap: 'wrap', justifyContent: 'center' }}>{triggerMoves}</div>
                )
                i = endIndex + 1
              } else {
                renderedMoves.push(
                  <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isDesktop ? spacing[1] : spacing[2], position: 'relative' }}>
                    <div style={{ background: getMoveNumberBackground(i), color: getMoveNumberColor(i), width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, border: `1px solid ${getMoveNumberBorder(i)}` }}>{i + 1}</div>
                    <MoveImage move={move} index={i} />
                    <div style={{ fontSize: typography.fontSize.xl, color: getMoveLabelColor(i), fontWeight: typography.fontWeight.bold, fontFamily: typography.fontFamily.mono, letterSpacing: '0.05em', maxWidth: '80px', textAlign: 'center', lineHeight: typography.lineHeight.tight }}>{move}</div>
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