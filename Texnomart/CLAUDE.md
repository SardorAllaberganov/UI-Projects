# CLAUDE.md — Global Workflow Orchestration

> Project-specific rules live in `.claude/rules/` (auto-loaded by Claude Code).
> Per-project context, folders, design tokens, brand rules → see numbered files in `.claude/rules/`.
> Lessons (incident learnings, framework quirks, non-obvious patterns) live next to the active project under `<Project>/docs/lessons/`.

## Product context
This workspace currently ships **Texnomart Credit Broker Admin Panel** — the foundation product for OOO Texnomart's expanding fintech ecosystem in Uzbekistan.

- **Platform**: web SPA (React 19 + Vite + TypeScript strict)
- **UI**: shadcn/ui (New York style, Slate base, CSS variables) + Tailwind v3
- **Backend**: none yet. All data is mock — see `<Project>/src/mock/` + `<Project>/src/api/`. The shape of `*.api.ts` fetchers matches what the real backend will look like
- **Locales**: RU primary, UZ scaffolded
- **Brand**: Texnomart yellow `#FBC100` — used sparingly. See [`.claude/rules/02-design-tokens.md`](.claude/rules/02-design-tokens.md)
- **Future products** in this workspace will share the same primitives (DataTable, KPICard, StatusBadge, formatters). Every shared component must be reusable across products

If a feature requires a real backend, design the mock layer first — same shape the backend will return — so swapping later is a single-file replacement.

## Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

## Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

## Self-Improvement Loop
- After ANY correction from the user: add or update an entry in `<Project>/docs/lessons/` using the existing skeleton (**Цель → Контекст/Проблема → Решение → Принципы → Чего не делать**)
- Write rules for yourself that prevent the same mistake — promote them to `.claude/rules/` if they apply across features
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for the active project

## Verification Before Done
- Never mark a task complete without proving it works
- Run `npm run typecheck` and confirm passing before declaring done
- Run `npm run lint` and fix violations
- Build clean: `npm run build` (or `npm run dev` if iterating on UI)
- If touching feature behavior: smoke-check in **RU** locale (UZ falls back to RU today) and in both **light + dark** themes before declaring done
- If touching layout: smoke-check at `≥1280px` (desktop), `768–1023px` (tablet), `<640px` (mobile)
- Ask yourself: "Would a staff engineer approve this?"

## Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

## Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests / typecheck errors without being told how

## Task Management
1. **Plan First**: Outline the plan with checkable items before implementing
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go (TodoWrite)
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Summarize outcomes when done
6. **Docs Cascade**: After code changes, run `/doc_sync` per rule [`99-docs-cascade`](.claude/rules/99-docs-cascade.md)

## Architecture — Feature-First, Mock-Backed
- **Pages are thin** — orchestrate `PageHeader` + shared primitives + chart cards + DataTable. No inline business logic that belongs in a hook
- **Shared primitives** — reusable UI lives in `<Project>/src/components/shared/` (StatusBadge, DataTable, EmptyState, ConfirmDialog, etc.). Chart cards in `<Project>/src/components/charts/`. Layout shell in `<Project>/src/components/layout/`
- **shadcn primitives** — under `<Project>/src/components/ui/`. Install via `npx shadcn@latest add <name>` — never hand-roll a primitive that exists in shadcn
- **Data layer (mock)** — TanStack Query in pages, `*.api.ts` fetchers in `<Project>/src/api/` returning `Promise<T>` from `<Project>/src/mock/` seed arrays. Each entity ships its own `*Keys` query-key factory next to the fetcher
- **State** — Zustand for UI state (`ui.store.ts`, `auth.store.ts`) with `persist` middleware where survival across reloads matters. TanStack Query for server state
- **i18n** — all UI strings via `t('namespace.key')`. RU canonical, UZ falls back to RU
- **Icons** — `@phosphor-icons/react` with `weight="fill"`/`"regular"` for sidebar nav. `lucide-react` everywhere else. Never mix them in the same place. See [`.claude/rules/05-icons.md`](.claude/rules/05-icons.md)

Full directory layout in [`.claude/rules/01-folder-structure.md`](.claude/rules/01-folder-structure.md). Layout shell wiring in [`.claude/rules/04-sidebar-topbar-layout.md`](.claude/rules/04-sidebar-topbar-layout.md).

## TypeScript / React Pro Standards
- **Strict mode + `verbatimModuleSyntax`** — type-only imports MUST use `import type {...}`. No `import { type X }` mixed with values
- **Path alias** — `@/*` → `src/*`. Use it. Don't write `../../../components`
- **Named exports for pages** — `export function Dashboard()`, no default exports for page components
- **Modern syntax** — optional chaining `?.`, nullish coalescing `??`, logical assignment `??=`
- **Immutable arrays** — `toSorted()`, `toReversed()`, `with()` over mutating methods
- **Modern methods** — `at(-1)`, `findLast()`, `Object.groupBy()`, `Object.hasOwn()`, `replaceAll()`
- **Parallel async** — `Promise.all()` for independent operations, never sequential `await`s
- **Tree-shake safe** — no side effects at module scope, no barrel files in features
- **ESM imports** — 4-group order: built-ins, packages, `@/` aliases, relative
- **Errors at boundaries only** — let internal code throw; validate user input at form layer with zod; surface failures via Sonner toasts or `ErrorState`

## Core Principles
- **Reusable across products**: every shared primitive must work for the next product in the ecosystem without modification
- **Simplicity First**: make every change as simple as possible. Impact minimal code
- **No Laziness**: find root causes. No temporary fixes. Senior developer standards
- **Minimal Impact**: changes should only touch what's necessary. Avoid introducing bugs
- **Fail Fast**: zod-validate forms, handle errors in fetchers, show user-facing errors via Sonner or `ErrorState`
- **Explicit Over Implicit**: no magic. If behavior isn't obvious from reading the code, rename — comments are second choice
- **No hardcoded colors / fonts** — use Tailwind tokens (`text-foreground`, `bg-card`, `text-brand`) — never hex
- **No hardcoded user-facing text** — use `useTranslation`, keys in [`<Project>/src/i18n/locales/ru.json`](.claude/rules/06-i18n.md)
- **No max-widths on the layout shell** — pages own their own column widths if needed. See [`.claude/rules/04-sidebar-topbar-layout.md`](.claude/rules/04-sidebar-topbar-layout.md)
- **No `git add -A`** — stage specific files only. See [`.claude/commands/commit.md`](.claude/commands/commit.md)

## Commands
[`/start_task`](.claude/commands/start_task.md) [`/commit`](.claude/commands/commit.md) [`/doc_sync`](.claude/commands/doc_sync.md)

### Active project
**Texnomart** — credit broker admin panel. This `CLAUDE.md` and the `.claude/` folder live at the project root.

### Workspace project types (general scaffold)
| Type | Description |
|------|-------------|
| `vite-react-ts` | Vite + React + TypeScript SPA — **Texnomart, MSB, Unired use this** |
| `vite-react-ts-shadcn` | Same + shadcn/ui pre-wired with brand tokens |
| `figma-ds` | Figma design-system mirror (no app code, just docs + tokens) |
