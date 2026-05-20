# 10. Mobile responsiveness

## Breakpoints
We use Tailwind defaults — don't add custom breakpoints.

| Token | Min width | Typical viewport |
|-------|-----------|------------------|
| (none) | 0px | xs phones (320–639px) |
| `sm:` | 640px | large phones / small tablets |
| `md:` | 768px | tablets |
| `lg:` | 1024px | laptops |
| `xl:` | 1280px | desktops |
| `2xl:` | 1536px | large desktops |

## Layout-level rules
- **No `max-w-screen-*` in the shell.** Pages own their column width. See [`04-sidebar-topbar-layout.md`](04-sidebar-topbar-layout.md)
- **Padding**: `p-4 md:p-6` is the standard. Don't go below `p-4`
- **Sidebar**: on mobile it becomes a `<Sheet>` drawer automatically (`useIsMobile()` inside shadcn's `<Sidebar>`). The footer collapse toggle is hidden in Sheet mode — drawer opens/closes via the `<MobileMenuButton>` in TopBar
- **Topbar**: hide non-essential controls on `<sm`. See pattern below

## Topbar mobile pattern
- **Breadcrumb root** ("Texnomart › ") hidden on `<sm`. Only current section shown
- **LanguageSwitcher** hidden on `<sm` — moved into UserMenu as a sub-section
- **All right-side controls** must have `shrink-0` so they never compress
- **Single sizing container** with `min-w-0 + truncate` for the variable-width content (breadcrumb)

```tsx
// breadcrumb that truncates on narrow screens
<nav className="flex min-w-0 items-center gap-1 text-sm">
  <Link className="hidden text-muted-foreground sm:inline" to="/">Texnomart</Link>
  <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 sm:inline-block" />
  <span className="truncate font-medium">{currentLabel}</span>
</nav>
```

See [`docs/lessons/01-mobile-responsive-topbar.md`](../../docs/lessons/01-mobile-responsive-topbar.md).

## Page-level patterns

### Dashboard KPI grid
```tsx
<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
  {/* 1 col xs → 2 cols sm → 5 cols xl */}
</div>
```

### Chart grids
```tsx
<div className="grid gap-4 lg:grid-cols-3">
  <LineChartCard className="lg:col-span-2" />
  <DonutChartCard />
</div>
```
At `<lg` everything stacks vertically.

### PageHeader actions
`PageHeader` is already `flex-col gap-3 md:flex-row md:items-center md:justify-between`. Action buttons land below the title on mobile, beside it on desktop.

### Tables
shadcn's `<Table>` is wrapped in `relative w-full overflow-auto`. Wide tables (many columns) horizontally scroll on mobile. Don't force-wrap content — let the scroll work

## Sanity check at small widths
When making layout changes, mentally walk a 320px viewport:
- TopBar must fit: `MobileMenuButton (28) + breadcrumb (truncates) + search-icon (32) + theme (32) + notifications (32) + UserMenu (32) + gaps ≈ 200px reserved` → breadcrumb gets the remaining ~80px
- If something doesn't fit, hide it on `<sm` and put it in UserMenu or Settings — don't shrink touch targets below `h-9 w-9` (~36px)

## Don'ts
- ❌ Force min-width on rows — let the table scroll instead
- ❌ Use `hidden md:flex` then forget the mobile alternative — every desktop-only control needs an opening on mobile
- ❌ Squeeze 5 controls into a 320px TopBar by reducing padding to `px-1`
- ❌ Disable `truncate` on breadcrumb — Russian section names are long enough to overflow
- ❌ Add custom breakpoints (`xs`, `xxl`) — stick to Tailwind defaults so other devs read the code at a glance
