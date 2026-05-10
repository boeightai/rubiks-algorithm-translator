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

import { useFavorites } from './hooks/useFavorites'
import { useAlgorithms } from './hooks/useAlgorithms'
import { useTutorialImage } from './hooks/useTutorialImage'
import SearchFilters from './components/SearchFilters'
import AlgorithmList from './components/AlgorithmList'
import AlgorithmDetails from './components/AlgorithmDetails'
import VisualSequence from './VisualSequence'
import MobileTabLayout from './layouts/MobileTabLayout'
import Header from './components/Header'

function AlgorithmSelectorRefactored({ onModeToggle, currentMode }) {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
  const {
    selectedAlgorithm,
    setSelectedAlgorithm,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    showFavoritesOnly,
    setShowFavoritesOnly,
    categories,
    difficultyOptions,
    difficultyCounts,
    filteredAlgorithms,
    algorithms
  } = useAlgorithms(favoriteIds)
  
  const { tutorialImageExists, tutorialImageSrc, patternImageExists, patternImageSrc } = useTutorialImage(selectedAlgorithm)

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm)
  }

  const header = (
    <Header 
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
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        categories={categories}
        difficultyOptions={difficultyOptions}
        difficultyCounts={difficultyCounts}
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
      />
    </>
  )

  const visualSequenceContent = (
    <div className="explorer-detail-grid">
      <AlgorithmDetails
        selectedAlgorithm={selectedAlgorithm}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        tutorialImageExists={tutorialImageExists}
        tutorialImageSrc={tutorialImageSrc}
        patternImageExists={patternImageExists}
        patternImageSrc={patternImageSrc}
        notation={selectedAlgorithm?.notation}
      />
      
      {selectedAlgorithm && (
        <div className="explorer-sequence-panel">
          <VisualSequence notation={selectedAlgorithm.notation} />
        </div>
      )}

      <style>{`
        .explorer-detail-grid {
          display: grid;
          gap: 16px;
        }

        @media (min-width: 1100px) {
          .explorer-detail-grid {
            grid-template-columns: minmax(220px, 0.62fr) minmax(360px, 1fr);
            align-items: start;
          }

          .explorer-sequence-panel {
            min-width: 0;
          }
        }
      `}</style>
    </div>
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
