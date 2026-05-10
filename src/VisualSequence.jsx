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

import { colors, typography, spacing, borderRadius, shadows } from './styles/designSystem'
import moves from './data/moves.json'

const parseNotation = (notation) => {
  if (!notation || typeof notation !== 'string') return []
  return notation.split(/\s+/).filter(Boolean)
}

function VisualSequence({ notation, activeMoveIndex = null }) {
  const moveList = parseNotation(notation)

  if (moveList.length === 0) {
    return (
      <div className="visual-sequence-minimal visual-sequence-empty">
        <strong>Pick a move</strong>
        <span>Bo and Hailey's picture cards will appear here.</span>
        <style>{sequenceStyles}</style>
      </div>
    )
  }

  return (
    <section className="visual-sequence-minimal" aria-label="Picture move sequence">
      <div className="visual-sequence-header">
        <span>Picture moves</span>
        <strong>{moveList.length} cards</strong>
      </div>

      <div className="visual-card-grid">
        {moveList.map((move, index) => (
          <div
            key={`${move}-${index}`}
            className={`visual-card ${activeMoveIndex === index ? 'visual-card-active' : ''}`}
          >
            <span>{index + 1}</span>
            {moves[move] ? (
              <img src={moves[move]} alt={move} draggable="false" />
            ) : (
              <strong>{move}</strong>
            )}
          </div>
        ))}
      </div>

      <details className="visual-letter-code">
        <summary>Letter code</summary>
        <code>{notation}</code>
      </details>

      <style>{sequenceStyles}</style>
    </section>
  )
}

const sequenceStyles = `
  .visual-sequence-minimal {
    display: grid;
    gap: ${spacing[4]};
    padding: ${spacing[3]};
    border: 1px solid ${colors.border.light};
    border-radius: ${borderRadius.lg};
    background: ${colors.background.primary};
    box-shadow: ${shadows.sm};
  }

  .visual-sequence-empty {
    place-items: center;
    min-height: 220px;
    color: ${colors.neutral[600]};
    text-align: center;
  }

  .visual-sequence-empty strong {
    color: ${colors.neutral[900]};
    font-size: ${typography.fontSize.lg};
  }

  .visual-sequence-empty span {
    font-size: ${typography.fontSize.sm};
  }

  .visual-sequence-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${spacing[3]};
    padding-bottom: ${spacing[2]};
    border-bottom: 1px solid ${colors.border.light};
  }

  .visual-sequence-header span {
    color: ${colors.neutral[600]};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.extrabold};
    text-transform: uppercase;
  }

  .visual-sequence-header strong {
    color: ${colors.neutral[900]};
    font-size: ${typography.fontSize.sm};
  }

  .visual-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(76px, 1fr));
    gap: ${spacing[2]};
  }

  .visual-card {
    display: grid;
    grid-template-rows: 22px 70px;
    justify-items: center;
    align-items: center;
    min-width: 0;
    padding: ${spacing[2]};
    border: 1px solid ${colors.border.medium};
    border-radius: ${borderRadius.lg};
    background: ${colors.background.secondary};
  }

  .visual-card-active {
    border-color: ${colors.primary[500]};
    box-shadow: ${shadows.md};
  }

  .visual-card span {
    display: inline-grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.bold};
  }

  .visual-card img {
    width: 66px;
    height: 66px;
    object-fit: contain;
    border-radius: ${borderRadius.md};
    background: var(--move-image-bg);
    padding: var(--move-image-padding);
  }

  .visual-card > strong {
    align-self: center;
    color: ${colors.neutral[900]};
    font-family: ${typography.fontFamily.mono};
    font-size: ${typography.fontSize.lg};
  }

  .visual-letter-code {
    width: fit-content;
    color: ${colors.neutral[500]};
    font-size: ${typography.fontSize.sm};
  }

  .visual-letter-code summary {
    cursor: pointer;
    min-height: 32px;
  }

  .visual-letter-code code {
    color: ${colors.neutral[800]};
    font-family: ${typography.fontFamily.mono};
    font-weight: ${typography.fontWeight.bold};
  }

  @media (max-width: 520px) {
    .visual-card-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: ${spacing[2]};
    }

    .visual-card {
      grid-template-rows: 24px 70px;
    }

    .visual-card img {
      width: 66px;
      height: 66px;
    }
  }
`

export default VisualSequence
