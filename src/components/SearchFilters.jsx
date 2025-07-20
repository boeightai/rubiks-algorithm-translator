import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/designSystem'
import StarIcon from './ui/StarIcon'

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  filteredCount,
  totalCount,
  showFavoritesOnly,
  setShowFavoritesOnly,
}) => {
  return (
    <div style={{
      marginBottom: spacing[6],
    }}>
      {/* Search and Filter Controls */}
      <div style={{
        display: 'flex',
        gap: spacing[3],
        marginBottom: spacing[4],
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {/* Search Input */}
        <div style={{ flex: '2 1 200px', minWidth: '200px', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: spacing[3],
            top: '50%',
            transform: 'translateY(-50%)',
            color: colors.neutral[400],
            zIndex: 1,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search algorithms..."
            style={{
              width: '100%',
              padding: `${spacing[3]} ${spacing[4]} ${spacing[3]} ${spacing[10]}`,
              border: `1px solid ${colors.border.medium}`,
              borderRadius: borderRadius.xl,
              fontSize: typography.fontSize.sm,
              background: colors.background.primary,
              color: colors.neutral[800],
              outline: 'none',
              transition: transitions.fast,
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ flex: '1 1 150px', minWidth: '150px', position: 'relative' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: `${spacing[3]} ${spacing[4]}`,
              border: `1px solid ${colors.border.medium}`,
              borderRadius: borderRadius.xl,
              fontSize: typography.fontSize.sm,
              background: colors.background.primary,
              color: colors.neutral[800],
              cursor: 'pointer',
              transition: transitions.fast,
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: `right ${spacing[2]} center`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px 12px',
              paddingRight: spacing[10],
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Count and Favorites button row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing[4],
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
          {/* Title for count display */}
          <div style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[900],
            fontWeight: typography.fontWeight.semibold,
          }}>
            Algorithms
          </div>
          {/* Count display shifted left */}
          <div style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.medium,
          }}>
            {filteredCount} of {totalCount}
          </div>
        </div>
        {/* Favorites button right-justified */}
        {setShowFavoritesOnly && (
          <button
            onClick={() => setShowFavoritesOnly(fav => !fav)}
            style={{
              padding: `${spacing[3]} ${spacing[4]}`,
              border: showFavoritesOnly ? `2px solid ${colors.warning[500]}` : `1px solid ${colors.border.medium}`,
              borderRadius: '12px',
              background: showFavoritesOnly ? colors.warning[50] : colors.background.primary,
              color: showFavoritesOnly ? colors.warning[700] : colors.neutral[700],
              fontWeight: typography.fontWeight.medium,
              fontSize: typography.fontSize.sm,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              boxShadow: shadows.sm,
            }}
            aria-pressed={showFavoritesOnly}
            title={showFavoritesOnly ? 'Show all algorithms' : 'Show only favorites'}
          >
            <StarIcon filled={showFavoritesOnly} size={16} />
            <span style={{ color: 'inherit' }}>Favorites</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div style={{
          display: 'flex',
          gap: spacing[2],
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[500],
            fontWeight: typography.fontWeight.medium,
          }}>
            Active filters:
          </span>
          
          {searchTerm && (
            <div style={{
              background: colors.primary[100],
              color: colors.primary[700],
              padding: `${spacing[1]} ${spacing[2]}`,
              borderRadius: borderRadius.full,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1],
            }}>
              <span>Search: "{searchTerm}"</span>
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: 'inherit',
                  fontSize: '14px',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          )}
          
          {selectedCategory !== 'all' && (
            <div style={{
              background: colors.success[100],
              color: colors.success[700],
              padding: `${spacing[1]} ${spacing[2]}`,
              borderRadius: borderRadius.full,
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1],
            }}>
              <span>Category: {selectedCategory}</span>
              <button
                onClick={() => setSelectedCategory('all')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: 'inherit',
                  fontSize: '14px',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchFilters 