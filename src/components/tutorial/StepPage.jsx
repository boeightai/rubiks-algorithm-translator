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
import StepImage from './StepImage'
import { colors, spacing, typography, borderRadius } from '../../styles/designSystem'
import { getPatternImages } from '../../utils/patternMapping'

/*
 * One solve step, one screen. Slots: what you are making, how you normally get
 * there, every case that can stop you, and how you know you are done.
 */
function StepPage({ step, isMobile }) {
  const caseImagesFor = (caseItem) => getPatternImages(caseItem.id) || []

  return (
    <div>
      {/* Step banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        gap: spacing[3],
        marginBottom: spacing[2],
      }}>
        <div style={{
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.bold,
          color: colors.primary[600],
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          Step {step.label}
        </div>
        {step.hold && (
          <div style={{
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral[600],
            backgroundColor: colors.neutral[100],
            border: `1px solid ${colors.border.light}`,
            borderRadius: borderRadius.full,
            padding: `${spacing[1]} ${spacing[3]}`,
          }}>
            Hold: {step.hold}
          </div>
        )}
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
        margin: `${spacing[2]} 0 ${spacing[6]}`,
        fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
        color: colors.neutral[700],
        lineHeight: typography.lineHeight.normal,
        maxWidth: '60ch',
      }}>
        {step.goal}
      </p>

      {/* Goal + normal path. The algorithm sits full width below rather than
          beside the goal image, which otherwise leaves a tall dead column. */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? spacing[5] : spacing[8],
        alignItems: 'flex-start',
        marginBottom: step.normalPath.notation ? spacing[5] : spacing[8],
      }}>
        <div style={{ flexShrink: 0, alignSelf: isMobile ? 'center' : 'flex-start' }}>
          <StepImage
            src={step.goalImage}
            alt={`Goal for ${step.title}`}
            caption="Your goal"
            size={isMobile ? 180 : 220}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0, width: isMobile ? '100%' : 'auto' }}>
          <div style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral[900],
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: spacing[2],
          }}>
            {step.normalPath.heading || 'What to do'}
          </div>

          <p style={{
            margin: 0,
            fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
            color: colors.neutral[800],
            lineHeight: typography.lineHeight.relaxed,
            maxWidth: '60ch',
          }}>
            {step.normalPath.instruction}
          </p>
        </div>
      </div>

      {step.normalPath.notation && (
        <div style={{ marginBottom: spacing[8] }}>
          <AlgorithmBlock
            notation={step.normalPath.notation}
            algorithmId={step.normalPath.algorithmId}
            note={step.normalPath.note}
          />
        </div>
      )}

      {/* Cases */}
      {step.cases && step.cases.length > 0 && step.cases.map((caseItem) => {
        const images = caseImagesFor(caseItem)
        return (
          <div
            key={caseItem.id}
            style={{
              backgroundColor: colors.warning[50],
              border: `1px solid ${colors.warning[200]}`,
              borderRadius: borderRadius['2xl'],
              padding: isMobile ? spacing[4] : spacing[6],
              marginBottom: spacing[6],
            }}
          >
            <div style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              color: colors.warning[700],
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: spacing[2],
            }}>
              ⚠ If you get stuck
            </div>

            <p style={{
              margin: `0 0 ${spacing[4]}`,
              fontSize: isMobile ? typography.fontSize.base : typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral[900],
              lineHeight: typography.lineHeight.normal,
              maxWidth: '60ch',
            }}>
              {caseItem.when}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? spacing[4] : spacing[6],
              alignItems: 'flex-start',
              marginBottom: spacing[4],
            }}>
              {images.length > 0 && (
                <div style={{
                  display: 'flex',
                  gap: spacing[3],
                  flexShrink: 0,
                  alignSelf: isMobile ? 'center' : 'flex-start',
                }}>
                  {images.map((image, index) => (
                    <StepImage
                      key={image}
                      src={image}
                      alt={`${caseItem.name} case ${index + 1}`}
                      caption={index === 0 ? 'Your cube' : null}
                      size={isMobile ? 130 : 150}
                    />
                  ))}
                </div>
              )}

              {caseItem.setup && (
                <p style={{
                  flex: 1,
                  minWidth: 0,
                  margin: 0,
                  fontSize: typography.fontSize.base,
                  color: colors.neutral[800],
                  lineHeight: typography.lineHeight.relaxed,
                  maxWidth: '60ch',
                }}>
                  <strong>First:</strong> {caseItem.setup}
                </p>
              )}
            </div>

            <AlgorithmBlock
              name={caseItem.name}
              notation={caseItem.notation}
              algorithmId={caseItem.algorithmId || caseItem.id}
              note={caseItem.note}
              showDemo={caseItem.showDemo !== false}
            />
          </div>
        )
      })}

      {/* Done when */}
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
            You&rsquo;re done when
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

export default StepPage
