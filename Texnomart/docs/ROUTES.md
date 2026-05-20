# ROUTES.md

> Last synced: 2026-05-20

This project has no REST API. This file documents the react-router paths and the prop contracts of shared components — what other pages can expect when composing the shell.

## Stack
- `react-router-dom` v7
- JSX `<Routes>` / `<Route>` (not `createBrowserRouter`)
- `BrowserRouter` provider in [src/app/AppProviders.tsx](../src/app/AppProviders.tsx)
- Route tree in [src/app/AppRoutes.tsx](../src/app/AppRoutes.tsx)

## Route table

| Path | Page | Status | Nav entry | Required i18n keys |
|------|------|--------|-----------|---------------------|
| `/` | [Dashboard.tsx](../src/pages/Dashboard.tsx) | **full** | `NAV_ITEMS[0]` | `dashboard.title`, `dashboard.subtitle`, `dashboard.kpi.*`, `dashboard.charts.*`, `dashboard.recentApplications`, `dashboard.viewAll` |
| `/analytics` | [Analytics.tsx](../src/pages/Analytics.tsx) | placeholder | `NAV_ITEMS[1]` | `analytics.title`, `analytics.subtitle` |
| `/applications` | [Applications.tsx](../src/pages/Applications.tsx) | placeholder | `NAV_ITEMS[2]` (with `badge: "unreadApplications"`) | `applications.title`, `applications.subtitle` |
| `/applications/:id` | [ApplicationDetail.tsx](../src/pages/ApplicationDetail.tsx) | placeholder | (none) | `applicationDetail.title`, `applicationDetail.subtitle` |
| `/users` | [Users.tsx](../src/pages/Users.tsx) | placeholder | `NAV_ITEMS[3]` | `users.title`, `users.subtitle` |
| `/user-statuses` | [UserStatuses.tsx](../src/pages/UserStatuses.tsx) | placeholder | `NAV_ITEMS[4]` | `userStatuses.title`, `userStatuses.subtitle` |
| `/roles` | [Roles.tsx](../src/pages/Roles.tsx) | placeholder | `NAV_ITEMS[5]` | `roles.title`, `roles.subtitle` |
| `/clients` | [Clients.tsx](../src/pages/Clients.tsx) | placeholder | `NAV_ITEMS[6]` | `clients.title`, `clients.subtitle` |
| `/partners` | [Partners.tsx](../src/pages/Partners.tsx) | placeholder | `NAV_ITEMS[7]` | `partners.title`, `partners.subtitle` |
| `/branches` | [Branches.tsx](../src/pages/Branches.tsx) | placeholder | `NAV_ITEMS[8]` | `branches.title`, `branches.subtitle` |
| `/telegram` | [TelegramBot.tsx](../src/pages/TelegramBot.tsx) | placeholder | `NAV_ITEMS[9]` | `telegram.title`, `telegram.subtitle` |
| `*` | [NotFound.tsx](../src/pages/NotFound.tsx) | full (sibling, no shell) | (none) | `notFound.title`, `notFound.description`, `notFound.back` |

## Shell composition

All routes except `*` render inside `<AppLayout>` ([src/components/layout/AppLayout.tsx](../src/components/layout/AppLayout.tsx)):

```tsx
<Route element={<AppLayout />}>
  <Route index element={<Dashboard />} />
  …
</Route>
<Route path="*" element={<NotFound />} />   // outside the shell
```

The shell provides: `<SidebarProvider>` + `<AppSidebar>` + `<SidebarInset>` (which contains `<TopBar>` + `<main><Outlet/></main>`).

`<NotFound>` deliberately lives outside so 404 pages render centred on a clean background with no sidebar / topbar noise.

## Breadcrumb resolution

[`TopBar.tsx`](../src/components/layout/TopBar.tsx) uses `useCurrentNavItem()` to resolve the current breadcrumb from `useLocation().pathname`:

- `/` → first item of `NAV_ITEMS` (Dashboard)
- `/<segment>` or `/<segment>/...` → finds the nav item where `pathname === item.path || pathname.startsWith(item.path + "/")`
- Sub-routes inherit the parent breadcrumb (`/applications/:id` → "Заявки"). To customise, extend the helper

---

## Shared component prop contracts

