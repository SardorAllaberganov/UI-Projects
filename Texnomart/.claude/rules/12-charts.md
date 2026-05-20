# 12. Charts

## Library
**Recharts** v3. All chart components are pre-wrapped under [`src/components/charts/`](../../src/components/charts/) — use the wrappers, not Recharts directly.

| Wrapper | Use for |
|---------|---------|
| `<KPICard />` | Single metric tiles. Has a `highlighted` prop for the brand-left-bar treatment |
| `<LineChartCard />` | Trends over time (applications per day, etc.) |
| `<BarChartCard />` | Comparisons (top partners, top branches) — supports `layout="horizontal"` and `layout="vertical"` |
| `<DonutChartCard />` | Distribution (application status breakdown) — supports `centerValue` + `centerLabel` |

## Why wrappers
- Consistent visual language — same grid stroke, same tooltip styling, same axis colors
- Tokens from `index.css` — no hardcoded colors
- Skeletons built-in — pass `data={undefined}` to show a loading state
- TypeScript-generic over the data shape (`<LineChartCard<T> data={...} xKey="..." yKey="..." />`)
- Recharts v3 typing quirks handled in one place (`dataKey={xKey as string}`)

## Color rules
- **Primary emphasis** (line, single-series bar): `hsl(var(--brand))`
- **Foreground bar** (vertical bars without categorical meaning): `hsl(var(--foreground))`
- **Categorical fills**: `hsl(var(--chart-1))` … `hsl(var(--chart-5))` for non-status categories
- **Application status donut**: dedicated HSL map in [`Dashboard.tsx`](../../src/pages/Dashboard.tsx) — extend when adding new statuses

## KPI card highlighting
The "Заявки за 3 часа" card uses the `highlighted` prop:
```tsx
<KPICard
  label={t("dashboard.kpi.applicationsLast3h")}
  value={formatNumber(kpi.last3h)}
  icon={<Clock className="h-4 w-4" />}
  highlighted    // ← adds border-l-4 border-l-brand + bg-brand-soft/40
/>
```
Use it sparingly — at most **one highlighted KPI per page**. The whole point is to draw the eye.

## Tabular numerals
All numeric chart axis labels, KPI values, table cell values for amounts/percentages/counts must use `tabular-nums`. The wrappers already apply this internally for KPI values.

## Don'ts
- ❌ Use Recharts directly in a page — wrap it first
- ❌ Use brand yellow as a categorical fill — it's reserved for "this is the metric to look at"
- ❌ Pie charts with > 6 slices — switch to a sorted horizontal bar
- ❌ Stacked charts without a clear category legend
- ❌ Animations on dashboards — they replay on every refetch and feel noisy. Recharts' default `isAnimationActive={true}` is fine for one-off renders but disable it (`isAnimationActive={false}`) on auto-refreshing widgets if we add any
- ❌ Add a new chart wrapper before checking if `BarChartCard` / `LineChartCard` already covers it (they're generic over the data shape)
