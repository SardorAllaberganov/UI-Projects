Before writing any code, gather full context on the task.

### Step 1: Read Project Context
1. Read [CLAUDE.md](CLAUDE.md) for critical rules, design tokens, and conventions
2. Skim [docs/lessons/README.md](docs/lessons/README.md) and any lessons relevant to the task (mobile UX, sidebar, brand usage, icons, etc.)
3. Check [.claude/commands/](.claude/commands/) for any relevant workflow commands
4. Read `MEMORY.md` (if present) and related files to keep persistent rules in mind

### Step 2: Identify Scope
1. Identify which files will be affected (pages, layout, shared components, routes, navigation, i18n, mock data, api fetchers)
2. Read each affected file to understand current state
3. Check [src/app/AppRoutes.tsx](src/app/AppRoutes.tsx) for existing route structure
4. Check [src/lib/constants/navigation.ts](src/lib/constants/navigation.ts) if adding a sidebar entry
5. Check [src/lib/constants/enums.ts](src/lib/constants/enums.ts) for existing status/role unions before inventing new ones
6. Check [src/i18n/locales/ru.json](src/i18n/locales/ru.json) for existing translation namespaces before adding keys
7. If touching data: check [src/types/index.ts](src/types/index.ts), [src/mock/](src/mock/), and [src/api/](src/api/)

### Step 3: Review Patterns
1. Read a similar existing page/component for reference patterns:
   - **Full page with KPIs + charts + table** → [src/pages/Dashboard.tsx](src/pages/Dashboard.tsx)
   - **Placeholder page** → [src/pages/_placeholder.tsx](src/pages/_placeholder.tsx) (used by Analytics, Applications, Clients, etc.)
   - **DataTable usage** → reference [src/components/shared/DataTable.tsx](src/components/shared/DataTable.tsx) prop contract (`columns`, `searchKeys`, `filters`, `onRowClick`)
   - **Status pill** → [src/components/shared/StatusBadge.tsx](src/components/shared/StatusBadge.tsx)
   - **KPI card** → [src/components/charts/KPICard.tsx](src/components/charts/KPICard.tsx) (note the `highlighted` prop for brand-bar treatment)
2. Verify token usage: tokens in [src/index.css](src/index.css), Tailwind colors in [tailwind.config.js](tailwind.config.js). Use `text-foreground`, `bg-card`, `border-border`, `text-brand`, `bg-brand-soft` — never hardcoded hex
3. Confirm layout rules: `<AppLayout>` provides full-width main with `p-4 md:p-6`. Don't add `mx-auto` or `max-w-*` at the layout level
4. Check shared components before hand-rolling: `PageHeader`, `DataTable`, `StatusBadge`, `RoleBadge`, `EmptyState`, `LoadingState`, `ErrorState`, `ConfirmDialog`, `KPICard`, `LineChartCard`, `BarChartCard`, `DonutChartCard`

### Step 4: Propose Approach
Present a plan listing:
- **New files** to create (page, components, mock data, api fetchers, types)
- **Modified files** (`AppRoutes.tsx`, `navigation.ts`, `ru.json`, `enums.ts`)
- **Patterns** to follow (reference which existing page)
- **Data shapes** needed (new `interface` in `src/types/index.ts`, mock array in `src/mock/`, `*.api.ts` fetcher with `*Keys` factory)
- **i18n keys** to add (which namespace, what keys)

```
Plan:
1. Create src/pages/NewPage.tsx — based on Dashboard.tsx for layout, Applications-style for table
2. Add route in src/app/AppRoutes.tsx
3. Add nav entry in src/lib/constants/navigation.ts (Phosphor icon + label)
4. Add i18n keys: nav.newPage, newPage.title, newPage.subtitle, newPage.table.*
5. (If data) Add interface + mock + api fetcher
```

### Step 5: Wait for Approval
Do NOT write any code until the user approves the plan.

### Rules
- Tokens, never hex: `text-foreground` / `bg-card` / `border-border` / `text-brand` etc.
- Brand yellow ONLY on CTA buttons, active sidebar item, focus rings, brand mark, highlighted KPI cards. Never as a full background
- Sidebar nav icons use `@phosphor-icons/react` with `weight="fill"` (active) / `"regular"` (inactive). All other icons stay on `lucide-react`
- Use `react-router-dom` v7 with JSX `<Routes>`/`<Route>` — not `createBrowserRouter`
- Pages live in `src/pages/` (named exports only). Components split across `layout/`, `shared/`, `charts/`, `ui/`
- Main content: `w-full p-4 md:p-6`, no `mx-auto`, no `max-w-screen-*` at layout level
- All UI strings via `t('...')`. New keys land in `src/i18n/locales/ru.json`. Leave `uz.json` as `{}` — UZ falls back to RU
- All async data via TanStack Query against `src/api/*.api.ts` fetchers. Co-locate the `*Keys` query-key factory
- TypeScript: strict + `verbatimModuleSyntax` is on. Use `import type {...}` for type-only imports
- Path alias `@/*` → `src/*` — prefer over relative `../../../`
- Do NOT modify files in `src/components/ui/*` unless re-installing via `npx shadcn@latest add` or making intentional template fixes (document those in a lesson)
- Do NOT modify `package-lock.json` directly; install via `npm install`