### `<PageHeader>` — [layout/PageHeader.tsx](../src/components/layout/PageHeader.tsx)
```ts
interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;       // right-aligned slot, stacks below title on mobile
  className?: string;
}
```
**Renders:** `<h1 className="text-2xl font-semibold tracking-tight">` + optional subtitle + actions row. Flex layout switches `flex-col` → `md:flex-row` at the `md:` breakpoint.

---

### `<DataTable<T>>` — [shared/DataTable.tsx](../src/components/shared/DataTable.tsx)

Generic table built on TanStack Table + shadcn `<Table>` primitives.

```ts
interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  searchKeys?: Array<keyof T>;
  searchPlaceholder?: string;
  filters?: FilterChip<T>[];
  onRowClick?: (row: T) => void;
  pagination?: boolean;          // default true
  initialPageSize?: number;      // default 10
  emptyState?: ReactNode;
  className?: string;
  toolbarActions?: ReactNode;
}

interface FilterChip<T> {
  key: string;
  label: ReactNode;
  active: boolean;
  onClear: () => void;
  predicate: (row: T) => boolean;
}
```

**Renders:** toolbar (search + active filter chips + "Сбросить фильтры" link + toolbar actions) → table → pagination row (`Показано N–M из X` + rows-per-page select + prev/next).

**Usage:** declare columns with `createColumnHelper<T>()` from `@tanstack/react-table` or inline `ColumnDef<T>` literals. Pass `searchKeys` to enable client-side fuzzy search. Filter chips are managed by the parent (parent owns the "active" boolean and the predicate).

---

### `<StatusBadge>` + `<VariantBadge>` — [shared/StatusBadge.tsx](../src/components/shared/StatusBadge.tsx)

```ts
interface StatusBadgeProps {
  status: ApplicationStatus;
  variant?: StatusVariant;       // override the automatic lookup
  className?: string;
}

interface VariantBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}
```

`<StatusBadge>` resolves the variant from `APPLICATION_STATUS_VARIANTS` and renders the localised label via `t("status.<status>")`. `<VariantBadge>` is the colour-only primitive when you want to use the semantic palette without an application status — e.g., for `<RoleBadge>`-style use cases.

---

### `<RoleBadge>` — [shared/RoleBadge.tsx](../src/components/shared/RoleBadge.tsx)
```ts
interface RoleBadgeProps {
  role: Role;
  className?: string;
}
```
Renders `t("role.<role>")` with a per-role colour. Superadmin is violet; the rest are neutral.

---

### `<EmptyState>` — [shared/EmptyState.tsx](../src/components/shared/EmptyState.tsx)
```ts
interface EmptyStateProps {
  icon?: ReactNode;             // defaults to <Inbox />
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}
```

---

### `<LoadingState>` — [shared/LoadingState.tsx](../src/components/shared/LoadingState.tsx)
```ts
interface LoadingStateProps {
  variant?: "table" | "cards" | "page";   // default "table"
  rows?: number;                            // for "table" variant, default 8
  className?: string;
}
```

---

### `<ErrorState>` — [shared/ErrorState.tsx](../src/components/shared/ErrorState.tsx)
```ts
interface ErrorStateProps {
  title?: ReactNode;            // default "Произошла ошибка"
  description?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;          // default "Повторить"
  className?: string;
}
```

---

### `<ConfirmDialog>` — [shared/ConfirmDialog.tsx](../src/components/shared/ConfirmDialog.tsx)
```ts
interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;        // default "Подтвердить"
  cancelLabel?: string;         // default "Отмена"
  variant?: "default" | "destructive";
  onConfirm: () => void;
}
```
Built on shadcn `<AlertDialog>`. `variant="destructive"` swaps the confirm button to `bg-destructive`.

---

