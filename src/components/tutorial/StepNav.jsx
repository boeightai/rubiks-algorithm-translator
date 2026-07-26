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

import { colors, spacing, typography, borderRadius, shadows } from '../../styles/designSystem'

/*
 * Wizard navigation. Interludes get a smaller, differently-coloured marker so
 * the progress row shows at a glance which stops are solve steps and which are
 * tools being picked up along the way.
 */
function StepNav({ steps, currentIndex, onPrevious, onNext, onGoToIndex, isMobile }) {
  const isFirst = currentIndex === 0
  const isLast = currentIndex === steps.length - 1

  const buttonStyle = (disabled) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    minHeight: '48px',
    padding: `${spacing[3]} ${spacing[5]}`,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: disabled ? colors.neutral[400] : colors.white,
    backgroundColor: disabled ? colors.neutral[100] : colors.primary[600],
    border: `1px solid ${disabled ? colors.border.light : colors.primary[600]}`,
    borderRadius: borderRadius.xl,
    cursor: disabled ? 'default' : 'pointer',
    boxShadow: disabled ? 'none' : shadows.sm,
  })

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing[4],
      marginTop: spacing[8],
      paddingTop: spacing[5],
      borderTop: `1px solid ${colors.border.light}`,
    }}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        style={{ ...buttonStyle(isFirst), width: isMobile ? '100%' : 'auto', justifyContent: 'center' }}
      >
        ← Back
      </button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        order: isMobile ? -1 : 0,
      }}>
        {steps.map((step, index) => {
          const isInterlude = step.type === 'interlude'
          const isCurrent = index === currentIndex
          const size = isInterlude ? 10 : 14
          const activeColor = isInterlude ? colors.info[500] : colors.primary[600]

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onGoToIndex(index)}
              aria-label={`Go to step ${step.label}: ${step.title}`}
              aria-current={isCurrent ? 'step' : undefined}
              title={`Step ${step.label} — ${step.title}`}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{
                display: 'block',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: borderRadius.full,
                backgroundColor: isCurrent ? activeColor : colors.neutral[300],
                border: isCurrent ? `2px solid ${activeColor}` : 'none',
                transform: isCurrent ? 'scale(1.15)' : 'none',
                transition: 'background-color 150ms ease, transform 150ms ease',
              }} />
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        style={{ ...buttonStyle(isLast), width: isMobile ? '100%' : 'auto', justifyContent: 'center' }}
      >
        Next →
      </button>
    </div>
  )
}

export default StepNav
