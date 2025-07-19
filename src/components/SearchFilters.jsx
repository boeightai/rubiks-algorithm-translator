import StarIcon from './ui/StarIcon'

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  showFavoritesOnly,
  setShowFavoritesOnly
}) => {
  return (
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
  )
}

export default SearchFilters 