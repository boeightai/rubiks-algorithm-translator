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

import StarIcon from './StarIcon'

const StarButton = ({ 
  isFavorite, 
  onToggle, 
  size = 22, 
  className = '',
  title,
  ariaLabel 
}) => {
  const defaultTitle = isFavorite ? 'Remove from favorites' : 'Add to favorites'
  const defaultAriaLabel = isFavorite ? 'Unstar' : 'Star'

  return (
    <button
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      className={`responsive-star-button ${className}`}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '44px',
        minHeight: '44px',
        borderRadius: '50%',
        transition: 'background-color 0.2s ease',
      }}
      aria-label={ariaLabel || defaultAriaLabel}
      title={title || defaultTitle}
    >
      <StarIcon filled={isFavorite} size={size} />
      
      {/* Mobile-responsive styles */}
      <style>{`
        .responsive-star-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .responsive-star-button:active {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
          .responsive-star-button {
            min-width: 48px !important;
            min-height: 48px !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-star-button {
            min-width: 44px !important;
            min-height: 44px !important;
          }
        }
        
        /* iPad-specific touch targets */
        @media (min-width: 768px) and (max-width: 1024px) {
          .responsive-star-button {
            min-width: 52px !important;
            min-height: 52px !important;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .responsive-star-button {
            min-width: 48px !important;
            min-height: 48px !important;
          }
        }
      `}</style>
    </button>
  )
}

export default StarButton 