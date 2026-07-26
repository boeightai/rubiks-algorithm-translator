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

import AlgorithmBlock from './AlgorithmBlock'
import { colors, spacing, typography, borderRadius } from '../../styles/designSystem'

/*
 * An interlude is not a solve step. Nothing on the cube gets closer to solved
 * here — the learner is picking up a tool they will use for the rest of the
 * method. Styled distinctly so it never reads as a solve step.
 */
function InterludePage({ step, isMobile }) {
  return (
    <div>
      <div style={{
        display: 'inline-block',
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.bold,
        color: colors.info[700],
        backgroundColor: colors.info[100],
        border: `1px solid ${colors.info[200]}`,
        borderRadius: borderRadius.full,
        padding: `${spacing[1]} ${spacing[3]}`,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: spacing[3],
      }}>
        Step {step.label} · Learn this, don&rsquo;t solve
      </div>

      <h2 style={{
        margin: 0,
        fontSize: isMobile ? typography.fontSize['2xl'] : typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.extrabold,
        color: colors.neutral[900],
        lineHeight: typography.lineHeight.tight,
      }}>
        {step.title}
      </h2>

      <p style={{
        margin: `${spacing[2]} 0 ${spacing[3]}`,
        fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
        color: colors.neutral[700],
        lineHeight: typography.lineHeight.normal,
        maxWidth: '65ch',
      }}>
        {step.goal}
      </p>

      {step.why && (
        <p style={{
          margin: `0 0 ${spacing[6]}`,
          fontSize: typography.fontSize.base,
          color: colors.neutral[600],
          lineHeight: typography.lineHeight.relaxed,
          maxWidth: '65ch',
        }}>
          {step.why}
        </p>
      )}

      {/* Both triggers side by side — the mirror relationship is the lesson */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? spacing[6] : spacing[8],
        marginBottom: spacing[8],
      }}>
        {step.algorithms.map((algorithm) => (
          <div
            key={algorithm.id}
            style={{
              backgroundColor: colors.background.secondary,
              border: `1px solid ${colors.border.light}`,
              borderRadius: borderRadius['2xl'],
              padding: isMobile ? spacing[4] : spacing[5],
              minWidth: 0,
            }}
          >
            <AlgorithmBlock
              name={algorithm.name}
              notation={algorithm.notation}
              algorithmId={algorithm.id}
              note={algorithm.note}
              stacked
            />
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing[3],
        backgroundColor: colors.success[50],
        border: `1px solid ${colors.success[200]}`,
        borderRadius: borderRadius['2xl'],
        padding: isMobile ? spacing[4] : spacing[5],
      }}>
        <div style={{ fontSize: typography.fontSize.xl, lineHeight: 1 }}>✓</div>
        <div>
          <div style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            color: colors.success[700],
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: spacing[1],
          }}>
            You&rsquo;re ready when
          </div>
          <div style={{
            fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
            color: colors.neutral[800],
            lineHeight: typography.lineHeight.normal,
          }}>
            {step.doneWhen}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterludePage
