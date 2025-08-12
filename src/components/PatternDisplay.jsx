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

import { getPatternImages } from '../utils/patternMapping'

const PatternDisplay = ({ algorithmId, position = 'left', patternIndex = 0 }) => {
  // Don't render anything if no algorithmId or patterns exist
  if (!algorithmId) {
    return null
  }
  
  const patternImages = getPatternImages(algorithmId)
  
  // Don't render anything if no patterns exist
  if (!patternImages || patternImages.length === 0) {
    return null
  }
  
  // For multiple patterns, show the specific pattern at patternIndex
  // For single patterns, show the first (and only) pattern
  const imageToShow = patternImages[patternIndex] || patternImages[0]
  
  return (
    <div className={`pattern-display pattern-${position}`}>
      <div className="pattern-label">Pattern to Look For</div>
      <img 
        src={imageToShow} 
        alt={`Pattern ${patternIndex + 1} for ${algorithmId}`}
        className="pattern-image"
        draggable="false"
      />
    </div>
  )
}

export default PatternDisplay
