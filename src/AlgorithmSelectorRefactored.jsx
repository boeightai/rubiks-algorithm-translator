import { useAlgorithms } from './hooks/useAlgorithms'
import { useFavorites } from './hooks/useFavorites'
import { useTutorialImage } from './hooks/useTutorialImage'
import SearchFilters from './components/SearchFilters'
import AlgorithmList from './components/AlgorithmList'
import AlgorithmDetails from './components/AlgorithmDetails'
import VisualSequence from './VisualSequence'
import GridLayout from './layouts/GridLayout'
import Header from './components/Header'

function AlgorithmSelectorRefactored() {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
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
    filteredAlgorithms
  } = useAlgorithms(favoriteIds)
  
  const { tutorialImageExists, tutorialImageSrc } = useTutorialImage(selectedAlgorithm)

  const header = (
    <Header />
  )

  const leftColumn = (
    <>
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />
      
      <h3 style={{ marginBottom: '10px', color: '#222', fontSize: '1.1rem', fontWeight: 600 }}>
        Algorithms <span style={{ color: '#2563eb', fontWeight: 700 }}>({filteredAlgorithms.length})</span>
      </h3>
      
      <AlgorithmList
        algorithms={filteredAlgorithms}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={setSelectedAlgorithm}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </>
  )

  const rightColumn = (
    <>
      <AlgorithmDetails
        selectedAlgorithm={selectedAlgorithm}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        tutorialImageExists={tutorialImageExists}
        tutorialImageSrc={tutorialImageSrc}
      />
      
      {/* Visual Sequence below details and image */}
      {selectedAlgorithm && (
        <div style={{ marginTop: '24px' }}>
          <VisualSequence notation={selectedAlgorithm.notation} />
        </div>
      )}
    </>
  )

  return (
    <GridLayout
      header={header}
      leftColumn={leftColumn}
      rightColumn={rightColumn}
    />
  )
}

export default AlgorithmSelectorRefactored 