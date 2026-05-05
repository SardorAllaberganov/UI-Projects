# DS Components

Masters live on page `17:2` "Design System" in Figma file
`gSas2PBv3XMAXj36FQDhFa`. Platform-chrome masters (iOS system UI)
live on a separate page `197:863` "Platform Chrome · iOS".
Properties are listed with their Figma type in parentheses. Source:
[.inventory-current.json](./.inventory-current.json).

- [Component sets](#component-sets)
- [Single components](#single-components)
- [Icons](#icons)
- [Slot pattern](#slot-pattern)
- [iOS Platform Chrome](#ios-platform-chrome)

---

## Component sets

### Button — `19:2` (24 variants)

Axes: `Variant` × `Size` × `State`
- Variant: Primary, Secondary, Tertiary, Destructive
- Size: sm, md, lg
- State: Default, Disabled

Props:
- `Label` (TEXT, default "Button")
- `Show left icon` (BOOLEAN, default false)
- `Show right icon` (BOOLEAN, default false)
- `Left icon` (INSTANCE_SWAP, default arrow-left)
- `Right icon` (INSTANCE_SWAP, default arrow-right)

Preferred swap targets: arrow-right, arrow-left, plus, check, download, close.

Bindings:
- Primary Default → `color/surface-hero` bg, `color/text-on-hero` label (neutral black Light / white Dark, not brand red)
- Secondary → `color/surface` bg, `color/border` stroke, `color/text-primary` label
- Tertiary → transparent bg, `color/brand-secondary` text + icon
- Destructive → `color/negative` bg, `color/text-on-brand` label

---

### Input — `36:107` (10 variants)

Axes: `Style` (Boxed, Bottom-lined) × `State` (Default, Focus, Filled,
Error, Disabled).

Props:
- `Label` (TEXT, default "Label")
- `Value` (TEXT, default "Value")
- `Helper` (TEXT, default "Helper text")
- `Show helper` (BOOLEAN, default true)
- `Show left icon` (BOOLEAN, default false)
- `Show right icon` (BOOLEAN, default false)
- `Left icon` (INSTANCE_SWAP, default `search`; preferred values:
  search, close, check, arrow-right, arrow-left, chevron-right,
  chevron-down, eye, bell, user)
- `Right icon` (INSTANCE_SWAP, default `close`; same preferred list)

**Boxed** — full-rectangle border + radius, label sits above the box.
The Tinkoff/Account-style default.

**Bottom-lined** — single 1 px bottom border, no fill, no radius.
Floating-label pattern used by AsiaSend Auth and similar legacy flows:
- Default + Disabled: Label sits at input-text size (16 / 22) inside
  the row as the placeholder.
- Focus + Filled + Error: Label floats up + shrinks to 12 / 16 caption
  scale, Value text appears below it.

Both styles share Icon slot wiring. Icons sit inside the Input Box
flex row with 8 px gap; Value TEXT has `layoutGrow = 1` so it stretches
between whichever icons are visible. Toggle `Show left icon` /
`Show right icon` per instance.

Error state binds border + helper text to `color/negative`. Focus state
binds border to `color/brand-secondary`. Bottom-lined Disabled binds
border to `color/border-subtle`.

---

### Tab Bar — `54:309` (5 variants)

Axis: `Active` — Home, Transfers, QR payment, Payments, Monitoring.

All active-tab indicators (icon stroke + label fill) bind to
`color/brand-secondary`. The `QR payment` variant uses a center FAB;
when active its fill also binds to `color/brand-secondary`.

---

### Switch — `77:327` (2 variants)

Axis: `State` — Off, On. On-state track fill binds to `color/brand-secondary`.

---

### Switch Row — `83:384` (4 variants)

Axes: `Label position` (Left, Right) × `State` (Off, On).
Embeds the Switch master as a nested instance; the Switch binding
drives color.

Prop: `Label` (TEXT, default "Setting label").

---

### Checkbox — `77:335` (3 variants)

Axis: `State` — Unchecked, Checked, Indeterminate. Checked + Indeterminate
box fills bind to `color/brand-secondary`.

---

### Checkbox Row — `83:411` (6 variants)

Axes: `Label position` (Left, Right) × `State` (Unchecked, Checked, Indeterminate).
Prop: `Label` (TEXT, default "Option label").

---

### Avatar — `78:328` (3 variants)

Axis: `Size` — sm / md / lg. Prop: `Initials` (TEXT, default "A").
Circle fill binds to `color/surface-muted`, initials to `color/text-primary`.

---

### Badge — `78:339` (6 variants)

Axis: `Variant` — Neutral, Positive, Negative, Warning, Brand, Info.
Prop: `Label` (TEXT, default "Badge").

Per-variant bg / text bindings:
- Neutral → `surface-muted` / `text-secondary`
- Positive → `positive-subtle` / `positive`
- Negative → `negative-subtle` / `negative`
- Warning → `warning-subtle` / `warning`
- Brand → `brand-subtle` / `brand`
- Info → `info-subtle` / `info`

---

### Toast — `79:402` (4 variants)

Axis: `Type` — Success, Info, Error, Warning. Prop: `Message` (TEXT).

Pastel-tinted per state:
- Success → `positive-subtle` bg, `positive` border + icon
- Info → `info-subtle` bg, `info` border + icon
- Error → `negative-subtle` bg, `negative` border + icon
- Warning → `warning-subtle` bg, `warning` border + icon

Message text always `color/text-primary`.

---

### OTP Input — `81:366` (3 variants)

Axis: `State` — Default, Filled, Error. 4-cell layout.
Error cell border binds to `color/negative`.

---

### PIN Dots — `270:330` (7 variants)

Axis: `Filled` — 0, 1, 2, 3, 4, 5, 6. Six 12 × 12 circles in a row,
14 px gap. Filled dots bind to `color/text-primary`; empty dots use a
1 px `color/border` stroke. Drives the entry-progress indicator on
Set PIN / Enter PIN screens.

Library key: `859e80c17a296a2373918288b811c5e00e05fad6`.

---

### Spinner — `106:696` (3 variants)

Axis: `Size` — sm / md / lg. Arc stroke binds to `color/brand-secondary`.

---

### Full-screen Loader — `270:276` (single component)

402 × 874 frame, `color/background` fill. Centered Avatar (lg) over
title (`Загрузка…` placeholder, `subtitle` style on `color/text-primary`)
and caption (`Пожалуйста, подождите`, `body/sm` on `color/text-secondary`).
Intended as a blocking auth / network state.

Props:
- `Title` (TEXT, default "Loading…")
- `Caption` (TEXT, default "Please wait")

Library key: `06db3e929c17990e142ed313f6387541aec99c29`.

---

### Skeleton — `106:700` (3 variants)

Axis: `Type` — Line, Block, Circle. Fill binds to `color/surface-muted`.

---

### Top Bar — `108:752` (3 variants)

Axis: `Layout` — Screen (back + title), Brand (logo + bell),
Large (large title block).

---

### Radio — `213:969` (2 variants)

Axis: `State` — Unchecked, Checked. 20 × 20 circular; checked state
fills inner 10 × 10 dot bound to `color/brand-secondary`.

### Radio Row — `213:984` (4 variants)

Axes: `Label position` (Left, Right) × `State` (Unchecked, Checked).
Prop: `Label` (TEXT, default "Option label"). Embeds Radio master as
a nested instance.

### Chip — `214:974` (3 variants)

Axis: `State` — Default / Selected / Disabled. Pill-shaped
(corner-radius full) with label. Default: surface + border. Selected:
`brand-secondary-subtle` bg + `brand-secondary` text + border. Disabled:
`surface-muted`. Prop: `Label` (TEXT, default "Filter").

### Card Visual — `216:992` (2 variants)

Axis: `Theme` — Primary (surface-hero / Pattern B inversion), Brand (red).
340 × 210 credit/debit card mock. Contains amber chip, network wordmark,
card number, cardholder, expiry.

Props:
- `Number` (TEXT, default "•••• •••• •••• 4892")
- `Holder` (TEXT, default "SARDOR ISLOMOV")
- `Expiry` (TEXT, default "08/28")
- `Network` (TEXT, default "VISA")

### Amount Input — `218:978` (2 variants)

Axis: `State` — Default / Error. Large centered amount + currency
suffix + helper line. Error state flips amount and helper to
`color/negative`.

Props:
- `Amount`   (TEXT, default "5 000 000")
- `Currency` (TEXT, default "UZS")
- `Helper`   (TEXT, default "Available: 12 847 930 UZS")
- `Show helper` (BOOLEAN, default true)

### App Numpad — `219:1041` (2 variants)

Axis: `Layout` — With letters (phone-dialer style with ABC / DEF / GHI
sub-letters under digits), PIN (plain digits + biometric-placeholder
eye icon left + delete icon right). 3 × 4 grid of 72 × 72 circular
keys on `surface-muted` backgrounds.

### FAB — `229:1223` (2 variants)

Axis: `Size` — md (56), lg (64). Circular floating action button.
Fill bound to `color/surface-hero` (Pattern B — flips with Color
mode). Icon recolored to `color/text-on-hero` for contrast against
the dark / near-white bg. 12 px drop shadow at 12 % black for
elevation.

Prop: `Icon` (INSTANCE_SWAP, default `plus` · preferred values:
plus, close, arrow-right, check).

### Stepper — `226:1232` (2 variants)

Axis: `State` — Default / Disabled. Pill-shaped row with
`[−] value [+]` layout. Container bg `color/surface`, 1 px border
`color/border`. `−` / `+` buttons are 32 × 32 circles on
`color/surface-muted`. Value text centered in a 40-wide slot.

Prop: `Value` (TEXT, default "3").

Disabled variant mutes the − / + glyphs and the value to
`color/text-tertiary`.

### Content Tabs — `232:1236` (3 variants)

Axis: `Active` — Tab 1, Tab 2, Tab 3. Full-width 360. 3 equal-grow
cells, each 12 px vertical padding around a SemiBold 15 / 20 label.

Per-cell individual bottom stroke:
- Active cell: 2 px `color/brand-secondary` + label in
  `color/text-primary`.
- Inactive cells: 1 px `color/border-subtle` + label in
  `color/text-secondary`.

Default labels: "All", "Income", "Spending" — override per instance.

### Section Header — `241:1303` (single component)

HORIZONTAL SPACE_BETWEEN with title on the left and an optional
"See all" action link on the right. Title uses `title/sm`
(`color/text-primary`); action uses `body/sm` Medium bound to
`color/brand-secondary`. Default width 360 (FIXED), height hugs.

Props:
- `Title` (TEXT, default "Recent transactions")
- `Action` (TEXT, default "See all")
- `Show action` (BOOLEAN, default true)

### Receipt Row — `241:1312` (2 variants)

Axis: `Variant` — Default / Emphasized. Label on the left in
`color/text-secondary`, value on the right in `color/text-primary`.
Emphasized variant swaps value to `title/sm` SemiBold for totals /
summary rows. BASELINE-aligned.

Props:
- `Label` (TEXT, default "Transfer fee")
- `Value` (TEXT, default "12 000 UZS")

### Progress Steps — `241:1331` (3 variants)

Axis: `Current` — Step 1 / Step 2 / Step 3 (3-step flow). Rendered
as a HORIZONTAL row of circular dots with flex connectors:

- **Past:** 12 × 12 circle filled `color/brand-secondary`, connector
  to next step in `color/brand-secondary`.
- **Current:** 16 × 16 circle filled `color/brand-secondary` (bumped
  up 4 px for emphasis).
- **Future:** 12 × 12 circle outlined with 1.5 px `color/border`
  stroke, connector in `color/border`.

### Onboarding Slide — `245:1311` (single component)

Full-bleed onboarding template · 390 wide:
- **Hero** · 390 × 280 · `color/brand-secondary-subtle` bg, centered
  `color/surface-hero` rounded square (120 × 120, r = 24) containing
  a 56 × 56 `card` icon recolored to `color/text-on-hero`.
- **Body** · VERTICAL stack of Title (Geologica SemiBold 28 / 34 —
  direct font, not `title/lg` style, since Clash Display doesn't
  load in the plugin API) + Description (`body`,
  `color/text-secondary`), both centered.
- **CTA** · full-width Primary md button ("Get started").

Props:
- `Title` (TEXT, default "Your money, simplified")
- `Description` (TEXT, default "Send, save, and track every UZS in one place. Works with every Uzbek bank.")

### Slider — `259:260` (2 variants)

Axis: `State` — Default / Disabled. Horizontal 320-wide control:
- 4 px rounded track · `color/surface-muted`
- Active fill overlay (40 % of track width by default) · `color/brand-secondary` (Default) / `color/border-subtle` (Disabled)
- 20 × 20 thumb · `color/surface` fill + 2 px `color/brand-secondary` stroke (Default) / `color/border-subtle` stroke (Disabled) · 4 px drop shadow

Active fill + thumb use absolute positioning inside the track wrapper — move them on instances to represent the slider value.

### Card — `259:261` (single component)

Generic container block. 360 × auto · VERTICAL auto-layout ·
`color/surface` bg · 1 px `color/border` outline · 16 radius ·
20 px padding · 8 px gap between placeholder Title and Body.

Props:
- `Title` (TEXT, default "Card title")
- `Body`  (TEXT, default "Body text — replace with any content.")
- `Show border` (BOOLEAN, default true)

### Notification Banner — `260:296` (4 variants)

Axis: `Type` — Info / Positive / Negative / Warning. 360-wide inline
alert (distinct from floating Toast).

Structure: 24 × 24 icon (recolored to type color) · Title + Description text column (`layoutGrow = 1`) · 20 × 20 close X icon.

Per-type tokens:
| Type | Bg | Icon tint | Default icon |
|---|---|---|---|
| Info     | `color/info-subtle`     | `color/info`     | alert-circle |
| Positive | `color/positive-subtle` | `color/positive` | check |
| Negative | `color/negative-subtle` | `color/negative` | alert-circle |
| Warning  | `color/warning-subtle`  | `color/warning`  | alert-circle |

Props:
- `Title`       (TEXT, default "Update available")
- `Description` (TEXT, default "Tap Update in Settings to get the latest features.")
- `Show close`  (BOOLEAN, default true)

### Accordion — `261:286` (2 variants)

Axis: `State` — Collapsed / Expanded. 360-wide card with
`color/surface` bg + 1 px `color/border`, 12 padding, radius 12.

- **Collapsed:** Title (SemiBold body) + chevron-down on right.
- **Expanded:** Title + chevron rotated 180 ° + divider + body text (`color/text-secondary`).

Props:
- `Title` (TEXT, default "What is a virtual card?")
- `Body`  (TEXT, default "A virtual card is a digital-only debit card…")

### Pagination Dots — `261:307` (4 variants)

Axis: `Active` — Dot 1 / 2 / 3 / 4. Horizontal row of 4 dots with 8 px
gap:
- **Active** dot: 24 × 8 rounded pill · `color/brand-secondary`.
- **Inactive** dots: 8 × 8 circles · `color/border`.

Use inside onboarding carousels or multi-step previews.

### Alert Dialog — `233:1279` (2 variants)

Axis: `Type` — Warning / Destructive. 340-wide card (`color/surface`
bg, 16 radius, 24 padding). VERTICAL stack:

1. 40 × 40 tinted circle with `alert-circle` icon (24 × 24).
   Warning → `color/warning-subtle` bg + `color/warning` icon.
   Destructive → `color/negative-subtle` bg + `color/negative` icon.
2. Title (`title/sm`, `color/text-primary`).
3. Description (`body`, `color/text-secondary`).
4. Actions row — `Cancel` (Secondary md) + `Confirm` / `Delete`
   (Primary md for Warning, Destructive md for Destructive). Both
   buttons `layoutGrow = 1` so they split the row evenly.

Props:
- `Title`       (TEXT, default "Review before sending")
- `Description` (TEXT, default "The recipient's IBAN looks new.")

Distinct from `Modal` (`79:326`): Modal is generic overlay content;
Alert Dialog is specifically for confirmation / destructive
decisions with a tinted icon glyph.

### Date Picker — `220:975` (single component)

Single-month calendar card · 336 wide · VERTICAL layout:

- **Header** — HORIZONTAL with `SPACE_BETWEEN`:
  `←` (arrow-left · prev month) · `March 2026 ⌄`
  (month label + `chevron-down` — placeholder for a month/year picker
  trigger) · `→` (arrow-right · next month).
- **DOW row** — `MON TUE WED THU FRI SAT SUN` · Monday-first (ISO week) · 11 px SemiBold, 8 % tracking, `color/text-tertiary`.
- **Day grid** — 6 × 7 cells. Each cell is a 36 × 36 circle, text
  centered. Cells outside the current month render in
  `color/text-tertiary`.

Example state renders March 2026 · `today = 15` (outlined in
`color/brand-secondary`) · `selected = 23` (filled
`color/brand-secondary` with `color/text-on-brand` label).
March 1, 2026 is a Sunday → the last column of Row 1; Feb 23–28 fill
the preceding Monday–Saturday cells.

No component properties exposed — rebind day labels and state marks
on the instance as needed.

---

## Single components

| Name | Id | Props |
|---|---|---|
| Account Card (Pattern B) | `21:2` | Account label, Type, Balance, Change amount, Change period (TEXT); Show change (BOOLEAN) |
| Transaction Row | `21:14` | Avatar, Merchant, Meta, Amount (TEXT) |
| Stat Card | `21:21` | Label, Value, Change, Change label (TEXT) |
| Segmented Control | `22:36` | — |
| Divider | `77:336` | — |
| List Item | `78:340` | Title, Subtitle (TEXT); Show subtitle, Show leading icon, Show trailing icon (BOOLEAN); Leading icon, Trailing icon (INSTANCE_SWAP across all 24 icons) |
| Modal | `79:326` | Title, Description (TEXT) |
| Bottom Sheet | `79:353` | Title (TEXT); Content (INSTANCE_SWAP) — see [Slot pattern](#slot-pattern) |
| Sheet Slot / Account Picker | `103:644` | — |
| Sheet Slot / Action Menu | `103:667` | — |
| Sheet Slot / Empty | `103:703` | — |
| Progress Bar | `106:682` | Fill child binds to `color/brand-secondary` |
| Empty State | `107:682` | Title, Description (TEXT) |
| Success State | `107:715` | Title, Description (TEXT) |
| Error State | `107:740` | Title, Description (TEXT) |
| Tooltip | `108:700` | Label (TEXT) |
| Dropdown Menu | `108:705` | — |

Account Card note: master had `explicitVariableModes` locked to Light
during an earlier iteration — now cleared so it inverts correctly in the
Dark mode preview (`clearExplicitVariableModeForCollection`).

---

## Slot pattern

`Bottom Sheet` exposes a `Content` property of type INSTANCE_SWAP.
The inner frame of the sheet is an instance of a dedicated "Sheet Slot"
component, which can be swapped for any other Sheet Slot via the
picker. Default: `103:644` (Account Picker). PreferredValues surfaces
all three slots at the top of the swap menu.

This is the template for future slot-bearing components (Modal body,
Tooltip body variants, etc.).

---

## Icons

All 20×20 single components on the top strip of the page (y=0).

arrow-right `43:103`, arrow-left `43:106`, plus `43:109`, check `43:112`,
download `43:115`, close `43:118`, search `47:142`, filter `47:146`,
bell `47:149`, user `47:152`, home `47:156`, chevron-right `47:159`,
chevron-down `47:162`, eye `47:165`, more `47:169`, copy `47:174`,
transfers `55:150`, qr `55:153`, card `55:165`, chart-up `55:169`,
arrow-up `55:172`, arrow-down `55:175`, alert-circle `55:178`,
bell-active `82:876`.

---

## iOS Platform Chrome

Apple UIKit reproductions used inside mobile mockups. Masters live on
page `197:863` "Platform Chrome · iOS", positioned at x=80 with a
page-header at the top and the three sets stacked vertically.

**Scope rule — critical:** these components render with iOS system
colors (`color/ios-*` tokens). App content must never bind to
`color/ios-*` — use the DS semantic tokens (`text-*`, `surface-*`,
`border-*`, `brand-secondary`) for anything that isn't literal
platform chrome. The `ios-*` palette is cool blue-grey and reads as
"Apple"; the DS palette is warm stone and reads as "brand".

Summary of each component's semantics and variant matrix. Full
token-binding audits live in [DS_HISTORY.md](./DS_HISTORY.md).

### iOS Home Indicator — `207:990` (single component)

Standalone 390 × 34 component for the bottom-of-screen iOS home-bar
pill. Internals: a 134 × 5 rounded RECTANGLE (corner radius 2.5)
centered horizontally, 8 px from the bottom. Bar fill is bound to
`color/ios-label` — dark pill on Light content, light pill on Dark.

No properties. Use directly as the last child of a mobile screen frame
so the screen's auto-layout reserves the bottom iPhone safe-area.

### iOS Status Bar — `144:3519` (2 variants)

Axis: `Type` — `Default`, `Cupertino Bottom Sheet`.

- **Default** (`144:3551`, 375×43): white bar with black time +
  signal / wifi / battery icons. bg = `ios-bar-background`; icons =
  `ios-label`.
- **Cupertino Bottom Sheet** (`144:3520`, 375×62): used when a modal
  sheet is presented — the area behind the sheet becomes an
  always-black scrim (`color/ios-backdrop`) with white "Fixed White"
  overlay icons (`color/ios-overlay-white`). The sheet card top
  peeks in with a rounded edge + dark pinch handle.

No TEXT or INSTANCE_SWAP properties.

### iOS Search Bar — `144:4153` (4 variants)

Axes: `Type` (Default, Focus) × `Theme` (Light, Dark).

Every variant pairs a bar container with a slightly-contrasting
pill (the search field). Focus variants add a blue "Cancel" button
and preceding vertical divider.

| | Light | Dark |
|---|---|---|
| Bar bg | `ios-bar-bg-light` `#f9f9f9` | `ios-bar-bg-dark` `#1c1c1e` |
| Pill bg (`Search Field` RECT) | `ios-fill-light` `#efeff4` | `ios-fill-dark` `#2c2c2e` |
| Placeholder text | `ios-label-sec-light` `#3c3c43` | `ios-overlay-white` |
| Icons (magnifying glass, mic, ⊗) | `ios-label-ter-light` `#767680` | `ios-label-sec-dark` `#ebebf5` |
| Cancel text | `ios-accent-light` `#007aff` | `ios-accent-dark` `#0a84ff` |
| Divider (Focus only) | `ios-separator-light` `#e5e5ea` | `ios-separator-dark` `#38383a` |

All bindings use **mode-stable** iOS tokens so the `Theme=` axis
renders correctly regardless of the file's ambient Color collection
mode.

### iOS Keyboard — `144:3568` (6 variants)

Axes: `Type` (Letters, Numpad, Calculator) × `Dark Mode` (False, True).

Each variant also carries six BOOLEAN properties for toggling
optional accessory rows on the keyboard. Every property is wired to
the relevant node's `visible` state via `componentPropertyReferences`:

| Property | Default | Controls node | Role |
|---|---|---|---|
| `Show Keyboard Layouts` | true  | `Background` FRAME         | The keyboard face + keys. Toggle off to hide the entire keyboard (rare; useful for empty-state previews). |
| `Show Button`           | false | `Buttons` INSTANCE → DS Button `18:6` | Primary-action button bar across the top (e.g. "Pay", "Continue"). |
| `Show Toolbar`          | false | `Input Accessory View` FRAME | Navigation toolbar (prev/next arrows + "Done" label). |
| `Show Suggestion`       | false | `Auto Complete` FRAME      | Predictive-text suggestion strip. |
| `Show Decimal Point`    | false | Numpad decimal key         | Shows the `.` key on Numpad variants. |
| `Show Glyphs`           | false | Secondary letter group    | Sub-letters like `ABC` under `2`. |

**`Buttons` accessory — DS Button wrapped in an auto-layout frame.**
The original imported kit put its own Apple-styled button accessory
here (`144:2446`). That has been swapped across all 6 variants for a
DS Button (Primary / md / Default · `18:6`) wrapped inside an
**auto-layout FRAME** so padding can be added later without resizing
the button.

Structure (per variant):

```
Buttons (FRAME, auto-layout HORIZONTAL, 393×44)
  pad=0/0/0/0, gap=0, primary=FIXED 393, counter=AUTO
  counterAxisAlignItems=CENTER
  componentPropertyReferences = { visible: "Show Button#2163:0" }
└─ Button (INSTANCE of 18:6, layoutSizingHorizontal=FILL)
```

Why wrapped:
- Adding `paddingLeft`/`paddingRight` to the wrapper (e.g. 16px)
  automatically shrinks the button to fit — the button is set to
  `layoutSizingHorizontal = 'FILL'`.
- The `Show Button` BOOLEAN gates the **wrapper's** visibility, so
  toggling off hides the entire accessory area (padding included).
  The button itself has no property reference — it always inherits
  from the wrapper.
- Counter-axis is AUTO so if a taller button size is used later, the
  wrapper hugs it.

Override the Label / icons on each keyboard instance via the nested
DS Button instance.

**Face vs modifier keys** (mode-stable per variant):

| | Light | Dark |
|---|---|---|
| Keyboard bg | `ios-separator-light` / `ios-key-bg-light` | `ios-key-bg-dark` `#151515` |
| Letter / number / space face | `ios-key-face-light` `#ffffff` | `ios-key-face-dark` `#6c6c70` |
| Modifier (shift, ABC, return, operators) | `ios-key-mod-light` `#abb2c1` | `ios-key-mod-dark` `#474747` |
| Key label text | `ios-backdrop` (black) | `ios-overlay-white` |
| Secondary (sub-letters e.g. `ABC` on `2`) | `ios-label-sec-light` | `ios-label-sec-dark` |

**Calculator classification:** digits vs operators are distinguished
by **column position** (leftmost + rightmost X column in a row =
operator/mod; middle columns = digit/face). The wide `0` (226×46) is
always face; the tall `=` (71×98) is always mod.

**Known redundancy:** the `Dark Mode` axis is architecturally
redundant — all paints now use mode-stable tokens, so each variant's
appearance is hard-coded by the `Dark Mode` value, not by the file's
Color collection mode. Collapsing `Dark Mode` would cut variants 6→3
but is a breaking change for any existing instances; deferred.
