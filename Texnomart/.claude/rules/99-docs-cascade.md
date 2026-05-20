# 99. Docs cascade

When to run `/doc_sync` and what cascades from a code change.

## Trigger matrix

| You changed... | Cascade to |
|----------------|------------|
| `src/app/AppRoutes.tsx` | `CLAUDE.md` "Existing Pages & Features" table → `docs/ROUTES.md` |
| `src/lib/constants/navigation.ts` | breadcrumb / nav order in `CLAUDE.md` |
| `src/lib/constants/enums.ts` | `docs/DATA_MODELS.md` enum sections + i18n status keys |
| `src/types/index.ts` | `docs/DATA_MODELS.md` |
| New entity in `src/mock/` + `src/api/` | `docs/DATA_MODELS.md` (interface + consumers) |
| Shared component prop change (DataTable, KPICard, etc.) | `docs/ROUTES.md` shared components section |
| New page in `src/pages/` | `CLAUDE.md` page table + ensure nav entry + i18n keys exist |
| `tailwind.config.js` / `src/index.css` token change | `.claude/rules/02-design-tokens.md` + smoke-check in light and dark |
| Sidebar / TopBar / layout rewiring | `.claude/rules/04-sidebar-topbar-layout.md` + add a lesson under `docs/lessons/` |
| New dependency in `package.json` | `CLAUDE.md` "Tech Stack" reference + check if a rule needs to mention it |
| ESLint / tsconfig / vite config change | `.claude/rules/09-typescript-strict.md` if it affects strictness; otherwise just a `HISTORY.md` entry |

## When to write a lesson
Add a numbered file to [`docs/lessons/`](../../docs/lessons/) and register it in `docs/lessons/README.md` when:

- A user correction changed your approach to a kind of task (e.g., "use Phosphor for nav, not lucide")
- A framework / library quirk bit us (e.g., `verbatimModuleSyntax` + shadcn `pagination.tsx`)
- A non-obvious rule applies to many future features (e.g., "active nav uses filled icon + brand color, never brand background")
- A mobile / a11y trick is worth recording (e.g., the mobile menu button pattern)

Lessons stay in Russian, top-level docs (`CLAUDE.md`, `ARCHITECTURE.md`, etc.) stay in English. Format: **Цель → Контекст/Проблема → Решение → Принципы → Чего не делать**.

## When NOT to update docs
- Pure refactors that don't change behavior or contracts → no doc change, just a `HISTORY.md` entry
- Tightening a type without changing the public API → no doc change
- Adding a placeholder page that says "coming soon" → no doc change beyond the route table
- Style tweaks that respect existing tokens → no doc change

## Workflow
```
1. Land the code change
2. Run /doc_sync (or sync manually per the trigger matrix above)
3. Show the diff to the user
4. User invokes /commit
```

Do NOT auto-commit doc changes alongside code. Keep them as a separate commit step the user controls.
