# Visual Notation System to Solve Rubik's Cubes

Copyright (C) 2025 Bo Nam

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

---

A modern React application for learning and practicing Rubik's Cube algorithms with visual notation translation. The app translates standard cube notation (like "R U R' U'") into visual move sequences using custom move images.

## 🚀 Features

### Core Functionality
- **Visual Notation Translation**: Converts algorithm notation to step-by-step visual move sequences
- **Pattern Recognition**: Automatically highlights Right Trigger (R U R' U') and Left Trigger (L' U' L U) patterns
- **Algorithm Database**: 123+ algorithms across multiple categories (Beginner, F2L, OLL, PLL, etc.)
- **Search & Filter**: Find algorithms by name, description, nickname, or category
- **Favorites System**: Star and filter favorite algorithms with localStorage persistence

### Visual Features
- **Move Images**: Each notation move (R, U', F2, etc.) displays as a visual cube move image
- **Tutorial Images**: Step-by-step tutorial images for specific algorithms
- **Pattern Images**: Recognition patterns to help identify algorithm cases
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, accessible interface with hover effects and smooth transitions

### Advanced Features
- **Alternative Names**: View and search by algorithm nicknames (e.g., "Sexy Move" for R U R' U')
- **Image Modal**: Zoom and view high-resolution tutorial images
- **Error Handling**: Graceful fallbacks for missing images or data
- **Performance Optimized**: Memoized components and efficient filtering

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with Vite
- **Styling**: Custom design system with Tailwind CSS
- **State Management**: React hooks (useState, useMemo, useCallback)
- **Data**: JSON-based algorithm and move mapping files
- **Build Tool**: Vite with React plugin
- **Linting**: ESLint with React-specific rules

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/boeightai/rubiks-algorithm-translator.git
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
│   └── ui/                    # Reusable UI components
├── hooks/               # Custom React hooks
│   ├── useAlgorithms.js       # Algorithm data management
│   ├── useFavorites.js        # Favorites persistence
│   └── useTutorialImage.js    # Image loading logic
├── data/                # Static data files
│   ├── algorithms.json        # Algorithm database (123+ entries)
│   └── moves.json            # Move notation to image mapping
├── layouts/             # Layout components
│   └── GridLayout.jsx        # Main application layout
├── styles/              # Design system
│   └── designSystem.js       # Colors, typography, spacing
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
  "R2": "/images/moves/R2.png"
}
```

## 🎯 Key Components

### VisualSequence.jsx
- **Core translation engine** that converts notation strings to visual sequences
- **Pattern detection** for Right/Left Trigger algorithms
- **Visual highlighting** of recognized patterns
- **Fallback handling** for missing move images

### AlgorithmSelectorRefactored.jsx
- **Main orchestrator** managing all application state
- **Coordinates** search, filtering, selection, and display
- **Responsive layout** with left sidebar and right detail panel

### Custom Hooks
- **useAlgorithms**: Manages algorithm data, filtering, and search
- **useFavorites**: Handles favorite persistence in localStorage
- **useTutorialImage**: Loads and manages tutorial/pattern images

## 🎨 Design System

The application uses a comprehensive design system with:
- **Color palette**: Primary, neutral, success, warning, and info colors
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 4px base unit system
- **Shadows**: Multiple elevation levels
- **Transitions**: Smooth animations and hover effects

## 📱 Responsive Design

- **Desktop**: Two-column layout with sticky sidebar
- **Tablet**: Stacked layout with optimized spacing
- **Mobile**: Single-column layout with touch-friendly controls

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Public Assets

- **Move Images**: `/public/images/moves/` - Visual representations of cube moves
- **Pattern Images**: `/public/images/patterns/` - Recognition patterns for algorithms
- **Tutorial Images**: `/public/images/moves/` - Step-by-step tutorials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/boeightai/rubiks-algorithm-translator)
- [Issue Tracker](https://github.com/boeightai/rubiks-algorithm-translator/issues)

---

**Happy Solving! 🧩**