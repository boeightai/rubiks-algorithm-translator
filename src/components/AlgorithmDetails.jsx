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

import { colors, spacing, typography, borderRadius, shadows } from '../styles/designSystem'
import StarButton from './ui/StarButton'

const AlgorithmDetails = ({
  selectedAlgorithm,
  isFavorite,
  onToggleFavorite,
  tutorialImageExists,
  tutorialImageSrc,
  patternImageExists,
  patternImageSrc,
}) => {
  if (!selectedAlgorithm) {
    return (
      <div className="algorithm-detail-empty">
        <img src="/images/icons/cube-mascot.png" alt="" />
        <strong>Select a move</strong>
        <span>Picture steps will appear here.</span>
        <style>{detailStyles}</style>
      </div>
    )
  }

  const patternImages = [
    ...(patternImageExists ? [{ src: patternImageSrc, label: 'Pattern' }] : []),
    ...(selectedAlgorithm.additionalPatterns || []).map((pattern) => ({
      src: `/images/patterns/${pattern.filename}`,
      label: pattern.label || 'Pattern',
    })),
    ...(tutorialImageExists ? [{ src: tutorialImageSrc, label: 'Guide' }] : []),
  ]

  return (
    <div className="algorithm-detail-minimal">
      <header className="algorithm-detail-header">
        <div>
          <h2>{selectedAlgorithm.name}</h2>
          <span>{selectedAlgorithm.category}</span>
        </div>
        <StarButton
          isFavorite={isFavorite(selectedAlgorithm.id)}
          onToggle={() => onToggleFavorite(selectedAlgorithm.id)}
          size={24}
        />
      </header>

      {patternImages.length > 0 && (
        <div className="algorithm-detail-images" aria-label="Move pictures">
          {patternImages.map((image) => (
            <figure key={`${image.label}-${image.src}`}>
              <img
                src={image.src}
                alt={`${selectedAlgorithm.name} ${image.label}`}
                draggable="false"
                onError={(event) => {
                  event.currentTarget.closest('figure').style.display = 'none'
                }}
              />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {selectedAlgorithm.description && (
        <p className="algorithm-detail-description">{selectedAlgorithm.description}</p>
      )}

      <style>{detailStyles}</style>
    </div>
  )
}

const detailStyles = `
  .algorithm-detail-minimal {
    display: grid;
    gap: ${spacing[3]};
  }

  .algorithm-detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${spacing[3]};
    padding-bottom: ${spacing[2]};
    border-bottom: 1px solid ${colors.border.light};
  }

  .algorithm-detail-header h2 {
    margin: 0;
    color: ${colors.neutral[900]};
    font-size: ${typography.fontSize.xl};
    line-height: ${typography.lineHeight.tight};
    letter-spacing: 0;
  }

  .algorithm-detail-header span {
    display: block;
    margin-top: ${spacing[1]};
    color: ${colors.neutral[600]};
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.bold};
  }

  .algorithm-detail-images {
    display: flex;
    flex-wrap: wrap;
    gap: ${spacing[3]};
  }

  .algorithm-detail-images figure {
    display: grid;
    gap: ${spacing[2]};
    justify-items: center;
    margin: 0;
    padding: ${spacing[2]};
    border: 1px solid ${colors.border.light};
    border-radius: ${borderRadius.lg};
    background: ${colors.background.secondary};
    box-shadow: ${shadows.sm};
  }

  .algorithm-detail-images img {
    width: 112px;
    height: 112px;
    object-fit: contain;
    border: 1px solid var(--move-image-border-color);
    border-radius: ${borderRadius.md};
    background: var(--move-image-bg);
    padding: var(--move-image-padding);
  }

  .algorithm-detail-images figcaption {
    color: ${colors.neutral[600]};
    font-size: ${typography.fontSize.xs};
    font-weight: ${typography.fontWeight.bold};
    text-transform: uppercase;
  }

  .algorithm-detail-description {
    margin: 0;
    color: ${colors.neutral[700]};
    font-size: ${typography.fontSize.sm};
    line-height: ${typography.lineHeight.normal};
  }

  .algorithm-detail-empty {
    display: grid;
    place-items: center;
    gap: ${spacing[2]};
    min-height: 320px;
    color: ${colors.neutral[600]};
    text-align: center;
  }

  .algorithm-detail-empty img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: ${colors.neutral[100]};
    object-fit: cover;
  }

  .algorithm-detail-empty strong {
    color: ${colors.neutral[900]};
    font-size: ${typography.fontSize.xl};
  }

  .algorithm-detail-empty span {
    font-size: ${typography.fontSize.sm};
  }

  @media (max-width: 600px) {
    .algorithm-detail-images img {
      width: 112px;
      height: 112px;
    }
  }
`

export default AlgorithmDetails
