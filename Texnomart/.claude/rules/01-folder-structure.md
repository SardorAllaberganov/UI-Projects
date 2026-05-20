# 01. Folder structure

## Top-level
```
. (project root)
├── .claude/                 ← commands + rules (this folder)
├── CLAUDE.md                ← global workflow orchestration
├── docs/                    ← TZ (PDF), lessons (md)
│   └── lessons/             ← per-decision notes (RU). One file per decision.
├── public/
├── src/                     ← all app code
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json            ← references tsconfig.app.json + tsconfig.node.json
├── tsconfig.app.json        ← strict + verbatimModuleSyntax + @/* alias
├── vite.config.ts           ← @/* alias must match tsconfig
└── components.json          ← shadcn manifest (New York / Slate / CSS vars)
```

## `src/` layout (authoritative)
```
src/
├── App.tsx                  ← renders <AppProviders><AppRoutes/></AppProviders>
├── main.tsx                 ← root render + index.css import
├── index.css                ← Tailwind directives + CSS variables (light + .dark + brand)
│
├── app/
│   ├── AppProviders.tsx     ← QueryClient + BrowserRouter + Toaster + Devtools + GlobalEffects
│   └── AppRoutes.tsx        ← JSX <Routes>/<Route> tree
│
├── pages/                   ← one page per file, PascalCase, NAMED export
│   ├── Dashboard.tsx
│   ├── Analytics.tsx
│   ├── Applications.tsx
│   ├── ApplicationDetail.tsx
│   ├── Users.tsx
│   ├── UserStatuses.tsx
│   ├── Roles.tsx
│   ├── Clients.tsx
│   ├── Partners.tsx
│   ├── Branches.tsx
│   ├── TelegramBot.tsx
│   ├── NotFound.tsx
│   └── _placeholder.tsx     ← <Placeholder titleKey="..." subtitleKey="..." />
│
├── components/
│   ├── layout/              ← AppLayout, AppSidebar, TopBar, PageHeader, Logo
│   ├── shared/              ← DataTable, StatusBadge, RoleBadge, EmptyState, LoadingState,
│   │                          ErrorState, ConfirmDialog, LanguageSwitcher, ThemeToggle,
│   │                          UserMenu, NotificationsMenu
│   ├── charts/              ← KPICard, LineChartCard, BarChartCard, DonutChartCard
│   └── ui/                  ← shadcn primitives (install via CLI, don't hand-roll)
│
├── api/                     ← mock async fetchers + query-key factories
│   ├── _client.ts           ← delay() helper
│   ├── applications.api.ts  ← + applicationsKeys
│   ├── branches.api.ts
│   ├── clients.api.ts
│   ├── dashboard.api.ts
│   ├── notifications.api.ts
│   ├── partners.api.ts
│   ├── reports.api.ts
│   ├── users.api.ts
│   └── index.ts             ← re-exports everything
│
├── mock/                    ← seed data (deterministic, no Math.random)
│   ├── _helpers.ts          ← pick / pickWeighted / pad
│   ├── applications.ts
│   ├── branches.ts
│   ├── clients.ts
│   ├── notifications.ts
│   ├── partners.ts
│   ├── reports.ts
│   └── users.ts
│
├── stores/                  ← Zustand
│   ├── ui.store.ts          ← theme / locale / sidebarCollapsed, persisted
│   └── auth.store.ts        ← current user (mock)
│
├── hooks/
│   ├── useAuth.ts
│   ├── useLocale.ts         ← useLocaleSync + useLocale
│   ├── useTheme.ts          ← useThemeSync + useTheme
│   └── use-mobile.tsx       ← shadcn-installed helper
│
├── lib/
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── formatters.ts    ← formatUZS, formatPhone, formatPinfl, formatDate, etc.
│   │   └── index.ts         ← re-exports (so `@/lib/utils` keeps working for shadcn)
│   └── constants/
│       ├── enums.ts         ← APPLICATION_STATUSES, ROLES, USER_STATUSES + label/variant maps
│       └── navigation.ts    ← NAV_ITEMS + SECONDARY_NAV (Phosphor icons)
│
├── i18n/
│   ├── index.ts             ← i18next config (RU primary, UZ fallback)
│   └── locales/
│       ├── ru.json
│       └── uz.json          ← empty {} — falls back to RU
│
└── types/
    └── index.ts             ← Client, Partner, Branch, SystemUser, CreditApplication,
                                NotificationItem, ReportItem, Locale, Theme
```

## Rules
- **Pages**: named export only (`export function PageName()`). One page per file. PascalCase.
- **Layout components**: live in `layout/` and are imported by `AppLayout`. Don't import them from pages directly — go through the shell.
- **Shared components**: must work in any page. If a component is tied to one page's domain logic, it stays inside that page file as a local component until proven reusable.
- **shadcn primitives**: only added via `npx shadcn@latest add <name>`. Edits to these files must be documented in `docs/lessons/`.
- **Mock + API**: every entity has both a seed file and a fetcher file. `*Keys` query-key factories live next to the fetcher.
- **No barrel files in features** — only the `api/index.ts` re-export. Pages import specific fetchers, not whole entities.
- **Path alias**: import via `@/...` everywhere. No `../../../`.
