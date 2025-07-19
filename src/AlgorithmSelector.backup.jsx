import { useState, useEffect } from 'react'
import VisualSequence from './VisualSequence'
import algorithms from './data/algorithms.json'

// SVG Star Icon (inline, filled or outline)
const StarIcon = ({ filled, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? '#facc15' : 'none'}
    stroke="#facc15"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ verticalAlign: 'middle', marginRight: 2 }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

function AlgorithmSelector() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [tutorialImageExists, setTutorialImageExists] = useState(false)
  // Favorites state
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem('favoriteAlgorithmIds')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteAlgorithmIds', JSON.stringify(favoriteIds))
  }, [favoriteIds])

  // Get unique categories
  const categories = ['all', ...new Set(algorithms.map(alg => alg.category))]

  // Check if tutorial image exists for selected algorithm
  useEffect(() => {
    if (selectedAlgorithm) {
      const img = new Image()
      img.onload = () => setTutorialImageExists(true)
      img.onerror = () => setTutorialImageExists(false)
      img.src = `/images/moves/${selectedAlgorithm.id}-tutorial.png`
    } else {
      setTutorialImageExists(false)
    }
  }, [selectedAlgorithm])

  // Filter algorithms based on search and category
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const filteredAlgorithms = algorithms.filter(alg => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      alg.name.toLowerCase().includes(search) ||
      alg.description.toLowerCase().includes(search) ||
      (alg.nicknames && alg.nicknames.some(nick => nick.toLowerCase().includes(search)));
    const matchesCategory = selectedCategory === 'all' || alg.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || favoriteIds.includes(alg.id);
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '32px auto',
      padding: '16px',
      fontFamily: 'Inter, Arial, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '18px',
        padding: '12px 0',
        borderBottom: '1px solid #e0e7ef',
        textAlign: 'left',
      }}>
        <h1 style={{ color: '#2563eb', fontSize: '1.5rem', margin: 0, fontWeight: 700, letterSpacing: '0.01em' }}>
          Rubik's Cube Algorithm Translator
        </h1>
        <p style={{ color: '#666', margin: '6px 0 0 0', fontSize: '1rem' }}>
          Select an algorithm to see its visual notation
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'flex',
        gap: '28px',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* Left Column: Search, Filter, List */}
        <div style={{
          flex: '1 1 320px',
          minWidth: '300px',
          maxWidth: '370px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 12px 0 rgba(30, 64, 175, 0.07)',
          padding: '20px 18px',
          marginBottom: '18px',
        }}>
          {/* Search and Filter Controls */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '2 1 160px',
                padding: '8px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '15px',
                background: '#f8fafc',
                minWidth: '120px',
              }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                flex: '1 1 120px',
                padding: '8px 10px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '15px',
                background: '#f8fafc',
                minWidth: '100px',
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowFavoritesOnly(fav => !fav)}
              style={{
                flex: 'none',
                minWidth: '110px',
                padding: '0 14px',
                border: showFavoritesOnly ? '2px solid #facc15' : '1px solid #e5e7eb',
                borderRadius: '6px',
                background: showFavoritesOnly ? '#fef9c3' : '#f8fafc',
                color: '#b45309',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                outline: 'none',
                transition: 'background 0.2s, border 0.2s',
                marginLeft: '8px',
                height: '38px',
                boxSizing: 'border-box',
              }}
              aria-pressed={showFavoritesOnly}
              title={showFavoritesOnly ? 'Show all algorithms' : 'Show only favorites'}
            >
              <StarIcon filled={showFavoritesOnly} size={20} />
              <span style={{ color: '#000' }}>Favorites</span>
            </button>
          </div>
          <h3 style={{ marginBottom: '10px', color: '#222', fontSize: '1.1rem', fontWeight: 600 }}>
            Algorithms <span style={{ color: '#2563eb', fontWeight: 700 }}>({filteredAlgorithms.length})</span>
          </h3>
          <div style={{ maxHeight: 'calc(100vh - 260px)', overflowY: 'auto', paddingRight: '2px' }}>
            {filteredAlgorithms.map(algorithm => {
              const isFavorite = favoriteIds.includes(algorithm.id)
              return (
                <div
                  key={algorithm.id}
                  onClick={() => setSelectedAlgorithm(algorithm)}
                  style={{
                    padding: '10px',
                    border: selectedAlgorithm?.id === algorithm.id ? '2px solid #2563eb' : '1px solid #e5e7eb',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedAlgorithm?.id === algorithm.id ? '#eff6ff' : '#f9fafb',
                    transition: 'background 0.2s, border 0.2s',
                    boxShadow: selectedAlgorithm?.id === algorithm.id ? '0 2px 8px 0 rgba(37,99,235,0.07)' : 'none',
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
                  {/* Star button (list) */}
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setFavoriteIds(ids =>
                        ids.includes(algorithm.id)
                          ? ids.filter(id => id !== algorithm.id)
                          : [...ids, algorithm.id]
                      )
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      marginLeft: 18,
                      marginRight: 2,
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      height: '32px',
                    }}
                    aria-label={isFavorite ? 'Unstar' : 'Star'}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <StarIcon filled={isFavorite} size={22} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Details, Visual, Image */}
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
        }}>
          {selectedAlgorithm ? (
            <>
              <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Details */}
                <div style={{ flex: '1 1 220px', minWidth: '200px', position: 'relative' }}>
                  <h3 style={{ marginBottom: '10px', color: '#222', fontWeight: 700, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedAlgorithm.name}
                    {/* Star button (details) */}
                    <button
                      onClick={() => {
                        setFavoriteIds(ids =>
                          ids.includes(selectedAlgorithm.id)
                            ? ids.filter(id => id !== selectedAlgorithm.id)
                            : [...ids, selectedAlgorithm.id]
                        )
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        marginLeft: 8,
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        height: '32px',
                      }}
                      aria-label={favoriteIds.includes(selectedAlgorithm.id) ? 'Unstar' : 'Star'}
                      title={favoriteIds.includes(selectedAlgorithm.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <StarIcon filled={favoriteIds.includes(selectedAlgorithm.id)} size={24} />
                    </button>
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
                      src={`/images/moves/${selectedAlgorithm.id}-tutorial.png`}
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
              {/* Visual Sequence below details and image */}
              <div style={{ marginTop: '24px' }}>
                <VisualSequence notation={selectedAlgorithm.notation} />
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: '#666', padding: '60px 0', fontSize: '1.1rem' }}>
              Select an algorithm from the list to see its details
            </div>
          )}
        </div>
      </div>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .container-flex {
            flex-direction: column !important;
          }
        }
      `}</style>
      {/* Responsive styles for filter controls */}
      <style>{`
        @media (max-width: 600px) {
          .filter-controls {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AlgorithmSelector 