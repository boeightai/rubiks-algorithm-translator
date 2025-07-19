import { colors, typography, spacing, borderRadius, shadows } from '../styles/designSystem'

const GridLayout = ({ 
  leftColumn, 
  rightColumn, 
  header,
  containerStyle = {},
  leftColumnStyle = {},
  rightColumnStyle = {}
}) => {
  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: spacing[6],
      fontFamily: typography.fontFamily.primary,
      background: colors.background.secondary,
      minHeight: '100vh',
      ...containerStyle
    }}>
      {header}
      
      {/* Main Content Grid */}
      <div style={{
        display: 'flex',
        gap: spacing[6],
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* Left Column */}
        <div style={{
          flex: '1 1 400px',
          minWidth: '350px',
          maxWidth: '450px',
          background: colors.background.primary,
          borderRadius: borderRadius['2xl'],
          boxShadow: shadows.lg,
          border: `1px solid ${colors.border.light}`,
          padding: spacing[6],
          marginBottom: spacing[6],
          position: 'sticky',
          top: spacing[6],
          maxHeight: 'calc(100vh - 120px)',
          overflow: 'hidden',
          ...leftColumnStyle
        }}>
          {leftColumn}
        </div>

        {/* Right Column */}
        <div style={{
          flex: '2 1 600px',
          minWidth: '400px',
          background: colors.background.primary,
          borderRadius: borderRadius['2xl'],
          boxShadow: shadows.lg,
          border: `1px solid ${colors.border.light}`,
          padding: spacing[6],
          marginBottom: spacing[6],
          display: 'flex',
          flexDirection: 'column',
          minHeight: '600px',
          ...rightColumnStyle
        }}>
          {rightColumn}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .container-flex {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .left-column {
            position: static !important;
            max-width: none !important;
            max-height: none !important;
          }
        }
        @media (max-width: 768px) {
          .container {
            padding: 16px !important;
          }
          .left-column, .right-column {
            padding: 20px !important;
            min-width: auto !important;
          }
        }
        @media (max-width: 480px) {
          .container {
            padding: 12px !important;
          }
          .left-column, .right-column {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default GridLayout 