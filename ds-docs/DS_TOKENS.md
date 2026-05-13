# DS Tokens

Authoritative catalog of every Figma variable in the design system.

- File: `gSas2PBv3XMAXj36FQDhFa`
- Last synced: 2026-05-13
- Source of truth: [.inventory-current.json](./.inventory-current.json)

Counts: 69 primitives · 65 color tokens · 10 spacing · 6 radius.

---

## Collections

| Collection | ID | Modes | Variable count |
|---|---|---|---|
| Primitives | `VariableCollectionId:4:2` | Value | 69 |
| Color | `VariableCollectionId:5:2` | Light / Dark | 65 |
| Spacing | `VariableCollectionId:6:2` | Value | 10 |
| Radius | `VariableCollectionId:6:13` | Value | 6 |

---

## Primitives (Color)

Single-mode `Value` collection. Primitives are referenced by Color
tokens via alias — never bind primitives directly to component layers.

### DS palette (42 vars)

| Name | Hex | ID |
|---|---|---|
| white | `#FFFFFF` | `VariableID:4:7` |
| stone/50 | `#F6F5F2` | `VariableID:4:8` |
| stone/100 | `#ECEAE5` | `VariableID:4:9` |
| stone/200 | `#D8D5CE` | `VariableID:4:10` |
| stone/300 | `#B5B0A5` | `VariableID:59:268` |
| stone/400 | `#9E9A92` | `VariableID:4:11` |
| stone/600 | `#5E5A54` | `VariableID:4:12` |
| stone/700 | `#3C3933` | `VariableID:59:269` |
| stone/800 | `#2B2925` | `VariableID:59:270` |
| stone/900 | `#1A1918` | `VariableID:4:13` |
| stone/950 | `#141312` | `VariableID:4:14` |
| red/50 | `#FBECED` | `VariableID:4:6` |
| red/400 | `#DE4955` | `VariableID:59:272` |
| red/500 | `#D2222D` | `VariableID:4:3` |
| red/600 | `#B41B24` | `VariableID:4:4` |
| red/700 | `#8F1218` | `VariableID:4:5` |
| red/900 | `#3D0B0F` | `VariableID:59:271` |
| blue/50 | `#ECF2FE` | `VariableID:109:717` |
| blue/400 | `#79ABFB` | `VariableID:109:718` |
| blue/500 | `#438BFA` | `VariableID:109:719` |
| blue/600 | `#1B73EC` | `VariableID:109:720` |
| blue/700 | `#155CC0` | `VariableID:109:721` |
| blue/900 | `#0F2E5B` | `VariableID:109:722` |
| green/50 | `#E8F3EC` | `VariableID:4:16` |
| green/400 | `#4ADE80` | `VariableID:126:717` |
| green/500 | `#22C55E` | `VariableID:59:273` |
| green/700 | `#1F7A4C` | `VariableID:4:15` |
| green/900 | `#0D2E1B` | `VariableID:59:274` |
| garnet/50 | `#F7E8E9` | `VariableID:4:18` |
| garnet/400 | `#F87171` | `VariableID:59:275` |
| garnet/500 | `#DC2626` | `VariableID:126:718` |
| garnet/800 | `#7A1820` | `VariableID:4:17` |
| garnet/900 | `#2E0A0D` | `VariableID:59:276` |
| amber/50 | `#F9EEDB` | `VariableID:4:20` |
| amber/400 | `#FBBF24` | `VariableID:59:277` |
| amber/500 | `#F59E0B` | `VariableID:126:719` |
| amber/600 | `#B67A1F` | `VariableID:4:19` |
| amber/900 | `#3D2A0A` | `VariableID:59:278` |
| sky/50 | `#F0F9FF` | `VariableID:130:717` |
| sky/400 | `#38BDF8` | `VariableID:130:718` |
| sky/500 | `#0EA5E9` | `VariableID:130:719` |
| sky/900 | `#0C4A6E` | `VariableID:130:720` |

### iOS Platform Chrome palette (27 vars)

Apple system colors and chrome surfaces. Only used by the Platform
Chrome · iOS components (Status Bar, Keyboard, Search Bar, Home
Indicator). App-level content should NOT bind to these — use the DS
palette tokens.

| Name | Hex | ID |
|---|---|---|
| ios/black | `#000000` | `VariableID:172:863` |
| ios/accent-l | `#007AFF` | `VariableID:172:881` |
| ios/accent-d | `#0A84FF` | `VariableID:172:882` |
| ios/navy | `#172B85` | `VariableID:172:883` |
| ios/pinch-l | `#01153C` | `VariableID:172:886` |
| ios/pinch-d | `#F2F2F7` | `VariableID:172:887` |
| ios/bar-bg-l | `#F9F9F9` | `VariableID:172:875` |
| ios/bar-bg-d | `#1C1C1E` | `VariableID:172:876` |
| ios/fill-l | `#EFEFF4` | `VariableID:172:873` |
| ios/fill-d | `#2C2C2E` | `VariableID:172:874` |
| ios/glyph-l | `#D1D1D6` | `VariableID:172:871` |
| ios/glyph-d | `#48484A` | `VariableID:172:872` |
| ios/key-bg-l | `#D0D4DC` | `VariableID:172:877` |
| ios/key-bg-d | `#151515` | `VariableID:172:878` |
| ios/key-face-d-real | `#6C6C70` | `VariableID:187:863` |
| ios/key-mod-l | `#ABB2C1` | `VariableID:172:879` |
| ios/key-mod-d | `#565B66` | `VariableID:172:880` |
| ios/key-mod-d-real | `#474747` | `VariableID:187:864` |
| ios/label-quat | `#8E8E93` | `VariableID:172:868` |
| ios/label-sec-l | `#3C3C43` | `VariableID:172:864` |
| ios/label-sec-d | `#EBEBF5` | `VariableID:172:865` |
| ios/label-ter-l | `#767680` | `VariableID:172:866` |
| ios/label-ter-d | `#AEAEB2` | `VariableID:172:867` |
| ios/separator-l | `#E5E5EA` | `VariableID:172:869` |
| ios/separator-d | `#38383A` | `VariableID:172:870` |
| ios/dim-stroke-l | `#D8D8D8` | `VariableID:172:884` |
| ios/mid-stroke-l | `#979797` | `VariableID:172:885` |

---

## Color tokens (semantic, 65 vars)

Two-mode collection. **Light** is the default. **Dark** mode flips
surface/text aliases; brand stays red across modes.

### Background / Surface / Border (7)

| Name | Light → Primitive | Dark → Primitive | Scopes |
|---|---|---|---|
| `color/background` | `white` `#FFFFFF` | `stone/950` `#141312` | FRAME_FILL, SHAPE_FILL |
| `color/surface` | `white` `#FFFFFF` | `stone/900` `#1A1918` | FRAME_FILL, SHAPE_FILL |
| `color/surface-muted` | `stone/50` `#F6F5F2` | `stone/800` `#2B2925` | FRAME_FILL, SHAPE_FILL |
| `color/surface-hero` | `stone/950` `#141312` | `stone/50` `#F6F5F2` | FRAME_FILL, SHAPE_FILL |
| `color/border-subtle` | `stone/100` `#ECEAE5` | `stone/900` `#1A1918` | SHAPE_FILL, STROKE_COLOR |
| `color/border` | `stone/200` `#D8D5CE` | `stone/700` `#3C3933` | SHAPE_FILL, STROKE_COLOR |
| `color/border-strong` | `stone/900` `#1A1918` | `stone/100` `#ECEAE5` | SHAPE_FILL, STROKE_COLOR |

### Text (6)

| Name | Light → Primitive | Dark → Primitive | Scopes |
|---|---|---|---|
| `color/text-primary` | `stone/950` `#141312` | `stone/50` `#F6F5F2` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/text-secondary` | `stone/600` `#5E5A54` | `stone/300` `#B5B0A5` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/text-tertiary` | `stone/400` `#9E9A92` | `stone/400` `#9E9A92` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/text-on-brand` | `white` `#FFFFFF` | `white` `#FFFFFF` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/text-on-hero` | `white` `#FFFFFF` | `stone/950` `#141312` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |
| `color/text-on-hero-muted` | `stone/400` `#9E9A92` | `stone/600` `#5E5A54` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR |

### Brand — primary (4)

| Name | Light → Primitive | Dark → Primitive |
|---|---|---|
| `color/brand` | `red/500` `#D2222D` | `red/500` `#D2222D` |
| `color/brand-hover` | `red/600` `#B41B24` | `red/400` `#DE4955` |
| `color/brand-pressed` | `red/700` `#8F1218` | `red/600` `#B41B24` |
| `color/brand-subtle` | `red/50` `#FBECED` | `red/900` `#3D0B0F` |

### Brand — secondary (4)

| Name | Light → Primitive | Dark → Primitive |
|---|---|---|
| `color/brand-secondary` | `blue/500` `#438BFA` | `blue/400` `#79ABFB` |
| `color/brand-secondary-hover` | `blue/600` `#1B73EC` | `blue/500` `#438BFA` |
| `color/brand-secondary-pressed` | `blue/700` `#155CC0` | `blue/600` `#1B73EC` |
| `color/brand-secondary-subtle` | `blue/50` `#ECF2FE` | `blue/900` `#0F2E5B` |

### State (8)

