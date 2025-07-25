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

import { useState, useMemo, useCallback } from 'react'
import algorithms from '../data/algorithms.json'

export function useAlgorithms(favoriteIds = [], wiredIds = []) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Get unique categories - memoized to prevent recalculation
  const categories = useMemo(() => {
    return ['all', 'Wired', ...new Set(algorithms.map(alg => alg.category))]
  }, [])

  // Memoized search term for case-insensitive comparison
  const normalizedSearchTerm = useMemo(() => {
    return searchTerm.toLowerCase().trim()
  }, [searchTerm])

  // Filter algorithms based on search and category - optimized with early returns
  const filteredAlgorithms = useMemo(() => {
    // Early return if no algorithms
    if (!algorithms || algorithms.length === 0) {
      return []
    }

    return algorithms.filter(alg => {
      // Early return for favorites filter
      if (showFavoritesOnly && !favoriteIds.includes(alg.id)) {
        return false
      }

      // Early return for category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'Wired') {
          // Filter for algorithms with wired tag
          if (!wiredIds.includes(alg.id)) {
            return false
          }
        } else if (alg.category !== selectedCategory) {
          return false
        }
      }

      // Search filter - only run if there's a search term
      if (normalizedSearchTerm) {
        const searchFields = [
          alg.name,
          alg.description,
          ...(alg.nicknames || [])
        ]
        
        const matchesSearch = searchFields.some(field => 
          field.toLowerCase().includes(normalizedSearchTerm)
        )
        
        if (!matchesSearch) {
          return false
        }
      }

      return true
    }).map(alg => ({
      ...alg,
      isSelected: selectedAlgorithm && selectedAlgorithm.id === alg.id
    }))
  }, [normalizedSearchTerm, selectedCategory, showFavoritesOnly, favoriteIds, wiredIds, selectedAlgorithm])

  // Memoized setters to prevent unnecessary re-renders
  const memoizedSetSearchTerm = useCallback((value) => {
    setSearchTerm(value)
  }, [])

  const memoizedSetSelectedCategory = useCallback((value) => {
    setSelectedCategory(value)
  }, [])

  const memoizedSetShowFavoritesOnly = useCallback((value) => {
    setShowFavoritesOnly(value)
  }, [])

  const memoizedSetSelectedAlgorithm = useCallback((algorithm) => {
    setSelectedAlgorithm(algorithm)
  }, [])

  return {
    selectedAlgorithm,
    setSelectedAlgorithm: memoizedSetSelectedAlgorithm,
    searchTerm,
    setSearchTerm: memoizedSetSearchTerm,
    selectedCategory,
    setSelectedCategory: memoizedSetSelectedCategory,
    showFavoritesOnly,
    setShowFavoritesOnly: memoizedSetShowFavoritesOnly,
    categories,
    filteredAlgorithms,
    algorithms
  }
} 