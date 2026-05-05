# DS Tokens

Every design token, traced to its primitive alias per mode. Split by
collection. Source: [.inventory-current.json](./.inventory-current.json).

- [Primitives](#primitives) — raw hex values, single mode
- [Color](#color) — Light / Dark semantic aliases
- [Spacing](#spacing) — 4pt scale
- [Radius](#radius)

---

## Primitives

Collection `VariableCollectionId:4:2`. Single mode "Value". Scopes `[]`
(hidden from pickers) — only consumed via aliasing from Color.

### Brand red

| Token | Hex | Notes |
|---|---|---|
| `red/50` | `#fbeced` | brand-subtle (Light) |
| `red/400` | `#de4955` | brand-hover (Dark) |
| `red/500` | `#d2222d` | **brand anchor** |
| `red/600` | `#b41b24` | brand-hover (Light) / brand-pressed (Dark) |
| `red/700` | `#8f1218` | brand-pressed (Light) |
| `red/900` | `#3d0b0f` | brand-subtle (Dark) |

### Brand-secondary blue

| Token | Hex | Notes |
|---|---|---|
| `blue/50` | `#ecf2fe` | brand-secondary-subtle (Light) |
| `blue/400` | `#79abfb` | brand-secondary (Dark) |
| `blue/500` | `#438bfa` | **brand-secondary anchor** |
| `blue/600` | `#1b73ec` | brand-secondary-hover (Light) |
| `blue/700` | `#155cc0` | brand-secondary-pressed (Light) |
| `blue/900` | `#0f2e5b` | brand-secondary-subtle (Dark) |

### Neutral stone

| Token | Hex |
|---|---|
| `stone/50` | `#f6f5f2` |
| `stone/100` | `#eceae5` |
| `stone/200` | `#d8d5ce` |
| `stone/300` | `#b5b0a5` |
| `stone/400` | `#9e9a92` |
| `stone/600` | `#5e5a54` |
| `stone/700` | `#3c3933` |
| `stone/800` | `#2b2925` |
| `stone/900` | `#1a1918` |
| `stone/950` | `#141312` |
| `white` | `#ffffff` |

### State palettes

Green (positive):

| Token | Hex |
|---|---|
| `green/50` | `#e8f3ec` |
| `green/400` | `#4ade80` |
| `green/500` | `#22c55e` |
| `green/700` | `#1f7a4c` |
| `green/900` | `#0d2e1b` |

Garnet (negative):

| Token | Hex |
|---|---|
| `garnet/50` | `#f7e8e9` |
| `garnet/400` | `#f87171` |
| `garnet/500` | `#dc2626` |
| `garnet/800` | `#7a1820` |
| `garnet/900` | `#2e0a0d` |

Amber (warning):

| Token | Hex |
|---|---|
| `amber/50` | `#f9eedb` |
| `amber/400` | `#fbbf24` |
| `amber/500` | `#f59e0b` |
| `amber/600` | `#b67a1f` |
| `amber/900` | `#3d2a0a` |

Sky (info):

| Token | Hex |
|---|---|
| `sky/50` | `#f0f9ff` |
| `sky/400` | `#38bdf8` |
| `sky/500` | `#0ea5e9` |
| `sky/900` | `#0c4a6e` |

---

## Color

Collection `VariableCollectionId:5:2`. Modes: Light (`5:0`), Dark (`59:0`).
Code syntax: `var(--color-*)`.

### Surface + background

| Token | Light | Dark | Scopes |
|---|---|---|---|
| `color/background` | white | stone/950 | FRAME_FILL, SHAPE_FILL |
| `color/surface` | white | stone/900 | FRAME_FILL, SHAPE_FILL |
| `color/surface-muted` | stone/50 | stone/800 | FRAME_FILL, SHAPE_FILL |
| `color/surface-hero` | stone/950 | stone/50 | FRAME_FILL, SHAPE_FILL |

Pattern B: `surface-hero` + `text-on-hero` invert together so hero
cards (Account Card) and Primary buttons flip from dark-on-light in
Light mode to light-on-dark in Dark mode.

### Border

| Token | Light | Dark | Scopes |
|---|---|---|---|
| `color/border` | stone/200 | stone/700 | SHAPE_FILL, STROKE_COLOR |
| `color/border-strong` | stone/900 | stone/100 | SHAPE_FILL, STROKE_COLOR |
| `color/border-subtle` | stone/100 | stone/900 | SHAPE_FILL, STROKE_COLOR |

### Text

| Token | Light | Dark | Scopes |
|---|---|---|---|
| `color/text-primary` | stone/950 | stone/50 | TEXT_FILL, STROKE_COLOR |
| `color/text-secondary` | stone/600 | stone/300 | TEXT_FILL, STROKE_COLOR |
| `color/text-tertiary` | stone/400 | stone/400 | TEXT_FILL, STROKE_COLOR |
| `color/text-on-brand` | white | white | TEXT_FILL, STROKE_COLOR |
| `color/text-on-hero` | white | stone/950 | TEXT_FILL, STROKE_COLOR |
| `color/text-on-hero-muted` | stone/400 | stone/600 | TEXT_FILL, STROKE_COLOR |

### Brand (red)

| Token | Light | Dark | Scopes |
|---|---|---|---|
| `color/brand` | red/500 | red/500 | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/brand-hover` | red/600 | red/400 | same |
| `color/brand-pressed` | red/700 | red/600 | same |
| `color/brand-subtle` | red/50 | red/900 | FRAME_FILL, SHAPE_FILL |

### Brand-secondary (blue)

| Token | Light | Dark | Scopes |
|---|---|---|---|
| `color/brand-secondary` | blue/500 | blue/400 | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/brand-secondary-hover` | blue/600 | blue/500 | same |
| `color/brand-secondary-pressed` | blue/700 | blue/600 | same |
| `color/brand-secondary-subtle` | blue/50 | blue/900 | FRAME_FILL, SHAPE_FILL |

### State

| Token | Light | Dark | Scopes |
|---|---|---|---|
| `color/positive` | green/500 | green/400 | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/positive-subtle` | green/50 | green/900 | FRAME_FILL, SHAPE_FILL |
| `color/negative` | garnet/500 | garnet/400 | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/negative-subtle` | garnet/50 | garnet/900 | FRAME_FILL, SHAPE_FILL |
| `color/warning` | amber/500 | amber/400 | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/warning-subtle` | amber/50 | amber/900 | FRAME_FILL, SHAPE_FILL |
| `color/info` | sky/500 | sky/400 | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/info-subtle` | sky/50 | sky/900 | FRAME_FILL, SHAPE_FILL |

### iOS platform

Platform-specific tokens for authentic iOS chrome (Status Bar,
Keyboard & Indicator, Search Bar). Not for general DS use — prefer
the semantic `text-*`, `surface-*`, `border-*` tokens for app content.

| Token | Light | Dark | Scopes |
|---|---|---|---|
| `color/ios-label`            | ios/black `#000000`   | white `#ffffff`       | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/ios-label-secondary`  | ios/label-sec-l `#3c3c43` | ios/label-sec-d `#ebebf5` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/ios-label-tertiary`   | ios/label-ter-l `#767680` | ios/label-ter-d `#aeaeb2` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/ios-label-quaternary` | ios/label-quat `#8e8e93`  | ios/label-quat `#8e8e93`  | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/ios-glyph`            | ios/glyph-l `#d1d1d6` | ios/glyph-d `#48484a` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/ios-separator`        | ios/separator-l `#e5e5ea` | ios/separator-d `#38383a` | SHAPE_FILL, STROKE_COLOR |
| `color/ios-fill`             | ios/fill-l `#efeff4`  | ios/fill-d `#2c2c2e`  | FRAME_FILL, SHAPE_FILL |
| `color/ios-bar-background`   | ios/bar-bg-l `#f9f9f9`| ios/bar-bg-d `#1c1c1e`| FRAME_FILL, SHAPE_FILL |
| `color/ios-key-background`   | ios/key-bg-l `#d0d4dc`| ios/key-bg-d `#151515`| FRAME_FILL, SHAPE_FILL |
| `color/ios-key-face`         | white `#ffffff`       | ios/key-mod-d `#565b66`| FRAME_FILL, SHAPE_FILL |
| `color/ios-key-modifier`     | ios/key-mod-l `#abb2c1`| ios/key-mod-d `#565b66`| FRAME_FILL, SHAPE_FILL |
| `color/ios-accent`           | ios/accent-l `#007aff`| ios/accent-d `#0a84ff`| SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/ios-navy-glyph`       | ios/navy `#172b85`    | ios/navy `#172b85`    | SHAPE_FILL |
| `color/ios-dim-stroke`       | ios/dim-stroke-l `#d8d8d8`| ios/glyph-d `#48484a` | STROKE_COLOR, SHAPE_FILL |
| `color/ios-mid-stroke`       | ios/mid-stroke-l `#979797`| ios/label-quat `#8e8e93` | STROKE_COLOR, SHAPE_FILL |
| `color/ios-pinch-handle`     | ios/pinch-l `#01153c` | ios/pinch-d `#f2f2f7` | SHAPE_FILL |
| `color/ios-backdrop`         | ios/black `#000000`   | ios/black `#000000`   | FRAME_FILL, SHAPE_FILL |
| `color/ios-overlay-white`    | white `#ffffff`       | white `#ffffff`       | FRAME_FILL, SHAPE_FILL, TEXT_FILL, STROKE_COLOR |

### iOS mode-stable (fixed-light / fixed-dark) tokens

Every Apple UI Kit component set ships with a `Dark Mode` or `Theme`
**variant axis**. For those variants to render correctly regardless of
the file's ambient Color collection mode, each uses a mode-stable
iOS token that resolves to the same primitive in both Light and Dark.
Use the `-light` token inside a `Dark Mode=False` / `Theme=Light`
variant, and the `-dark` token inside a `Dark Mode=True` /
`Theme=Dark` variant.

| Token | Both modes resolve to |
|---|---|
| `color/ios-key-bg-light`     | ios/key-bg-l `#d0d4dc` |
| `color/ios-key-bg-dark`      | ios/key-bg-d `#151515` |
| `color/ios-key-face-light`   | white `#ffffff` |
| `color/ios-key-face-dark`    | ios/key-face-d-real `#6c6c70` |
| `color/ios-key-mod-light`    | ios/key-mod-l `#abb2c1` |
| `color/ios-key-mod-dark`     | ios/key-mod-d-real `#474747` |
| `color/ios-label-sec-light`  | ios/label-sec-l `#3c3c43` |
| `color/ios-label-sec-dark`   | ios/label-sec-d `#ebebf5` |
| `color/ios-label-ter-light`  | ios/label-ter-l `#767680` |
| `color/ios-label-ter-dark`   | ios/label-ter-d `#aeaeb2` |
| `color/ios-separator-light`  | ios/separator-l `#e5e5ea` |
| `color/ios-separator-dark`   | ios/separator-d `#38383a` |
| `color/ios-fill-light`       | ios/fill-l `#efeff4` |
| `color/ios-fill-dark`        | ios/fill-d `#2c2c2e` |
| `color/ios-bar-bg-light`     | ios/bar-bg-l `#f9f9f9` |
| `color/ios-bar-bg-dark`      | ios/bar-bg-d `#1c1c1e` |
| `color/ios-accent-light`     | ios/accent-l `#007aff` |
| `color/ios-accent-dark`      | ios/accent-d `#0a84ff` |

Reuse guide:
- `color/ios-backdrop` doubles as "always black label" (e.g. letter
  text in a Dark Mode=False keyboard variant).
- `color/ios-overlay-white` doubles as "always white label" (e.g.
  letter text in a Dark Mode=True keyboard variant, or status-bar
  icons on the Cupertino scrim).

Backed by 25 new primitives (prefix `ios/`) added to the Primitives
collection. Primitive hex values match Apple's published system
colors for UIKit light/dark modes.

`color/ios-backdrop`, `color/ios-overlay-white`, and the
`-light` / `-dark` tokens above are the **mode-stable** iOS tokens
— same primitive in both Color collection modes. All other
`color/ios-*` tokens flip with mode (DS default). Don't mix the two:
if a component uses a variant axis to pick theme, all its paints
must bind to the mode-stable tokens; otherwise they'll flip
independently and break the variant's intent.

---

## Spacing

Collection `VariableCollectionId:6:2`. Single mode "Value". Scopes
`WIDTH_HEIGHT, GAP`. 4pt base grid with pragmatic steps after `space/6`.

| Token | px |
|---|---|
| `space/1` | 4 |
| `space/2` | 8 |
| `space/3` | 12 |
| `space/4` | 16 |
| `space/5` | 20 |
| `space/6` | 24 |
| `space/7` | 32 |
| `space/8` | 40 |
| `space/9` | 56 |
| `space/10` | 80 |

---

## Radius

Collection `VariableCollectionId:6:13`. Single mode "Value". Scopes
`CORNER_RADIUS`.

| Token | px |
|---|---|
| `radius/xs` | 4 |
| `radius/sm` | 8 |
| `radius/md` | 12 |
| `radius/lg` | 16 |
| `radius/xl` | 24 |
| `radius/full` | 9999 |
