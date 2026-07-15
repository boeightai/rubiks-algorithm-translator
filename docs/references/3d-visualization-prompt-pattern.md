# Design Reference: Cinematic 3D Tutorial Visualization

> Historical design research for Way of the Cube. This is not an approved implementation specification. Confirm every assumption against the current application before building from it.

**Original session context:** wayofthecube.com — planetary explorer UX mapped to the Rubik's Cube tutorial
**Inspiration source:** @DilumSanjaya on X (3D biological structures with planet-selector UX)

## Pattern summary

The concept maps a cinematic “planet explorer” interface onto the tutorial experience: beginner-method steps appear in a left navigation rail, the 3D cube animates into the center, and the visual notation sequence appears on the right.

### 1. Layout reference

```text
CSS Grid: [sidebar 220px] | [center flex-1] | [right panel 320px]
Full viewport height. No scrollbars. Everything fits in the screen.
```

The original concept used a dark cinematic palette such as `#0a0a0f` for the background and `#3b82f6` for the accent. Any implementation should first reconcile this direction with the current design system and child-friendly product goals.

### 2. Fly-in animation concept

```text
1. Move the cube off-screen to position.x = 12, opacity = 0, scale = 0.6.
2. Over 600ms easeOutCubic, animate to position.x = 0, opacity = 1, scale = 1.
3. Cross-fade the notation cards after a 300ms delay: opacity 0→1, translateY 10px→0.
```

Respect reduced-motion preferences and verify performance on iPhone and iPad before adopting this motion.

### 3. Three.js cube concept

```text
- 27 cubie meshes in a 3×3×3 grid with a small gap.
- Face colors: White(top), Yellow(bottom), Red(front), Orange(back), Blue(right), Green(left).
- Black cubie base with MeshStandardMaterial stickers per face.
- Ambient and directional lighting.
- Optional slow Y-axis rotation.
- On tutorial-step change, use the transition concept above.
```

The current application already contains `src/components/InteractiveCubeDemo.jsx`; extend or refactor that implementation instead of creating an unrelated second cube system.

Move animation concept:

```text
- Parse notation by spaces: "R U R' U'" → ["R", "U", "R'", "U'"]
- Rotate the appropriate layer 90°; use -90° for prime and 180° for a 2 suffix.
- Candidate duration: approximately 400ms per move.
- Face mapping: R=x>0.5, L=x<-0.5, U=y>0.5, D=y<-0.5, F=z>0.5, B=z<-0.5, M=|x|<0.5.
```

### 4. Visual move image mapping

Move assets live locally in `public/images/moves/` and are served from `/images/moves/`:

```js
function getMoveImageUrl(move) {
  return `/images/moves/${move.replace(/'/g, '-prime')}.png`;
}
```

Examples: `R` → `R.png`, `R'` → `R-prime.png`, and `R2` → `R2.png`. The authoritative token mapping remains `src/data/moves.json`; do not bypass it without a reason.

### 5. Historical tutorial-step concept

The following array was captured from an earlier state of the product and may not match the current tutorial curriculum:

```js
const STEPS = [
  { id: "daisy-edge-flipper", name: "Daisy Edge Flipper", phase: "Step 1 — The Daisy", notation: "F U' R" },
  { id: "white-corners-1", name: "Right Hand Algorithm", phase: "Step 2 — White Corners", notation: "R U R' U'" },
  { id: "white-corners-2", name: "Left Hand Algorithm", phase: "Step 3 — White Corners (Left)", notation: "L' U' L U" },
  { id: "utility-sledgehammer", name: "Sledgehammer", phase: "Step 4 — Sledgehammer", notation: "R' F R F'" },
  { id: "utility-left-sledgehammer", name: "Left Sledgehammer", phase: "Step 5 — Left Sledgehammer", notation: "L F' L' F" },
  { id: "second-layer-right", name: "Second Layer Right", phase: "Step 6 — Second Layer", notation: "U R U' R' U' F' U F" },
  { id: "second-layer-left", name: "Second Layer Left", phase: "Step 7 — Second Layer", notation: "U' L' U L U F U' F'" },
  { id: "ideal-case-right-edge", name: "Right Edge (Ideal)", phase: "Step 8 — F2L Ideal", notation: "U R U R' U'" },
  { id: "ideal-case-left-edge", name: "Left Edge (Ideal)", phase: "Step 9 — F2L Ideal", notation: "U' L' U' L U" },
  { id: "beginner-pll-edges", name: "Edge Permutation", phase: "Step 10 — Last Layer", notation: "R U' R F' R F R' F R F' R' F' R U R'" },
];
```

Use `src/data/tutorialAlgorithms.json` as the current source of truth rather than copying this data into a component.

### 6. Current integration points

- Framework: React 19 + Vite 7.
- Existing 3D component: `src/components/InteractiveCubeDemo.jsx`.
- Tutorial shell: `src/TutorialMode.jsx`.
- Tutorial navigation: `src/components/AlgorithmCarousel.jsx`.
- Visual sequence: `src/VisualSequence.jsx`.
- Tutorial data: `src/data/tutorialAlgorithms.json`.
- Shared styling: `src/styles/designSystem.js` and `src/index.css`.

### 7. Scope guardrails

Before implementation, explicitly identify:

- Which existing tutorial behavior is being replaced versus preserved.
- How the layout adapts to phones and iPad portrait/landscape.
- Reduced-motion behavior.
- Whether cube state must remain mathematically correct across animated moves.
- The visual and performance acceptance criteria.

Avoid unrelated changes to Explorer mode or the algorithm database during a tutorial redesign.

## General principle

For 3D rendering, animation, data, and asset work, use a specification-complete implementation brief. Unresolved ambiguity should be made explicit before code changes begin.
