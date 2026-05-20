# 02. Design tokens & brand color

## Source files
- HSL channel values for both themes: [`src/index.css`](../../src/index.css)
- Tailwind colour mapping: [`tailwind.config.js`](../../tailwind.config.js)
- shadcn base: New York style + Slate base + CSS variables (see [`components.json`](../../components.json))

## Brand tokens

```css
:root {
  --brand: 45 98% 49%;             /* #FBC100 Texnomart yellow */
  --brand-foreground: 30 89% 14%;  /* dark amber text on yellow surfaces */
  --brand-soft: 45 100% 95%;       /* light-mode soft tint */
}
.dark {
  --brand: 45 98% 49%;
  --brand-foreground: 30 89% 14%;
  --brand-soft: 45 50% 12%;        /* dark-mode soft tint */
}
```

Tailwind exposes them as `bg-brand` / `text-brand` / `border-brand` / `ring-brand` / `bg-brand-soft` / `text-brand-foreground`.

## Brand color usage rules

`#FBC100` is the recognition color and **produces visual fatigue if dominant**. Use it ONLY on:

- **Primary CTA buttons**: `bg-brand text-brand-foreground hover:bg-brand/90`
- **Active sidebar nav item**: 3px brand left bar + brand-coloured Phosphor icon with `weight="fill"`. **Not a full background.** See [`04-sidebar-topbar-layout.md`](04-sidebar-topbar-layout.md)
- **Focus rings on critical fields**: `focus-visible:ring-brand focus-visible:ring-offset-2`
- **Highlighted KPI cards**: `border-l-4 border-l-brand bg-brand-soft/40` (e.g., the "Заявки за 3 часа" card)
- **Selected tab underline** (when tabs are used)
- **The star in the logo** (locked to `#FBC100`, never `currentColor`)
- **Notification unread indicator**: `bg-brand text-brand-foreground` mini-badge in `NotificationsMenu`

Everything else uses shadcn neutrals. Status colours are independent from brand — see [`src/components/shared/StatusBadge.tsx`](../../src/components/shared/StatusBadge.tsx).

## What NOT to do with brand
- ❌ `bg-brand` on a card body, page background, or row hover
- ❌ `text-brand` on body text (only icons and small numeric badges)
- ❌ Brand-yellow charts (charts use the chart-1..5 token palette)
- ❌ Brand for destructive actions (use `bg-destructive`)
- ❌ More than ~5% of pixels on a screen wearing brand colour

## Status variants
Independent of brand. Defined in [`enums.ts`](../../src/lib/constants/enums.ts) as `StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'`. Tailwind classes mapped in [`StatusBadge.tsx`](../../src/components/shared/StatusBadge.tsx).

## Chart tokens
Recharts cells use `hsl(var(--brand))` for the line / primary bar emphasis, and `hsl(var(--chart-1..5))` for category fills. Donut slices for application status use a hand-picked HSL map in [`Dashboard.tsx`](../../src/pages/Dashboard.tsx) — when adding new statuses, extend the map there.

## Typography
- **Font**: Inter, loaded in [`index.html`](../../index.html) from Google Fonts. Default `font-sans` set in [`tailwind.config.js`](../../tailwind.config.js)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold). No other weights
- **Tabular numerals** required for monetary values, IDs, counts, percentages: add `tabular-nums` utility (or `font-variant-numeric: tabular-nums`)
- **Sizes**: rely on Tailwind defaults (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`). H1 uses `text-2xl font-semibold tracking-tight` (see [`PageHeader.tsx`](../../src/components/layout/PageHeader.tsx))

## Theme switching
- Driven by Zustand `ui.store.ts` (`theme: "light" | "dark" | "system"`)
- `useThemeSync()` hook (called once in `<GlobalEffects/>`) writes `.dark` class on `<html>` and listens to `prefers-color-scheme` when theme === `"system"`
- Default on first visit: `"system"`
- Persisted in `localStorage` under key `texnomart.ui`
