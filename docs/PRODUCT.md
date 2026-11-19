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
