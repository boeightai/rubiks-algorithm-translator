# Rubik's Cube Algorithm Translator

A visual learning tool that translates Rubik's Cube notation into step-by-step visual move sequences, making algorithm learning more intuitive and accessible.

**🌐 Live Application**: [www.wayofthecube.com](https://www.wayofthecube.com)

## 👨‍👧 Our Story

This project is a father-daughter collaboration between **Bo and Hailey**, born from our shared love of solving Rubik's cubes. We found traditional cube notation (like "R U R' U'") difficult to memorize, so we created this visual translation system that converts standard notation into easy-to-follow visual sequences.

Our goal is to help people who struggle with standard notation learn to solve Rubik's cubes through visual learning. This application serves both as a learning tool for the cubing community and as our journey into coding together.

## 🚀 Features

### Core Functionality
- **Visual Notation Translation**: Converts standard cube notation to visual move sequences
- **Pattern Recognition**: Highlights common patterns like Right Trigger (R U R' U') and Left Trigger (L' U' L U)
- **Algorithm Database**: 126 algorithms across all solving stages
- **Search & Filter**: Find algorithms by name, notation, category, or nickname
- **Favorites System**: Star and save your favorite algorithms
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Visual Learning
- **Move Images**: Each notation displays as a visual cube move
- **Tutorial Images**: Step-by-step visual guides for complex algorithms
- **Pattern Images**: Visual patterns to help identify algorithm cases
- **Mobile-Optimized**: Touch-friendly interface with tabbed navigation on mobile devices

## 🧩 Understanding Cube Notation

### Basic Moves
- **R** = Right face clockwise
- **R'** = Right face counter-clockwise (prime)
- **R2** = Right face 180°
- **L**, **U**, **D**, **F** = Left, Up, Down, Front faces
- **M** = Middle slice (between L and R)

### Wide Moves
- **Rw** or **r** = Right wide move (two layers)
- **Lw** or **l** = Left wide move
- **Uw** or **u** = Up wide move
- Similar patterns for all faces

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite
- **Styling**: Custom CSS with responsive design
- **State Management**: React hooks
- **Data**: JSON-based algorithm database
- **Hosting**: Vercel with analytics

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/boeightai/rubiks-translator.git
cd rubiks-translator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── AlgorithmDetails.jsx
│   ├── AlgorithmList.jsx
│   ├── SearchFilters.jsx
│   ├── Header.jsx
│   ├── AboutModal.jsx
│   ├── ErrorBoundary.jsx
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── data/              # Algorithm and move data
│   ├── algorithms.json
│   └── moves.json
├── layouts/           # Layout components
├── styles/            # Design system
├── VisualSequence.jsx # Core translation engine
└── AlgorithmSelectorRefactored.jsx # Main component

public/
└── images/
    ├── moves/         # Visual representations of cube moves
    ├── patterns/      # Algorithm recognition patterns
    └── icons/         # Application icons
```

## 🤝 Contributing

We welcome contributions from both developers and cubers! Whether you want to:
- Add new algorithms
- Improve the visual design
- Enhance mobile experience
- Fix bugs or improve performance
- Suggest new features

Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Application](https://www.wayofthecube.com)
- [GitHub Repository](https://github.com/boeightai/rubiks-translator)
- [Issue Tracker](https://github.com/boeightai/rubiks-translator/issues)

---

**Happy Solving! 🧩**