import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/designSystem'
import StarButton from './ui/StarButton'
import { useState } from 'react'

const AlgorithmDetails = ({
  selectedAlgorithm,
  isFavorite,
  onToggleFavorite,
  tutorialImageExists,
  tutorialImageSrc
}) => {
  const [isImageZoomed, setIsImageZoomed] = useState(false)

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

      {/* Tutorial Image Section */}
      {tutorialImageExists && (
        <div>
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
              Tutorial Image
            </h3>
            <div style={{
              fontSize: typography.fontSize.sm,
              color: colors.neutral[500],
              fontStyle: 'italic',
            }}>
              Click to zoom
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            background: colors.neutral[50],
            borderRadius: borderRadius.xl,
            padding: spacing[4],
            border: `1px solid ${colors.border.light}`,
            cursor: 'pointer',
            transition: transitions.fast,
            '&:hover': {
              background: colors.neutral[100],
              borderColor: colors.border.medium,
            },
          }}
          onClick={() => setIsImageZoomed(!isImageZoomed)}
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
          {isImageZoomed && (
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

      {/* Description */}
      <div>
        <h3 style={{
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.neutral[900],
          marginBottom: spacing[2],
        }}>
          Description
        </h3>
        <p style={{
          fontSize: typography.fontSize.base,
          color: colors.neutral[700],
          lineHeight: typography.lineHeight.normal,
          margin: 0,
        }}>
          {selectedAlgorithm.description}
        </p>
      </div>

      {/* Notation */}
      <div>
        <h3 style={{
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.neutral[900],
          marginBottom: spacing[3],
        }}>
          Algorithm Notation
        </h3>
        <div style={{
          background: colors.neutral[50],
          border: `1px solid ${colors.border.light}`,
          borderRadius: borderRadius.xl,
          padding: spacing[4],
        }}>
          <div style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.lg,
            color: colors.neutral[900],
            fontWeight: typography.fontWeight.medium,
            lineHeight: typography.lineHeight.normal,
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}>
            {selectedAlgorithm.notation}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlgorithmDetails 