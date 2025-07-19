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
      maxWidth: '1200px',
      margin: '32px auto',
      padding: '16px',
      fontFamily: 'Inter, Arial, sans-serif',
      ...containerStyle
    }}>
      {header}
      
      {/* Main Content Grid */}
      <div style={{
        display: 'flex',
        gap: '28px',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* Left Column */}
        <div style={{
          flex: '1 1 320px',
          minWidth: '300px',
          maxWidth: '370px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px 0 rgba(30, 64, 175, 0.07)',
          padding: '20px 18px',
          marginBottom: '18px',
          ...leftColumnStyle
        }}>
          {leftColumn}
        </div>

        {/* Right Column */}
        <div style={{
          flex: '2 1 500px',
          minWidth: '340px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px 0 rgba(30, 64, 175, 0.07)',
          padding: '24px 28px',
          marginBottom: '18px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '420px',
          ...rightColumnStyle
        }}>
          {rightColumn}
        </div>
      </div>
    </div>
  )
}

export default GridLayout 