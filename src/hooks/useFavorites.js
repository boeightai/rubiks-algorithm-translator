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

import { useState, useEffect } from 'react'

export function useFavorites() {
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

  const toggleFavorite = (algorithmId) => {
    setFavoriteIds(ids =>
      ids.includes(algorithmId)
        ? ids.filter(id => id !== algorithmId)
        : [...ids, algorithmId]
    )
  }

  const isFavorite = (algorithmId) => favoriteIds.includes(algorithmId)

  return {
    favoriteIds,
    setFavoriteIds,
    toggleFavorite,
    isFavorite
  }
} 