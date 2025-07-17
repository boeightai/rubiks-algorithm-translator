import { useState } from 'react'
import VisualSequence from './VisualSequence'
import algorithms from './data/algorithms.json'

function AlgorithmSelector() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories
  const categories = ['all', ...new Set(algorithms.map(alg => alg.category))]

  // Filter algorithms based on search and category
  const filteredAlgorithms = algorithms.filter(alg => {
    const matchesSearch = alg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alg.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || alg.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container">
      {/* Header */}
      <div className="card">
        <h1 style={{ color: '#3b82f6', marginBottom: '16px', fontSize: '2rem' }}>
          Rubik's Cube Algorithm Translator
        </h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Select an algorithm to see its visual notation
        </p>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Algorithm List */}
        <div className="card" style={{ flex: '1' }}>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>
            Algorithms ({filteredAlgorithms.length})
          </h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {filteredAlgorithms.map(algorithm => (
              <div
                key={algorithm.id}
                onClick={() => setSelectedAlgorithm(algorithm)}
                style={{
                  padding: '12px',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedAlgorithm?.id === algorithm.id ? '#e3f2fd' : 'white'
                }}
              >
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {algorithm.name}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {algorithm.category} • {algorithm.difficulty}
                </div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                  {algorithm.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Algorithm */}
        <div className="card" style={{ flex: '1' }}>
          {selectedAlgorithm ? (
            <div>
              <h3 style={{ marginBottom: '16px', color: '#333' }}>
                {selectedAlgorithm.name}
              </h3>
              <div style={{ marginBottom: '12px' }}>
                <strong>Notation:</strong> {selectedAlgorithm.notation}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Category:</strong> {selectedAlgorithm.category}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Difficulty:</strong> {selectedAlgorithm.difficulty}
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Description:</strong> {selectedAlgorithm.description}
              </div>
              <VisualSequence notation={selectedAlgorithm.notation} />
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              Select an algorithm from the list to see its details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AlgorithmSelector