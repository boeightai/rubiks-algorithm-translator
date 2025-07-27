# Rubik's Cube Algorithm Translator

A modern React application for learning and practicing Rubik's Cube algorithms with visual notation translation. The app translates standard cube notation (like "R U R' U'") into visual move sequences using custom move images.

**🌐 Live Application**: [www.wayofthecube.com](https://www.wayofthecube.com)

## 🧩 Rubik's Cube Notation System

### Standard Notation Conventions

The application uses the **WCA (World Cube Association) standard notation** for Rubik's Cube moves. This notation system is universally recognized by speedcubers and is essential for understanding algorithm documentation.

#### Basic Face Moves
- **R** = Right face clockwise (90°)
- **R'** = Right face counter-clockwise (90°) - Note: The apostrophe (') indicates "Prime" or inverse
- **R2** = Right face 180° rotation
- **L** = Left face clockwise (90°)
- **L'** = Left face counter-clockwise (90°)
- **L2** = Left face 180° rotation
- **U** = Up face clockwise (90°)
- **U'** = Up face counter-clockwise (90°)
- **U2** = Up face 180° rotation
- **D** = Down face clockwise (90°)
- **D'** = Down face counter-clockwise (90°)
- **D2** = Down face 180° rotation
- **F** = Front face clockwise (90°)
- **F'** = Front face counter-clockwise (90°)
- **F2** = Front face 180° rotation
- **B** = Back face clockwise (90°) - Note: B moves are less common in algorithms

#### Wide Moves (Slice Moves)
- **Rw** = Right wide move (R + M slice together)
- **Rw'** = Right wide move counter-clockwise
- **Rw2** = Right wide move 180°
- **Lw** = Left wide move (L + M slice together)
- **Lw'** = Left wide move counter-clockwise
- **Lw2** = Left wide move 180°
- **Uw** = Up wide move (U + E slice together)
- **Uw'** = Up wide move counter-clockwise
- **Uw2** = Up wide move 180°
- **Dw** = Down wide move (D + E slice together)
- **Dw'** = Down wide move counter-clockwise
- **Dw2** = Down wide move 180°
- **Fw** = Front wide move (F + S slice together)
- **Fw'** = Front wide move counter-clockwise
- **Fw2** = Front wide move 180°

#### Middle Layer Moves
- **M** = Middle slice (between L and R faces) in the same direction as L
- **M'** = Middle slice counter-clockwise
- **M2** = Middle slice 180°

#### Lowercase Notation Conversion
The application automatically converts lowercase notation to wide moves for clarity:
- **r** → **Rw** (Right wide move)
- **r'** → **Rw'** (Right wide move prime)
- **r2** → **Rw2** (Right wide move 180°)
- **l** → **Lw** (Left wide move)
- **l'** → **Lw'** (Left wide move prime)
- **l2** → **Lw2** (Left wide move 180°)
- **u** → **Uw** (Up wide move)
- **u'** → **Uw'** (Up wide move prime)
- **u2** → **Uw2** (Up wide move 180°)
- **d** → **Dw** (Down wide move)
- **d'** → **Dw'** (Down wide move prime)
- **d2** → **Dw2** (Down wide move 180°)
- **f** → **Fw** (Front wide move)
- **f'** → **Fw'** (Front wide move prime)
- **f2** → **Fw2** (Front wide move 180°)

### Algorithm Categories and Examples

#### Beginner Algorithms
**White Cross Formation:**
- `F D R F' D'` - Basic white cross edge placement
- `R D' R' D` - Alternative white cross method

**Corner Insertion (First Layer):**
- `R U R' U'` - **Right Trigger** (also known as "Sexy Move")
- `L' U' L U` - **Left Trigger** (left-handed version)

**Second Layer (F2L):**
- `U R U' R' U' F' U F` - Right edge insertion
- `U' L' U L U F U' F'` - Left edge insertion

#### Advanced Algorithms

**OLL (Orientation of Last Layer):**
- `F R U R' U' F'` - OLL Cross formation
- `R U R' U R U2 R'` - **Sune** (corner orientation)
- `R' U' R U' R' U2 R` - **Anti-Sune** (inverse Sune)

**PLL (Permutation of Last Layer):**
- `R' F R' B2 R F' R' B2 R2` - Corner permutation
- `M2 U M2 U2 M2 U M2` - Edge permutation (U-perm)

**F2L (First Two Layers):**
- `R U' R'` - Basic F2L insertion
- `F' U F` - Alternative F2L insertion
- `R U R' U' R U R'` - F2L with setup moves

