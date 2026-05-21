# HISTORY.md

> Append-only session log. Newest entry at the top. Each entry records what changed in one session — the cumulative state lives in `CLAUDE.md`, `ARCHITECTURE.md`, `DATA_MODELS.md`, `ROUTES.md`. Lessons (the "why behind a decision") live in [./lessons/](./lessons/).

---

## 2026-05-20 — Analytics page (filters, KPIs, charts, reports history + XLSX export)

**Module:** analytics
**Commits:** (uncommitted, working tree)
**Files touched:** 13 — see list below
**What changed:**
- **Analytics page** ([src/pages/Analytics.tsx](../src/pages/Analytics.tsx)) replaced the placeholder. Layout: `PageHeader` + brand-CTA "Сгенерировать отчёт" → filters Card → 4 KPI cards → 2-column charts row → reports history Card → Generate dialog
- **AnalyticsFilters** ([components/analytics/AnalyticsFilters.tsx](../src/components/analytics/AnalyticsFilters.tsx)) — shadcn `ToggleGroup` segmented control (1 день / 1 неделя / 1 месяц / 1 год) + separate "Свой период" outline button that opens a 2-month range Calendar in a Popover (sets `period="custom"`). Tapping a preset clears the custom range. Right side: two `MultiSelectPopover` instances for Партнёры + Статусы заявок. Empty array = "Все" (no filtering)
- **MultiSelectPopover** ([components/analytics/MultiSelectPopover.tsx](../src/components/analytics/MultiSelectPopover.tsx)) — generic Command+Popover with checkmark icons + "Очистить" footer when selections exist. Reusable primitive; candidate for promotion to `shared/` once a second consumer appears
- **GenerateReportDialog** ([components/analytics/GenerateReportDialog.tsx](../src/components/analytics/GenerateReportDialog.tsx)) — shadcn Dialog with RHF + zod. Fields: kind (Select, only "Детализированный" exposed), period (range Calendar Popover), breakdown (4 Checkboxes in 2×2 grid, all checked by default, ≥1 required), format (Radio: XLSX default / CSV). Footer: Cancel + brand-yellow "Сгенерировать"
- **ReportsHistoryCard** ([components/analytics/ReportsHistoryCard.tsx](../src/components/analytics/ReportsHistoryCard.tsx)) — plain shadcn `<Table>` + DropdownMenu row actions (Скачать XLSX/CSV / Удалить). Date column header is a click-to-sort button (asc/desc). Embedded ConfirmDialog for destructive delete. Animated `Loader2` for in-progress status, emerald outline badge for ready
- **`ReportItem` extended** ([src/types/index.ts](../src/types/index.ts)) with `status: "ready" | "processing"`, `format: "xlsx" | "csv"`, `breakdown: ReportBreakdown[]`. New type aliases exported: `ReportKind`, `ReportBreakdown`, `ReportStatus`, `ReportFormat`
- **`reportsApi`** ([src/api/reports.api.ts](../src/api/reports.api.ts)) gained `create(input)` (pushes new `processing` record to the front of the mock array), `markReady(id)` (flips status + recalculates `fileSize` from `breakdown.length`), `remove(id)`. `CreateReportInput` exported for the dialog payload
- **`downloadReport`** ([src/lib/utils/xlsxExport.ts](../src/lib/utils/xlsxExport.ts)) — SheetJS-based exporter. Builds one sheet per breakdown dimension (applications: full denormalised app rows; users: aggregated per-agent with approval rate; partners: aggregated per-partner with factual + baseline rates; statuses: counts per `ApplicationStatus`). XLSX path uses `XLSX.writeFile`; CSV path emits first sheet via `sheet_to_csv` + Blob with UTF-8 BOM so Cyrillic opens correctly in Excel
- **i18n keys added** under `analytics.*` ([i18n/locales/ru.json](../src/i18n/locales/ru.json)) — ~50 keys covering filters, summary, charts, history (table + status + action), generate (field + breakdown + format + kind + validation), `exportDefaultName`. Replaced the 2-key placeholder block. Title + subtitle rephrased to "Аналитика брокера" / "Генерация отчётов и экспорт данных"
- **Mock reports backfilled** ([src/mock/reports.ts](../src/mock/reports.ts)) with `status: "ready"`, realistic `format` + `breakdown` arrays per kind
- **Mutation flow**: Generate submit → `reportsApi.create` → `toast.message("...поставлен в очередь")` → invalidate `reportsKeys.list()` → `setTimeout(2000)` → `reportsApi.markReady` → invalidate again → `toast.success("...готов")`
- **New shadcn primitives**: `toggle`, `toggle-group` (installed via CLI to support the period segmented control)
- **New runtime dep**: `xlsx@^0.18.x` (SheetJS Community Edition). 1 high-severity npm audit notice — known SheetJS CVE in unused server-side code paths, acceptable for a frontend-only mock export

