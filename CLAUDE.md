# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server at http://localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture Overview

### Core Data Flow
1. **AlgorithmSelectorRefactored** (src/AlgorithmSelectorRefactored.jsx) - Main orchestrator component that manages all state and coordinates features
2. **Custom Hooks** handle specific concerns:
   - `useAlgorithms` - Algorithm data management, filtering by search/category/favorites
   - `useFavorites` - Favorite persistence using localStorage
   - `useTutorialImage` - Tutorial image loading for specific algorithms
3. **VisualSequence** (src/VisualSequence.jsx) - Core translation engine that maps notation strings to visual images

### Key Data Structures

**Algorithm Format** (src/data/algorithms.json):
```json
{
  "id": "unique-identifier",
  "name": "Algorithm Name",
  "notation": "R U R' U'",
  "category": "Category Name",
  "description": "What the algorithm does",
  "nicknames": ["Alternative Name 1", "Alternative Name 2"]
}
```

**Move Mappings** (src/data/moves.json):
Maps notation to image paths:
```json
{
  "R": "/images/moves/R.png",
  "R'": "/images/moves/R-prime.png"
}
```

### Visual Translation Process
1. User selects algorithm from filtered list
2. Algorithm's notation string (e.g., "R U R' U'") passed to VisualSequence
3. VisualSequence splits notation by spaces, looks up each move in moves.json
4. Displays sequence of images with fallback for missing moves

### State Management Pattern
- All state managed in AlgorithmSelectorRefactored via hooks
- Props passed down to child components
- No global state management (Redux, Context, etc.)
- Favorites persisted to localStorage

### Styling Approach
- Design system defined in src/styles/designSystem.js
- Tailwind CSS for utility classes
- Component-specific styles using inline style objects with design tokens