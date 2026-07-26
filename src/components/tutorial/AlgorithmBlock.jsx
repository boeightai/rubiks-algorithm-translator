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

import { useState, lazy, Suspense } from 'react'
import VisualSequence from '../../VisualSequence'
import { colors, spacing, typography, borderRadius } from '../../styles/designSystem'
import { canAnimateNotation } from '../../utils/cubeMoves'
import { useMobileDetection } from '../../hooks/useMobileDetection'

const InteractiveCubeDemo = lazy(() => import('../InteractiveCubeDemo'))

/*
 * Pairs the 3D animation with the visual move cards and keeps them in sync.
 * Each block owns its own active-move state so several can sit on one page
 * without highlighting each other's cards.
 *
 * Cube and move cards sit side by side on wide screens: stacking them makes a
 * single step taller than the viewport, and the learner needs both visible at
 * once while their hands are on a cube.
 *
 * showDemo={false} suppresses the 3D cube when the same algorithm is already
 * animated elsewhere on the page — repeating it doubles the page height and
 * teaches nothing new.
 */
function AlgorithmBlock({ name, notation, algorithmId, note, showDemo = true }) {
  const [activeMoveIndex, setActiveMoveIndex] = useState(null)
  const { isMobile, isTablet } = useMobileDetection()
  const stackVertically = isMobile || isTablet
  const canAnimate = canAnimateNotation(notation) && showDemo

  if (!notation) return null

  return (
    <div>
      {name && (
        <div style={{
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.bold,
          color: colors.neutral[900],
          marginBottom: spacing[2],
        }}>
          {name}
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: stackVertically ? 'column' : 'row',
        gap: stackVertically ? spacing[3] : spacing[5],
        alignItems: stackVertically ? 'stretch' : 'flex-start',
        // Without a cube alongside it, the sequence should not stretch into dead space
        maxWidth: canAnimate ? 'none' : '440px',
      }}>
        {canAnimate && (
          <Suspense fallback={
            <div style={{
              minHeight: '220px',
              flex: stackVertically ? 'none' : '1 1 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.neutral[50],
              border: `1px solid ${colors.border.light}`,
              borderRadius: borderRadius.xl,
              color: colors.neutral[600],
              fontSize: typography.fontSize.sm,
            }}>
              Loading cube…
            </div>
          }>
            {/* InteractiveCubeDemo lays its control bar out for a 500px card; give it that or Replay clips */}
            <div style={{ flex: stackVertically ? 'none' : '0 1 500px', minWidth: stackVertically ? 0 : '500px' }}>
              <InteractiveCubeDemo
                algorithmId={algorithmId || name}
                notation={notation}
                onActiveMoveChange={setActiveMoveIndex}
              />
            </div>
          </Suspense>
        )}

        <div style={{ flex: stackVertically ? 'none' : '1 1 0', minWidth: 0 }}>
          <VisualSequence
            notation={notation}
            algorithmId={algorithmId}
            activeMoveIndex={canAnimate ? activeMoveIndex : null}
          />
        </div>
      </div>

      {note && (
        <div style={{
          marginTop: spacing[2],
          fontSize: typography.fontSize.sm,
          color: colors.neutral[600],
          fontStyle: 'italic',
        }}>
          {note}
        </div>
      )}
    </div>
  )
}

export default AlgorithmBlock
