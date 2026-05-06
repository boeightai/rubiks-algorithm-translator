# Agent Guide: Rubik's Visual Notation Tutor

## Product Goal

This React/Vite website helps kids learn to solve Rubik's cubes using a custom visual notation system developed by Bo and his daughter. The app should make cube algorithms easier to understand through images, patterns, and step-by-step visual sequences instead of relying only on traditional letter notation.

Prioritize clarity, approachability, and cross-device usability. The experience should work well for children and parents on desktop browsers, iPhones, and iPads.

## Current Architecture

```
src/
├── main.jsx                         # App bootstrap, theme setup, service worker registration
├── AppWithModes.jsx                 # Switches between explorer and tutorial modes
├── AlgorithmSelectorRefactored.jsx  # Explorer mode: search, filter, select, favorite algorithms
├── TutorialMode.jsx                 # Tutorial mode: video, carousel, pattern displays
├── VisualSequence.jsx               # Converts algorithm notation into visual move cards
├── components/
│   ├── Header.jsx                   # Title, theme toggle, about modal, mode toggle
│   ├── AlgorithmList.jsx            # Search result cards with pattern previews
│   ├── AlgorithmDetails.jsx         # Selected algorithm details and images
│   ├── AlgorithmCarousel.jsx        # Tutorial mode algorithm navigation
│   ├── PatternDisplay.jsx           # Pattern image rendering
│   └── ui/                          # Shared UI pieces
├── hooks/
│   ├── useAlgorithms.js             # Algorithm filtering and selection state
│   ├── useFavorites.js              # Favorite algorithms in localStorage
│   ├── useMobileDetection.js        # Device/orientation detection
│   └── useTutorialImage.js          # Tutorial and pattern image existence checks
└── data/
    ├── algorithms.json              # Main explorer algorithm database
    ├── tutorialAlgorithms.json      # Tutorial mode algorithm list
    └── moves.json                   # Move token to image path mapping
```

## Important Behavior

- Desktop explorer mode uses a two-column layout: algorithm list plus selected algorithm details/visual sequence.
- Phones and iPad portrait use a tabbed layout with `Algorithms` and `Visual Sequence`.
- iPad portrait handling lives in `src/layouts/MobileTabLayout.jsx`; keep orientation-aware logic intact.
- Tutorial mode uses `src/TutorialMode.jsx`, `src/data/tutorialAlgorithms.json`, YouTube embed content, and pattern images.
- The app stores mode, theme, and favorites in `localStorage`.

## Assets And Data

- Move images live in `public/images/moves/` and are referenced as `/images/moves/...`.
- Tutorial images currently also live in `public/images/moves/` and are loaded as `/images/moves/[algorithm-id]-tutorial.png`.
- Pattern images live in `public/images/patterns/` and are loaded as `/images/patterns/[algorithm-id]-pattern.png`.
- Additional pattern images can be declared per algorithm in `algorithms.json` with `additionalPatterns`.
- `B`, `B'`, `B2`, `Bw`, `Bw'`, and `Bw2` move images are currently missing and intentionally omitted from `moves.json`.

When adding an algorithm:

1. Add or update the entry in `src/data/algorithms.json`.
2. If it belongs in tutorial mode, also update `src/data/tutorialAlgorithms.json`.
3. Add any available tutorial image to `public/images/moves/[algorithm-id]-tutorial.png`.
4. Add any available pattern image to `public/images/patterns/[algorithm-id]-pattern.png`.
5. Ensure every move token in the notation exists in `src/data/moves.json`.

## Development Commands

```bash
npm run dev      # Start Vite development server
npm run lint     # Run ESLint
npm run build    # Build production assets
npm run preview  # Preview production build locally
```

Before deployment, update the service worker cache version:

```bash
npm run update-version
npm run build
```

For Vercel, the intended build command is:

```bash
npm run update-version && npm run build
```

## Service Worker And Caching

- `public/sw.js` uses a versioned cache name, currently maintained by `update-sw-version.js`.
- `src/main.jsx` registers the service worker only outside localhost/127.0.0.1.
- New workers call `SKIP_WAITING` and trigger a reload when an update is detected.
- Vite outputs hashed JS/CSS/assets for cache busting.

Be careful when changing cached files or asset paths. A stale service worker can make production debugging misleading unless the cache version changes.

## Security And Production Notes

- CSP is configured in `index.html` through a meta tag.
- Local dev security headers are configured in `vite.config.js`; production headers depend on the hosting platform.
- Production builds use Terser with `drop_console` and `drop_debugger`.
- External links should use `target="_blank"` with `rel="noopener noreferrer"`.
- Sanitize user-controlled or data-derived path fragments before using them in image URLs.

## Design And UX Priorities

- The target audience includes kids learning cube solving, so visual clarity matters more than dense notation.
- Keep UI clean, minimal, and friendly without turning the app into a marketing page.
- Maintain strong mobile and iPad support; all important controls should be touch-friendly.
- Prefer existing design tokens from `src/styles/designSystem.js`.
- Avoid introducing unrelated UI frameworks or broad rewrites unless there is a clear need.
- When changing layout or image behavior, test desktop, iPhone-size, and iPad portrait/landscape viewports.

## Verification Checklist

For meaningful changes, run:

```bash
npm run lint
npm run build
```

For UI/layout changes, also verify:

- Desktop explorer layout.
- Phone portrait tabbed layout.
- iPad portrait tabbed layout.
- iPad landscape/desktop-style layout.
- Tutorial mode carousel and pattern display.
- Image loading for selected algorithms and visual move sequences.
