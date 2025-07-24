/*
 * Rubik's Cube Algorithm Translator
 * Copyright (C) 2025 Bo Nam
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { colors, typography, spacing, borderRadius, shadows, transitions } from '../styles/designSystem'
import StarIcon from './ui/StarIcon'
import { useCallback } from 'react'

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
  // Memoized handlers for better performance
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [setSearchTerm])

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value)
  }, [setSelectedCategory])

  const handleFavoritesToggle = useCallback(() => {
    setShowFavoritesOnly(prev => !prev)
  }, [setShowFavoritesOnly])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [setSearchTerm])

  const clearCategory = useCallback(() => {
    setSelectedCategory('all')
  }, [setSelectedCategory])

  return (
    <div style={{
      marginBottom: spacing[6],
    }}>
      {/* Search and Filter Controls */}
      <div 
        className="responsive-form"
        style={{
          display: 'flex',
          gap: spacing[3],
          marginBottom: spacing[4],
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Search Input */}
        <div style={{ 
          flex: '2 1 200px', 
          minWidth: '200px', 
          position: 'relative',
          width: '100%'
        }}>
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
            onChange={handleSearchChange}
            placeholder="Search algorithms..."
            aria-label="Search algorithms by name, description, or nickname"
            style={{
              width: '100%',
              padding: `${spacing[3]} ${spacing[4]} ${spacing[3]} ${spacing[10]}`,
              border: `1px solid ${colors.border.medium}`,
              borderRadius: borderRadius.xl,
              fontSize: '16px', // Prevent zoom on iOS
              background: colors.background.primary,
              color: colors.neutral[800],
              outline: 'none',
              transition: transitions.fast,
              minHeight: '44px', // Touch target optimization
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary[500]
              e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border.medium
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ 
          flex: '1 1 150px', 
          minWidth: '150px', 
          position: 'relative',
          width: '100%'
        }}>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="Filter by algorithm category"
            style={{
              width: '100%',
              padding: `${spacing[3]} ${spacing[4]}`,
              border: `1px solid ${colors.border.medium}`,
              borderRadius: borderRadius.xl,
              fontSize: '16px', // Prevent zoom on iOS
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
              minHeight: '44px', // Touch target optimization
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary[500]
              e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border.medium
              e.target.style.boxShadow = 'none'
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
      <div 
        className="responsive-button-group"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: spacing[4],
          gap: spacing[3],
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: spacing[3],
          flex: '1 1 auto'
        }}>
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
            onClick={handleFavoritesToggle}
            aria-pressed={showFavoritesOnly}
            aria-label={showFavoritesOnly ? 'Show all algorithms' : 'Show only favorites'}
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
              minHeight: '44px', // Touch target optimization
              minWidth: '44px',
              whiteSpace: 'nowrap',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = shadows.sm
            }}
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
                onClick={clearSearch}
                aria-label="Clear search"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: 'inherit',
                  fontSize: '14px',
                  lineHeight: 1,
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '20px',
                  minHeight: '20px',
                }}
                onFocus={(e) => {
                  e.target.style.background = colors.primary[200]
                }}
                onBlur={(e) => {
                  e.target.style.background = 'none'
                }}
              >
                ×
              </button>
            </div>
          )}
          
          {selectedCategory !== 'all' && (
            <div style={{
              background: selectedCategory === 'Wired' ? colors.neutral[100] : colors.success[100],
              color: selectedCategory === 'Wired' ? colors.neutral[700] : colors.success[700],
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
                onClick={clearCategory}
                aria-label="Clear category filter"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: 'inherit',
                  fontSize: '14px',
                  lineHeight: 1,
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '20px',
                  minHeight: '20px',
                }}
                onFocus={(e) => {
                  e.target.style.background = selectedCategory === 'Wired' ? colors.neutral[200] : colors.success[200]
                }}
                onBlur={(e) => {
                  e.target.style.background = 'none'
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile-specific responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .responsive-form {
            flex-direction: column !important;
            gap: 12px !important;
          }
          
          .responsive-form > div {
            flex: 1 1 auto !important;
            min-width: auto !important;
            width: 100% !important;
          }
          
          .responsive-button-group {
            flex-direction: column !important;
            gap: 12px !important;
            align-items: stretch !important;
          }
          
          .responsive-button-group > div {
            justify-content: center !important;
            text-align: center !important;
          }
          
          .responsive-button-group button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-form {
            gap: 8px !important;
          }
          
          .responsive-button-group {
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default SearchFilters 