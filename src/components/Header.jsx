import { colors, typography, spacing, shadows } from '../styles/designSystem'

const Header = ({ 
  title = "Rubik's Cube Algorithm Translator",
  subtitle = "Select an algorithm to see its visual notation",
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
        gap: spacing[3],
        marginBottom: spacing[2],
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
    </div>
  )
}

export default Header 