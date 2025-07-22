

const Logo = ({ 
  size = 24, 
  variant = 'default',
  className = '',
  style = {}
}) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  }

  // You can add different logo variants here
  const renderLogo = () => {
    switch (variant) {
      case 'minimal':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8"/>
          </svg>
        )
      case 'custom':
        // Add your custom logo SVG here
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            {/* Your custom logo path goes here */}
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        )
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        )
    }
  }

  return (
    <div className={className} style={containerStyle}>
      {renderLogo()}
    </div>
  )
}

export default Logo 