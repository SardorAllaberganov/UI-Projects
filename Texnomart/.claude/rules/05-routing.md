# 05. Routing

## Stack
- **Library**: `react-router-dom` v7
- **API style**: JSX `<Routes>`/`<Route>` (NOT `createBrowserRouter`)
- **Provider**: `<BrowserRouter>` lives in [`AppProviders.tsx`](../../src/app/AppProviders.tsx)
- **Routes definition**: [`AppRoutes.tsx`](../../src/app/AppRoutes.tsx)

## Pattern
```tsx
<Routes>
  <Route element={<AppLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="applications" element={<Applications />} />
    <Route path="applications/:id" element={<ApplicationDetail />} />
    {/* … */}
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```

- Children of `<Route element={<AppLayout/>}>` inherit the shell (sidebar + topbar)
- `<NotFound>` is a sibling so 404 pages render **without** the shell — a clean centred page

## Adding a new route
1. Create the page in [`src/pages/<PageName>.tsx`](../../src/pages/) — named export only
2. Add `<Route path="..." element={<PageName/>} />` inside the `<AppLayout>` route in `AppRoutes.tsx`
3. Add a nav entry to [`src/lib/constants/navigation.ts`](../../src/lib/constants/navigation.ts) (`NAV_ITEMS` for primary nav, `SECONDARY_NAV` for utilities like Settings)
4. Add i18n keys to [`src/i18n/locales/ru.json`](../../src/i18n/locales/ru.json):
   - `nav.<key>` — sidebar label (used by `NavLinkRow` + TopBar breadcrumb)
   - `<key>.title` — `PageHeader` title
   - `<key>.subtitle` — `PageHeader` description
   - Any `<key>.table.*` keys if the page has tables

## Breadcrumb generation
[`TopBar.tsx`](../../src/components/layout/TopBar.tsx) computes the current crumb from `useLocation().pathname`:
- `/` → "Дашборд" (the first item in `NAV_ITEMS`)
- `/x` or `/x/...` → finds the matching nav item by `path === pathname || pathname.startsWith(item.path + "/")`
- Detail sub-routes (`applications/:id`) inherit the parent's breadcrumb. If you want a deeper crumb, extend the `useCurrentNavItem()` helper

## Don'ts
- ❌ `createBrowserRouter` / `RouterProvider` — we use the JSX form
- ❌ Lazy-load pages with `React.lazy` for now — the app is small and TanStack Query handles data deferral. Revisit if bundle splitting becomes a problem
- ❌ Skip the nav entry — pages without a nav item are unreachable and break the breadcrumb
- ❌ Hardcode the route path in pages — if you need to navigate, import the constant or use `Link to="..."` literals only in nav-related code
