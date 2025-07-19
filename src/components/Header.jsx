const Header = ({ 
  title = "Rubik's Cube Algorithm Translator",
  subtitle = "Select an algorithm to see its visual notation",
  style = {}
}) => {
  return (
    <div style={{
      marginBottom: '18px',
      padding: '12px 0',
      borderBottom: '1px solid #e0e7ef',
      textAlign: 'left',
      ...style
    }}>
      <h1 style={{ color: '#2563eb', fontSize: '1.5rem', margin: 0, fontWeight: 700, letterSpacing: '0.01em' }}>
        {title}
      </h1>
      <p style={{ color: '#666', margin: '6px 0 0 0', fontSize: '1rem' }}>
        {subtitle}
      </p>
    </div>
  )
}

export default Header 