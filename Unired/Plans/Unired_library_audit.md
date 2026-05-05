# Unired V.3.2 — Library, tokens, and styles audit

Captured: 2026-04-27
Source file: `GJBbklVuiklO68yppUKYJq`

## Variable collections

| Collection | ID | Modes | Variables |
|---|---|---|---|
| Main variables collection | `VariableCollectionId:384:273` | **Light only** (1 mode) | 24 |
| Color palette | `VariableCollectionId:1157:4759` | Light, Dark | 28 |

**Observation.** Two collections — one of them (`Main variables collection`)
has only the Light mode. That's the **theming gap**: Dark theme is partially
covered by `Color palette` only. Anything bound to `Main variables collection`
will not flip on theme switch.

---

## Type system

**Font family: Manrope** (Regular, Medium, SemiBold, Bold).

46 text styles, organized as a fluid scale from `text-xs/12` up through
`display-xl`, each weight defined as its own style.

### Text scale

| Group | Sizes |
|---|---|
| text-xs | 12 |
| text-sm | 14 |
| text-md | 16 |
| text-lg | 18 |
| text-xl | 20 |
| display-xs | 24 |
| display-sm | 28 |
| display-md | 36 |
| display-lg | (presumed 48) |
| display-xl | (presumed 60) |

Each size × 4 weights (Regular / Medium / SemiBold / Bold) → ~40 styles in
the `text-*/display-*` grid + a few extras. This is a Tailwind-style ramp,
not the Apple Human-Interface ramp our DS uses.

---

## Effect & paint styles

| Type | Count |
|---|---|
| Effect styles | 4 |
| Paint styles | 1 (`Ucoin gradient`) |

Effect styles are likely the standard shadow ramp (sm / md / lg / xl). Only
one paint style is a named asset (`Ucoin gradient`) — everything else is
either token-bound or loose hex.

---

## Component library — `❖ Components` page

**244 top-level nodes** on the page, split as follows.

### System components (33) — `9351:91196`

The actual UI primitives. These are what a redesign would map against.

| Component | Type | Variants | Notes |
|---|---|---|---|
| Button | COMPONENT_SET | 24 | Variant × Size × State, similar shape to our DS Button (24). |
| Input | COMPONENT_SET | 35 | Larger axis space than ours (35 vs 10). Includes states + types in one set. |
| Bottom menu | COMPONENT_SET | 5 | Active-tab variants. |
| Bottom Menu New | COMPONENT_SET | 4 | A redesigned variant of Bottom menu — *both versions ship*, so the new one isn't fully adopted yet. |
| Top navbar | COMPONENT_SET | 2 | Likely Default / With back. |
| Status Bar | COMPONENT_SET | 2 | Light / Dark or Filled / Hidden. |
| Switch | COMPONENT_SET | 4 | State × Label position (likely). |
| Checkbox | COMPONENT_SET | 4 | |
| Caret | COMPONENT_SET | 2 | Up / Down or visible / hidden. |
| Indicator | COMPONENT_SET | 4 | Likely PIN / progress dot indicator. |
| PIN Code | COMPONENT_SET | 2 | The PIN-entry dot row. |
| Loader | COMPONENT_SET | 8 | 8 loader variants — multiple animation presets. |
| Theme Icons | COMPONENT_SET | 2 | |
| Stories Item | COMPONENT_SET | 2 | |
| Tab Item | COMPONENT_SET | 2 | |
| Card | COMPONENT_SET | 2 | The generic content-card primitive (not bank card). |
| Badges | COMPONENT_SET | 2 | |
| Alert Info | COMPONENT_SET | 5 | One per state (info / success / warning / error / neutral). |
| Tooltip | COMPONENT | — | |
| List item | COMPONENT | — | Multiple List-Item flavors exist (`List item`, `List -> List Item`, `Monitoring / List Item / New`, `List item - Monitoring/Default`). Not consolidated. |
| Modal - status | COMPONENT | — | Status-modal pattern. |
| Section Heading | COMPONENT | — | |
| Action Buttons Section | COMPONENT | — | |
| Tab | COMPONENT | — | Two `Tab` standalones exist (375×40 each). |
| Stories Block | COMPONENT | — | |
| Progress circle | COMPONENT | — | |
| Progress Item | COMPONENT | — | |
| Text Instance | COMPONENT | — | A 25×16 placeholder text component. |
| Button / Description | COMPONENT | — | |

### Asset / branding sets (the rest of the 36 component sets)

