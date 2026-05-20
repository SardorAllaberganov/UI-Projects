Sync the project documentation to reflect the current state of the code after a feature has landed.

Run this after a significant feature, refactor, or bug-fix session — not after every commit. Usage:

- `/doc_sync` — scan the whole working tree against `main` for changes
- `/doc_sync [module]` — narrow the scan to one module (e.g. `/doc_sync applications`, `/doc_sync sidebar`, `/doc_sync dashboard`). Interpret the argument as a folder hint or a feature keyword.

### Step 1: Detect what changed
Run in parallel:
- `git log --oneline origin/main..HEAD` — commits since the remote tip
- `git diff --name-only origin/main...HEAD` — touched files
- `git diff --stat origin/main...HEAD` — insertion/deletion size per file

If the branch is already pushed and clean, fall back to `git log --oneline -20` and inspect the last session's commits.

Classify touched files:
- `src/pages/*` → **pages**
- `src/components/layout/*` → **layout shell**
- `src/components/shared/*` → **shared primitives**
- `src/components/charts/*` → **chart cards**
- `src/components/ui/*` → **shadcn primitives** (skip — auto-generated)
- `src/app/AppRoutes.tsx`, `src/app/AppProviders.tsx` → **routing / app entry**
- `src/api/*` → **mock fetchers**
- `src/mock/*` → **seed data**
- `src/stores/*`, `src/hooks/*` → **state / hooks**
- `src/lib/constants/*` → **enums / navigation**
- `src/lib/utils/*` → **utils / formatters**
- `src/i18n/*` → **localization**
- `src/index.css`, `tailwind.config.js` → **design tokens / styles**
- `docs/*` → already-documentation, skip
- `CLAUDE.md`, `.claude/*` → project context, skip
- Anything else → flag for review

If a `[module]` argument was given, only keep files whose path or name contains that keyword.

### Step 2: Update `CLAUDE.md`
The repo-root `CLAUDE.md` is the canonical snapshot read at the start of new AI sessions. It must always reflect current reality.

