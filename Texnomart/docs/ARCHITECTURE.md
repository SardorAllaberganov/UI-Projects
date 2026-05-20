# ARCHITECTURE.md

> Last synced: 2026-05-20

## Stack

| Concern | Choice | Version | Source |
|---------|--------|---------|--------|
| Framework | React | 19.x | [package.json](../package.json) |
| Build / dev | Vite | 8.x | [vite.config.ts](../vite.config.ts) |
| Language | TypeScript | ~6.x (strict + `verbatimModuleSyntax`) | [tsconfig.app.json](../tsconfig.app.json) |
| Routing | react-router-dom (JSX `<Routes>`) | 7.x | [src/app/AppRoutes.tsx](../src/app/AppRoutes.tsx) |
| CSS | Tailwind | 3.4.x | [tailwind.config.js](../tailwind.config.js) |
| Component library | shadcn/ui — New York / Slate / CSS vars | (CLI-installed) | [components.json](../components.json) |
| Server state | @tanstack/react-query + Devtools | 5.x | [src/app/AppProviders.tsx](../src/app/AppProviders.tsx) |
| Tables | @tanstack/react-table | 8.x | [src/components/shared/DataTable.tsx](../src/components/shared/DataTable.tsx) |
| UI state | Zustand (+ persist) | 5.x | [src/stores/](../src/stores/) |
| Forms | react-hook-form + zod + @hookform/resolvers/zod | 7.x / 4.x | (no consumer yet — pattern in [.claude/rules/11-forms.md](../.claude/rules/11-forms.md)) |
| Charts | recharts | 3.x | [src/components/charts/](../src/components/charts/) |
| Icons | `@phosphor-icons/react` (sidebar nav) + `lucide-react` (everything else) | latest / 1.x | [src/lib/constants/navigation.ts](../src/lib/constants/navigation.ts) for Phosphor; everywhere else for lucide |
| i18n | react-i18next + i18next + i18next-browser-languagedetector | 17.x / 26.x | [src/i18n/index.ts](../src/i18n/index.ts) |
| Dates | date-fns (RU locale only for now) | 4.x | [src/lib/utils/formatters.ts](../src/lib/utils/formatters.ts) |
| Toasts | sonner | 2.x | [src/components/ui/sonner.tsx](../src/components/ui/sonner.tsx) |

## Folder layout (canonical)

```
.
├── .claude/                   ← workflow & project-specific rules
│   ├── commands/              ← /commit, /doc_sync, /start_task
│   └── rules/                 ← 14 numbered files, 00–12 + 99
├── CLAUDE.md                  ← global workflow orchestration
├── docs/
│   ├── ARCHITECTURE.md        ← this file
│   ├── DATA_MODELS.md         ← interfaces + mock arrays
│   ├── ROUTES.md              ← routes + shared component contracts
│   ├── HISTORY.md             ← session log
│   ├── lessons/               ← per-decision learnings (RU)
│   └── ТЗ_Кредитный Брокер Админ панель.pdf
├── public/
├── index.html                 ← Inter font + theme-color + root mount point
├── src/
│   ├── App.tsx                ← <AppProviders><AppRoutes/></AppProviders>
│   ├── main.tsx               ← createRoot + StrictMode + global CSS import
│   ├── index.css              ← Tailwind directives + CSS vars (light/dark/brand)
│   ├── app/
│   │   ├── AppProviders.tsx   ← QueryClient + BrowserRouter + Toaster + Devtools + GlobalEffects
│   │   └── AppRoutes.tsx
│   ├── pages/                 ← 12 page files + _placeholder
│   ├── components/
│   │   ├── layout/            ← AppLayout, AppSidebar, TopBar, PageHeader, Logo
│   │   ├── shared/            ← DataTable, badges, states, switchers, menus
│   │   ├── charts/            ← KPICard, LineChartCard, BarChartCard, DonutChartCard
│   │   └── ui/                ← shadcn primitives (28+)
│   ├── api/                   ← *.api.ts fetchers + *Keys factories + _client.ts
│   ├── mock/                  ← seed data + _helpers.ts
│   ├── stores/                ← ui.store.ts, auth.store.ts
│   ├── hooks/                 ← useTheme, useLocale, useAuth, use-mobile
│   ├── lib/
│   │   ├── utils/             ← cn, formatters
│   │   └── constants/         ← enums, navigation
│   ├── i18n/                  ← index.ts + locales/{ru,uz}.json
│   └── types/                 ← index.ts (Client, Partner, Branch, ...)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json              ← references app.json + node.json
├── tsconfig.app.json          ← strict + verbatimModuleSyntax + @/* alias
├── tsconfig.node.json
├── vite.config.ts             ← @/* alias must mirror tsconfig
└── components.json            ← shadcn manifest
```

