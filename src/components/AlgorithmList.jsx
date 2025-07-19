import StarButton from './ui/StarButton'

const AlgorithmList = ({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm,
  isFavorite,
  onToggleFavorite
}) => {
  return (
    <div style={{ maxHeight: 'calc(100vh - 260px)', overflowY: 'auto', paddingRight: '2px' }}>
      {algorithms.map(algorithm => {
        const isSelected = selectedAlgorithm?.id === algorithm.id
        const isFav = isFavorite(algorithm.id)
        
        return (
          <div
            key={algorithm.id}
            onClick={() => onSelectAlgorithm(algorithm)}
            style={{
              padding: '10px',
              border: isSelected ? '2px solid #2563eb' : '1px solid #e5e7eb',
              borderRadius: '6px',
              marginBottom: '8px',
              cursor: 'pointer',
              backgroundColor: isSelected ? '#eff6ff' : '#f9fafb',
              transition: 'background 0.2s, border 0.2s',
              boxShadow: isSelected ? '0 2px 8px 0 rgba(37,99,235,0.07)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: '#222', fontSize: '1rem', marginRight: 0 }}>
                {algorithm.name}
              </div>
              <div style={{ fontSize: '13px', color: '#666', marginRight: 0 }}>
                {algorithm.category} • {algorithm.difficulty}
              </div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '2px', marginRight: 0 }}>
                {algorithm.description}
              </div>
              {algorithm.nicknames && algorithm.nicknames.length > 0 && (
                <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '2px', fontStyle: 'italic', marginRight: 0 }}>
                  Nicknames: {algorithm.nicknames.join(', ')}
                </div>
              )}
            </div>
            <StarButton
              isFavorite={isFav}
              onToggle={(e) => {
                e.stopPropagation()
                onToggleFavorite(algorithm.id)
              }}
              size={22}
              style={{
                marginLeft: 18,
                marginRight: 2,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default AlgorithmList 