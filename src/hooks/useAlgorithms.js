import { useState, useMemo } from 'react'
import algorithms from '../data/algorithms.json'

export function useAlgorithms(favoriteIds = []) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Get unique categories
  const categories = ['all', ...new Set(algorithms.map(alg => alg.category))]

  // Filter algorithms based on search and category
  const filteredAlgorithms = useMemo(() => {
    return algorithms.filter(alg => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        alg.name.toLowerCase().includes(search) ||
        alg.description.toLowerCase().includes(search) ||
        (alg.nicknames && alg.nicknames.some(nick => nick.toLowerCase().includes(search)));
      const matchesCategory = selectedCategory === 'all' || alg.category === selectedCategory;
      const matchesFavorite = !showFavoritesOnly || favoriteIds.includes(alg.id);
      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [searchTerm, selectedCategory, showFavoritesOnly, favoriteIds]);

  return {
    selectedAlgorithm,
    setSelectedAlgorithm,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showFavoritesOnly,
    setShowFavoritesOnly,
    categories,
    filteredAlgorithms,
    algorithms
  }
} 