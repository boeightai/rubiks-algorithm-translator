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

import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/designSystem'
import StarButton from './ui/StarButton'
import ImageModal from './ui/ImageModal'
import { useState } from 'react'

const AlgorithmDetails = ({
  selectedAlgorithm,
  isFavorite,
  onToggleFavorite,
  tutorialImageExists,
  tutorialImageSrc,
  patternImageExists,
  patternImageSrc
}) => {
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  // Check if this algorithm should show the "Sticker Image" link instead of direct image
  const shouldShowStickerLink = selectedAlgorithm && (
    selectedAlgorithm.id === '2look-oll-4' || 
    selectedAlgorithm.id === 'oll-case-24'
  )

  if (!selectedAlgorithm) {
    return (
      <div style={{
        textAlign: 'center',
        padding: spacing[12],
        color: colors.neutral[500],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing[4],
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: colors.neutral[100],
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: colors.neutral[400],
        }}>
          🧩
        </div>
        <div>
          <div style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            marginBottom: spacing[2],
            color: colors.neutral[700],
          }}>
            Select an Algorithm
          </div>
          <div style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[500],
            lineHeight: typography.lineHeight.normal,
          }}>
            Choose an algorithm from the list to see its details, notation, and visual sequence
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[6],
    }}>
      {/* Header Section */}
      <div style={{
        paddingBottom: spacing[4],
        borderBottom: `1px solid ${colors.border.light}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: spacing[3],
          marginBottom: spacing[3],
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
            <h2 style={{
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
              margin: 0,
              lineHeight: typography.lineHeight.tight,
            }}>
              {selectedAlgorithm.name}
            </h2>
            <StarButton
              isFavorite={isFavorite(selectedAlgorithm.id)}
              onToggle={() => onToggleFavorite(selectedAlgorithm.id)}
              size={24}
            />
          </div>
          {/* Alternative Names (Nicknames) right-justified */}
          {selectedAlgorithm.nicknames && selectedAlgorithm.nicknames.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: spacing[2],
              alignItems: 'center',
              justifyContent: 'flex-end',
              maxWidth: '50%',
            }}>
              <span style={{
                fontSize: typography.fontSize.sm,
                color: colors.primary[700],
                fontWeight: typography.fontWeight.medium,
                marginRight: spacing[1],
                whiteSpace: 'nowrap',
              }}>
                Alternative Names:
              </span>
              {selectedAlgorithm.nicknames.map((nickname, index) => (
                <div key={index} style={{
                  background: colors.primary[50],
                  color: colors.primary[700],
                  padding: `${spacing[2]} ${spacing[3]}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  border: `1px solid ${colors.primary[200]}`,
                  whiteSpace: 'nowrap',
                }}>
                  {nickname}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3],
          flexWrap: 'wrap',
        }}>
          {/* Category */}
          <div style={{
            background: colors.neutral[100],
            color: colors.neutral[700],
            padding: `${spacing[1]} ${spacing[3]}`,
            borderRadius: borderRadius.full,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
          }}>
            {selectedAlgorithm.category}
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div style={{
        display: 'flex',
        gap: spacing[6],
        flexWrap: 'wrap',
      }}>
        {/* Pattern Image Section */}
        {patternImageExists && (
          <div style={{ flex: '1 1 250px', minWidth: '200px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: spacing[3],
            }}>
              <h3 style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                color: colors.neutral[900],
                margin: 0,
              }}>
                Pattern to Look For
              </h3>
              <div style={{
                fontSize: typography.fontSize.sm,
                color: colors.neutral[500],
                fontStyle: 'italic',
              }}>
                Recognition pattern
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              background: colors.neutral[50],
              borderRadius: borderRadius.xl,
              padding: spacing[4],
              border: `1px solid ${colors.border.light}`,
            }}>
              <img
                src={patternImageSrc}
                alt={`${selectedAlgorithm.name} pattern`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: borderRadius.lg,
                  boxShadow: shadows.md,
                  border: `1px solid ${colors.border.light}`,
                  background: colors.background.primary,
                }}
              />
            </div>
          </div>
        )}

        {/* Tutorial Image Section */}
        {tutorialImageExists && (
          <div style={{ flex: '1 1 250px', minWidth: '200px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: spacing[3],
            }}>
              <h3 style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                color: colors.neutral[900],
                margin: 0,
              }}>
                {shouldShowStickerLink ? 'Sticker for Field Notes Notebook' : 'Tutorial Image'}
              </h3>
              <div style={{
                fontSize: typography.fontSize.sm,
                color: colors.neutral[500],
                fontStyle: 'italic',
              }}>
                {shouldShowStickerLink ? 'Click to view' : 'Click to zoom'}
              </div>
            </div>
            
            {shouldShowStickerLink ? (
              // Show "Sticker Image" link for specific algorithms
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                background: colors.neutral[50],
                borderRadius: borderRadius.xl,
                padding: spacing[4],
                border: `1px solid ${colors.border.light}`,
              }}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  style={{
                    background: isButtonHovered ? colors.primary[700] : colors.primary[600],
                    color: 'white',
                    border: 'none',
                    padding: `${spacing[3]} ${spacing[4]}`,
                    borderRadius: borderRadius.lg,
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.medium,
                    cursor: 'pointer',
                    transition: transitions.fast,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2],
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21,15 16,10 5,21" />
                  </svg>
                  Sticker Image
                </button>
              </div>
            ) : (
              // Show regular image display for other algorithms
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: isImageHovered ? colors.neutral[100] : colors.neutral[50],
                  borderRadius: borderRadius.xl,
                  padding: spacing[4],
                  border: `1px solid ${isImageHovered ? colors.border.medium : colors.border.light}`,
                  cursor: 'pointer',
                  transition: transitions.fast,
                }}
                onClick={() => setIsImageZoomed(!isImageZoomed)}
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <img
                  src={tutorialImageSrc}
                  alt={`${selectedAlgorithm.name} tutorial`}
                  style={{
                    maxWidth: isImageZoomed ? '100%' : '80%',
                    maxHeight: isImageZoomed ? '600px' : '300px',
                    width: 'auto',
                    height: 'auto',
                    borderRadius: borderRadius.lg,
                    boxShadow: shadows.md,
                    border: `1px solid ${colors.border.light}`,
                    background: colors.background.primary,
                    transition: transitions.normal,
                    transform: isImageZoomed ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>
            )}
            
            {!shouldShowStickerLink && isImageZoomed && (
              <div style={{
                textAlign: 'center',
                marginTop: spacing[2],
                fontSize: typography.fontSize.sm,
                color: colors.neutral[500],
              }}>
                Click again to zoom out
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <p style={{
          fontSize: typography.fontSize.base,
          color: colors.neutral[700],
          lineHeight: typography.lineHeight.normal,
          margin: 0,
        }}>
          {selectedAlgorithm.description}
        </p>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={tutorialImageSrc}
        imageAlt={`${selectedAlgorithm.name} tutorial`}
        algorithmName={selectedAlgorithm.name}
      />
    </div>
  )
}

export default AlgorithmDetails