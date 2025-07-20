import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/designSystem'
import StarButton from './ui/StarButton'

const AlgorithmList = ({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm,
  isFavorite,
  onToggleFavorite
}) => {
  return (
    <div style={{ 
      maxHeight: 'calc(100vh - 400px)', 
      overflowY: 'auto', 
      paddingRight: spacing[4], // Increased from spacing[2] to spacing[4] for better scrollbar spacing
      scrollbarWidth: 'thin',
      scrollbarColor: `${colors.neutral[300]} transparent`,
    }}>
      {algorithms.length === 0 ? (
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
            🔍
          </div>
          <div style={{
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.medium,
            marginBottom: spacing[1],
          }}>
            No algorithms found
          </div>
          <div style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[500],
          }}>
            Try adjusting your search or filters
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3],
        }}>
          {algorithms.map(algorithm => {
            const isSelected = selectedAlgorithm?.id === algorithm.id
            const isFav = isFavorite(algorithm.id)
            
            return (
              <div
                key={algorithm.id}
                onClick={() => onSelectAlgorithm(algorithm)}
                style={{
                  background: isSelected ? colors.primary[50] : colors.background.primary,
                  border: isSelected ? `2px solid ${colors.primary[500]}` : `1px solid ${colors.border.light}`,
                  borderRadius: borderRadius.xl,
                  padding: spacing[4],
                  cursor: 'pointer',
                  transition: transitions.normal,
                  boxShadow: isSelected ? shadows.lg : shadows.sm,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: shadows.lg,
                    borderColor: isSelected ? colors.primary[600] : colors.border.medium,
                  },
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: spacing[3],
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[2],
                      marginBottom: spacing[2],
                    }}>
                      <h3 style={{
                        fontSize: typography.fontSize.lg,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.neutral[900],
                        margin: 0,
                        lineHeight: typography.lineHeight.tight,
                      }}>
                        {algorithm.name}
                      </h3>
                    </div>

                    {/* Category */}
                    <div style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.neutral[600],
                      marginBottom: spacing[2],
                      fontWeight: typography.fontWeight.medium,
                    }}>
                      {algorithm.category}
                    </div>

                    {/* Description */}
                    <div style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.neutral[700],
                      marginBottom: spacing[2],
                      lineHeight: typography.lineHeight.normal,
                    }}>
                      {algorithm.description}
                    </div>

                    {/* Nicknames */}
                    {algorithm.nicknames && algorithm.nicknames.length > 0 && (
                      <div style={{
                        fontSize: typography.fontSize.xs,
                        color: colors.primary[600],
                        fontStyle: 'italic',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: spacing[1],
                        alignItems: 'center',
                      }}>
                        <span style={{ fontWeight: typography.fontWeight.medium }}>Also known as:</span>
                        {algorithm.nicknames.map((nickname, index) => (
                          <span key={index} style={{
                            background: colors.primary[50],
                            padding: `${spacing[1]} ${spacing[2]}`,
                            borderRadius: borderRadius.base,
                            fontSize: typography.fontSize.xs,
                          }}>
                            {nickname}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Notation preview */}
                    <div style={{
                      marginTop: spacing[3],
                      padding: spacing[2],
                      background: colors.neutral[50],
                      borderRadius: borderRadius.lg,
                      border: `1px solid ${colors.border.light}`,
                    }}>
                      <div style={{
                        fontSize: typography.fontSize.xs,
                        color: colors.neutral[500],
                        fontWeight: typography.fontWeight.medium,
                        marginBottom: spacing[1],
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        Notation
                      </div>
                      <div style={{
                        fontSize: typography.fontSize.sm,
                        fontFamily: typography.fontFamily.mono,
                        color: colors.neutral[800],
                        fontWeight: typography.fontWeight.medium,
                      }}>
                        {algorithm.notation}
                      </div>
                    </div>
                  </div>

                  {/* Star button */}
                  <div style={{
                    flexShrink: 0,
                    marginTop: spacing[1],
                  }}>
                    <StarButton
                      isFavorite={isFav}
                      onToggle={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(algorithm.id)
                      }}
                      size={20}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AlgorithmList 