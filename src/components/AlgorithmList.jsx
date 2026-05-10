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

import { useEffect, useState } from 'react'
import { colors, typography, spacing, borderRadius, shadows } from '../styles/designSystem'
import StarButton from './ui/StarButton'

const AlgorithmList = ({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm,
  isFavorite,
  onToggleFavorite
}) => {
  const [patternImageStatus, setPatternImageStatus] = useState({})

  useEffect(() => {
    const images = []
    const uncheckedAlgorithms = algorithms.filter(
      algorithm => patternImageStatus[algorithm.id] === undefined
    )

    uncheckedAlgorithms.forEach(algorithm => {
      const img = new Image()
      images.push(img)

      img.onload = () => {
        setPatternImageStatus(prev => ({ ...prev, [algorithm.id]: true }))
      }
      img.onerror = () => {
        setPatternImageStatus(prev => ({ ...prev, [algorithm.id]: false }))
      }
      img.src = `/images/patterns/${algorithm.id}-pattern.png`
    })

    return () => {
      images.forEach(img => {
        img.onload = null
        img.onerror = null
        img.src = ''
      })
    }
  }, [algorithms, patternImageStatus])

  if (algorithms.length === 0) {
    return (
      <div className="algorithm-list-empty">
        <strong>No moves found</strong>
        <span>Try a different search.</span>
        <style>{listStyles}</style>
      </div>
    )
  }

  return (
    <div className="responsive-algorithm-list algorithm-list-minimal">
      {algorithms.map(algorithm => {
        const isSelected = selectedAlgorithm?.id === algorithm.id
        const hasPattern = patternImageStatus[algorithm.id]

        return (
          <div
            key={algorithm.id}
            className={`algorithm-row ${isSelected ? 'algorithm-row-active' : ''}`}
          >
            <button
              type="button"
              className="algorithm-row-button"
              onClick={() => onSelectAlgorithm(algorithm)}
              aria-label={`Select ${algorithm.name}`}
            >
              {hasPattern ? (
                <img
                  src={`/images/patterns/${algorithm.id}-pattern.png`}
                  alt=""
                  loading="lazy"
                  draggable="false"
                />
              ) : (
                <span className="algorithm-row-placeholder">{algorithm.notation.split(/\s+/).filter(Boolean).length}</span>
              )}
              <span className="algorithm-row-copy">
                <strong>{algorithm.name}</strong>
                <span>{algorithm.category}</span>
              </span>
            </button>

            <StarButton
              isFavorite={isFavorite(algorithm.id)}
              onToggle={(event) => {
                event.stopPropagation()
                onToggleFavorite(algorithm.id)
              }}
              size={20}
            />
          </div>
        )
      })}

      <style>{listStyles}</style>
    </div>
  )
}

const listStyles = `
  .algorithm-list-minimal {
    display: grid;
    gap: ${spacing[2]};
    max-height: calc(100vh - 400px);
    overflow-y: auto;
    padding-right: ${spacing[2]};
    scrollbar-width: thin;
    scrollbar-color: ${colors.neutral[300]} transparent;
  }

  .algorithm-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 32px;
    align-items: center;
    gap: ${spacing[2]};
    padding: ${spacing[2]};
    border: 1px solid ${colors.border.light};
    border-radius: ${borderRadius.lg};
    background: ${colors.background.primary};
    box-shadow: ${shadows.sm};
  }

  .algorithm-row-active {
    border-color: ${colors.primary[500]};
    background: ${colors.primary[50]};
  }

  .algorithm-row-button {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    align-items: center;
    gap: ${spacing[3]};
    min-width: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .algorithm-row-button:focus-visible {
    outline: 3px solid ${colors.primary[200]};
    outline-offset: 3px;
    border-radius: ${borderRadius.md};
  }

  .algorithm-row-button img,
  .algorithm-row-placeholder {
    width: 56px;
    height: 56px;
    border: 1px solid var(--move-image-border-color);
    border-radius: ${borderRadius.md};
    background: var(--move-image-bg);
    padding: var(--move-image-padding);
    object-fit: contain;
  }

  .algorithm-row-placeholder {
    display: inline-grid;
    place-items: center;
    color: ${colors.neutral[700]};
    font-family: ${typography.fontFamily.mono};
    font-weight: ${typography.fontWeight.bold};
  }

  .algorithm-row-copy {
    display: grid;
    gap: ${spacing[1]};
    min-width: 0;
  }

  .algorithm-row-copy strong {
    overflow: hidden;
    color: ${colors.neutral[900]};
    font-size: ${typography.fontSize.base};
    line-height: ${typography.lineHeight.tight};
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .algorithm-row-copy span {
    color: ${colors.neutral[600]};
    font-size: ${typography.fontSize.sm};
  }

  .algorithm-list-empty {
    display: grid;
    place-items: center;
    gap: ${spacing[1]};
    min-height: 180px;
    color: ${colors.neutral[600]};
    text-align: center;
  }

  .algorithm-list-empty strong {
    color: ${colors.neutral[900]};
    font-size: ${typography.fontSize.lg};
  }

  @media (max-width: 768px) {
    .algorithm-list-minimal {
      max-height: none;
      overflow-y: visible;
      padding-right: 0;
    }
  }
`

export default AlgorithmList
