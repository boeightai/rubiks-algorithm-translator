# Rubik's Cube Algorithm Translator

A modern, interactive web application for learning and practicing Rubik's Cube algorithms with visual notation and step-by-step move sequences.

## 🎯 Features

### Core Functionality
- **Interactive Algorithm Browser**: Browse through a comprehensive collection of Rubik's Cube algorithms
- **Visual Move Sequences**: See each algorithm broken down into individual moves with visual representations
- **Search & Filter**: Find algorithms by name, description, or category
- **Favorites System**: Save and organize your favorite algorithms
- **Tutorial Images**: Visual guides for complex algorithms (where available)

### Algorithm Categories
- **Beginner Cross**: White cross formation algorithms
- **Beginner Corners**: Basic corner insertion techniques
- **Beginner F2L**: First two layers solving methods
- **Beginner OLL**: Orientation of Last Layer for beginners
- **Beginner PLL**: Permutation of Last Layer for beginners
- **F2L**: Advanced First Two Layers techniques
- **OLL**: Orientation of Last Layer (full set)
- **2-Look OLL**: Simplified OLL using two steps
- **PLL**: Permutation of Last Layer (full set)

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with consistent design system
- **Real-time Search**: Instant filtering as you type
- **Category Filtering**: Filter algorithms by solving method
- **Favorites Toggle**: Show only your saved algorithms
- **Visual Feedback**: Clear indication of selected algorithms

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/boeightai/rubiks-algorithm-translator.git
   cd rubiks-algorithm-translator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📖 Usage

### Browsing Algorithms
1. **Select an Algorithm**: Click on any algorithm from the left sidebar
2. **View Details**: See the algorithm name, category, description, and notation
3. **Visual Sequence**: Scroll down to see the step-by-step visual representation
4. **Tutorial Images**: Some algorithms include tutorial images for additional guidance

### Searching and Filtering
- **Search Bar**: Type to search by algorithm name, description, or nicknames
- **Category Filter**: Use the dropdown to filter by solving method
- **Favorites Only**: Toggle to show only your saved algorithms

### Managing Favorites
- **Star Button**: Click the star icon next to any algorithm to add/remove from favorites
- **Favorites View**: Use the "Show Favorites Only" toggle to view your saved algorithms
- **Persistent Storage**: Your favorites are automatically saved to local storage

## 🏗️ Project Structure

```
rubiks-translator/
├── public/
│   └── images/
│       └── moves/          # Visual representations of cube moves
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI components (buttons, icons)
│   │   ├── AlgorithmDetails.jsx
│   │   ├── AlgorithmList.jsx
│   │   ├── Header.jsx
│   │   └── SearchFilters.jsx
│   ├── data/              # Static data files
│   │   ├── algorithms.json # Algorithm definitions
│   │   └── moves.json     # Move image mappings
│   ├── hooks/             # Custom React hooks
│   │   ├── useAlgorithms.js
│   │   ├── useFavorites.js
│   │   └── useTutorialImage.js
│   ├── layouts/           # Layout components
│   │   └── GridLayout.jsx
│   ├── styles/            # Design system and styling
│   │   └── designSystem.js
│   ├── App.jsx            # Main application component
│   ├── AlgorithmSelectorRefactored.jsx # Main algorithm selector
│   └── VisualSequence.jsx # Visual move sequence component
├── package.json
└── README.md
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Custom design system with inline styles
- **State Management**: React hooks and local storage
- **Development**: ESLint for code quality

## 📝 Algorithm Data Format

Each algorithm in the database includes:

```json
{
  "id": "unique-identifier",
  "name": "Algorithm Name",
  "notation": "R U R' U'",
  "category": "Category Name",
  "difficulty": "beginner|intermediate|advanced",
  "description": "Brief description of what the algorithm does",
  "nicknames": ["Alternative Name 1", "Alternative Name 2"]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Algorithms

To add new algorithms, edit the `src/data/algorithms.json` file following the existing format. Make sure to:
- Use a unique ID
- Provide clear notation
- Categorize appropriately
- Include helpful descriptions
- Add relevant nicknames if applicable

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Rubik's Cube community for algorithm documentation
- Speedcubing community for move notation standards
- React and Vite teams for excellent development tools

## 🔗 Links

- **Live Demo**: [Add your deployed URL here]
- **GitHub Repository**: https://github.com/boeightai/rubiks-algorithm-translator
- **Issues**: https://github.com/boeightai/rubiks-algorithm-translator/issues

---

**Happy Solving! 🧩**
