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

import { useAlgorithms } from './hooks/useAlgorithms'
import { useFavorites } from './hooks/useFavorites'
import { useWired } from './hooks/useWired'
import { useTutorialImage } from './hooks/useTutorialImage'
import SearchFilters from './components/SearchFilters'
import AlgorithmList from './components/AlgorithmList'
import AlgorithmDetails from './components/AlgorithmDetails'
import VisualSequence from './VisualSequence'
import MobileTabLayout from './layouts/MobileTabLayout'
import Header from './components/Header'

function AlgorithmSelectorRefactored() {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
  const { wiredIds, toggleWired, isWired } = useWired()
  const {
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
  } = useAlgorithms(favoriteIds)
  
  const { tutorialImageExists, tutorialImageSrc, patternImageExists, patternImageSrc } = useTutorialImage(selectedAlgorithm)

  const header = (
    <Header 
      showFavoritesOnly={showFavoritesOnly}
      setShowFavoritesOnly={setShowFavoritesOnly}
    />
  )

  const algorithmsContent = (
    <>
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        filteredCount={filteredAlgorithms.length}
        totalCount={algorithms.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />
      
      <AlgorithmList
        algorithms={filteredAlgorithms}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={setSelectedAlgorithm}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        isWired={isWired}
        onToggleWired={toggleWired}
      />
    </>
  )

  const visualSequenceContent = (
    <>
      <AlgorithmDetails
        selectedAlgorithm={selectedAlgorithm}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        isWired={isWired}
        onToggleWired={toggleWired}
        tutorialImageExists={tutorialImageExists}
        tutorialImageSrc={tutorialImageSrc}
        patternImageExists={patternImageExists}
        patternImageSrc={patternImageSrc}
      />
      
      {/* Visual Sequence below details and image */}
      {selectedAlgorithm && (
        <div style={{ marginTop: '32px' }}>
          <VisualSequence notation={selectedAlgorithm.notation} />
        </div>
      )}
    </>
  )

  return (
    <MobileTabLayout
      header={header}
      algorithmsContent={algorithmsContent}
      visualSequenceContent={visualSequenceContent}
      selectedAlgorithm={selectedAlgorithm}
      setSelectedAlgorithm={setSelectedAlgorithm}
    />
  )
}

export default AlgorithmSelectorRefactored