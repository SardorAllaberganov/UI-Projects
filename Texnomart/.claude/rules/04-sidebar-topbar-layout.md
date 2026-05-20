# 04. Layout shell — Sidebar, TopBar, content

## Source files
- Shell: [`src/components/layout/AppLayout.tsx`](../../src/components/layout/AppLayout.tsx)
- Sidebar: [`src/components/layout/AppSidebar.tsx`](../../src/components/layout/AppSidebar.tsx)
- TopBar: [`src/components/layout/TopBar.tsx`](../../src/components/layout/TopBar.tsx)
- PageHeader: [`src/components/layout/PageHeader.tsx`](../../src/components/layout/PageHeader.tsx)
- Logo: [`src/components/layout/Logo.tsx`](../../src/components/layout/Logo.tsx)

## Shell composition
```
<AppProviders>
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout/>}>   ← provides SidebarProvider + SidebarInset + TopBar
        <Route index element={<Dashboard/>} />
        …
      </Route>
      <Route path="*" element={<NotFound/>} />   ← stand-alone, no shell
    </Routes>
  </BrowserRouter>
</AppProviders>
```

## Sidebar
| Property | Expanded | Collapsed |
|----------|----------|-----------|
| Width | `15rem` (240px) | `3.5rem` (56px) |
| Pattern | shadcn `sidebar-07` (`collapsible="icon"`, `variant="sidebar"`) |
| Logo | `<Logo />` (wordmark, uses `currentColor` + locked yellow star) | `<LogoMark />` (28×28, star only) |
| Footer | `<CollapseToggle />` — **NOT an account card** (account is in TopBar) |

Width overrides applied in `AppLayout.tsx` via inline CSS vars:
```tsx
<SidebarProvider style={{ "--sidebar-width": "15rem", "--sidebar-width-icon": "3.5rem" }}>
```

### Active nav item — accent rules
The `NavLinkRow` component renders each item. When active:

- **Left bar**: 3px, brand colour, capsule-rounded (`before:absolute before:inset-y-1 before:left-0 before:w-[3px] before:rounded-r-full before:bg-brand`), plus a 1px brand glow ring
- **Icon**: Phosphor with `weight="fill"` + `text-brand`
- **Text**: `font-semibold text-foreground`
- **Background**: shadcn's default `bg-sidebar-accent` (subtle gray) — no full brand background
- **Badge** (if present): `ring-1 ring-brand/40` when active

When inactive: `font-normal text-muted-foreground`, Phosphor `weight="regular"`, no left bar.

See [`docs/lessons/05-sidebar-active-item-accent.md`](../../docs/lessons/05-sidebar-active-item-accent.md) for the why.

## TopBar
Sticky header, `h-14`, contents:

| Slot | Desktop | Mobile (<sm) |
|------|---------|--------------|
| Left | (no sidebar trigger — collapse lives in sidebar footer) | `<MobileMenuButton>` (☰ icon, opens sidebar Sheet) |
| Breadcrumb | `Texnomart › <current section>` | `<current section>` only (root + chevron hidden) |
| Search | `Cmd+K` outlined button (`w-56`) | search icon button only |
| LanguageSwitcher | visible (RU/UZ pill) | hidden — moved into UserMenu |
| ThemeToggle | visible | visible |
| NotificationsMenu | visible | visible |
| UserMenu | visible | visible (also contains language sub-menu) |

### Mobile menu button
- Only renders when `useSidebar().isMobile === true` (Tailwind sm breakpoint = 640px)
- On mobile the sidebar IS a `<Sheet>` drawer — without this button it's unreachable
- On desktop it's `null` because the sidebar is always present and the collapse toggle lives in its footer

See [`docs/lessons/04-sidebar-trigger-removed-from-topbar.md`](../../docs/lessons/04-sidebar-trigger-removed-from-topbar.md).

## Main content area
```tsx
<main className="flex-1">
  <div className="w-full p-4 md:p-6">
    <Outlet />
  </div>
</main>
```

**Rules:**
- `w-full` — never `mx-auto`, never `max-w-screen-*`. Admin UIs use all available width
- `p-4 md:p-6` — don't go below `p-4` (mobile padding); don't go above `p-6` (wastes space on desktop)
- If a single page needs a narrow column (e.g., onboarding form, single-record detail), constrain it **inside that page**, not at the shell level

See [`docs/lessons/06-main-content-full-width.md`](../../docs/lessons/06-main-content-full-width.md).

## Page composition pattern
```tsx
export function MyPage() {
  const { t } = useTranslation();
  // queries…
  return (
    <div className="space-y-6">
      <PageHeader
        title={t("myPage.title")}
        description={t("myPage.subtitle")}
        actions={<Button className="bg-brand text-brand-foreground hover:bg-brand/90">…</Button>}
      />
      {/* KPI grid */}
      {/* Charts grid */}
      {/* DataTable */}
    </div>
  );
}
```
