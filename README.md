# Visual Notation System to Solve Rubik's Cubes

A fast, modern app for learning and practicing Rubik's Cube algorithms with visual notation.

## Features
- Browse and search algorithms by name, description, or category
- See step-by-step visual move sequences
- Mark favorites and filter to show only starred algorithms
- View alternative names in the header
- Responsive, clean UI

## Quick Start
1. Clone: `git clone https://github.com/boeightai/rubiks-algorithm-translator.git`
2. Install: `npm install`
3. Run: `npm run dev`
4. Open: [http://localhost:5173](http://localhost:5173)

## Data Format
Each algorithm:
```json
{
  "id": "unique-id",
  "name": "Algorithm Name",
  "notation": "R U R' U'",
  "category": "Category",
  "description": "What it does",
  "nicknames": ["Alt Name 1", "Alt Name 2"]
}
```

## Recent Updates
- App renamed to "Visual Notation System to Solve Rubik's Cubes"
- Alternative names now in header
- Favorites button below filter, right-aligned
- Improved scroll area padding
- Updated nicknames for Right/Left Hand Algorithms

## Links
- [GitHub](https://github.com/boeightai/rubiks-algorithm-translator)
- [Issues](https://github.com/boeightai/rubiks-algorithm-translator/issues)

---
**Happy Solving! 🧩**

<!-- Testing VS Code connection -->