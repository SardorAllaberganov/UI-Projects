# DS History

Per-session checkpoint of the Figma design system build. Newest entry
at the top. One entry per sync session — not per `use_figma` call.
Triggered by `/ds_sync`.

---

## 2026-05-13 — Full inventory re-sync · catching up 3 weeks of drift

**Area:** all (tokens + components + docs)

First `/ds_sync` since 2026-04-23. The previous `.inventory-last.json`
checkpoint reflected the DS as of Apr 23, but the canvas had moved
forward in two batches — large additions Apr 24 (the "critical-gap"
components + iOS Platform Chrome page) and incremental polish since.

**Diff vs. 2026-04-23 inventory:**

Tokens — no rebinds, no removals. Added:
- **+27 primitives** (all `ios/*` — Apple system color anchors)
- **+36 color tokens** (all `color/ios/*` — semantic Apple chrome)
- **+1 radius**: `radius/xs = 4`
- No spacing, text-style, or effect-style changes.

Component sets — 14 → 34 (+20):
- **Inputs & Controls (10):** Radio, Radio Row, Chip, Stepper, Slider,
  Amount Input, App Numpad, Date Picker (single component), Content
  Tabs, Pagination Dots.
- **Feedback (3):** Alert Dialog, Notification Banner, Progress Steps.
- **Display (3):** Card Visual, Receipt Row, PIN Dots.
- **Pattern atoms (1):** Accordion, FAB.
- **iOS Platform Chrome page (3):** iOS Status Bar, iOS Keyboard,
  iOS Search Bar.
- **Prop-changed:** `Input` gained a `Style` axis (`Boxed` / `Bottom-
  lined`) — variantCount 5 → 10. Existing instances default to
  `Boxed`, matching their pre-axis appearance.

Single components — 17 → 23 (+6):
- Design System page (+5): Date Picker, Section Header, Onboarding
  Slide, Card (generic), Full-screen Loader.
- Platform Chrome · iOS page (+1): iOS Home Indicator.

Pages — 1 → 4: added `Sample Screens` (162:833), `Platform Chrome ·
iOS` (197:863), `DS Guide` (257:1357).

**Tokens added:** `radius/xs`; 27 `ios/*` primitives; 36 `color/ios/*`
semantic tokens.

**Components touched:** see breakdown above (24 added, 1 prop-changed).

**Follow-ups:**
- Effect styles still empty (0). If shared shadows become a thing,
  define them here rather than per-node.
- `color/ios/*` tokens have a `light`/`dark` mode-pinned variant for
  every theme-aware token. Verify whether the keyboard's dark/light
  row split actually requires both, or whether `color/ios/*` (without
  suffix) suffices — could halve the iOS token count.
- DS Guide page (`257:1357`) inventory shows 3 children but the
  domain-grouped doc sections aren't enumerated; consider auditing
  whether the on-canvas docs still mirror master state after the
  recent additions.

**Docs regenerated:**
- `DS_CONTEXT.md` — counts, component map, page list.
- `DS_TOKENS.md` — full token catalog (split by primitive / color /
  spacing / radius / text styles).
- `DS_COMPONENTS.md` — every set + single component with master ID,
  variant axes, properties, and slot targets.
- `.inventory-last.json` ← `.inventory-current.json` (checkpoint
  rotated).

---

## 2026-04-23 — AsiaSend v.2 redesign · Phase 1 (Auth) complete

**Area:** components + cross-file consumption

First end-to-end consumer build of the DS. AsiaSend v.2
(`lG8fs0XBSkDeX9Jyxr43Tk`) Auth section redesigned in-place using
DS library instances only — originals preserved untouched, redesigns
suffixed `· DS` and positioned beside each original for side-by-side
diff.

