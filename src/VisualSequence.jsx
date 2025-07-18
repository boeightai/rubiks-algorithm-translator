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
      padding: '10px 8px',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
      textAlign: 'center',
      marginBottom: '0',
    }}>
      <div style={{ color: '#666', marginBottom: '8px', fontWeight: 'bold', fontSize: '15px' }}>
        Visual Sequence
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'flex-end',
        minHeight: '80px',
      }}>
        {moveList.map((move, index) => (
          <div key={index} style={{ textAlign: 'center', width: '60px' }}>
            {moves[move] ? (
              <>
                <img
                  src={moves[move]}
                  alt={move}
                  style={{
                    width: '56px',
                    height: '56px',
                    border: '1.5px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    display: 'block',
                    margin: '0 auto',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <div style={{
                  display: 'none',
                  width: '56px',
                  height: '56px',
                  border: '1.5px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f0f0f0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  color: '#666',
                  margin: '0 auto',
                }}>
                  {move}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#666',
                  marginTop: '2px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {move}
                </div>
              </>
            ) : (
              <>
                <div style={{
                  width: '56px',
                  height: '56px',
                  border: '1.5px solid #ff6b6b',
                  borderRadius: '4px',
                  backgroundColor: '#ffe0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#d63031',
                  margin: '0 auto',
                }}>
                  Unknown
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#d63031',
                  marginTop: '2px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {move}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {moveList.length === 0 && (
        <div style={{ color: '#888', fontStyle: 'italic', marginTop: '8px' }}>
          No moves to display
        </div>
      )}
    </div>
  )
}

export default VisualSequence