Folder rules in [.claude/rules/01-folder-structure.md](../.claude/rules/01-folder-structure.md). Path alias `@/*` → `src/*` declared in both [tsconfig.app.json](../tsconfig.app.json) AND [vite.config.ts](../vite.config.ts) — keep them in sync.

## Layer composition

```
main.tsx
  └── <StrictMode>
       └── <App>
            └── <AppProviders>            ← QueryClient · BrowserRouter · Toaster · Devtools
                 └── <GlobalEffects />     ← useThemeSync + useLocaleSync (DOM side-effects)
                 └── <AppRoutes>           ← JSX <Routes>/<Route>
                      └── <AppLayout>      ← SidebarProvider · AppSidebar · SidebarInset
                           └── <TopBar />
                           └── <main><Outlet/></main>
                                └── <Dashboard /> or <PlaceholderPage />
```

## Theming

- **Tokens**: defined as HSL channel values in [src/index.css](../src/index.css) under `:root` (light) and `.dark` (dark). Brand tokens (`--brand`, `--brand-foreground`, `--brand-soft`) live in the same block — same hue in both modes, different `--brand-soft` lightness
- **Tailwind mapping**: [tailwind.config.js](../tailwind.config.js) exposes each token as a colour key (`background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `card`, `popover`, `sidebar.*`, `chart.1..5`, `brand.{DEFAULT,foreground,soft}`)
- **Mode switch**: Zustand `ui.store.ts → theme` (`"light" | "dark" | "system"`) → `useThemeSync` hook (called once in `<GlobalEffects/>`) toggles `.dark` class on `<html>` and listens to `prefers-color-scheme` when theme is `"system"`
- **Persistence**: `localStorage["texnomart.ui"]` via Zustand's `persist` middleware (`partialize` keeps only `theme`, `locale`, `sidebarCollapsed`)
- **Brand usage rules**: enforced socially via [.claude/rules/02-design-tokens.md](../.claude/rules/02-design-tokens.md). `#FBC100` only on primary CTAs, active sidebar nav (left bar + filled icon, no full background), focus rings, highlighted KPI cards, logo star, and notification unread indicator

## i18n

- **Library**: react-i18next + i18next + browser-languagedetector
- **Config**: [src/i18n/index.ts](../src/i18n/index.ts)
- **Locales**: `ru` (canonical, populated) + `uz` (empty `{}`, falls back to RU)
- **Detection chain**: `localStorage["texnomart.locale"]` → `navigator.language` → `<html lang>`
- **Sync**: Zustand `ui.store.ts → locale` → `useLocaleSync` hook calls `i18n.changeLanguage()` + sets `<html lang>`
- **Switch UI**: [LanguageSwitcher](../src/components/shared/LanguageSwitcher.tsx) on `≥sm` viewports; mobile users find it inside [UserMenu](../src/components/shared/UserMenu.tsx) under the "Язык" sub-section
- **Settings page**: when implemented, will also expose locale + theme selectors
- **Locale-aware formatters**: [src/lib/utils/formatters.ts](../src/lib/utils/formatters.ts) — `formatUZS`, `formatPhone`, `formatPinfl`, `formatDate`, `formatRelative`. Currently RU-only; will branch on active locale when UZ formatters are added

## Mobile responsiveness

- **Breakpoints**: Tailwind defaults (no custom breakpoints) — `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`
- **Sidebar on mobile**: shadcn's `<Sidebar>` automatically renders as a `<Sheet>` drawer when `useIsMobile()` (the hook installed by shadcn) returns true (under `768px`). The footer `CollapseToggle` is hidden in Sheet mode — the drawer opens/closes via a topbar `MobileMenuButton` that conditionally renders when `useSidebar().isMobile === true`
- **Topbar on mobile (`<sm`)**:
  - Breadcrumb root ("Texnomart › ") hidden, only current section shown
  - LanguageSwitcher hidden; available inside UserMenu
  - All right-side controls have `shrink-0` so they never compress
  - Single sizing container with `min-w-0 + truncate` for the variable-width breadcrumb
- **Main content**: full width (`w-full p-4 md:p-6`). No `mx-auto` / `max-w-screen-*` in the shell — pages own their own column widths when needed
- **KPI grid**: `sm:grid-cols-2 xl:grid-cols-5` → 1 col xs / 2 cols sm / 5 cols xl
- **Chart grids**: `lg:grid-cols-3` with `lg:col-span-2` for the wider chart; stacks below `lg`

Lesson catalogue under [docs/lessons/](./lessons/) — each "why" decision documented per the Russian skeleton (`Цель → Контекст → Решение → Принципы → Чего не делать`).

## Shared primitives — registry

| Family | Components |
|--------|-----------|
| Layout | `AppLayout`, `AppSidebar`, `TopBar`, `PageHeader`, `Logo`, `LogoMark` |
| Shared | `DataTable`, `StatusBadge`, `VariantBadge`, `RoleBadge`, `EmptyState`, `LoadingState`, `ErrorState`, `ConfirmDialog`, `LanguageSwitcher`, `ThemeToggle`, `UserMenu`, `NotificationsMenu` |
| Charts | `KPICard`, `LineChartCard`, `BarChartCard`, `DonutChartCard` |
| Hooks | `useTheme`, `useThemeSync`, `useLocale`, `useLocaleSync`, `useAuth`, `useIsMobile` (shadcn) |
| Utils | `cn`, `formatUZS`, `formatNumber`, `formatPercent`, `formatPhone`, `formatPinfl`, `formatDate`, `formatRelative` |

Prop contracts for each shared/charts component in [docs/ROUTES.md](./ROUTES.md#shared-component-prop-contracts). Type catalogue in [docs/DATA_MODELS.md](./DATA_MODELS.md).

## Data layer

```
Page  ─►  useQuery({ queryKey: xxxKeys.list(), queryFn: xxxApi.list })
              ↓
          src/api/<entity>.api.ts        ← typed fetcher + delay() + co-located *Keys factory
              ↓
          src/mock/<entity>.ts           ← deterministic seed array
```

- No `Math.random()` in seeds — every record is index-seeded so renders match across reloads
- `*Keys` query-key factories live next to each fetcher. Pages never construct query keys inline
- `dashboard.api.ts` aggregates other seeds at module init for derived shapes (KPIs, status breakdown, top partners/branches, trend)
- Real backend swap is a single-file change per entity — interfaces and consumers don't budge

## TypeScript strict mode

[tsconfig.app.json](../tsconfig.app.json) enables: `strict`, `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict`, `verbatimModuleSyntax`, `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch`. No `baseUrl` (deprecated in TS 6) — paths resolve relative to the config file.

Known compat fixes documented in [.claude/rules/09-typescript-strict.md](../.claude/rules/09-typescript-strict.md):
- Some shadcn templates need `import type { ... }` instead of mixed imports (fixed in `pagination.tsx`)
- `react-day-picker` v10 dropped the `table` className key (fixed in `calendar.tsx`)
- recharts v3 `dataKey` is `TypedDataKey<T>` — cast `xKey as string` in generic wrappers

## Build / dev / verification

```bash
npm run dev         # Vite dev server on http://localhost:5173/
npm run build       # tsc -b && vite build → dist/
npm run typecheck   # tsc -b --noEmit
npm run lint        # eslint .
npm run preview     # serve the built dist/
```

CI-equivalent before claiming done: `npm run typecheck && npm run build`. Current bundle: ~302 KB gzip (warning threshold raised — split-points are intentional since the app is small).

## Mobile native shell?
No. Web SPA only. Mobile = responsive web. If a native shell is requested later, the candidate is Expo (web-to-native via React Native Web + Expo Router), reusing the same `src/components/` primitives behind a separate `screens/` layer.
