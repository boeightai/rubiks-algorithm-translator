import { colors, typography, spacing, borderRadius, shadows } from './styles/designSystem'
import moves from './data/moves.json'

function VisualSequence({ notation }) {
  // Parse the notation string into individual moves
  const parseNotation = (notation) => {
    if (!notation) return []
    // Split by spaces and filter out empty strings
    return notation.split(' ').filter(move => move.trim() !== '')
  }

  const moveList = parseNotation(notation)

  return (
    <div style={{
      background: colors.background.primary,
      borderRadius: borderRadius.xl,
      border: `1px solid ${colors.border.light}`,
      padding: spacing[6],
      boxShadow: shadows.sm,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[2],
        marginBottom: spacing[4],
        paddingBottom: spacing[3],
        borderBottom: `1px solid ${colors.border.light}`,
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h3 style={{
          color: colors.neutral[900],
          margin: 0,
          fontWeight: typography.fontWeight.semibold,
          fontSize: typography.fontSize.lg,
        }}>
          Visual Sequence
        </h3>
        <div style={{
          background: colors.neutral[100],
          color: colors.neutral[600],
          padding: `${spacing[1]} ${spacing[2]}`,
          borderRadius: borderRadius.full,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
        }}>
          {moveList.length} moves
        </div>
      </div>

      {moveList.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: spacing[8],
          color: colors.neutral[500],
        }}>
          <div style={{
            fontSize: typography.fontSize.xl,
            marginBottom: spacing[2],
            color: colors.neutral[400],
          }}>
            🎯
          </div>
          <div style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[500],
          }}>
            No moves to display
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing[3],
          justifyContent: 'center',
          alignItems: 'flex-end',
          minHeight: '120px',
        }}>
          {moveList.map((move, index) => (
            <div key={index} style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing[2],
            }}>
              {/* Move number */}
              <div style={{
                background: colors.neutral[100],
                color: colors.neutral[600],
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.medium,
                border: `1px solid ${colors.border.light}`,
              }}>
                {index + 1}
              </div>

              {/* Move image */}
              {moves[move] ? (
                <div style={{
                  position: 'relative',
                }}>
                  <img
                    src={moves[move]}
                    alt={move}
                    style={{
                      width: '64px',
                      height: '64px',
                      border: `2px solid ${colors.border.light}`,
                      borderRadius: borderRadius.lg,
                      backgroundColor: colors.background.primary,
                      display: 'block',
                      boxShadow: shadows.sm,
                      transition: 'transform 0.2s ease',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div style={{
                    display: 'none',
                    width: '64px',
                    height: '64px',
                    border: `2px solid ${colors.border.light}`,
                    borderRadius: borderRadius.lg,
                    backgroundColor: colors.neutral[100],
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: typography.fontSize.sm,
                    color: colors.neutral[600],
                    fontWeight: typography.fontWeight.medium,
                  }}>
                    {move}
                  </div>
                </div>
              ) : (
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: `2px solid ${colors.warning[300]}`,
                  borderRadius: borderRadius.lg,
                  backgroundColor: colors.warning[50],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: typography.fontSize.sm,
                  color: colors.warning[700],
                  fontWeight: typography.fontWeight.medium,
                }}>
                  ?
                </div>
              )}

              {/* Move label */}
              <div style={{
                fontSize: typography.fontSize.sm,
                color: colors.neutral[700],
                fontWeight: typography.fontWeight.medium,
                fontFamily: typography.fontFamily.mono,
                letterSpacing: '0.05em',
                maxWidth: '80px',
                textAlign: 'center',
                lineHeight: typography.lineHeight.tight,
              }}>
                {move}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notation display */}
      {moveList.length > 0 && (
        <div style={{
          marginTop: spacing[6],
          padding: spacing[4],
          background: colors.neutral[50],
          borderRadius: borderRadius.lg,
          border: `1px solid ${colors.border.light}`,
        }}>
          <div style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[600],
            fontWeight: typography.fontWeight.medium,
            marginBottom: spacing[2],
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Complete Notation
          </div>
          <div style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.base,
            color: colors.neutral[900],
            fontWeight: typography.fontWeight.medium,
            lineHeight: typography.lineHeight.normal,
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}>
            {notation}
          </div>
        </div>
      )}
    </div>
  )
}

export default VisualSequence