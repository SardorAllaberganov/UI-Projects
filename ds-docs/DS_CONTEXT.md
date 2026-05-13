# DS Context — Mobile App Fintech DS

Figma file: `gSas2PBv3XMAXj36FQDhFa`
Last synced: 2026-05-13

## Consumer files

- **AsiaSend v.2** — `lG8fs0XBSkDeX9Jyxr43Tk`. First DS consumer.
  Phase 1 (Auth, 19 redesigned screens) landed 2026-04-23 — all
  instances are library-sourced, originals preserved beside `· DS`
  redesigns for diff. Plan + audit + key map under
  `D:\UI Projects\AsiaSend\Plans\`.

## Current state

A Figma-native mobile fintech design system for the Uzbekistan market.
The file spans four pages:

- **`17:2` Design System** — DS component masters, original on-canvas
  docs (45 section frames), Dark mode preview. This is the
  authoring surface — edit masters here.
- **`257:1357` DS Guide** — **consumption surface**. Cloned copies of
  the 45 doc sections, grouped by domain (Foundations · Actions ·
  Inputs & Controls · Display atoms · Navigation · Feedback & Status
  · Overlays · Patterns · Platform Chrome) under large domain
  headers. Cleaner scan; use this page to browse the system.
- **`162:833` Sample Screens** — composed mockups (Home · Light,
  Transfers · Light).
- **`197:863` Platform Chrome · iOS** — Apple UIKit reproductions
  (status bar, search bar, keyboard, home indicator). Separate from
  the DS palette — see
  [DS_COMPONENTS.md — iOS Platform Chrome](./DS_COMPONENTS.md#ios-platform-chrome).

Dark mode is wired through a two-mode Color collection, with a
Pattern B "full inversion" hero treatment for the Account Card and
Primary button.

- Currency: UZS (no `$`).
- Bottom nav uses the Uzbek fintech pattern: Home / Transfers /
  QR payment (centered FAB) / Payments / Monitoring.
- Typography is planned as Clash Display (display / title / numeric
  display) + Geologica (everything else). Clash Display styles are
  defined but rendering falls back to Geologica until a manual font
  swap is done — see [DS_LESSONS.md](./DS_LESSONS.md).

## Palette anchors

- **Brand** — `color/brand` → `red/500` `#D2222D`. Reserved for hero
  identity moments: logo mark, notification dot, Account Card brand dot.
- **Brand-secondary** — `color/brand-secondary` → `blue/500` `#438BFA`.
  The interactive accent layer: tertiary button text, active tab bar,
  switch track, checkbox fill, spinner, progress bar, "See all" links.
- **Surface-hero** — `color/surface-hero` → `stone/950` (Light) /
  `stone/50` (Dark). Drives the Primary button and Account Card
  (Pattern B full inversion).
- **State** — `positive` / `negative` / `warning` / `info` plus a
  `-subtle` companion each, for toasts, badges, helper text.

## Collections

| Collection | Modes | Variables |
|---|---|---|
| Primitives | Value | 69 (42 DS + 27 iOS) |
| Color | Light / Dark | 65 (29 DS + 36 iOS) |
| Spacing | Value | 10 |
| Radius | Value | 6 |

The iOS variables (prefix `ios/` for primitives, `color/ios-*` for
semantic) exist to reproduce Apple chrome (Status Bar, Keyboard,
Search Bar, Home Indicator) in mockups. They are separate from the DS
palette — app content should bind to `color/text-*`, `color/surface-*`,
`color/border-*`, not to `color/ios-*`.

Full catalog: [DS_TOKENS.md](./DS_TOKENS.md)

## Type scale

| Style | Font | Size / LH |
|---|---|---|
| display/xl | Clash Display Semibold | 48 / 52 |
| display/md | Clash Display Semibold | 36 / 40 |
| title/lg | Clash Display Semibold | 28 / 34 |
| title/md | Clash Display Semibold | 22 / 28 |
| title/sm | Geologica SemiBold | 18 / 24 |
| subtitle | Geologica Medium | 16 / 22 |
| body | Geologica Regular | 15 / 22 |
| body/sm | Geologica Regular | 13 / 18 |
| label | Geologica Medium | 13 / 18 |
| button | Geologica SemiBold | 15 / 20 |
| input-text | Geologica Regular | 16 / 22 |
| caption | Geologica Medium | 12 / 16 |
| overline | Geologica SemiBold | 11 / 14 (8% tracking, UPPER) |
| numeric/display | Clash Display Semibold | 36 / 40 |
| numeric/body | Geologica Medium | 15 / 22 |

## Component map

**34 component sets + 23 single components + 24 icons** total. 31 sets
and 22 single components live on the `Design System` page; 3 sets and
1 single component (`iOS Home Indicator`) live on `Platform Chrome ·
iOS`. Full reference: [DS_COMPONENTS.md](./DS_COMPONENTS.md)

**Sets (variant count) — Design System page:**
- Button (24) — Variant × Size × State
- Input (10) — Style (`Boxed` / `Bottom-lined`) × State
- PIN Dots (7) — Filled = 0..6
- Tab Bar (5) — Active tab
- Switch (2), Switch Row (4) — Label position × State
- Checkbox (3), Checkbox Row (6) — Label position × State
- Radio (2), Radio Row (4) — Label position × State
- Avatar (3) — Size; Badge (6) — Variant
- Toast (4) — Success/Info/Error/Warning
- Notification Banner (4) — Type
- Alert Dialog (2) — Warning/Destructive
- OTP Input (3), Spinner (3), Skeleton (3)
- Top Bar (3) — Screen/Brand/Large
- Chip (3) — State; Stepper (2) — State
- FAB (2) — Size; Card Visual (2) — Theme
- Amount Input (2) — State; App Numpad (2) — Layout
- Content Tabs (3) — Active; Pagination Dots (4) — Active
- Progress Steps (3) — Current; Slider (2) — State
- Accordion (2) — State; Receipt Row (2) — Variant

**Sets — Platform Chrome · iOS page:**
- iOS Status Bar (2) — Type
- iOS Keyboard (6) — Type × Dark Mode
- iOS Search Bar (4) — Type × Theme

**Single components — Design System page:**
Account Card, Transaction Row, Stat Card, Segmented Control, Divider,
List Item, Modal, Bottom Sheet (+ 3 Sheet Slots), Progress Bar,
Empty/Success/Error State, Tooltip, Dropdown Menu, Date Picker,
Section Header, Onboarding Slide, Card, Full-screen Loader.

**Single components — Platform Chrome · iOS page:** iOS Home Indicator.

## Known gotchas

Full log: [DS_LESSONS.md](./DS_LESSONS.md)

- **`explicitVariableModes` silently locks an instance's theme.** Always
  clear with `node.clearExplicitVariableModeForCollection(colorColl)` on
  the master after inversion-style bindings.
- **V-lookup drift.** When rebinding tokens in bulk, resolve by name at
  bind time (`allVars.find(v => v.name === 'color/...')`) — not via a
  pre-built object map, which has silently bound wrong tokens multiple
  times.
- **`resize()` resets sizing modes.** Resizing an auto-layout frame
  flips `primaryAxisSizingMode` to `FIXED`. Re-apply `AUTO` after.
- **Instance fill overrides survive master rebinds.** After changing a
  master fill binding, force-rebind each instance's fill explicitly.
- **Clash Display can't be loaded via `loadFontAsync`** in this env even
  though it's installed. Text styles keep the Clash intent for manual
  swap later.