These are the visual assets — not UI primitives. They live outside
`System components` on the same page.

| Set | Variants | Role |
|---|---|---|
| Country Flags | 96 | All country flags (CIS focus + extended). |
| Big-Card-Background | 46 | Bank-card art — large variants. |
| Mini-Card-Background | 46 | Bank-card art — small variants. |
| Bank Card | 9 | The interactive bank-card component (23 props — heavy). |
| Uzbekistan Bank Logos Full | 36 | Wordmark + crest pairs for UZ banks. |
| **Uzbekistan Bank Icons** | **165** | Largest single set in the file. Per-bank monogram. |
| Russian Bank Logos | 21 | |
| Full Russian Bank Icons | 154 | Per-bank monogram. |
| Korean Bank Logos | 54 | |
| Transfer Flags | 13 | |
| Transfer 3D icons | 9 | |
| Transfer App logos | 5 | |
| Payment System Logos | 26 | |
| Payment Types | 41 | Heavy — many transfer / payment type tiles. |
| Payment Service Icons | 6 | |
| Communication providers | 9 | Mobile-carrier logos. |
| Splash screen illustrations | 4 | |
| Service illustrations | 18 | |
| Service illustrations - old | 20 | A previous rev still kept in file. |
| Status Icons | 17 | |
| Different Backgrounds | 12 | |
| Category Illustration | 30 | |
| Card Input | 9 | The card-number-entry composite. |
| Allowed cards | 2 | |
| Stars container | 6 | Rating UI. |
| Image Tab | 3 | |
| Saved | 4 | |
| Monitoring icons | 6 | |
| Chat container | 2 | |
| Pie chart modul | 2 | Monitoring / analytics. |
| Stamp | 6 | "Status" stamp overlays for cheques. |
| Icon Container | 3 | |
| Container | 3 | |
| Custom Icons | 4 | |
| Bottom Menu Duotone | 4 | Older bottom-menu icon set (pre-current). |
| Alliances | 3 | |

### Standalone components (141)

Mostly **icon variants** (e.g. every `Payment System Logos/<brand>/<size>`
combination is published as a single component rather than a single set with
size axis). This bloats the published library considerably — 141 individual
components where 8–10 sets would suffice.

---

## Observations / risks

1. **Duplicate / parallel components.** `Bottom menu` (5) and `Bottom Menu
   New` (4) both exist. `Service illustrations` and `Service illustrations -
   old` both exist. Some screens consume the new, some the old — adoption is
   partial.
2. **Underspecced variants.** Several primitives have only 2 variants
   (Switch, Tooltip, etc.) where state coverage usually demands 4–8. Hover /
   pressed / disabled states are often baked into the screen rather than a
   variant.
3. **Theming gap.** `Main variables collection` only has Light mode. Dark
   theme is partial — anything bound to that collection won't flip.
4. **Naming drift in the System section.** Multiple `List Item` flavors
   (`List item`, `List -> List Item`, `Monitoring / List Item / New`,
   `List item - Monitoring/Default`) — same role, four masters.
5. **Heavy asset library.** ~480 brand / bank / flag / illustration variants.
   This is normal for a multi-country fintech, but a future DS migration
   should wrap these as INSTANCE_SWAP slots (the DS file pattern) rather
   than reproducing them.
6. **No published library.** All these masters are *local* to this Figma
   file. They are not enabled as a remote library — every consumer file
   would need to copy them.

---

## Compared to our DS (`gSas2PBv3XMAXj36FQDhFa`)

| Dimension | Unired | Our DS |
|---|---|---|
| Frame canvas size | 375 × 812 | 402 × 874 |
| Type ramp | Manrope, Tailwind-style (text-xs..display-xl × 4 weights = 46) | Geologica + Clash Display, semantic (display/title/body/label/caption = ~14) |
| Color modes | Light, partial Dark | Light + Dark (Pattern B inversion) |
| Variable collections | 2 (one mode-incomplete) | 4 (Primitives, Color L/D, Spacing, Radius) |
| UI primitives | 33 system components | 30 component sets + 21 single = 51 |
| Asset components | ~480 (bank logos, flags, etc.) | Minimal — INSTANCE_SWAP slots |
| Library state | Local only, not published | Published as Mobile App Fintech DS |

A full migration to our DS would mostly be a **screen-level rebuild**, not a
component-level lift-and-shift. The asset sets (bank icons, flags) are worth
preserving wholesale.