| Name | Light → Primitive | Dark → Primitive |
|---|---|---|
| `color/positive` | `green/500` `#22C55E` | `green/400` `#4ADE80` |
| `color/positive-subtle` | `green/50` `#E8F3EC` | `green/900` `#0D2E1B` |
| `color/negative` | `garnet/500` `#DC2626` | `garnet/400` `#F87171` |
| `color/negative-subtle` | `garnet/50` `#F7E8E9` | `garnet/900` `#2E0A0D` |
| `color/warning` | `amber/500` `#F59E0B` | `amber/400` `#FBBF24` |
| `color/warning-subtle` | `amber/50` `#F9EEDB` | `amber/900` `#3D2A0A` |
| `color/info` | `sky/500` `#0EA5E9` | `sky/400` `#38BDF8` |
| `color/info-subtle` | `sky/50` `#F0F9FF` | `sky/900` `#0C4A6E` |

### iOS Platform Chrome (36)

Bind only from Platform Chrome · iOS components. App content should
NOT touch these. Pairs marked `-light` / `-dark` are pinned to the
named mode (used to render the keyboard's dark/light row groups in
either app theme). The unsuffixed token (e.g. `color/ios/ios-accent`)
inherits from the current theme.

| Name | Light → Primitive | Dark → Primitive |
|---|---|---|
| `color/ios/ios-accent` | `ios/accent-l` `#007AFF` | `ios/accent-d` `#0A84FF` |
| `color/ios/ios-accent-light` | `ios/accent-l` `#007AFF` | `ios/accent-l` `#007AFF` |
| `color/ios/ios-accent-dark` | `ios/accent-d` `#0A84FF` | `ios/accent-d` `#0A84FF` |
| `color/ios/ios-backdrop` | `ios/black` `#000000` | `ios/black` `#000000` |
| `color/ios/ios-bar-background` | `ios/bar-bg-l` `#F9F9F9` | `ios/bar-bg-d` `#1C1C1E` |
| `color/ios/ios-bar-bg-light` | `ios/bar-bg-l` `#F9F9F9` | `ios/bar-bg-l` `#F9F9F9` |
| `color/ios/ios-bar-bg-dark` | `ios/bar-bg-d` `#1C1C1E` | `ios/bar-bg-d` `#1C1C1E` |
| `color/ios/ios-fill` | `ios/fill-l` `#EFEFF4` | `ios/fill-d` `#2C2C2E` |
| `color/ios/ios-fill-light` | `ios/fill-l` `#EFEFF4` | `ios/fill-l` `#EFEFF4` |
| `color/ios/ios-fill-dark` | `ios/fill-d` `#2C2C2E` | `ios/fill-d` `#2C2C2E` |
| `color/ios/ios-glyph` | `ios/glyph-l` `#D1D1D6` | `ios/glyph-d` `#48484A` |
| `color/ios/ios-key-background` | `ios/key-bg-l` `#D0D4DC` | `ios/key-bg-d` `#151515` |
| `color/ios/ios-key-bg-light` | `ios/key-bg-l` `#D0D4DC` | `ios/key-bg-l` `#D0D4DC` |
| `color/ios/ios-key-bg-dark` | `ios/key-bg-d` `#151515` | `ios/key-bg-d` `#151515` |
| `color/ios/ios-key-face` | `white` `#FFFFFF` | `ios/key-mod-d` `#565B66` |
| `color/ios/ios-key-face-light` | `white` `#FFFFFF` | `white` `#FFFFFF` |
| `color/ios/ios-key-face-dark` | `ios/key-face-d-real` `#6C6C70` | `ios/key-face-d-real` `#6C6C70` |
| `color/ios/ios-key-modifier` | `ios/key-mod-l` `#ABB2C1` | `ios/key-mod-d` `#565B66` |
| `color/ios/ios-key-mod-light` | `ios/key-mod-l` `#ABB2C1` | `ios/key-mod-l` `#ABB2C1` |
| `color/ios/ios-key-mod-dark` | `ios/key-mod-d-real` `#474747` | `ios/key-mod-d-real` `#474747` |
| `color/ios/ios-label` | `ios/black` `#000000` | `white` `#FFFFFF` |
| `color/ios/ios-label-secondary` | `ios/label-sec-l` `#3C3C43` | `ios/label-sec-d` `#EBEBF5` |
| `color/ios/ios-label-sec-light` | `ios/label-sec-l` `#3C3C43` | `ios/label-sec-l` `#3C3C43` |
| `color/ios/ios-label-sec-dark` | `ios/label-sec-d` `#EBEBF5` | `ios/label-sec-d` `#EBEBF5` |
| `color/ios/ios-label-tertiary` | `ios/label-ter-l` `#767680` | `ios/label-ter-d` `#AEAEB2` |
| `color/ios/ios-label-ter-light` | `ios/label-ter-l` `#767680` | `ios/label-ter-l` `#767680` |
| `color/ios/ios-label-ter-dark` | `ios/label-ter-d` `#AEAEB2` | `ios/label-ter-d` `#AEAEB2` |
| `color/ios/ios-label-quaternary` | `ios/label-quat` `#8E8E93` | `ios/label-quat` `#8E8E93` |
| `color/ios/ios-separator` | `ios/separator-l` `#E5E5EA` | `ios/separator-d` `#38383A` |
| `color/ios/ios-separator-light` | `ios/separator-l` `#E5E5EA` | `ios/separator-l` `#E5E5EA` |
| `color/ios/ios-separator-dark` | `ios/separator-d` `#38383A` | `ios/separator-d` `#38383A` |
| `color/ios/ios-dim-stroke` | `ios/dim-stroke-l` `#D8D8D8` | `ios/glyph-d` `#48484A` |
| `color/ios/ios-mid-stroke` | `ios/mid-stroke-l` `#979797` | `ios/label-quat` `#8E8E93` |
| `color/ios/ios-navy-glyph` | `ios/navy` `#172B85` | `ios/navy` `#172B85` |
| `color/ios/ios-pinch-handle` | `ios/pinch-l` `#01153C` | `ios/pinch-d` `#F2F2F7` |
| `color/ios/ios-overlay-white` | `white` `#FFFFFF` | `white` `#FFFFFF` |

