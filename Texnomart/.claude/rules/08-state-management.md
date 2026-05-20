# 08. State management

## Two state systems, clearly split

| State kind | Tool | Lives in |
|------------|------|----------|
| **Server / async data** (lists, details, KPIs, derived metrics) | TanStack Query | `src/api/*.api.ts` + `useQuery` in pages |
| **UI state** (theme, locale, sidebar collapsed, modals if needed) | Zustand | `src/stores/*.store.ts` |

Don't mix them. Don't store fetched data in Zustand. Don't store UI toggles in TanStack Query.

## Zustand stores

### [`ui.store.ts`](../../src/stores/ui.store.ts)
Persisted to `localStorage` (`name: "texnomart.ui"`).

```ts
interface UiState {
  theme: Theme;                                  // "light" | "dark" | "system"
  locale: Locale;                                // "ru" | "uz"
  sidebarCollapsed: boolean;
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}
```

Only `theme`, `locale`, `sidebarCollapsed` are partialized into storage. Methods are not persisted (they're just function references — they re-attach on hydration).

### [`auth.store.ts`](../../src/stores/auth.store.ts)
Mock current user. Will be replaced once auth is real.

```ts
interface AuthUser { id, fullName, email, role, initials }
interface AuthState { user, setUser, signOut }
```

Not persisted today — the mock user is hard-coded on startup. When real auth lands, persist a token (NOT the user object) via Zustand + localStorage, and refetch the user via TanStack Query on mount.

## Hook patterns

Each store has dedicated read/write hooks under `src/hooks/`:

- `useTheme()` → `{ theme, setTheme }`
- `useThemeSync()` → applied once in `<GlobalEffects>`; writes `.dark` class on `<html>`
- `useLocale()` → `{ locale, setLocale }`
- `useLocaleSync()` → applied once in `<GlobalEffects>`; calls `i18n.changeLanguage()` and sets `<html lang>`
- `useAuth()` → `{ user, signOut, isAuthenticated }`

Pages import these hooks, not the stores directly. Keeps test surface narrow and ergonomic.

## Selector usage
Always select narrow slices to avoid re-rendering on unrelated changes:
```ts
const theme = useUiStore((s) => s.theme);            // ✅ selector
const { theme, locale } = useUiStore();              // ❌ subscribes to whole store
```

## Don'ts
- ❌ Add a new top-level Zustand store unless the state crosses 3+ unrelated components AND lives for the whole session. Otherwise use component state or context
- ❌ Use Zustand for derived data — derive at the read site
- ❌ Use Context API for the things Zustand already covers (theme, locale). Pick one and stay consistent
- ❌ Put query data in Zustand for "convenience" — TanStack Query is already a cache
