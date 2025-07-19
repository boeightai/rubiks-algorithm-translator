import { colors, typography, spacing, shadows } from '../styles/designSystem'
import StarIcon from './ui/StarIcon'

const Header = ({ 
  title = "Rubik's Cube Algorithm Translator",
  subtitle = "Select an algorithm to see its visual notation",
  showFavoritesOnly,
  setShowFavoritesOnly,
  style = {}
}) => {
  return (
    <div style={{
      marginBottom: spacing[8],
      padding: `${spacing[6]} 0`,
      borderBottom: `1px solid ${colors.border.light}`,
      textAlign: 'left',
      ...style
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing[2],
      }}>
        {/* Left side - Title and subtitle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3],
        }}>
          {/* Icon */}
          <div style={{
            width: '48px',
            height: '48px',
            background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: shadows.md,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          
          <div>
            <h1 style={{ 
              color: colors.neutral[900], 
              fontSize: typography.fontSize['3xl'], 
              margin: 0, 
              fontWeight: typography.fontWeight.bold, 
              letterSpacing: '-0.025em',
              lineHeight: typography.lineHeight.tight,
            }}>
              {title}
            </h1>
            <p style={{ 
              color: colors.neutral[600], 
              margin: `${spacing[2]} 0 0 0`, 
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.normal,
              lineHeight: typography.lineHeight.normal,
            }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right side - Favorites button */}
        {setShowFavoritesOnly && (
          <button
            onClick={() => setShowFavoritesOnly(fav => !fav)}
            style={{
              padding: `${spacing[3]} ${spacing[4]}`,
              border: showFavoritesOnly ? `2px solid ${colors.warning[500]}` : `1px solid ${colors.border.medium}`,
              borderRadius: '12px',
              background: showFavoritesOnly ? colors.warning[50] : colors.background.primary,
              color: showFavoritesOnly ? colors.warning[700] : colors.neutral[700],
              fontWeight: typography.fontWeight.medium,
              fontSize: typography.fontSize.sm,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              boxShadow: shadows.sm,
            }}
            aria-pressed={showFavoritesOnly}
            title={showFavoritesOnly ? 'Show all algorithms' : 'Show only favorites'}
          >
            <StarIcon filled={showFavoritesOnly} size={16} />
            <span style={{ color: 'inherit' }}>Favorites</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Header 