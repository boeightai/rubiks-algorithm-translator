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
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        height: '32px',
      }}
      className={className}
      aria-label={ariaLabel || defaultAriaLabel}
      title={title || defaultTitle}
    >
      <StarIcon filled={isFavorite} size={size} />
    </button>
  )
}

export default StarButton 