### Pattern Recognition System

The application automatically detects and highlights common algorithm patterns:

#### Right Trigger Pattern: `R U R' U'`
- **Visual Highlighting**: Moves are highlighted in green
- **Purpose**: Corner insertion and orientation
- **Variations**: Can be repeated multiple times in sequences

#### Left Trigger Pattern: `L' U' L U`
- **Visual Highlighting**: Moves are highlighted in blue
- **Purpose**: Left-handed corner manipulation
- **Usage**: Often used in mirror algorithms

### Notation Parsing and Display

The application processes algorithm notation through several steps:

1. **String Parsing**: Notation strings are split by spaces into individual moves
2. **Move Validation**: Each move is checked against the moves.json mapping
3. **Visual Translation**: Each move is converted to its corresponding image
4. **Pattern Detection**: Right and Left Trigger patterns are identified and highlighted
5. **Fallback Handling**: Missing moves display as text with warning styling

### Algorithm Database Structure

The application contains **127 algorithms** across multiple categories:

```json
{
  "id": "unique-identifier",
  "name": "Algorithm Name",
  "notation": "R U R' U'",
  "category": "Beginner Corners",
  "difficulty": "beginner",
  "description": "What the algorithm does",
  "nicknames": ["Right Trigger", "Sexy Move"]
}
```

**Categories Include:**
- Beginner Cross
- Beginner Corners
- Beginner F2L
- Beginner OLL
- Beginner PLL
- F2L (First Two Layers)
- OLL (Orientation of Last Layer)
- PLL (Permutation of Last Layer)
- Advanced Techniques

## 🚀 Features

### Core Functionality
- **Visual Notation Translation**: Converts algorithm notation to step-by-step visual move sequences
- **Pattern Recognition**: Automatically highlights Right Trigger (R U R' U') and Left Trigger (L' U' L U) patterns
- **Algorithm Database**: 127 algorithms across multiple categories (Beginner, F2L, OLL, PLL, etc.)
- **Search & Filter**: Find algorithms by name, description, nickname, or category
- **Favorites System**: Star and filter favorite algorithms with localStorage persistence
- **Wired System**: Highlights algorithms from Wired Magazine's popular solving method for quick reference