**Compatibility / non-obvious fixes captured**
- Re-applied lesson [08-date-now-purity-in-usememo.md](./lessons/08-date-now-purity-in-usememo.md) — both `Analytics.tsx` and `GenerateReportDialog.tsx` initially called `Date.now()` / `new Date()` in render bodies. `Analytics.tsx` hoisted `nowTs` to `useState`; `GenerateReportDialog.tsx` now requires a non-nullable `defaultRange: { from: Date; to: Date }` from the parent so the dialog never needs to invent dates
- `AnalyticsFilters.tsx` — Calendar `defaultMonth={undefined}` falls back to current month internally; do not write `new Date()` as a "default" since react-day-picker already handles it
- zod v4 `z.date({ error: "..." })` syntax works; `kind` field narrowed to literal `"applications"` (the only option exposed today) to keep `zodResolver` happy with the form-values type
- `RHFRecharts ResponsiveContainer` warnings on initial mobile mount are pre-existing — identical to Dashboard's behaviour, not a regression

**Docs synced this pass**
- [docs/DATA_MODELS.md](./DATA_MODELS.md) — `ReportItem` block rewritten, new type aliases added, fetcher methods listed, consumed-by points to the real Analytics page
- [docs/ROUTES.md](./ROUTES.md) — analytics route flipped to `full` with full i18n key list; new "Feature components (page-scoped)" section documenting AnalyticsFilters / MultiSelectPopover / GenerateReportDialog / ReportsHistoryCard prop contracts
- [docs/ARCHITECTURE.md](./ARCHITECTURE.md) — `xlsx` added to stack table; `components/analytics/` added to folder layout; `downloadReport` added to utils registry

**Follow-ups**
- `MultiSelectPopover` is a good promotion candidate to `shared/` — wait for the second consumer (likely Applications or Users filters) before lifting it
- The "1 день" period currently passes an exact 24-hour window from now; partial-day semantics ("today midnight onwards") could be a future refinement
- CSV export currently emits only the first selected breakdown sheet — multi-sheet CSV is non-standard. Could be split into multiple files or zipped if multi-dimension CSV is requested
- New lesson [10-utf8-bom-for-cyrillic-csv-export.md](./lessons/10-utf8-bom-for-cyrillic-csv-export.md) — UTF-8 BOM is required when emitting CSV with Cyrillic for Windows Excel users; non-obvious enough to be worth a permanent note. Lesson 08 (`Date.now()` purity) was re-applied without surprises

---

## 2026-05-20 — Dashboard rebuild (period filter, multi-series trend, mobile cards)

