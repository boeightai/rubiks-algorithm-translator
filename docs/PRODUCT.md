# Way of the Cube — Product Plan
Status: Active working plan. Algo (PM) on behalf of Bo. Bo owns vision; Algo turns it into plan and tasks.

## Vision
Public site where anyone learns to solve a Rubik's Cube using Bo's method (Bo's augmentation of the WIRED magazine beginner method). Core differentiator: Bo and Hailey's custom visual notation system — every algorithm letter move (R, R', U, U', F, F', etc.) has an image of a cube with an arrow so direction is instant, not decoded from text. Bo struggles mapping letters to hand movements, especially clockwise/counterclockwise, and built this for himself and visual learners including children.

Every solve step presents three layers: (1) the pattern on the cube that signals which algorithm to apply, (2) the algorithm in standard letter notation, (3) Bo's visual notation with move images underneath. Supplemental tips and tricks appear where relevant.

## Definition of Done — Public Launch
- Public-ready site at wayofthecube.com.
- Tutorial fully completed: step-by-step solve per docs/method-spec.md, helping any beginner solve the cube.
- Shop built as non-transacting UI only (no payments, pricing, shipping charges, taxes, or live checkout); Bo fulfills and ships sticker orders himself when he says to take money.
- Site safe for public use: security headers, no exposed env vars in client code, dependencies patched, no open admin or debug routes.
- No personal data (addresses, emails, payments) collected on the live site without Bo's yes.

## Solve Method (summary; full detail in docs/method-spec.md)

Skeleton follows the WIRED magazine beginner method.

Bo's augmentations:
1. Daisy edge flipper added to the yellow daisy step — Bo's personal addition, since many people get stuck on the daisy. Algorithm TBD from Bo.
2. Possible swap of the final edge-cycle PLL in Step 8.

Everything between tracks WIRED.

Steps:
1. Yellow daisy plus edge flipper
2. White cross
3. First layer via right/left triggers
4. Second layer
5. Yellow cross (fururf)
6. Yellow face (Sune)
7. Position corners (back half is Sune)
8. Position edges: clockwise/counterclockwise cycles — possible PLL swap point

Notes:
- Sune appears in both Step 6 and the back half of Step 7; Bo wants both.
- The daisy edge flipper may already exist in the explorer data under Utility.

## Visual Notation System

Designed by Bo and Hailey.

- Each move token maps to an image (cube + arrow) via `src/data/moves.json` and `public/images/moves/`.
- Pattern images live in `public/images/patterns/`. Only 5 algorithms have them now; goal: all.
- The explorer has 109 algorithms across Utility, F2L, OLL, and PLL, and already uses visual move cards and pattern images.
- Tutorial mode is a 10-card carousel via the header toggle — not yet a step-by-step solve.
- Target: the tutorial becomes the full WIRED-skeleton solve with Bo's three layers per step.

## Printable Cards (endgame, build last)

- 3x5 inch cards with the same three elements: pattern to look for, standard notation, visual notation.
- Print as stickers or cut-outs for a notebook quick reference.
- Bo made one or two already; they may exist on the site or elsewhere.
- Not in current launch scope.

## Shop

- Non-transacting UI for sticker products Bo fulfills and ships himself.
- No money until Bo says go.
- No domain purchases, paid plans, or spend.

## Open Decisions for Bo

- Exact daisy edge flipper algorithm.
- Whether to swap the Step 8 edge-cycle PLL, and with what.
- Tutorial structure details beyond the method spec.

## Tutorial Audit (2026-11-19)

Full visual inspection of the live tutorial at wayofthecube.com.

Current state: a 10-card carousel reached via the header toggle.

Every card has:
- An animated 3D cube with Play/Replay.
- A "Lesson n of 10" title.
- The generic line "Watch the cube, then follow the move cards below."
- A notation key, folded shut by default.
- A row of move images with arrows (F2 shows a red 2x).
- Ten unlabeled progress dots.

Findings:
- No card has tips or explanation.
- Only 4 cards have pattern images: Daisy Edge Flipper, Kite (fururf), Sune, T-Perm Setup.
- The second-layer cards mention which trigger they contain.
- All move images load.
- The 3D cube animation is on every card.
