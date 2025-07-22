import { colors, typography, spacing, shadows } from '../styles/designSystem'
import StarIcon from './ui/StarIcon'
import Logo from './ui/Logo'

const Header = ({ 
  title = "Bo's Visual Notation System",
  subtitle = "An Alternate Visual Notation System for Solving Rubik's Cubes",
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

      </div>
    </div>
  )
}

export default Header 