Sections to maintain (regenerate from live files — don't append):
```
# Claude Context: Texnomart Credit Broker Admin Panel
## Critical Rules
## Design Philosophy
## Design Tokens (CSS vars + brand rules + typography)
## Sidebar Configuration
## Existing Pages & Features  (table of routes + status)
## Component Architecture
## Stores, Hooks, API
## Tech Stack Quick Reference
## When Adding New Pages
## When Adding New Components
## Business Domain
```

Authoritative sources to re-read when regenerating sections:
- Routes: [src/app/AppRoutes.tsx](src/app/AppRoutes.tsx)
- Nav items: [src/lib/constants/navigation.ts](src/lib/constants/navigation.ts)
- Domain enums: [src/lib/constants/enums.ts](src/lib/constants/enums.ts)
- Brand tokens: [src/index.css](src/index.css) + [tailwind.config.js](tailwind.config.js)
- Tech stack: [package.json](package.json)

### Step 3: If data models / interfaces changed → update `docs/DATA_MODELS.md`
This project has no real backend. `DATA_MODELS.md` catalogues the TypeScript interfaces and mock-data shapes that play the backend role.

Trigger: a new `interface Foo {}` appeared in `src/types/` or `src/mock/*`, or a field changed on `Client`, `Partner`, `Branch`, `SystemUser`, `CreditApplication`, `NotificationItem`, `ReportItem`.

For each listed interface: file path, purpose, fields, and where it's consumed (`src/api/*.api.ts`, which pages render it). If the file doesn't exist yet, create it with a short intro paragraph.

### Step 4: If routes or component prop contracts changed → update `docs/ROUTES.md`
This project has no REST API. `ROUTES.md` documents the react-router paths and the "contract" of shared components (prop shape, what callbacks they emit).

Trigger: `src/app/AppRoutes.tsx` was touched, or any exported component's prop signature changed (e.g. `PageHeader`, `DataTable`, `StatusBadge`, `KPICard`, `LineChartCard`, `BarChartCard`, `DonutChartCard`, `EmptyState`, `ConfirmDialog`, `LanguageSwitcher`, `ThemeToggle`).

Each route entry: path, page file, status (full/placeholder), required `t()` keys. Each shared component: exported name, props, usage example, what it renders. If the file doesn't exist yet, create it.

### Step 5: If layer structure or dependencies changed → update `docs/ARCHITECTURE.md`
Trigger: `package.json` changed, a new top-level folder appeared under `src/`, a shared primitive was added that others depend on, or the layout/sidebar/topbar wiring was rearranged.

Maintain these sections:
- **Stack** — framework, build tool, router, styling approach, icon libraries (lucide + Phosphor split)
- **Folder layout** — `src/app`, `src/pages`, `src/components/{layout,shared,charts,ui}`, `src/lib/{utils,constants}`, `src/api`, `src/mock`, `src/i18n`, `src/hooks`, `src/stores`, `src/types`, `docs`
- **Layout shell** — `<AppProviders>` → `<BrowserRouter>` → `<AppLayout>` → `<SidebarProvider>` + `<AppSidebar>` + `<SidebarInset>` (TopBar + `<Outlet/>`)
- **Theming** — Zustand `ui.store` + `useThemeSync` writes `.dark` class; tokens in `index.css` + `tailwind.config.js`
- **i18n** — `useLocaleSync` syncs Zustand locale → i18next; RU canonical, UZ falls back to RU
- **Mobile** — `<MobileMenuButton>` opens the sidebar Sheet; `<SidebarTrigger>` is NOT in TopBar

If the file doesn't exist yet, create it.

### Step 6: Checkpoint `docs/HISTORY.md`
Append (never rewrite) an entry at the top of the file:

```
## YYYY-MM-DD — <short session summary>

**Module:** [module name or "all"]
**Commits:** <short hashes since last sync>
**Files touched:** <count> — see list below
**What changed:**
- Bullet per logical feature (not per file).
**Follow-ups:** (optional)
- Anything known-incomplete or deferred.
```

If `HISTORY.md` does not exist, create it with a short intro paragraph explaining its purpose.

### Step 7: Lessons
If this session fixed a critical bug or landed a non-obvious pattern that future AI sessions need to know about, add a numbered file to [docs/lessons/](docs/lessons/) and register it in [docs/lessons/README.md](docs/lessons/README.md).

The lesson skeleton (mirror existing files): **Цель → Контекст/Проблема → Решение → Принципы → Чего не делать**.

Do NOT duplicate lessons that are already there — check the README index first.

Good lesson triggers:
- A user correction that changed how you'd approach the same task next time
- A framework/library quirk that bit us (e.g. lucide has no fill variants, `verbatimModuleSyntax` requires `import type`, `baseUrl` deprecated in TS 6)
- A rule that applies to many future features (e.g. "active nav uses Phosphor filled icon + brand color, never brand background")
- A mobile/responsive trick (see existing `01-mobile-responsive-topbar.md`)

### Step 8: Report back to the user
Finish with a short summary in chat:
- What was synced (files updated)
- Any documentation gaps or inconsistencies you spotted but didn't fix
- If anything in the code looked suspicious during the sync, call it out — don't silently fix it

### Rules
- Never invent documentation content. Every fact must be traceable to a file in the repo
- Never leave stale TODO markers like "coming soon" in docs — either document what exists or omit the section
- Keep each doc file under ~300 lines. If a file grows past that, split it (e.g. `DATA_MODELS.md` → per-domain files)
- Docs must use relative markdown links (e.g. `[AppRoutes.tsx](../src/app/AppRoutes.tsx)`) so they stay clickable in IDEs and on GitHub
- Lessons go in Russian (matches existing `docs/lessons/*` files); top-level docs (`CLAUDE.md`, `ARCHITECTURE.md`, `DATA_MODELS.md`, `ROUTES.md`, `HISTORY.md`) stay in English
- Do NOT commit automatically — end by showing the updated file list and let the user invoke `/commit`
