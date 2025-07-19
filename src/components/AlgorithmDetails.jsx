import StarButton from './ui/StarButton'

const AlgorithmDetails = ({
  selectedAlgorithm,
  isFavorite,
  onToggleFavorite,
  tutorialImageExists,
  tutorialImageSrc
}) => {
  if (!selectedAlgorithm) {
    return (
      <div style={{ textAlign: 'center', color: '#666', padding: '60px 0', fontSize: '1.1rem' }}>
        Select an algorithm from the list to see its details
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Details */}
        <div style={{ flex: '1 1 220px', minWidth: '200px', position: 'relative' }}>
          <h3 style={{ 
            marginBottom: '10px', 
            color: '#222', 
            fontWeight: 700, 
            fontSize: '1.2rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}>
            {selectedAlgorithm.name}
            <StarButton
              isFavorite={isFavorite(selectedAlgorithm.id)}
              onToggle={() => onToggleFavorite(selectedAlgorithm.id)}
              size={24}
              style={{
                marginLeft: 8,
              }}
            />
          </h3>
          <div style={{ marginBottom: '8px', fontSize: '15px' }}>
            <strong>Notation:</strong> {selectedAlgorithm.notation}
          </div>
          <div style={{ marginBottom: '8px', fontSize: '15px' }}>
            <strong>Category:</strong> {selectedAlgorithm.category}
          </div>
          <div style={{ marginBottom: '8px', fontSize: '15px' }}>
            <strong>Difficulty:</strong> {selectedAlgorithm.difficulty}
          </div>
          <div style={{ marginBottom: '14px', fontSize: '15px' }}>
            <strong>Description:</strong> {selectedAlgorithm.description}
          </div>
          {selectedAlgorithm.nicknames && selectedAlgorithm.nicknames.length > 0 && (
            <div style={{ marginBottom: '14px', fontSize: '15px', color: '#2563eb', fontStyle: 'italic' }}>
              <strong>Nicknames:</strong> {selectedAlgorithm.nicknames.join(', ')}
            </div>
          )}
        </div>
        {/* Tutorial Image */}
        {tutorialImageExists && (
          <div style={{ minWidth: '120px', flex: '1 1 120px' }}>
            <img
              src={tutorialImageSrc}
              alt={`${selectedAlgorithm.name} tutorial`}
              style={{
                maxWidth: '180px',
                width: '100%',
                height: 'auto',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 1px 6px 0 rgba(30, 64, 175, 0.06)',
                background: '#f8fafc',
                marginTop: '2px',
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default AlgorithmDetails 