**Module:** dashboard
**Commits:** (uncommitted, working tree)
**Files touched:** 5 — see list below
**What changed:**
- **Dashboard rebuilt end-to-end** ([src/pages/Dashboard.tsx](../src/pages/Dashboard.tsx)) to serve both operator (operational queue) and admin (strategic KPIs) on one screen:
  - `PageHeader` now has a period `Select` (Сегодня / 7 / 30 / 90 дней) and a refresh icon button that rotates 360° once over 600 ms via `animate-[spin_600ms_linear_1]`. Subtitle is the current date in `EEEE, d MMMM yyyy` Russian format (capitalised first letter)
  - 4 KPI tiles: Всего пользователей, Заявок сегодня, **Заявки за 3 часа (highlighted brand-bar + brand clock icon, click → `/applications?period=3h`)**, Одобрено. Single source of truth memoized from `applicationsApi.list()` + `clientsApi.list()`; period select filters the dataset
  - Two-column row 1 (60/40 on `lg`): multi-series LineChart (Создано / Одобрено / Отказано, slate-700 / emerald-600 / rose-500, fixed last-7-days window, formatted tooltip + bottom legend) + Donut (top 5 statuses, custom right-side legend `dot · label · count · %`)
  - Two-column row 2 (65/35 on `lg`): recent applications card (6 rows on desktop / tablet as `<Table>`, **on mobile (`<sm`) renders as a vertical card list** — bordered surfaces, name + status badge, partner · time, amount) + top partners card (5 rows with hue-ramped inline progress bar; click → `/partners?focus={id}`)
  - Loading: per-section `Skeleton` placeholders matching each card outline
  - Empty: `EmptyState` with `Inbox` icon + "Нет заявок за выбранный период"
  - Accessibility: chart `role="img" + aria-label`, progress bars with `role="progressbar"` + `aria-value*`, period select + refresh button labelled
- **Chart wrappers extended** to support multi-series and custom legends without forcing pages to use Recharts directly:
  - `KPICard` ([charts/KPICard.tsx](../src/components/charts/KPICard.tsx)) — added `deltaText?: ReactNode` for plain muted text below value (free-form, no arrow/colour). Value bumped to `text-3xl`
  - `LineChartCard` ([charts/LineChartCard.tsx](../src/components/charts/LineChartCard.tsx)) — added `series?: LineSeries[]` (multi-line + bottom Legend), `tooltipValueFormatter`, `tooltipLabelFormatter`, `ariaLabel`. `yKey` is now optional (single-line legacy mode)
  - `DonutChartCard` ([charts/DonutChartCard.tsx](../src/components/charts/DonutChartCard.tsx)) — added `legendFormatter?: (slice, percent) => ReactNode` (custom 50/50 grid layout when set; falls back to Recharts default right-side legend when omitted) and `ariaLabel`
- **i18n keys added** under `dashboard.*` ([i18n/locales/ru.json](../src/i18n/locales/ru.json)): `period.{today,7d,30d,90d,ariaLabel}`, `kpi.{totalUsers,totalUsersDelta,applicationsTodayDelta,applicationsLast3hDelta,approved,approvedDelta}`, `charts.{applicationsTrendDescription,ariaTrend,ariaStatusBreakdown}`, `trendSeries.{created,approved,rejected}`, `recent.{title,time}`, `topPartners.{approvalRate,applications}`, `empty.{title,description}`. `viewAll` reworded to "Все заявки"

**Compatibility / non-obvious fixes captured**
- `react-hooks/purity` (React Compiler) treats `Date.now()` and `new Date()` as impure → flagged inside `useMemo`. Lifted `now` to a `useState<number>(() => Date.now())` initialized once, updated by the refresh button. All time-dependent memos depend on `nowTs` for deterministic deps. → Lesson [08-date-now-purity-in-usememo.md](./lessons/08-date-now-purity-in-usememo.md)
- Recharts v3 `Tooltip` typing: `formatter` and `labelFormatter` accept `ReactNode` labels with a payload arg. Generic callers want `(value, name) => [string, string]` and `(label: string) => string`. Solved with `as never` cast at the call site inside `LineChartCard` so consumers stay ergonomic
- Mobile cards vs desktop table: dual-render with `hidden sm:block` + `sm:hidden` containers, both fed the same data. Will repeat for every page that ships a list view. → Lesson [09-mobile-card-vs-desktop-table.md](./lessons/09-mobile-card-vs-desktop-table.md)

