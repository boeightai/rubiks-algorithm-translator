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
      padding: '16px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '4px',
      textAlign: 'center'
    }}>
      <div style={{ color: '#666', marginBottom: '12px', fontWeight: 'bold' }}>
        Visual Sequence
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '8px', 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {moveList.map((move, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            {moves[move] ? (
              <div>
                <img 
                  src={moves[move]} 
                  alt={move}
                  style={{
                    width: '80px',
                    height: '80px',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                  }}
                  onError={(e) => {
                    // If image fails to load, show placeholder
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <div 
                  style={{
                    display: 'none',
                    width: '80px',
                    height: '80px',
                    border: '2px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f0f0f0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#666'
                  }}
                >
                  {move}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#666', 
                  marginTop: '4px',
                  fontWeight: 'bold'
                }}>
                  {move}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  border: '2px solid #ff6b6b',
                  borderRadius: '4px',
                  backgroundColor: '#ffe0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#d63031'
                }}>
                  Unknown
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#d63031', 
                  marginTop: '4px',
                  fontWeight: 'bold'
                }}>
                  {move}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {moveList.length === 0 && (
        <div style={{ color: '#888', fontStyle: 'italic' }}>
          No moves to display
        </div>
      )}
    </div>
  )
}

export default VisualSequence