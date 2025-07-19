# UI Refactoring Guide

## Overview
The application has been refactored to separate business logic from UI components, making it easy to completely redesign the interface while preserving all functionality.

## Current Structure

### Hooks (Business Logic)
- `src/hooks/useAlgorithms.js` - Algorithm selection, filtering, and search
- `src/hooks/useFavorites.js` - Favorites management with localStorage
- `src/hooks/useTutorialImage.js` - Tutorial image loading and validation

### Components (UI)
- `src/components/ui/StarIcon.jsx` - Reusable star icon
- `src/components/ui/StarButton.jsx` - Reusable favorite toggle button
- `src/components/SearchFilters.jsx` - Search, category filter, and favorites toggle
- `src/components/AlgorithmList.jsx` - List of algorithms with selection
- `src/components/AlgorithmDetails.jsx` - Algorithm details and tutorial image
- `src/components/Header.jsx` - Application header

### Layouts
- `src/layouts/GridLayout.jsx` - Two-column layout system

## How to Make UI Changes

### 1. Quick Style Changes
You can modify individual components by editing their inline styles:

```javascript
// Example: Change the header color
// Edit src/components/Header.jsx
<h1 style={{ color: '#your-color', fontSize: '1.5rem', margin: 0, fontWeight: 700, letterSpacing: '0.01em' }}>
```

### 2. Layout Changes
Create new layout components in `src/layouts/`:

```javascript
// src/layouts/SidebarLayout.jsx
const SidebarLayout = ({ sidebar, main, header }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ width: '300px', background: '#f5f5f5' }}>
        {sidebar}
      </div>
      <div style={{ flex: 1 }}>
        {header}
        {main}
      </div>
    </div>
  )
}
```

### 3. Component Redesign
Replace individual components while keeping the same props:

```javascript
// Example: Redesign AlgorithmList as cards
const AlgorithmList = ({ algorithms, selectedAlgorithm, onSelectAlgorithm, isFavorite, onToggleFavorite }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
      {algorithms.map(algorithm => (
        <div key={algorithm.id} style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }}>
          {/* Your new card design */}
        </div>
      ))}
    </div>
  )
}
```

### 4. Complete UI Overhaul
Create a new main component with your desired design:

```javascript
// src/AlgorithmSelectorNewUI.jsx
import { useAlgorithms } from './hooks/useAlgorithms'
import { useFavorites } from './hooks/useFavorites'
import { useTutorialImage } from './hooks/useTutorialImage'

function AlgorithmSelectorNewUI() {
  // All the same hooks - functionality preserved!
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
  const { selectedAlgorithm, setSelectedAlgorithm, /* ... */ } = useAlgorithms(favoriteIds)
  const { tutorialImageExists, tutorialImageSrc } = useTutorialImage(selectedAlgorithm)

  return (
    <div style={{ /* Your completely new design */ }}>
      {/* Your new UI structure */}
    </div>
  )
}
```

## Preserved Functionality

✅ **Algorithm Selection** - Click to select algorithms  
✅ **Search** - Search by name, description, or nicknames  
✅ **Category Filtering** - Filter by algorithm category  
✅ **Favorites System** - Star/unstar algorithms with localStorage persistence  
✅ **Visual Sequence** - Display algorithm moves as images  
✅ **Tutorial Images** - Show tutorial images when available  
✅ **Responsive Design** - Works on mobile and desktop  

## Making Iterative Changes

### Step 1: Test Current Functionality
```bash
npm run dev
```
Verify all features work: search, filter, favorites, algorithm selection, visual sequence.

### Step 2: Make Small Changes
Start with one component at a time:
1. Modify `Header.jsx` for new branding
2. Update `SearchFilters.jsx` for new filter design
3. Redesign `AlgorithmList.jsx` for new list appearance

### Step 3: Test After Each Change
After each modification, test that:
- Search still works
- Favorites persist
- Algorithm selection works
- Visual sequence displays correctly

### Step 4: Create New Layouts
Once comfortable, create new layout components:
- `MobileLayout.jsx` - Single column mobile design
- `DashboardLayout.jsx` - Multi-panel dashboard
- `ModalLayout.jsx` - Modal-based interface

## Example: Dark Theme
```javascript
// In GridLayout.jsx
const darkTheme = {
  containerStyle: { background: '#1a1a1a', color: 'white' },
  leftColumnStyle: { background: '#2d2d2d', color: 'white' },
  rightColumnStyle: { background: '#2d2d2d', color: 'white' }
}
```

## Example: Card-Based Design
```javascript
// Replace AlgorithmList with card grid
const AlgorithmCard = ({ algorithm, isSelected, onClick, isFavorite, onToggleFavorite }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    border: isSelected ? '2px solid #2563eb' : '1px solid #e5e7eb'
  }}>
    <h3>{algorithm.name}</h3>
    <p>{algorithm.description}</p>
    <StarButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
  </div>
)
```

## Backup and Rollback
- Original component: `src/AlgorithmSelector.backup.jsx`
- To rollback: Update `src/App.jsx` to import the backup
- All functionality is preserved in the refactored version

## Next Steps
1. Start with small style changes to get comfortable
2. Experiment with different layouts
3. Create new UI components
4. Test thoroughly after each change
5. Iterate based on user feedback

The refactored structure ensures you can make any UI change while maintaining 100% of the original functionality! 