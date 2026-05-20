# 03. shadcn/ui + icon libraries

## shadcn/ui setup
- Style: **New York**
- Base colour: **Slate**
- CSS variables: **yes**
- Manifest: [`components.json`](../../components.json)
- Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`

## Adding new primitives
ALWAYS via the CLI, never hand-rolled:
```bash
npx shadcn@latest add <name>
# Examples:
npx shadcn@latest add data-table
npx shadcn@latest add command
```
After install:
- Don't reformat the generated file
- If you must edit (e.g., template bug, type incompatibility), document the fix in a new lesson under `docs/lessons/`. Examples of fixes we've already made:
  - `pagination.tsx`: changed `import { ButtonProps }` to `import { type ButtonProps }` for `verbatimModuleSyntax`
  - `calendar.tsx`: removed the `table` className (react-day-picker v10 dropped it)

## Currently installed primitives
button, card, badge, input, label, select, textarea, dropdown-menu, sheet, dialog, table, tabs, tooltip, separator, avatar, skeleton, switch, scroll-area, command, popover, calendar, form, checkbox, radio-group, sidebar, alert, alert-dialog, progress, breadcrumb, pagination, sonner.

## Icon libraries — split by purpose

### `@phosphor-icons/react` — sidebar nav ONLY
- Why: Phosphor supports `weight="fill"` for active states. Lucide is stroke-only
- Usage: import the named icon, pass `weight="fill"` when active, `weight="regular"` otherwise
- Currently used in: [`src/lib/constants/navigation.ts`](../../src/lib/constants/navigation.ts) and rendered by [`AppSidebar.tsx`](../../src/components/layout/AppSidebar.tsx)

```tsx
import { SquaresFour, type Icon } from "@phosphor-icons/react";

<SquaresFour
  size={18}
  weight={isActive ? "fill" : "regular"}
  className={isActive ? "text-brand" : "text-current"}
/>
```

### `lucide-react` — everywhere else
- TopBar controls (Bell, Search, Menu, ChevronRight)
- Page-level icons (Construction in `Placeholder`, Wallet/Clock/CheckCircle2 in KPI cards, Plus in CTAs, etc.)
- `lucide-react` ships only stroke icons. To make one look bolder, set `strokeWidth={2.5}` — there are no filled variants

## Rule of thumb
- Don't import the same icon name from both libraries in the same file
- Don't use Phosphor outside the nav (keeps the visual language consistent)
- Don't add a third icon library — if you need a brand-specific icon, drop a custom SVG into `src/components/<feature>/icons/`