**Docs synced this pass**
- [.claude/rules/00-project-context.md](../.claude/rules/00-project-context.md) — Dashboard status line updated
- [docs/ROUTES.md](./ROUTES.md) — KPICard, LineChartCard, DonutChartCard prop contracts extended; Dashboard route's i18n key list refreshed
- [docs/lessons/08-date-now-purity-in-usememo.md](./lessons/08-date-now-purity-in-usememo.md) — new lesson
- [docs/lessons/09-mobile-card-vs-desktop-table.md](./lessons/09-mobile-card-vs-desktop-table.md) — new lesson
- [docs/lessons/README.md](./lessons/README.md) — index updated

**Follow-ups**
- `dashboard.subtitle` in `ru.json` is now orphaned (Dashboard renders a computed date instead). Leaving the key for now; can be removed in a future i18n cleanup pass
- Period filter widens correctly but mock `createdAt` spans only ~6.5 days, so 30 / 90-day periods currently render the same data as 7d. Will resolve when the mock is regenerated or the real backend lands
- `"Всего пользователей"` KPI is bound to `clients.length` (broker client base, 50 in mock). If the intended source is the internal `users.length`, swap the binding in `Dashboard.tsx`

---

## 2026-05-20 — Initial scaffold, layout, lessons, project context

**Module:** all
**Commits:** (uncommitted — Texnomart is untracked in the parent workspace repo)
**Files touched:** ~110 files created from zero (`src/`, `docs/`, `.claude/`, `CLAUDE.md`)

**What changed**

- **First scaffold** of the entire Texnomart admin panel:
  - Vite + React 19 + TypeScript 6 (strict + `verbatimModuleSyntax`)
  - Tailwind v3 + shadcn/ui (New York, Slate, CSS variables)
  - React Router v7 (JSX `<Routes>`), TanStack Query v5, TanStack Table v8, Zustand v5, react-hook-form + zod, recharts v3, date-fns v4, react-i18next, sonner
  - 28+ shadcn primitives installed via CLI
  - Path alias `@/*` → `src/*` (both `tsconfig.app.json` and `vite.config.ts`)
