# 07. Data layer — TanStack Query + mock fetchers

## Layers
```
┌─────────────────────────────────────────────┐
│  Page  →  useQuery / useMutation            │
│     ↓                                       │
│  src/api/<entity>.api.ts  (typed fetcher)   │
│     ↓                                       │
│  src/mock/<entity>.ts  (seed array)         │
└─────────────────────────────────────────────┘
```

There is no backend yet. Fetchers return `Promise<T>` via a `delay()` helper so the loading states are realistic.

## Query client
Configured once in [`AppProviders.tsx`](../../src/app/AppProviders.tsx):
```ts
{
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
}
```
Devtools are mounted (button bottom-right) only in dev (`import.meta.env.DEV`).

## Entity contract
Every entity ships **two files**: `*.api.ts` (fetchers + `*Keys` factory) and `*.ts` (seed) in the corresponding folders.

Example — `applications.api.ts`:
```ts
import { applications } from "@/mock/applications";
import type { CreditApplication } from "@/types";
import { delay } from "./_client";

export const applicationsApi = {
  list: () => delay(applications),
  get: (id: string): Promise<CreditApplication | null> =>
    delay(applications.find((a) => a.id === id) ?? null),
  recent: (limit = 8) =>
    delay([...applications].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit)),
};

export const applicationsKeys = {
  all: ["applications"] as const,
  list: () => [...applicationsKeys.all, "list"] as const,
  detail: (id: string) => [...applicationsKeys.all, "detail", id] as const,
  recent: (limit: number) => [...applicationsKeys.all, "recent", limit] as const,
};
```

**Why a `*Keys` factory** — invalidation is precise and centralized. `queryClient.invalidateQueries({ queryKey: applicationsKeys.all })` clears every application query in one call.

## Usage in pages
```tsx
import { useQuery } from "@tanstack/react-query";
import { applicationsApi, applicationsKeys } from "@/api";

function ApplicationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: applicationsKeys.list(),
    queryFn: applicationsApi.list,
  });

  if (isLoading) return <LoadingState variant="table" />;
  if (!data?.length) return <EmptyState title="..." />;
  return <DataTable columns={…} data={data} />;
}
```

## Mock seed conventions
- **Deterministic**: no `Math.random()`. Use index-based seeding (`pick(arr, i + 7)`) so renders match across reloads
- **Realistic**: Uzbek names, real bank names, real city names, valid phone format, 14-digit PINFLs
- **Weighted distribution**: applications skew toward `approved` / `disbursed` (more common in production) — use `pickWeighted` from [`_helpers.ts`](../../src/mock/_helpers.ts)
- **Size**: ~50-200 records per entity is enough to exercise pagination, filtering, charts

## Mutations (when added)
For the first mutation prompt, plan to:
1. Add the mutation method to `*.api.ts` (e.g., `applicationsApi.create(input)`)
2. Use `useMutation` in the page/dialog
3. On success, call `queryClient.invalidateQueries({ queryKey: applicationsKeys.list() })`
4. Surface success/error via Sonner: `toast.success(t("…"))` or `toast.error(...)`
5. Until there's a real backend, mutations should still go through the same `*.api.ts` fetcher — push the new record into the in-memory mock array

## When the real backend lands
Each `*.api.ts` file becomes the only file that needs replacing — same return types, same query keys. Pages don't change.

## Don'ts
- ❌ Direct imports from `src/mock/*` into pages. Always go through `src/api/*`
- ❌ Inline query keys (`useQuery({ queryKey: ["applications"] })`). Use the `*Keys` factory
- ❌ `enabled: false` workarounds for "conditional fetching" — use the conditional fetch hook pattern (`useQuery({ ..., enabled: !!id })`)
- ❌ `refetchOnWindowFocus: true` overrides without a reason — admin tables refreshing on tab focus is jarring