---

## Spacing (10)

Single-mode `Value` collection. Scopes: `WIDTH_HEIGHT`, `GAP`.

| Name | Value | Code | ID |
|---|---|---|---|
| `space/1` | 4 | `var(--space-1)` | `VariableID:6:3` |
| `space/2` | 8 | `var(--space-2)` | `VariableID:6:4` |
| `space/3` | 12 | `var(--space-3)` | `VariableID:6:5` |
| `space/4` | 16 | `var(--space-4)` | `VariableID:6:6` |
| `space/5` | 20 | `var(--space-5)` | `VariableID:6:7` |
| `space/6` | 24 | `var(--space-6)` | `VariableID:6:8` |
| `space/7` | 32 | `var(--space-7)` | `VariableID:6:9` |
| `space/8` | 40 | `var(--space-8)` | `VariableID:6:10` |
| `space/9` | 56 | `var(--space-9)` | `VariableID:6:11` |
| `space/10` | 80 | `var(--space-10)` | `VariableID:6:12` |

---

## Radius (6)

Single-mode `Value` collection. Scope: `CORNER_RADIUS`.

| Name | Value | Code | ID |
|---|---|---|---|
| `radius/xs` | 4 | `var(--radius-xs)` | `VariableID:77:322` |
| `radius/sm` | 8 | `var(--radius-sm)` | `VariableID:6:14` |
| `radius/md` | 12 | `var(--radius-md)` | `VariableID:6:15` |
| `radius/lg` | 16 | `var(--radius-lg)` | `VariableID:6:16` |
| `radius/xl` | 24 | `var(--radius-xl)` | `VariableID:6:17` |
| `radius/full` | 9999 | `var(--radius-full)` | `VariableID:6:18` |

---

## Text styles (15)

Two font families: **Geologica** (live) and **Clash Display** (intent —
currently renders as Geologica Bold pending manual swap, see
[DS_LESSONS.md](./DS_LESSONS.md)).

| Style | Font | Size | LH | LS | Note |
|---|---|---|---|---|---|
| display/xl | Clash Display Semibold | 48 | 52 | −2% | Clash intent, Geologica fallback |
| display/md | Clash Display Semibold | 36 | 40 | −2% | Clash intent, Geologica fallback |
| title/lg | Clash Display Semibold | 28 | 34 | −1% | Clash intent, Geologica fallback |
| title/md | Clash Display Semibold | 22 | 28 | −1% | Clash intent, Geologica fallback |
| title/sm | Geologica SemiBold | 18 | 24 | — | |
| subtitle | Geologica Medium | 16 | 22 | — | |
| body | Geologica Regular | 15 | 22 | — | |
| body/sm | Geologica Regular | 13 | 18 | — | |
| label | Geologica Medium | 13 | 18 | — | |
| button | Geologica SemiBold | 15 | 20 | — | |
| input-text | Geologica Regular | 16 | 22 | — | |
| caption | Geologica Medium | 12 | 16 | — | |
| overline | Geologica SemiBold | 11 | 14 | 8% | UPPER case |
| numeric/display | Clash Display Semibold | 36 | 40 | −1% | Tabular numerals via OpenType |
| numeric/body | Geologica Medium | 15 | 22 | — | Tabular numerals via OpenType |

## Effect styles

None. Shadows are applied directly on individual nodes (no shared
effect style is defined).
