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

function AlgorithmSelectorRefactored({ onModeToggle, currentMode }) {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
  const { wiredIds, isWired } = useWired()
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
  } = useAlgorithms(favoriteIds, wiredIds)
  
  const { tutorialImageExists, tutorialImageSrc, patternImageExists, patternImageSrc } = useTutorialImage(selectedAlgorithm)

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm)
  }

  const header = (
    <Header 
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      onModeToggle={onModeToggle}
      currentMode={currentMode}
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
        onSelectAlgorithm={handleAlgorithmSelect}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        isWired={isWired}
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
      setSelectedAlgorithm={handleAlgorithmSelect}
    />
  )
}

export default AlgorithmSelectorRefactored