**Frames redesigned (19, the audit's "21" was the section frame count):**
- Email entry × 5 (`18:5369` · `18:5486` · `18:5596` · `18:5701` · `18:5811`)
- Pre-identification × 4 (`20:5653` · `20:5820` · `20:5977` · `20:6138`)
- Set PIN × 2 (`21:6124` · `21:6244`) + Enter PIN × 2 (`21:6359` · `21:6475`)
- OTP × 4 (`22:6418` · `22:6511` Loader · `22:6549` · `22:6658`)
- Settings (misfiled in Auth) × 2 (`24:6639` · `24:6820`)

**New DS masters built to fill gaps surfaced by Phase 1 audit:**

| Component | ID | Notes |
|---|---|---|
| Input — `Style` axis extension | `36:107` | Existing 5 State variants became `Style = Boxed`; new 5 added for `Style = Bottom-lined` (floating label, 1 px bottom border, focus → `color/brand-secondary`, error → `color/negative`). 10 variants total. |
| Full-screen Loader | `270:276` | Single component, 402 × 874, centered Avatar + title + caption. Key `06db3e92...`. |
| PIN Dots | `270:330` | 7 variants `Filled = 0..6` driving dot fill state. Key `859e80c1...`. |

**Cross-file workflow validated:**
1. Build master in DS file (`gSas2PBv3XMAXj36FQDhFa`).
2. User publishes the DS library (Figma UI).
3. After confirmation, `figma.importComponentByKeyAsync(key)` from
   AsiaSend pulls the master in; `master.createInstance()` places it.

**Validation pass:**
- 124 instances across 19 frames.
- 100 % `mainComponent.remote === true` (zero local masters).
- 0 unknown keys after key map updated for the new Loader / PIN Dots.

**Gaps surfaced for follow-up:**
- **Top Bar Title TEXT property missing** — every screen renders the
  default "Transactions" because the master never exposed a Title
  text-property reference. Fix in Phase 2 prep.
- **Card not yet published** — `importComponentByKeyAsync` failed for
  Card during Settings build; the currency-rates tile was built inline
  as a styled frame. Republish DS to expose Card key.
- **PIN Dots horizontal alignment** — sub-frame on Set PIN screens
  sits left-aligned; needs `primaryAxisAlignItems = 'CENTER'` on the
  body container in those screens (composition fix, not master fix).
- **Tab Bar labels are English** — DS master defines them in English;
  AsiaSend mockups will inherit until the master adds a label TEXT
  property or a localization layer is decided.

**Plans / artifacts added:**
- `D:\UI Projects\AsiaSend\Plans\AsiaSend_redesign_plan.md`
- `D:\UI Projects\AsiaSend\Plans\Phase1_Auth_audit.md`
- `D:\UI Projects\AsiaSend\Plans\DS_key_map.json` — full name → key map
  for the 79 publishable masters + new Loader + PIN Dots keys.

---

## 2026-04-23 — Medium-priority gap components (5 new)

**Area:** components

**Added 5 masters** covering the last of the medium-priority gaps:

| Component | ID | Variants | Props |
|---|---|---|---|
| Slider | `259:260` | Default / Disabled | — (thumb / fill positioning via instance overrides) |
| Card | `259:261` | single | `Title`, `Body` TEXT · `Show border` BOOL |
| Notification Banner | `260:296` | Info / Positive / Negative / Warning | `Title`, `Description` TEXT · `Show close` BOOL |
| Accordion | `261:286` | Collapsed / Expanded | `Title`, `Body` TEXT |
| Pagination Dots | `261:307` | Active = Dot 1 / 2 / 3 / 4 | — |

**Token usage highlights:**
- Slider Default: `color/brand-secondary` fill + thumb stroke,
  `color/surface-muted` track.
- Notification Banner: one bg / icon-tint pair per type, all mapped
  onto `-subtle` / solid state tokens.
- Accordion chevron: `color/text-primary`, rotated 180 ° on expanded.
- Pagination Dots active: `color/brand-secondary` 24 × 8 pill;
  inactive dots are 8 × 8 circles on `color/border`.

**On-canvas docs:** 5 new section frames appended to the docs frame.
Note: the docs frame migrated from ID `23:2` (original on Design
System page) to `235:2605` on the DS Guide page during an earlier
`node.clone()` step that appears to have moved the original rather
than duplicated it. The DS Guide page now hosts both the flat
original docs frame and the domain-organized `DS Guide · Root` side
by side. Design System page now only contains the Component Masters
frame. Docs frame section count: 45 → **50**.

**Follow-up surfaced:** the earlier DS Guide build's `.clone()` calls
may need re-investigation — behavior in `use_figma` may differ from
the documented Plugin API for cross-parent operations. Worth a
lesson entry if confirmed.

**Tokens added/rebound/removed:** 0 / 0 / 0.

---

## 2026-04-23 — New "DS Guide" page (docs reorganized by domain)

**Area:** structure

**Created a new consumption page** separate from the authoring
surface. Masters + original 45-section docs frame (`23:2`) on the
Design System page are **untouched** — `DS Guide` is a parallel
reorganization for browsing.

**New page `DS Guide` (`257:1357`)** · 1440-wide root container ·
VERTICAL auto-layout · 96 px gap between domain blocks · 80 px
padding.

**Structure:**
```
Intro
  MOBILE APP FINTECH DS (eyebrow)
  DS Guide (72 px title)
  Description

Domain block · 9 total, each with:
  NN / 09 (eyebrow counter)
  Domain title (48 px SemiBold)
  Description (body · text-secondary)
  1 px full-width divider · color/border
  Cloned section frames from 23:2 · gap 80
```

**Domains (9):**
| # | Domain | Sections |
|---|---|---|
| 01 | Foundations | Color · Typography · Spacing · Shape & Elevation |
| 02 | Actions | Buttons · FAB |
| 03 | Inputs & Controls | Inputs · Switches · Checkboxes · Radio · OTP · Chip · Stepper · Amount Input · App Numpad · Date Picker |
| 04 | Display atoms | Avatar · Badge · Divider · List Item · Cards · Card Visual |
| 05 | Navigation | Navigation (Tab Bar) · Top Bar · Content Tabs |
| 06 | Feedback & Status | Progress Bar · Spinner · Skeleton · Empty State · Success State · Error State · Toast |
| 07 | Overlays | Modal · Bottom Sheet · Tooltip · Dropdown Menu · Alert Dialog |
| 08 | Patterns | Section Header · Receipt Row · Progress Steps · Onboarding Slide |
| 09 | Platform Chrome | iOS Status Bar · iOS Search Bar · iOS Keyboard |

**Clones, not moves:** each section was cloned via `node.clone()`
from `23:2`; the original docs frame remains intact on the Design
System page. 44 sections copied across 9 domain blocks (the "Header"
frame on `23:2` was skipped — the new page has its own intro).

**Total page height:** 26,486 px. Largest domain block: `Inputs &
Controls` at 5,053 px tall (10 sections).

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Components touched:** 0 — instances cloned via frame duplication;
all references to masters preserved.

**Use pattern going forward:**
- Edit masters + authored sections on **Design System** page (`17:2`).
- Regenerate `DS Guide` clones if many sections change (small
  changes don't auto-propagate — the clones are independent frames
  containing instances that DO track their masters; but the section
  frames themselves are diverged copies). Re-run this sync pass when
  reorganization or bulk section updates are needed.

---

## 2026-04-23 — Pattern scaffolds (4 of 5 kept) + Input left/right icons

**Area:** components

### Pattern scaffolds built
Added 4 pattern-level scaffolds from the gap analysis:

| Component | ID | Variants | Props |
|---|---|---|---|
| Section Header | `241:1303` | single | `Title`, `Action` TEXT · `Show action` BOOLEAN |
| Receipt Row | `241:1312` | Variant = Default / Emphasized | `Label`, `Value` TEXT |
| Progress Steps | `241:1331` | Current = Step 1/2/3 (3-step flow) | — |
| Onboarding Slide | `245:1311` | single · 390 wide | `Title`, `Description` TEXT |

Past/current/future dots on Progress Steps: past = filled 12×12 brand-
secondary + past connector brand-secondary; current = 16×16 filled
(bumped for emphasis); future = 12×12 outlined border + connector border.

Onboarding Slide hit the **Clash Display rendering bug** a second
time on its Title (initially `title/lg` styleId → invisible). Fixed
by removing the styleId and setting Geologica SemiBold 28/34 + -1%
tracking directly. Also needed `textAutoResize = 'HEIGHT'` +
`resize(342, h)` + re-`layoutSizingHorizontal = 'FILL'` to get the
title to stretch rather than render one-character-per-line after the
font switch.

### Form Field Group — dropped as redundant

Built initially, then **deleted** after user flagged that the Input
component (`36:107`) already covers every responsibility of a form
field: internal `Label`, internal `Helper`, `Show helper` BOOLEAN,
and `State` variants including `Error`. Form Field Group only added
an outer redundant label that stacked on top of the Input's own
label. Removed both the master (`244:1325`) and the on-canvas doc
section (`249:1376`). DS_COMPONENTS.md entry pulled before write.

### Input extended with left/right icons

Added 4 new component properties to Input (`36:107`) — mirroring
Button's icon pattern:

- `Show left icon` BOOLEAN (default `false`)
- `Show right icon` BOOLEAN (default `false`)
- `Left icon` INSTANCE_SWAP (default `search`)
- `Right icon` INSTANCE_SWAP (default `close`)

Preferred swap list on both: search, close, check, arrow-right,
arrow-left, chevron-right, chevron-down, eye, bell, user.

Injected `Left icon` + `Right icon` INSTANCE nodes into all 5
variants' `Input Box` flex row, wired
`componentPropertyReferences` on each (`visible` + `mainComponent`).
Set Input Box `itemSpacing = 8`, Value TEXT `layoutGrow = 1` so it
stretches between the icons when either is visible.

Now covers: plain input, search field (left icon), password with eye
(right icon), phone input (left flag placeholder), dropdown field
(right chevron-down), clearable input (right close) — all via
instance-level property toggles, no new component needed.

**Tokens added/rebound/removed:** 0 / 0 / 0.

**On-canvas docs:** 4 new section frames appended (Section Header,
Receipt Row, Progress Steps, Onboarding Slide). Docs container:
**41 → 45 sections**.

---

## 2026-04-23 — Second sample screen: Transfers · Light

**Area:** screens

**Composition test** of the recent component batches in one realistic
mobile frame. New screen `Transfers · Light` (`238:1407`) on the
Sample Screens page, placed next to `Home · Light` at x + 470.

**Stack (390 × 844):**
```
iOS Status Bar                        (43)
Top Bar · Screen                      (60)   ← default title "Transactions"
Content · FILL                        (627)
  FROM section
    "FROM" overline
    Account Card · Pattern B           (show change: off → 170 tall)
  AMOUNT section
    Amount Input                       (show helper: off → 50 tall)
    Chips row · 500K / 1M / 5M / 10M  (5M = Selected)
  TO section
    "TO" overline
    Beneficiary row · Avatar JP + "Jordan Park" + "IBAN UZ •••  4892 · Humo" + chevron-right
  Spacer · layoutGrow 1
  Send button · Primary md FILL · "Send 5 000 000 UZS"
Tab Bar · Transfers active            (80)
Home Indicator                        (34)
```

**Components exercised** (all reused with zero masters modified):
Account Card · Amount Input · Chip (Default + Selected) · Avatar
(Size = md, initials "JP") · chevron-right icon · Button (Primary md)
· iOS Status Bar · Top Bar (Screen) · Tab Bar (Transfers) · Home
Indicator.

**Sizing gotcha worth noting (caught during this build):**
- Initial layout overflowed by ~70 px (Send button landed at y = 627,
  the exact bottom of Content, so it got clipped by Tab Bar below).
- Fix was **purely property toggles** — no component edits, no
  layout rebuild: `Show change` off on Account Card (−44 px) and
  `Show helper` off on Amount Input (−22 px). This is a strong
  signal that the BOOLEAN hide-props on existing components pull
  their weight.

**Gaps surfaced:**
- **Top Bar has no Title TEXT property** — the "Transactions" label
  is baked into the Screen variant. Instance cannot swap it without
  reaching into nested internals. Add a `Title` TEXT prop on the Top
  Bar component set.
- **Amount Input's currency suffix "UZS" is visually small** next to
  the large digit display. Consider bumping the currency size from
  `subtitle` (16 px) to `title/md` (22 px) for better optical balance.

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Components touched (masters):** 0 — instances only.

**Follow-ups remaining:**
- Add `Title` TEXT property on Top Bar so screens can set screen
  names.
- Decide whether Amount Input's currency should scale up.
- More sample screens (QR · Payments · Monitoring) + Dark siblings.

---

## 2026-04-23 — Fix sizing modes on the 4 new components

**Area:** components (polish)

**Problem:** each of the 4 new components had children that didn't
hug / fill the way the DS expects, producing oversized containers or
squeezed children.

| Component | Was | Now |
|---|---|---|
| Stepper | Component 98 × **100** · `−` / `+` buttons 13 × 32 (button primary=AUTO hugged the glyph text) | Component 136 × **40** · `−` / `+` buttons 32 × 32 FIXED both axes |
| Content Tabs | All 3 variants 360 × **100** · tab cells 120 × 100 (counter=FIXED 100) | 360 × **44** · tab cells hug to label + 12 px V-padding |
| Alert Dialog · Icon bg | 24 × 40 (primary=AUTO hugged icon width) | 40 × 40 FIXED both axes |
| FAB | Already correct | unchanged |

**Fixes:**
- Stepper buttons: `btn.resize(32, 32)` + explicit
  `primaryAxisSizingMode = 'FIXED'` and `counterAxisSizingMode = 'FIXED'`.
  Stepper component: `counterAxisSizingMode = 'AUTO'` so height hugs.
- Content Tabs tab cells: `counterAxisSizingMode = 'AUTO'`. Component
  stays `primary=FIXED 360` (width is the whole bar), counter=AUTO
  (height hugs).
- Alert Dialog Icon bg: `resize(40, 40)` + FIXED both axes.

**Tokens added/rebound/removed:** 0 / 0 / 0. Pure geometry /
auto-layout config.

**Lesson (added to DS_LESSONS.md):** When a FRAME with auto-layout
contains children that are smaller than the target frame size,
calling `resize(w, h)` is not enough — the sizing modes must be
explicitly re-locked to `FIXED` after creation AND after any
`appendChild`. Primary axis defaults to `AUTO` on HORIZONTAL
auto-layout frames, which will shrink the frame to hug its child in
the primary direction.

---

## 2026-04-23 — Medium-priority gap components (4 new)

**Area:** components

**Added** four masters via `combineAsVariants` / single COMPONENT,
all with `clipsContent = false` from the start (avoided the cleanup
pass from the previous batch).

| Component | ID | Variants / Size | Notes |
|---|---|---|---|
| FAB | `229:1223` | 2 (Size = md 56 / lg 64) | Primary surface-hero bg, `color/text-on-hero` icon, 12 px drop shadow at 12 % alpha. INSTANCE_SWAP `Icon` prop (default `plus`). |
| Stepper | `226:1232` | 2 (State = Default / Disabled) | Pill with `−` / `+` 32 × 32 circular buttons on `surface-muted`; 40-wide centered value slot. `Value` TEXT prop. |
| Content Tabs | `232:1236` | 3 (Active = Tab 1 / 2 / 3) | Full-width 360. Per-cell `strokeBottomWeight` — 2 px brand-secondary on active, 1 px border-subtle on inactive. Active label text-primary, inactive text-secondary. |
| Alert Dialog | `233:1279` | 2 (Type = Warning / Destructive) | 340 × hug card. 40 × 40 tinted icon circle + Title + Description + Cancel + Confirm/Delete. Warning uses Primary confirm, Destructive uses DS Destructive button. |

**Token usage highlights:**
- FAB: `color/surface-hero` bg (Pattern B) + `color/text-on-hero` icon
  — flips Dark↔Light.
- Stepper disabled: `color/text-tertiary` on `−` / `+` / value.
- Content Tabs active: `color/brand-secondary` underline + text-primary label.
- Alert Dialog: `color/warning-subtle` / `color/negative-subtle` icon
  backgrounds with `color/warning` / `color/negative` icon glyphs.

**Gotcha hit during FAB build:** `c.resize(56, 56)` before appending
the icon — then after the icon INSTANCE was added, the auto-layout
hugged to the icon width (28) producing a 28 × 56 pill. Fix: append
children first, then `resize(56, 56)` + explicitly set
`primaryAxisSizingMode = 'FIXED'` and `counterAxisSizingMode = 'FIXED'`.
Without the post-append sizing lock, HORIZONTAL auto-layout defaults
to primary=HUG and overrides the earlier resize.

**Also:** Icon master (`43:109`) has an outer FRAME with a white fill
behind the vector. On a dark surface (FAB bg = surface-hero) that
white square was visible as an unwanted box. Fix: on FAB icon
instances, clear the outer frame's fills and rebind the inner
VECTOR's stroke to `color/text-on-hero`.

**On-canvas docs** (4 new sections appended to DS docs frame `23:2`):
FAB · Stepper · Content Tabs · Alert Dialog. Docs container now
**37 → 41 sections**.

**Tokens added/rebound/removed:** 0 / 0 / 0 (all new components
consume existing DS semantic tokens).

**Follow-ups remaining (from gap analysis):**
- Medium-priority still open: Slider, Notification Banner, Accordion,
  Pagination Dots, Generic Card.
- Fintech-specific: Beneficiary Tile, Payment Method Row, QR Code
  Frame, Currency Amount Display, Merchant Logo Tile, Cashback Badge.
- Pattern-level: Section Header, Receipt Row, Form Field Group,
  Onboarding Slide, Progress Steps.

---

## 2026-04-23 — Date Picker: 3-letter DOW labels

**Area:** components (polish)

Replaced single-letter `M T W T F S S` labels with 3-letter uppercase
`MON TUE WED THU FRI SAT SUN` — clearer scan in small type, fits
cleanly in the 43-px column width at 11 px SemiBold + 8 % tracking.
Style preserved otherwise (`color/text-tertiary`). 7 TEXT node
updates.

Updated `DS_COMPONENTS.md` · Date Picker DOW row description.

---

## 2026-04-23 — Date Picker: new header + Monday-first week

**Area:** components

**Header rebuilt** — `SPACE_BETWEEN` layout:
- Left: `arrow-left` icon (prev month).
- Center: `March 2026` TEXT + `chevron-down` icon (month / year
  picker trigger).
- Right: `arrow-right` icon (next month).

**Week shifted to Monday-first** (ISO / European convention):
- DOW row relabeled `M T W T F S S`.
- Day grid recomputed: March 1, 2026 is Sunday → last column of
  Row 1. Feb 23–28 now fill the preceding Monday–Saturday cells
  of Row 1; April 1–5 fill the tail of Row 6.

Re-renders `today = 15` on Sunday (rightmost column) and
`selected = 23` on Monday (leftmost column).

**Tokens added/rebound/removed:** 0 / 0 / 0. Pure geometry + icon
swap. No variant count change (still single component).

**Also:** updated `DS_COMPONENTS.md` · Date Picker entry with the
new header structure and the Monday-first note.

---

## 2026-04-23 — Fix clipsContent + Numpad icon sizing

**Area:** components (polish)

**Clipping fix:** disabled `clipsContent` on **193 frames** across the
6 new critical-gap components, their descendants, and their 6
on-canvas doc sections. The clips were an artifact of the Plugin API
default (newly-created FRAMEs ship with `clipsContent = true`); it
was invisibly trimming any content that sat slightly outside its
parent, most visibly the `SARDOR ISLOMOV` cardholder text on Card
Visual which lost its last character at certain scales.

**Numpad icon sizing:** resized the 3 icon instances inside App
Numpad's bottom row from 20×20 → **24×24** — biometric eye + delete
X on the PIN variant, and the delete X on the With-letters variant.
Better optical weight next to the 28-point digit.

**Tokens added/rebound/removed:** 0 / 0 / 0 (pure geometry + flag
changes).

**Lesson:** `figma.createFrame()` defaults to `clipsContent = true`.
For containers that are only there as auto-layout wrappers (not
masks), explicitly set `clipsContent = false` on creation. Adding
this to future component-build scripts will save cleanup passes.

---

## 2026-04-23 — Critical-gap components (6 new)

**Area:** components

**Added** six masters to the Design System page's Component Masters
container (auto-layout VERTICAL — each `combineAsVariants(...)` call
appended to the end automatically). All bind to DS tokens (not iOS
`ios-*`). Counts now: 20 component sets + 18 single components.

| Component | ID | Variants | Key props |
|---|---|---|---|
| Radio | `213:969` | 2 (State: Unchecked / Checked) · 20 × 20 circular | — |
| Radio Row | `213:984` | 4 (Label position × State) | `Label` TEXT |
| Chip | `214:974` | 3 (State: Default / Selected / Disabled) | `Label` TEXT |
| Card Visual | `216:992` | 2 (Theme: Primary / Brand) · 340 × 210 | `Number`, `Holder`, `Expiry`, `Network` TEXT |
| Amount Input | `218:978` | 2 (State: Default / Error) | `Amount`, `Currency`, `Helper` TEXT, `Show helper` BOOL |
| App Numpad | `219:1041` | 2 (Layout: With letters / PIN) · 3×4 grid of 72 × 72 keys | — |
| Date Picker | `220:975` | single · 336 wide · 6×7 day grid | — |

**Token usage highlights:**
- Radio + Chip Selected / Date Picker today + selected day → all use
  `color/brand-secondary` (consistent with existing Switch, Checkbox,
  Spinner, Progress Bar — brand-secondary = interactive accent).
- Card Visual Primary uses Pattern B (`color/surface-hero` +
  `color/text-on-hero` + `color/text-on-hero-muted`) — flips
  Dark↔Light with mode, same as Account Card.
- Amount Input error → `color/negative`.
- App Numpad keys → `color/surface-muted` bg, `color/text-primary` digit.

**Gotcha hit during build:** text node with `textStyleId = numeric/display`
renders as **blank** in this environment because the underlying font
(Clash Display Semibold) isn't loadable via Plugin API. Workaround
applied on Amount Input's big amount text: skip `textStyleId`, set
`fontName = Geologica SemiBold` + `fontSize = 36` + `lineHeight = 40`
directly. After the manual Clash Display swap in Figma Desktop, a
future pass can re-attach the style.

**On-canvas docs** (6 new sections appended to DS docs frame `23:2`):
- Radio · Chip · Card Visual · Amount Input · App Numpad · Date Picker.
- Docs container now **31 → 37 sections**.

**Tokens added/rebound/removed:** 0 / 0 / 0 (all new components
consume existing DS semantic tokens).

**Follow-ups remaining:**
- Medium-priority gaps flagged earlier: Content Tabs, Stepper,
  Slider, FAB, Alert Dialog, Notification Banner, Accordion,
  Pagination Dots, Generic Card.
- Fintech-specific: Beneficiary Tile, Payment Method Row, QR Code
  Frame, Currency Amount Display, Merchant Logo Tile, Cashback Badge.
- Pattern-level: Section Header, Receipt Row, Form Field Group,
  Onboarding Slide, Progress Steps.
- Manual Clash Display re-apply on Amount Input's big amount text
  once the env supports it.

---

## 2026-04-23 — Rename iOS layer names (typos, SF Symbols, Cyrillic)

**Area:** components (cosmetic / layer hygiene)

**Changes (64 renames across 4 iOS components):**

| From | To | Count | Where |
|---|---|---|---|
| `Cursror` | `Cursor`     | 8 | Search Bar |
| `Pintch`  | `Pinch`      | — | in compound name |
| `Show / Hide Pintch` | `Home Indicator Pill` | 1 | Status Bar · Cupertino |
| `↳ Background` | `Scrim Background` | 1 | Status Bar · Cupertino |
| `↳ Corners` | `Top Corners Shape` | 1 | Status Bar · Cupertino |
| `Screen Corners / Top Corners` | `Screen Corners` | 1 | Status Bar |
| `Shape`   | `Dynamic Island` | 3 | Status Bar |
| `Oval 2`  | `Battery Cap` | 1 | Status Bar |
| `Rectangle 4` | `Battery Fill` | 1 | Status Bar |
| `Border` / `Cap` / `Capacity` | `Battery Outline` / `Battery Cap Tip` / `Battery Capacity` | 3 | Status Bar |
| `Wifi-path` | `Wifi Arc` | 6 | Status Bar |
| `Cellular_Connection-path` / `Cellular-Connection-path` | `Signal Bar` | 8 | Status Bar |
| `Frame 2290` / `Frame 2212` | `Time Cluster` / `Right Cluster` | 2 | Status Bar |
| SF Symbol `􀊫` | `Magnifyingglass` | 4 | Search Bar |
| SF Symbol `􀁑` | `Close Circle`    | 4 | Search Bar |
| SF Symbol `􀆇` | `Chevron Up`      | 6 | Keyboard |
| SF Symbol `􀆈` | `Chevron Down`    | 6 | Keyboard |
| Cyrillic `Готово` | `Done`         | 6 | Keyboard toolbar |
| `multiply.circle.fill` / `search` | `Clear Icon` / `Search Icon` | 4 | Search Bar |

**Post-audit** — scanned for remaining bad patterns (unicode PUA
chars, Cyrillic, generic-numbered frames, underscore/hyphen compound
names, empty names): **zero remaining**.

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Why it matters:** layer names show up in Figma's layer panel, Code
Connect output, Dev Mode inspection, and exported assets. Clean
English names are searchable and read well. The SF Symbol unicode
characters (Apple's private-use area `U+100000`-`U+10FFFF`) were
especially bad — they rendered as blank squares in some contexts and
broke sorting.

---

## 2026-04-23 — iOS chrome on Home sample screen

**Area:** components + screens

**Changes:**
- **Created `iOS Home Indicator` component** (`207:990`, 390 × 34) on
  the Platform Chrome page, positioned below the iOS Keyboard master
  at (80, 1900). A single 134 × 5 rounded RECTANGLE (radius 2.5)
  centered horizontally, 8 px from bottom; fill bound to
  `color/ios-label` so the pill flips Dark↔Light with Color mode.
- **Added iOS Status Bar Default** (`144:3551`) as the first child of
  the Home screen (`162:834`) and **Home Indicator** (`207:990`) as
  the last child. Both set to `layoutSizingHorizontal = 'FILL'`.
- Screen dimensions held at 390 × 844. The Content frame (which had
  `layoutSizingVertical = 'FILL'`) auto-shrank **704 → 627 px** to
  absorb the new fixed-height chrome (43 + 34 = 77 px).

**Child order on Home · Light (`162:834`):**
```
iOS Status Bar (43)
Top Bar · Brand (60)
Content (627, FILL)
Tab Bar · Home active (80)
Home Indicator (34)
```

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Components touched:** new `207:990`; two instances added to the
Home screen; existing masters unchanged.

**Follow-ups remaining:**
- Duplicate the screen as a Dark-mode sibling (iOS Status Bar will
  need the Cupertino Bottom Sheet variant, or the Default will just
  flip its fills via ios-bar-background; verify visually).
- Sample screens for Transfers / QR / Payments / Monitoring.

---

## 2026-04-23 — iOS Keyboard: wrapped DS Button in auto-layout frame

**Area:** components

**Change:** the DS Button inside each of the 6 keyboard variants is
now wrapped in an **auto-layout FRAME** named `Buttons`. Structure:

```
Buttons (FRAME, HORIZONTAL, pad=0/0/0/0, 393×44)
  primary=FIXED 393, counter=AUTO
  counterAxisAlignItems = CENTER
  componentPropertyReferences = { visible: "Show Button#2163:0" }
└─ DS Button instance (18:6) · layoutSizingHorizontal = 'FILL'
```

**Why:** lets designers add padding to the wrapper later without
resizing the button — the button fills the wrapper's remaining width.
Toggling `Show Button` still gates the whole accessory area.

**Moved** the `visible: Show Button#2163:0` `componentPropertyReference`
from each DS Button instance to its new wrapper frame. Button's own
propRefs cleared. Button visibility set back to `true` so the wrapper
controls show/hide end-to-end.

**Verified:** test instance with `Show Button = true` renders the DS
Button in the accessory row correctly in Letters Light. Test removed.

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Rebinds across 6 variants:** 6 wrapper frames created · 6
property-ref moves · 6 button sizing mode changes to FILL.

---

## 2026-04-23 — iOS Keyboard: audited property wiring + swapped accessory Button to DS

**Area:** components

**Inspected** the iOS Keyboard's 6 BOOLEAN properties and their
node-visibility bindings via `componentPropertyReferences`. All 6 are
already wired correctly:

| Property | → Node | Default |
|---|---|---|
| `Show Keyboard Layouts` | `Background` | true |
| `Show Button`           | `Buttons`    | false |
| `Show Toolbar`          | `Input Accessory View` | false |
| `Show Suggestion`       | `Auto Complete` | false |
| `Show Decimal Point`    | Numpad `.` key | false |
| `Show Glyphs`           | Secondary sub-letters | false |

**Changes:**
- **Replaced the `Buttons` accessory in all 6 keyboard variants**
  (`144:3571`, `144:3687`, `144:3803`, `144:3892`, `144:3981`,
  `144:4068`). They previously instanced an imported Apple-kit
  component (`144:2446 "* Type=Primary, * State=Default, * Active=True"`)
  — a multi-piece accessory bar with payment logos, text-instance
  slots, etc. Swapped each for an instance of our DS Button
  Primary / md / Default (`18:6`), sized 393 × 44, positioned at
  (0, 0), re-inserted at the original child index to preserve z-order.
- **Preserved `componentPropertyReferences`** on each new instance
  (`{ visible: "Show Button#2163:0" }`) so the `Show Button` BOOLEAN
  still gates visibility. Default visibility set to `false` to match
  the property default.
- Verified with temporary `Show Button=true` test instances for
  Letters Light + Dark — DS Button renders correctly at the top of
  the keyboard in both variants and disappears when the BOOLEAN
  flips off.

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Semantic consequence:** the DS Button inside the keyboard follows
DS tokens (`color/surface-hero` etc.) which flip with the file's
Color collection mode — NOT with the keyboard's `Dark Mode` variant
axis. That means:
- File in Light mode + keyboard `Dark Mode=True` variant → DS Button
  renders as Primary Light (dark button on dark keyboard).
- File in Dark mode + keyboard `Dark Mode=False` variant → DS Button
  renders as Primary Dark (light button on light keyboard).

This is intentional — the DS Button is a **brand** surface that must
match the app's theme, while the keyboard chrome is **platform** and
locked via variant. Pick keyboard variants that match the mode you're
previewing.

**Follow-ups remaining:**
- Collapse redundant `Dark Mode` / `Theme` variant axes on iOS
  Keyboard and iOS Search Bar.
- Sample screens for Transfers / QR / Payments / Monitoring.
- Code Connect mappings.
- Cover page.

---

## 2026-04-23 — iOS components: refactor, rename, document

**Area:** structure + docs

**Changes:**
- Created new page **"Platform Chrome · iOS"** (`197:863`) to hold
  Apple UIKit reproductions separate from the DS masters.
- **Moved** three component sets off the Design System page into the
  new page (they had been floating at x≈3185–4161, outside the 80,80
  master grid):
  - `144:3519` — position now (80, 291)
  - `144:4153` — position now (80, 566)
  - `144:3568` — position now (80, 818)
- **Renamed** for clarity about their platform-specific scope:
  - `Status Bar` → **`iOS Status Bar`**
  - `Search Bar` → **`iOS Search Bar`**
  - `Keyboard & Indicator` → **`iOS Keyboard`**
- Added a page header (title + description) at (80, 80) on the new
  page with the scope rule spelled out: *"App content should never
  bind to `ios-*` tokens."*
- **Added 3 on-canvas doc sections** to the DS documentation frame
  (`23:2`), following the same template as the Tier 2 sections:
  iOS Status Bar (Default variant preview), iOS Search Bar (Default
  Light preview), iOS Keyboard (Letters Light preview). Docs
  container now 28 → 31 sections.
- **Updated DS markdown docs:**
  - `DS_COMPONENTS.md` — new "iOS Platform Chrome" top-level section
    with a per-component token-binding table (bar bg, pill, icons,
    label, accent, divider; Light / Dark columns) plus the
    "app content never uses ios-* tokens" policy and the note about
    the redundant `Dark Mode` variant axis on iOS Keyboard.
  - `DS_CONTEXT.md` — updated "Current state" to describe all three
    pages in the file and added a brief "iOS chrome is separate"
    note in the component map section.
  - `DS_HISTORY.md` — this entry.

**Tokens added/rebound/removed:** 0 / 0 / 0 (structural + docs only).

**Components touched:** 3 (page moves + renames; no paint changes,
no geometry changes — instances stay referentially valid).

**Follow-ups remaining:**
- Collapse redundant `Dark Mode` / `Theme` variant axes on iOS
  Keyboard and iOS Search Bar (breaking change for existing instances).
- Sample screens for Transfers / QR / Payments / Monitoring.
- Code Connect mappings.
- Cover page.
- Manual Clash Display swap for the new iOS section titles.

---

## 2026-04-23 — Full Search Bar color fix (both modes)

**Area:** tokens + components

**Problem:** Search Bar (`144:4153`) had several wrong bindings per
variant:
- Both `Theme=Light` variants bound the outer bar **and** the inner
  "Search Field" pill to `color/ios-bar-background` → the pill was
  invisible against the same-colored bar.
- `Type=Focus, Theme=Light` divider bound to `ios-bar-background` (a
  fill token) instead of a separator token.
- Both `Theme=Dark` variants bound the outer bar to
  `color/ios-key-background` (keyboard color) instead of a search-bar
  color → rendered like a keyboard in the search bar region.
- Placeholder labels, icons, Cancel button, and cursor colors all
  flipped with Color mode rather than honoring the `Theme=` variant
  axis.

**Fixes:**
- Added **6 new mode-stable tokens**:
  - `color/ios-fill-light` / `-dark` (search pill bg — `#efeff4` /
    `#2c2c2e`)
  - `color/ios-bar-bg-light` / `-dark` (bar container bg — `#f9f9f9` /
    `#1c1c1e`)
  - `color/ios-accent-light` / `-dark` (Cancel button + cursor —
    `#007aff` / `#0a84ff`)
- Walked all 4 variants and rebound each paint by **node role**:
  - `Search Field` RECT → `ios-fill-<mode>` (pill bg, visible
    distinct layer)
  - `Divider` / `Separator` VECTOR → `ios-separator-<mode>`
  - `Cursror` (sic — kit's typo) INSTANCE bg → `ios-bar-bg-<mode>`;
    inner RECT fill → `ios-accent-<mode>`
  - `Button` TEXT → `ios-accent-<mode>`
  - Other TEXT → `ios-overlay-white` (Dark Theme) or `ios-backdrop`
    (Light Theme) for primary labels; `ios-label-sec-<mode>` for
    placeholder; `ios-label-ter-<mode>` for icons
  - Outer component / frame / rect container → `ios-bar-bg-<mode>`

**Rebind counts:** 38 paints total (8 / 9 / 11 / 10 across the 4
variants).

**Visual now:**
| Variant | Bar bg | Pill bg | Accent |
|---|---|---|---|
| Default · Light | `#f9f9f9` | `#efeff4` | — |
| Focus · Light   | `#f9f9f9` | `#efeff4` | `#007aff` |
| Default · Dark  | `#1c1c1e` | `#2c2c2e` | `#0a84ff` |
| Focus · Dark    | `#1c1c1e` | `#2c2c2e` | `#0a84ff` |

The subtle bar-vs-pill contrast (which iOS uses to separate the
search input surface from the navigation bar background) is now
preserved in both modes.

**Lesson extension:** when a kit uses a single imported-library
token for multiple semantic roles (e.g. both "bar bg" and "pill bg"
both got `ios-bar-background`), rebinding by *current binding* loses
the distinction. The role has to be recovered from **node name or
parent structure** ("Search Field" rect vs outer component frame).

---

## 2026-04-23 — Full keyboard key-color audit + semantic fix

**Area:** tokens + components

**Problem:** After the previous rebind, keyboard Key frames were bound
to **label tokens** (`ios-label-secondary`, `ios-label-tertiary`,
`ios-overlay-white`, `ios-separator-light`) rather than **key-face /
key-mod** tokens. Rendering accidents made it look approximately right
in some variants and visibly wrong in others:
- Dark Letters keys rendered near-white (`#ebebf5`) instead of iOS's
  medium grey.
- Dark Numpad: all 10 number keys rendered at silver-grey (`#aeaeb2`,
  label-tertiary-dark) instead of a proper dark key face.
- Light Letters modifiers (shift, delete, ABC, return) rendered at
  `#e5e5ea` — too light, blending with the keyboard background.
- `color/ios-key-face-dark` and `color/ios-key-mod-dark` both aliased
  the same primitive (`ios/key-mod-d` `#565b66`) — zero contrast
  between letter and modifier keys in any dark variant.
- Dark Calculator keys were uniformly dark — no number-vs-operator
  differentiation.

**Fixes:**
- Added **2 new primitives** for real iOS dark-keyboard colors:
  - `ios/key-face-d-real` `#6c6c70` — iOS dark letter/number key face
  - `ios/key-mod-d-real` `#474747` — iOS dark modifier key
- Re-aliased `color/ios-key-face-dark` → `ios/key-face-d-real`
  and `color/ios-key-mod-dark` → `ios/key-mod-d-real`. The two dark
  key tokens now resolve to distinct greys.
- Walked every Key frame (variant-owned, non-INSTANCE descendants)
  across all 6 variants, classifying each as face or mod:
  - Letters & Numpad: size-based (letter tiles + space = face;
    shift/delete icons + ABC/return modifiers = mod; numpad numbers =
    face).
  - Calculator: **column-based** for narrow 71×46 keys — keys at the
    leftmost or rightmost X column are operators (mod); middle columns
    are digits (face). Wide 226×46 "0" = face. Tall 71×98 "=" = mod.
- Total Key rebinds across all passes: ~225 (face/mod corrections
  across Letters, Numpad, Calculator — both Light and Dark).

**Tokens added:** 2 new primitives. No new Color tokens (re-aliased
existing `color/ios-key-face-dark` and `color/ios-key-mod-dark`).

**Visual result:**
- Light Letters: white letter keys + `#abb2c1` modifier keys on
  `#e5e5ea` bg ✓
- Dark Letters: `#6c6c70` letter keys + `#474747` modifiers on
  `#151515` bg ✓
- Light/Dark Numpad: uniform face keys (no modifiers in numpad) ✓
- Light Calculator: white digits + grey operators ✓
- Dark Calculator: `#6c6c70` digits + `#474747` operators ✓

**Lesson:** imported component kits rarely distinguish semantics by
token — they reuse their own label/text tokens for every surface.
When rebinding, don't assume `current binding == semantic role`.
Fall back to structural signals: node width/height, absolute X/Y
position relative to siblings, or (when labels are accessible)
text content.

---

## 2026-04-23 — Status Bar Default variant + Keyboard Dark Mode fixes

**Area:** tokens + components

**Problems observed:**
1. Status Bar `Type=Default` variant rendered with a deep-navy
   (`#01153c`) background — it had been bound to
   `color/ios-pinch-handle` by an earlier nearest-hex pass instead of
   `color/ios-bar-background`. Its status-bar icons (Time, Cellular,
   Wifi, Battery) were bound to `ios-bar-background` making them
   invisible against the corrected white bg.
2. Cupertino variant's status-bar overlay icons bound to
   `ios-bar-background` — that token flips with mode, so in a Dark
   file the overlay text would go near-black on the black scrim.
3. **Keyboard Dark Mode variant axis fought the token system.** The
   `Dark Mode=True` variants were bound to flipping iOS tokens
   (`ios-key-background`, `ios-label`, etc.) — so they rendered *light*
   in a Light-mode canvas and *dark* in a Dark-mode canvas, exactly
   opposite of the variant's intent. The axis was redundant.

**Fixes (in order):**
- Added **`color/ios-overlay-white`** — always `white` in both modes.
- Rebinding (23 paints) on Status Bar's Default variant: root →
  `ios-bar-background`; Time/Cellular/Wifi/Battery → `ios-label`.
- Rebinding Cupertino overlay icons → `ios-overlay-white` (fixed white
  both modes — keeps status-bar icons white on the black scrim in any
  ambient mode).
- Added **12 mode-stable fixed-mode iOS tokens** as light/dark pairs
  (`ios-key-bg-light`/`-dark`, `ios-key-face-light`/`-dark`,
  `ios-key-mod-light`/`-dark`, `ios-label-sec-light`/`-dark`,
  `ios-label-ter-light`/`-dark`, `ios-separator-light`/`-dark`).
- Rebinding all 6 keyboard variants — **388 paints across the set**
  — every flipping iOS token replaced with its fixed counterpart
  (`-light` in Dark Mode=False variants, `-dark` in Dark Mode=True).

**Per-variant rebind counts:**
| Variant | Paints remapped |
|---|---|
| Letters Dark Mode=False  | 79 |
| Letters Dark Mode=True   | 79 |
| Numpad Dark Mode=False   | 61 |
| Numpad Dark Mode=True    | 61 |
| Calculator Dark Mode=False | 54 |
| Calculator Dark Mode=True  | 54 |
| **Total**                | **388** |

**Tokens added:** `color/ios-overlay-white` + 12 fixed-mode pairs =
**13 new**. Total iOS semantic tokens: 17 → **30**.

**Key rule now documented in DS_TOKENS.md:** if a component uses a
variant axis to pick theme (`Dark Mode`, `Theme`), bind its paints to
the mode-stable iOS tokens. Mixing flipping + variant-axis breaks
the component's intent.

**Known remaining gap:** `color/ios-key-face-dark` and
`color/ios-key-mod-dark` both alias the same primitive
(`ios/key-mod-d` `#565b66`), so in the Dark Calculator variant letter
keys and operator keys render the same shade. Real iOS dark keyboard
uses two slightly different greys. Fix = add a lighter dark-mode
primitive (e.g. `ios/key-face-d` at ~`#6c6c70`) and rebind. Deferred.

---

## 2026-04-23 — iOS Cupertino sheet scrim fix (mode-stable backdrop)

**Area:** tokens + components

**Problem:** Status Bar's `Cupertino Bottom Sheet` variant had the
scrim-behind-sheet area bound to `color/ios-bar-background`, which
flips between `#f9f9f9` Light and `#1c1c1e` Dark. iOS's Cupertino
presentation keeps the scrim dark (≈ black) in both modes — our
Light render showed a pale backdrop, which looked wrong.

**Fix:**
- Added **`color/ios-backdrop`** token — aliases `ios/black` (`#000000`)
  in both Light and Dark modes. The only mode-stable iOS token.
- Rebound 3 paints on the Cupertino variant to it:
  - `144:3520` — Type=Cupertino Bottom Sheet root fill
  - `144:3524` — `↳ Background` boolean-op (the 375×68 scrim surface)
  - `144:3523` — Background Card Dim

**Tokens added/rebound/removed:** 1 / 3 / 0.

**Lesson implicit:** mode-flipping is the default in this DS, but
platform-chrome scrims / overlays often need mode stability. When
adding a scrim-like token, use the same primitive for both modes.

---

## 2026-04-23 — Precise iOS token layer (second pass)

**Area:** tokens + components

**Context:** First-pass rebind (earlier today) squeezed iOS hex values
into the DS stone/* palette via a luminance-plus-role heuristic. Visual
result was close-but-wrong: iOS cool blue-greys rendered as our warm
tans, iOS blue `#007aff` became our brand blue `#438bfa`, search field
grey pill disappeared against white surface. User asked for proper
fidelity — add tokens if needed.

**Tokens added (41 new):**
- **25 primitives** with `ios/` prefix in the Primitives collection —
  direct hex values for Apple's UIKit system colors (light + dark pairs
  where they differ).
- **16 semantic tokens** with `color/ios-*` prefix in the Color
  collection, aliasing the primitives per Light / Dark mode:
  `ios-label` / `-secondary` / `-tertiary` / `-quaternary` · `ios-glyph`
  · `ios-separator` · `ios-fill` · `ios-bar-background` ·
  `ios-key-background` · `ios-key-face` · `ios-key-modifier` ·
  `ios-accent` · `ios-navy-glyph` · `ios-dim-stroke` · `ios-mid-stroke`
  · `ios-pinch-handle`.

**Rebind passes:**
1. DS-token → iOS-token remap on every paint whose fill/stroke binding
   was to a local DS token (403 paints across the 3 sets).
2. External-library binding cleanup on paints still bound to the
   original Apple UI Kit's own library variables — Figma exposes
   `paint.color` as the *resolved* value for bound paints, so we read
   it and nearest-hex-matched to our new `ios/*` scale (128 more paints).

**Tokenization totals (iOS-set-by-iOS-set):**
| Set | Fills → iOS | Strokes → iOS | Coverage |
|---|---|---|---|
| Status Bar | 38/38 | 10/10 | 100% |
| Keyboard & Indicator | 422/422 | 21/21 | 100% |
| Search Bar | 36/36 | 4/4 | 100% |
| **Totals** | — | — | **531 paints on iOS tokens** |

**Tokens added/rebound/removed:** 41 / 531 / 0.

**Policy call-out:** `color/ios-*` tokens exist only to reproduce Apple
chrome. App content must bind to the DS semantic tokens (`text-*`,
`surface-*`, `border-*`, `brand-secondary`). Documented in
DS_CONTEXT.md and DS_TOKENS.md.

**Follow-ups:**
- `Keyboard & Indicator · Dark Mode` and `Search Bar · Theme` variant
  axes are now fully redundant — the iOS tokens flip via Color
  collection modes. Collapsing would cut keyboard 6→3 and search
  bar 4→2 variants. Breaking for existing instances; deferred.
- Three sets still live at x≈3185–4161 outside the 80,80 master grid.
  Candidate for a dedicated "Platform Chrome" page.

---

## 2026-04-23 — Rebind iOS-import component sets to DS tokens

**Area:** components

**Context:** Three component sets imported from an Apple UI Kit surfaced
on the Design System page outside the standard 80,80 master grid:
Status Bar (`144:3519`), Keyboard & Indicator (`144:3568`), Search Bar
(`144:4153`). Typography was SF Pro / DM Sans; fills were Apple greys
(`#8e8e93`, `#efeff4`, `#d0d4dc`, etc.); `Dark Mode` / `Theme` was baked
in as a variant axis instead of using the DS Color collection modes.

**Changes:**
- **Tokenization before → after:**
  | Set | Fills bound | Strokes bound |
  |---|---|---|
  | Status Bar     | 15/38 → **38/38** | 7/10 → **10/10** |
  | Keyboard       | 298/422 → **422/422** | 14/21 → **21/21** |
  | Search Bar     | 0/36 → **36/36** | 0/4 → **4/4** |
  | **Totals**     | **197 rebound** | **14 rebound** |
- Each loose paint was mapped to a DS token by a luminance-plus-role
  decision function: text nodes pick from `text-*`, strokes from
  `border-*`, blue-dominant hex picks from `brand-secondary-*`,
  otherwise surface/border by luminance band. Original hex preserved as
  the paint's fallback color for traceability.
- All three sets now resolve correctly through the Color collection's
  Light / Dark modes — the `Dark Mode` / `Theme` variant axes have
  become redundant (each variant renders identically regardless of the
  axis value since the underlying tokens now flip with ambient mode).

**Typography untouched.** The user asked for token rebinds, not font
swaps — SF Pro / DM Sans remain. Swapping to Geologica would change
glyph metrics and break the hand-laid-out keyboard grid.

**Tokens added/rebound/removed:** 0 / 211 rebinds / 0.

**Follow-ups surfaced:**
- Redundant variant axes: `Keyboard & Indicator · Dark Mode` and
  `Search Bar · Theme` can be collapsed now that tokens drive color.
  Cuts keyboard variants 6 → 3 and search bar 4 → 2. Not done — that's
  a breaking change for any existing instances.
- Search Bar's iOS pill background (`#efeff4`) was mapped to
  `color/surface-muted` on the second and third sets but the first
  rebind used earlier thresholds that sent it to `color/surface`. This
  makes the pill invisible against the outer `color/surface` container
  in Light mode. Targeted re-map may be desired.
- All three sets still live outside the 80,80 master grid. Consider
  moving them into the standard grid (or onto a "Platform Chrome"
  page) for housekeeping.

**Lesson worth saving:** when `setBoundVariableForPaint` creates the
new paint, pass the **original color** as the paint's fallback rather
than `{r:0,g:0,b:0}`. Preserves traceability and lets future re-binds
re-evaluate from the original hex if the decision rules change.

---

## 2026-04-23 — First sample screen (Home · Light)

**Area:** screens

**Changes:**
- Created new page **"Sample Screens"** (`162:833`).
- Built first composed screen: **Home · Light** (`162:834`) at the
  standard mobile frame (390 × 844), composed from masters only — no
  one-off pixels, no untokened colors.
- Stack: Top Bar Brand (`108:728`) → padded content (greeting, Account
  Card, "Recent transactions" header with blue "See all" link, 3
  Transaction Rows in a `color/surface` bordered card with dividers
  between) → Tab Bar Home active (`22:12`).
- Account Card demonstrates Pattern B hero inversion against white
  background as designed.
- All transaction content populated via `setProperties` on the
  Transaction Row instances (Avatar / Merchant / Meta / Amount) —
  property keys discovered via runtime `componentProperties` lookup
  rather than hardcoding the hash-suffixed names.

**Components touched (instances only, not masters):**
Top Bar (Brand), Account Card, Transaction Row × 3, Divider × 2,
Tab Bar (Home). No master mutations.

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Gaps surfaced by composition:**
- **Vertical budget is tight.** With default greeting + Account Card
  (202) + Stat Card (152) + 5 transactions, content overflowed the
  704-px content region by ~100 px. Had to drop the Stat Card and
  trim the list to 3 rows. Either the Stat Card doesn't belong on
  Home in a mobile viewport, or we need a denser "summary" variant
  of it for Home.
- **Positive amounts read the same as negative.** Acme Corp salary
  "+3 200 000 UZS" renders in `color/text-primary` — same visual
  weight as the outgoing rows. A Transaction Row variant for
  Positive / Negative amount (binding Amount to `color/positive` /
  `color/text-primary`) would give the at-a-glance signal the Home
  screen wants. Not adding yet — flagged for a future pass.
- **Transaction Row assumes FIXED width.** The master has
  primary=FIXED counter=FIXED, which means `layoutSizingHorizontal =
  'FILL'` works on instances, but `HUG` would not. Fine as-is; just
  worth remembering before adding the row to a non-auto-layout parent.

**Follow-ups remaining:**
- Sample screens for Transfers / QR payment / Payments / Monitoring.
- Dark-mode sibling of the Home screen for visual regression against
  Pattern B.
- Code Connect mappings.
- Cover page.
- Manual Clash Display swap for the 9 Tier 2 section titles and the
  `Good morning, Sardor` / `Recent transactions` headings.

---

## 2026-04-23 — Tier 2 on-canvas doc sections

**Area:** docs

**Changes:**
- Added 9 new documentation sections to the on-canvas docs frame
  (`23:2`, VERTICAL auto-layout, appended in order): Progress Bar,
  Spinner, Skeleton, Empty State, Success State, Error State, Tooltip,
  Dropdown Menu, Top Bar.
- Each section follows the existing template: SPACE_BETWEEN header
  (title + description), overline-divider row, and a surface-muted
  stage frame containing centred component instance(s) with overline
  labels. Pattern matched against `85:441` Avatar / `86:478` Modal
  / `86:559` Toast.
- Docs container height grew from **12,353 → 17,170 px**; child count
  19 → 28.
- Clash Display text styles (manually swapped by user before this
  session) propagate through any styled children — so new stages
  inherit correct display typography. Section titles themselves are
  free-form Geologica SemiBold 40px (existing sections' pattern); they
  will need the same manual Clash Display swap that was done for the
  text styles.

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Components touched:** none — docs only (new `FRAME` wrappers around
existing component instances).

**Follow-ups (resolved this session):**
- Tier 2 on-canvas doc sections — **done**.

**Follow-ups remaining:**
- Sample mobile screens (Home / Transfers / QR / Payments / Monitoring).
- Code Connect mappings.
- Cover page.
- Manual Clash Display swap for the 9 new section titles (same
  procedure as the text styles pass).

**Lesson re-confirmed:** `resize()` resets `primaryAxisSizingMode` —
first Progress Bar section rendered at 1px tall until sizing modes
were re-applied after the `resize(1280, 1)` call. Already documented in
DS_LESSONS.md; burned through it again.

---

## 2026-04-23 — Reaffirmation checkpoint (no structural changes)

**Area:** all

**Changes:**
- None. Full read-only inventory scan confirms the file matches the
  previous checkpoint: 42 primitives, 29 color tokens, 10 spacing,
  6 radius, 15 text styles, 14 component sets, 17 single components,
  24 icons. All Color variable aliases unchanged across Light / Dark.
- `explicitVariableModes` locks: **0 detected** across all component
  sets and standalone components — confirms the Account Card lock fix
  has held since the bootstrap sync.
- Inventory detail extended: live TEXT defaults and INSTANCE_SWAP
  `preferredValues` now captured in `.inventory-current.json`
  (additive — not a Figma mutation).

**Tokens added/rebound/removed:** 0 / 0 / 0.

**Components touched:** none.

**Follow-ups:** carry-over from bootstrap — Tier 2 doc swatches,
sample screens, Code Connect mappings, Clash Display manual swap,
cover page.

---

## 2026-04-23 — Initial sync + bootstrap

**Area:** all

**Changes:**
- First run of `/ds_sync`. Bootstrapped docs folder from a live
  inventory scan. No Figma mutations in this sync.
- Consolidates a multi-session build to date: foundations →
  Tier 1 components → Tier 2 components → color system refinements
  (Pattern B hero, brand-secondary blue, brightened state colors,
  info family added, Primary button neutralized).

**Tokens (as of this sync, 87 total):**
- Primitives (42): stone (10), red (6), blue (6), garnet (5),
  amber (5), green (5), sky (4), white (1).
- Color (29): surface + background (4), border (3), text (6),
  brand (4), brand-secondary (4), positive (2), negative (2),
  warning (2), info (2).
- Spacing (10): space/1–10 on a 4pt-then-pragmatic ramp.
- Radius (6): xs / sm / md / lg / xl / full.

**Components touched:**
- Sets (14): Button, Input, Tab Bar, Switch, Switch Row, Checkbox,
  Checkbox Row, Avatar, Badge, Toast, OTP Input, Spinner, Skeleton,
  Top Bar.
- Single (17): Account Card, Transaction Row, Stat Card, Segmented
  Control, Divider, List Item, Modal, Bottom Sheet (+ 3 Sheet Slots),
  Progress Bar, Empty / Success / Error State, Tooltip,
  Dropdown Menu.
- Icons (24).

**Key palette decisions carried forward:**
- Red is reserved for brand identity, not interactive accents.
- Blue `#438BFA` is the interactive accent layer (tabs, switches,
  checkboxes, spinner, progress, tertiary button text, "See all" links).
- Primary button uses `color/surface-hero` (neutral black Light /
  near-white Dark), not brand red.
- Account Card uses Pattern B full inversion via `surface-hero` +
  `text-on-hero`.
- State palettes brightened to `500` (Light) / `400` (Dark) anchors.
- Toasts are pastel-tinted by state (`-subtle` bg + state-color border).

**Follow-ups:**
- No doc sections yet for Tier 2 components (Progress Bar, Spinner,
  Skeleton, Empty / Success / Error, Tooltip, Dropdown, Top Bar) in
  the on-canvas documentation. Masters exist; the doc page sidebar
  references them but swatches / usage blocks are pending.
- No sample mobile screens yet (Home, Transfers, QR, Payments,
  Monitoring).
- Code Connect mappings not attached.
- Clash Display typography is defined but falls back to Geologica
  render; needs manual font swap in Figma desktop after publish.
- Cover page not yet created — single "Design System" page holds
  both masters and docs.
