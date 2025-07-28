# Claude Assistant Context for Rubik's Cube Algorithm Translator

## Project Overview
This is a React-based web application that translates Rubik's Cube algorithm notation into visual step-by-step move sequences. The app is designed to work seamlessly across desktop browsers, iPads, and iPhones.

## Key Architecture Decisions

### Mobile-First Responsive Design
- **Desktop**: Two-column layout (algorithms list + visual sequence)
- **Mobile/Tablet Portrait**: Tabbed interface with "Algorithms" and "Visual Sequence" tabs
- **iPad Detection**: Special handling for iPads in portrait mode to use mobile layout (width ≤ 1024px)

### Core Components Structure
```
src/
├── AlgorithmSelectorRefactored.jsx  # Main component orchestrator
├── VisualSequence.jsx               # Displays move sequence with images
├── components/
│   ├── AlgorithmList.jsx            # Algorithm selection list
│   ├── AlgorithmDetails.jsx         # Selected algorithm details
│   ├── SearchFilters.jsx            # Search and category filters
│   ├── ErrorBoundary.jsx            # Global error handling
│   └── Header.jsx                   # App header with YouTube button
├── layouts/
│   └── MobileTabLayout.jsx          # Responsive layout controller
└── hooks/                           # Custom React hooks
    ├── useAlgorithms.js             # Algorithm data management
    ├── useMobileDetection.js        # Device detection logic
    └── useImageLoader.js            # Image loading with retry
```

## Critical Implementation Details

### 1. iPad Portrait Mode Support
The app uses `shouldUseMobileLayout` logic in MobileTabLayout.jsx:
```javascript
const shouldUseMobileLayout = isMobile || (isTablet && windowWidth <= 1024)
```
This ensures iPads in portrait orientation get the mobile tabbed interface.

### 2. Missing Move Images
- The app expects move images in `/public/images/moves/`
- Currently missing B moves (B, B', B2, Bw, Bw', Bw2)
- These are temporarily removed from `moves.json` to prevent broken images

### 3. Performance Optimizations
- Service worker for offline support
- Image lazy loading with retry logic
- Debounced resize handlers
- Version-based cache busting (not timestamp)

### 4. Security Considerations
- Content Security Policy (CSP) headers configured
- No console.log statements in production
- External links open in new tabs with proper security attributes
- Cross-origin images handled with anonymous CORS

## Common Development Tasks

### Adding New Algorithms
1. Edit `src/data/algorithms.json`
2. Add algorithm images to `/public/images/algorithms/[algorithm-id]-tutorial.png`
3. Add pattern images to `/public/images/patterns/[algorithm-id]-pattern.png`

### Testing Responsive Behavior
- **iPhone**: Use viewport ≤ 768px
- **iPad Portrait**: Use viewport 768px - 1024px
- **iPad Landscape/Desktop**: Use viewport > 1024px

### Build and Deployment
```bash
npm run build   # Production build
npm run dev     # Development server
npm run lint    # Run ESLint
```

## Known Issues & Solutions

### Visual Sequence Not Visible on iPad
- **Issue**: iPad portrait showed desktop layout
- **Solution**: Modified mobile detection to include tablets in portrait mode

### Bundle Size Optimization
- Current: ~292KB (79KB gzipped)
- For further optimization, implement code splitting with lazy loading

### Touch Targets
- All interactive elements meet 44px minimum for accessibility
- iPad gets 48-52px touch targets for better usability

## User's Development Patterns
Based on interactions, the user values:
1. **Production-ready code** - No debug statements, clean architecture
2. **Cross-device compatibility** - Especially iPad support
3. **Clean, minimal UI** - Removed GitHub button per request
4. **Robust error handling** - Graceful degradation for missing images
5. **Performance** - Optimized for mobile devices

## Future Enhancements to Consider
1. **Add B move images** to complete the move set
2. **Implement code splitting** to reduce initial bundle size
3. **Add PWA features** for app-like mobile experience
4. **Consider animation** for move transitions
5. **Add keyboard shortcuts** for desktop users

## Testing Checklist
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] iPhone (Safari, Chrome)
- [ ] iPad Portrait & Landscape (Safari, Chrome)
- [ ] Offline functionality with service worker
- [ ] Algorithm search and filtering
- [ ] Favorite/starring algorithms
- [ ] Image loading with slow connections

## Important Files to Review
1. `src/layouts/MobileTabLayout.jsx` - Core responsive logic
2. `src/hooks/useMobileDetection.js` - Device detection
3. `src/data/algorithms.json` - Algorithm database
4. `src/data/moves.json` - Move-to-image mapping
5. `vite.config.js` - Build configuration