- **Brand token system** added: `--brand`, `--brand-foreground`, `--brand-soft` (light + dark) → exposed as Tailwind `brand.{DEFAULT,foreground,soft}`. Inter loaded from Google Fonts in `index.html`
- **Layout shell**: `AppLayout` → `SidebarProvider` + `AppSidebar` (collapsible icon mode, 15rem/3.5rem) + `SidebarInset` (`TopBar` + `<Outlet/>` with `w-full p-4 md:p-6`)
- **`<Logo />` + `<LogoMark />`** with the official wordmark SVG (`currentColor` for letterforms, locked `#FBC100` for the star)
- **11 routes wired**: Dashboard (full implementation: 5 KPIs + line/donut/bar charts + recent table) + 10 placeholders + NotFound (outside the shell)
- **Mock data**: 8 partner banks, 12 branches (Tashkent ×3 + 9 regional centres), 50 clients, 30 system users, 200 applications (status-weighted), 15 notifications, 10 reports. All deterministic
- **i18n setup**: RU canonical (single `ru.json`), UZ scaffolded (`{}`, falls back to RU). Detection: `localStorage["texnomart.locale"]` → `navigator.language` → `<html lang>`
- **State**: Zustand `ui.store.ts` (theme/locale/sidebarCollapsed, persisted) + `auth.store.ts` (mock current user)
- **Mobile responsiveness pass**: TopBar hides breadcrumb root + LanguageSwitcher on `<sm`; UserMenu gains a "Язык" sub-section on mobile; `MobileMenuButton` opens the sidebar Sheet on mobile
- **Sidebar redesign**: account dropdown removed from the footer; replaced with a `<CollapseToggle>` (PanelLeftClose / PanelLeftOpen). `<SidebarTrigger>` removed from TopBar entirely (only `MobileMenuButton` remains, mobile-only)
- **Active nav item accent** (final): 3px brand-yellow left bar + 1px brand glow + `font-semibold text-foreground` + `text-brand` filled icon. Icons swapped from `lucide-react` (stroke-only) to `@phosphor-icons/react` with `weight="fill"` for active, `"regular"` for inactive. Lucide stays everywhere else (TopBar, KPI icons, placeholders, etc.)
- **Main content full-width**: removed `mx-auto max-w-screen-2xl` from `AppLayout`. Pages own their own column widths if needed
- **TanStack Query Devtools button** moved to `bottom-right` (away from sidebar trigger and toast position)
- **Documentation foundation**:
  - `CLAUDE.md` rewritten as general workflow orchestration (Plan Mode, Subagent Strategy, Self-Improvement Loop, Verification, TypeScript Pro Standards, Core Principles, Commands)
  - `.claude/commands/{commit,doc_sync,start_task}.md` — three workflow commands with the project's folder grouping rules baked in
  - `.claude/rules/` — 14 numbered rule files (00 project context, 01 folder structure, 02 design tokens, 03 shadcn + icons, 04 sidebar/topbar/layout, 05 routing, 06 i18n, 07 data layer, 08 state management, 09 typescript strict, 10 mobile responsive, 11 forms, 12 charts, 99 docs cascade)
  - `docs/lessons/` — 6 lessons (RU) covering mobile topbar, devtools button position, sidebar footer collapse, sidebar trigger removed, active item accent, full-width main
  - `docs/lessons/07-phosphor-icons-for-nav.md` — Phosphor swap for sidebar nav (added by this `/doc_sync` pass)
  - `docs/{DATA_MODELS,ROUTES,ARCHITECTURE}.md` — generated by this `/doc_sync` pass
- **CLAUDE.md + `.claude/` moved into the Texnomart project root** (was at workspace level — now project-scoped so other workspace projects don't inherit Texnomart's rules)

**Compatibility fixes captured along the way**
- TS 6 deprecates `baseUrl`: removed in favor of paths-only (paths resolve relative to config)
- `verbatimModuleSyntax: true` broke shadcn `pagination.tsx` (mixed value/type import); fixed by promoting `ButtonProps` to a type-only import
- react-day-picker v10 dropped the `table` className key in `calendar.tsx`; removed
- recharts v3 introduced stricter `TypedDataKey<T>`; generic wrappers cast `xKey as string`
- Vite scaffold pulled React 19 + Vite 8 + TS 6 + Router 7 (newer than the original spec which named React 18 + Router 6). All APIs compatible — we use the modern stack

**Final verification (end of session)**
- `npm run typecheck` — passes (TS strict + `verbatimModuleSyntax`)
- `npm run build` — passes (~2s, 302 KB gzip)
- `npm run dev` — boots clean (Vite 8, ~700ms cold start)

**Follow-ups**
- 10 placeholder pages need real implementations. The data layer (`*.api.ts` + mock seeds) and shared primitives (DataTable, StatusBadge, KPICard, chart cards, formatters) are ready — each page is now a composition exercise
- UZ translations: locale file is `{}`; needs a translation pass when product validation in Uzbek is required
- Real auth: `auth.store.ts` currently hardcodes a superadmin user. When the real auth provider lands, store only a token in Zustand and fetch the user via TanStack Query
- Code-splitting: bundle is 302 KB gzip — fine for now, revisit when it crosses 500 KB or when route-level lazy loading becomes worthwhile
- Settings page: ThemeToggle and LocaleSwitcher controls should appear in a Settings page once implemented