### Visual Features
- **Move Images**: Each notation move (R, U', F2, etc.) displays as a visual cube move image
- **Tutorial Images**: Step-by-step tutorial images for specific algorithms
- **Pattern Images**: Recognition patterns to help identify algorithm cases
- **Image Modal**: Zoom and view high-resolution tutorial and pattern images
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, accessible interface with hover effects and smooth transitions

### Advanced Features
- **Alternative Names**: View and search by algorithm nicknames (e.g., "Sexy Move" for R U R' U')
- **Error Handling**: Graceful fallbacks for missing images or data with ErrorBoundary
- **Performance Optimized**: Memoized components and efficient filtering
- **Accessibility**: Proper focus management, keyboard navigation, and screen reader support
- **Mobile Tab Layout**: Optimized mobile experience with tabbed navigation

### Wired Magazine Method Support
The "Wired" tagging system highlights algorithms that are specifically used in Wired Magazine's popular YouTube video and blog post demonstrating one method of solving the Rubik's Cube. This feature serves as a quick reference for users who are learning through Wired Magazine's methodology, which is one of the most popular ways people learn to solve the cube. While this method is widely used, it's important to note that it's just one of many valid approaches to solving the Rubik's Cube. The Wired tag helps users quickly identify and filter algorithms that are part of this specific learning method.

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with Vite
- **Styling**: Custom CSS with responsive design system
- **State Management**: React hooks (useState, useMemo, useCallback)
- **Data**: JSON-based algorithm and move mapping files
- **Build Tool**: Vite with React plugin
- **Linting**: ESLint with React-specific rules
- **Analytics**: Vercel Analytics for usage insights
- **License**: GNU General Public License v3.0

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/boeightai/rubiks-translator.git
   cd rubiks-translator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: [http://localhost:5173](http://localhost:5173)

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── AlgorithmDetails.jsx    # Algorithm information display
│   ├── AlgorithmList.jsx       # Algorithm selection list
│   ├── SearchFilters.jsx       # Search and filter controls
│   ├── Header.jsx             # Application header
│   ├── ErrorBoundary.jsx      # Error handling component
│   └── ui/                    # Reusable UI components
│       ├── ImageModal.jsx     # Image zoom modal
│       ├── StarButton.jsx     # Favorite toggle button
│       ├── StarIcon.jsx       # Star icon component
│       ├── TabNavigation.jsx  # Mobile tab navigation
│       └── WiredButton.jsx    # Wired method algorithm toggle
├── hooks/               # Custom React hooks
│   ├── useAlgorithms.js       # Algorithm data management
│   ├── useFavorites.js        # Favorites persistence
│   ├── useTutorialImage.js    # Image loading logic
│   ├── useWired.js           # Wired method algorithm management
│   ├── useMobileDetection.js  # Mobile device detection
│   └── useImageLoader.js      # Image loading with retry logic
├── data/                # Static data files
│   ├── algorithms.json        # Algorithm database (127 entries)
│   └── moves.json            # Move notation to image mapping
├── layouts/             # Layout components
│   └── MobileTabLayout.jsx   # Mobile-optimized layout
├── styles/              # Design system
│   └── designSystem.js       # Colors, typography, spacing
├── utils/               # Utility functions
│   └── performance.js        # Performance optimization utilities
├── VisualSequence.jsx   # Core visual translation engine
├── AlgorithmSelectorRefactored.jsx  # Main orchestrator component
└── App.jsx              # Root application component
```

## 📊 Data Format

### Algorithm Structure
```json
{
  "id": "unique-identifier",
  "name": "Algorithm Name",
  "notation": "R U R' U'",
  "category": "Beginner Corners",
  "difficulty": "beginner",
  "description": "What the algorithm does",
  "nicknames": ["Alternative Name 1", "Alternative Name 2"]
}
```

### Move Mapping
```json
{
  "R": "/images/moves/R.png",
  "R'": "/images/moves/R-prime.png",
  "R2": "/images/moves/R2.png",
  "r": "/images/moves/Rw.png",
  "r'": "/images/moves/Rw-prime.png",
  "r2": "/images/moves/Rw2.png"
}
```

## 🎯 Key Components

### VisualSequence.jsx
- **Core translation engine** that converts notation strings to visual sequences
- **Pattern detection** for Right/Left Trigger algorithms with visual highlighting
- **Fallback handling** for missing move images
- **Responsive design** with optimized mobile layout

### AlgorithmSelectorRefactored.jsx
- **Main orchestrator** managing all application state
- **Coordinates** search, filtering, selection, and display
- **Responsive layout** with mobile tab navigation

### Custom Hooks
- **useAlgorithms**: Manages algorithm data, filtering, and search with memoization
- **useFavorites**: Handles favorite persistence in localStorage with error handling
- **useWired**: Manages Wired Magazine method algorithm state and persistence
- **useTutorialImage**: Loads and manages tutorial/pattern images with fallbacks
- **useMobileDetection**: Detects mobile devices for responsive behavior
- **useImageLoader**: Handles image loading with retry logic and error handling

### ErrorBoundary.jsx
- **Graceful error handling** for component failures
- **User-friendly error messages** with recovery options
- **Prevents app crashes** and maintains user experience

## 🎨 Design System

The application uses a comprehensive design system with:
- **Color palette**: Primary, neutral, success, warning, and info colors
- **Typography**: Inter font family with consistent sizing and spacing
- **Spacing**: 4px base unit system for consistent layouts
- **Shadows**: Multiple elevation levels for depth
- **Transitions**: Smooth animations and hover effects
- **Responsive breakpoints**: Mobile-first design approach

## 📱 Responsive Design

- **Desktop**: Two-column layout with sticky sidebar and optimized spacing
- **Tablet**: Stacked layout with touch-friendly controls
- **Mobile**: Single-column layout with tabbed navigation and optimized touch targets (44px minimum)
- **Accessibility**: Proper focus management and keyboard navigation

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint for code quality
```

## 📁 Public Assets

- **Move Images**: `/public/images/moves/` - Visual representations of cube moves
- **Pattern Images**: `/public/images/patterns/` - Recognition patterns for algorithms
- **Tutorial Images**: `/public/images/moves/` - Step-by-step tutorials

## 🔒 License Compliance

This project is fully compliant with the GNU General Public License v3.0:
- All source files include proper GPL v3 headers
- Copyright notices are present in all components
- License terms are clearly stated in the LICENSE file
- No proprietary dependencies are included

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper GPL v3 headers
4. Test thoroughly with `npm run lint` and `npm run build`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Application](https://www.wayofthecube.com)
- [GitHub Repository](https://github.com/boeightai/rubiks-translator)
- [Issue Tracker](https://github.com/boeightai/rubiks-translator/issues)
- [GNU GPL v3 License](https://www.gnu.org/licenses/gpl-3.0.html)

---

**Happy Solving! 🧩**