### `<LanguageSwitcher>` — [shared/LanguageSwitcher.tsx](../src/components/shared/LanguageSwitcher.tsx)
No props. Reads / writes `useUiStore.locale`. Renders an RU/UZ pill. Hidden on `<sm` viewports (covered by `UserMenu`'s language sub-section).

---

### `<ThemeToggle>` — [shared/ThemeToggle.tsx](../src/components/shared/ThemeToggle.tsx)
No props. Renders a dropdown of `Светлая` / `Тёмная` / `Системная`. Always visible.

---

### `<UserMenu>` — [shared/UserMenu.tsx](../src/components/shared/UserMenu.tsx)
No props. Reads `useAuth()`. Renders avatar trigger + dropdown with:
- user info (name, email, role badge)
- Profile / Settings entries (stubs)
- mobile-only language section (`sm:hidden`)
- Sign out (destructive variant)

---

### `<NotificationsMenu>` — [shared/NotificationsMenu.tsx](../src/components/shared/NotificationsMenu.tsx)
No props. Fetches `notificationsApi.list()` and renders bell trigger + scrollable list. Unread count shown as a brand-coloured badge on the bell.

---

### `<KPICard>` — [charts/KPICard.tsx](../src/components/charts/KPICard.tsx)
```ts
interface KPICardProps {
  label: ReactNode;
  value: ReactNode;
  delta?: number;             // +ve → green arrow up, -ve → red arrow down
  deltaLabel?: ReactNode;     // suffix after the percentage
  icon?: ReactNode;
  highlighted?: boolean;      // adds border-l-4 border-l-brand + bg-brand-soft/40
  className?: string;
}
```

`highlighted` is the brand-emphasis treatment — at most one per page.

---

### `<LineChartCard<T>>` — [charts/LineChartCard.tsx](../src/components/charts/LineChartCard.tsx)
```ts
interface LineChartCardProps<T extends Record<string, unknown>> {
  title: ReactNode;
  description?: ReactNode;
  data: T[] | undefined;       // undefined → renders Skeleton
  xKey: keyof T & string;
  yKey: keyof T & string;
  xTickFormatter?: (value: string) => string;
  height?: number;             // default 280
  actions?: ReactNode;         // right slot in header
  className?: string;
}
```

---

### `<BarChartCard<T>>` — [charts/BarChartCard.tsx](../src/components/charts/BarChartCard.tsx)
```ts
interface BarChartCardProps<T extends Record<string, unknown>> {
  title: ReactNode;
  description?: ReactNode;
  data: T[] | undefined;
  xKey: keyof T & string;
  yKey: keyof T & string;
  layout?: "horizontal" | "vertical";   // default "horizontal"
  height?: number;
  yAxisWidth?: number;
}
```

---

### `<DonutChartCard>` — [charts/DonutChartCard.tsx](../src/components/charts/DonutChartCard.tsx)
```ts
interface DonutSlice {
  key: string;
  label: string;
  value: number;
  color: string;
}

interface DonutChartCardProps {
  title: ReactNode;
  description?: ReactNode;
  data: DonutSlice[] | undefined;
  height?: number;
  centerValue?: ReactNode;     // big number in the donut hole
  centerLabel?: ReactNode;     // small label under centerValue
}
```

---

### `<Placeholder>` — [pages/_placeholder.tsx](../src/pages/_placeholder.tsx)
```ts
interface PlaceholderProps {
  titleKey: string;
  subtitleKey: string;
  actions?: ReactNode;
}
```
Used by all 10 non-Dashboard pages. Renders `<PageHeader>` + `<EmptyState>` with the "Раздел в разработке" copy.

---

## Layout primitives (internal, but documented for consistency)

### `<AppLayout>` — [layout/AppLayout.tsx](../src/components/layout/AppLayout.tsx)
No props. Sets `--sidebar-width: 15rem` / `--sidebar-width-icon: 3.5rem` via inline style.

### `<AppSidebar>` — [layout/AppSidebar.tsx](../src/components/layout/AppSidebar.tsx)
No props. Internal `NavLinkRow` accepts `{ to, label, icon: PhosphorIcon, badgeValue?, collapsed }`. `CollapseToggle` lives in the footer.

### `<TopBar>` — [layout/TopBar.tsx](../src/components/layout/TopBar.tsx)
No props. Internal `MobileMenuButton` only renders when `useSidebar().isMobile === true`.

### `<Logo>` / `<LogoMark>` — [layout/Logo.tsx](../src/components/layout/Logo.tsx)
```ts
interface LogoProps { className?: string; }
interface LogoMarkProps { className?: string; size?: number; }   // default 28
```
Wordmark uses `currentColor`; star is locked to `#FBC100`.
