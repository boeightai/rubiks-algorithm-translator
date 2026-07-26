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

import { useState } from 'react'
import { colors, spacing, typography, borderRadius, shadows } from '../../styles/designSystem'

/*
 * Renders a step image, or an explicit "asset needed" slot when the file does
 * not exist yet. The placeholder names the exact file so the layout doubles as
 * an asset checklist. It deliberately does not substitute an approximate image.
 */
function StepImage({ src, alt, caption, size = 200 }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: size,
            height: size,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[2],
            padding: spacing[3],
            backgroundColor: colors.neutral[50],
            border: `2px dashed ${colors.border.medium}`,
            borderRadius: borderRadius.xl,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: typography.fontSize.xl }}>🖼️</div>
          <div style={{
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral[700],
            textAlign: 'center',
          }}>
            Image needed
          </div>
          {src && (
            <div style={{
              fontSize: '0.625rem',
              fontFamily: typography.fontFamily.mono,
              color: colors.neutral[500],
              wordBreak: 'break-all',
              textAlign: 'center',
              lineHeight: 1.3,
            }}>
              {src.replace('/images/', '')}
            </div>
          )}
        </div>
        {caption && (
          <div style={{
            marginTop: spacing[2],
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral[600],
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            {caption}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          backgroundColor: colors.background.secondary,
          border: `1px solid ${colors.border.light}`,
          borderRadius: borderRadius.xl,
          boxShadow: shadows.sm,
          display: 'block',
        }}
        draggable="false"
      />
      {caption && (
        <div style={{
          marginTop: spacing[2],
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          color: colors.neutral[600],
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default StepImage
