# Way of the Cube — Project Context

## Canonical locations

- **Local working project:** `/Users/overwatch/Documents/AI OS/Skunkworks/Way of the Cube`
- **GitHub:** https://github.com/boeightai/rubiks-algorithm-translator
- **Production:** https://www.wayofthecube.com
- **Vercel project:** `rubiks-algorithm-translator`
- **Default branch:** `main`

This folder is the source of truth for local product work, project documentation, and reference material. Future product and feature work should begin here.

The surrounding AI OS folder is synchronized with Syncthing, but AI OS intentionally ignores `.git` directories. The working files and documentation can synchronize, while each additional development machine should create or maintain its own Git checkout metadata rather than syncing `.git`.

## What it is

Way of the Cube is an ongoing project created by Bo and Hailey to help children and visual learners understand Rubik's Cube algorithms. It translates standard notation such as `R`, `U`, and `F` into step-by-step visual move sequences using their custom visual notation system.

The application currently provides:

- A guided tutorial mode for beginner algorithms.
- An explorer containing 109 Utility, F2L, OLL, and PLL algorithms.
- Visual move cards and pattern images.
- A Three.js interactive cube demonstration.
- Responsive layouts for desktop, iPhone, and iPad.
- PWA and offline support through a service worker.

## Technology and deployment

- React 19
- Vite 7
- Three.js
- Vercel Analytics
- Vercel deployment connected to the GitHub repository
- No required environment variables

Before a production deployment, update the service-worker cache version and build:

```bash
npm run update-version
npm run build
```

The intended Vercel build command is:

```bash
npm run update-version && npm run build
```

## Important project files

- `AGENTS.md` — authoritative product and engineering guidance for coding agents.
- `README.md` — public project overview and development instructions.
- `src/AppWithModes.jsx` — Explorer/Tutorial mode switching.
- `src/TutorialMode.jsx` — guided tutorial experience.
- `src/VisualSequence.jsx` — visual notation sequence rendering.
- `src/components/InteractiveCubeDemo.jsx` — Three.js cube.
- `src/data/algorithms.json` — main algorithm database.
- `src/data/tutorialAlgorithms.json` — tutorial curriculum.
- `src/data/moves.json` — move-token-to-image mapping.
- `public/images/moves/` — visual move assets.
- `public/images/patterns/` — pattern assets.
- `public/sw.js` — offline cache behavior.

## Current status

The product is active and deployed. On 2026-07-15, the canonical local checkout was established in AI OS/Skunkworks from `main` at commit `bcd2229` (`Fix repo hygiene and service worker cache`).

Feature priorities and product changes will be scoped after this housekeeping pass. Historical notes described the project as blocked, but those notes predated access to the repository and are no longer the current status.

## Design reference

The earlier cinematic “planet explorer” concept for the tutorial experience is retained at:

- `docs/references/3d-visualization-prompt-pattern.md`

Treat it as design research, not an approved implementation specification. Validate its assumptions against the current code before using it.

## External reference

- Browser-based solver/trainer: https://jeffhuber.github.io/rubiks-solver
- Reference code: https://github.com/jeffhuber/rubiks-solver
- Original reference captured: 2026-04-26

## Project history

- Built by Bo and Hailey around their visual notation system.
- First captured in local project notes on 2026-04-26.
- Canonical GitHub repository identified and local AI OS workspace established on 2026-07-15.
