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