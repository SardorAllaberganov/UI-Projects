# DATA_MODELS.md

> Last synced: 2026-05-20 (Analytics page — ReportItem extended with status/format/breakdown)

This project has no real backend. The TypeScript interfaces and mock-data arrays catalogued here play the backend role until one lands. Each `*.api.ts` fetcher (under [src/api/](../src/api/)) returns these shapes — when the real backend is wired up, fetcher bodies change, types and consumers stay.

## Top-level types — [src/types/index.ts](../src/types/index.ts)

### `Locale`
```ts
type Locale = "ru" | "uz";
```
Consumed by [stores/ui.store.ts](../src/stores/ui.store.ts), [hooks/useLocale.ts](../src/hooks/useLocale.ts), [i18n/index.ts](../src/i18n/index.ts), formatters.

### `Theme`
```ts
type Theme = "light" | "dark" | "system";
```
Consumed by [stores/ui.store.ts](../src/stores/ui.store.ts), [hooks/useTheme.ts](../src/hooks/useTheme.ts), [components/shared/ThemeToggle.tsx](../src/components/shared/ThemeToggle.tsx).

---

### `Client`
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | `cli_0001` … |
| `fullName` | `string` | Russian transliteration of Uzbek names |
| `phone` | `string` | 12 digits, format `998XXXXXXXXXX` — formatted by `formatPhone` |
| `pinfl` | `string` | 14 digits, starts with 1/3/4/5 |
| `birthDate` | `string` | ISO date |
| `city` | `string` | One of the 10 region capitals |
| `createdAt` | `string` | ISO date-time |

**Seed**: [src/mock/clients.ts](../src/mock/clients.ts) — 50 records.
**Fetcher**: [src/api/clients.api.ts](../src/api/clients.api.ts) — `list()`, `get(id)`.
**Consumed by**: Dashboard (recent applications join), future `/clients` page.

---

### `Partner`
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | `prt_anor`, `prt_hamkor`, … |
| `name` | `string` | Full bank name |
| `shortName` | `string` | UI shorthand (`Anor`, `Hamkor`) |
| `enabledTermsMonths` | `number[]` | Which terms from `CREDIT_TERMS_MONTHS` this partner accepts |
| `minAmount` / `maxAmount` | `number` | UZS bounds for this partner |
| `baseInterestRate` | `number` | annual % |
| `approvalRate` | `number` | historical % — drives `topPartners` chart |
| `active` | `boolean` | If false, hidden from the application form's partner picker |
| `createdAt` | `string` | ISO date-time |

**Seed**: [src/mock/partners.ts](../src/mock/partners.ts) — 8 records (the 8 partner banks).
**Fetcher**: [src/api/partners.api.ts](../src/api/partners.api.ts) — `list()`, `get(id)`.
**Consumed by**: Dashboard topPartners bar chart, future `/partners` page, application creation form.

---

### `BranchPartnerConfig` + `Branch`

```ts
interface BranchPartnerConfig {
  partnerId: string;
  priority: number;   // lower number = higher in routing list
  enabled: boolean;
}

interface Branch {
  id: string;
  name: string;          // "Texnomart Yunusobod"
  city: string;          // "Тошкент", "Самарканд", …
  address: string;
  phone: string;
  managerName: string;
  partners: BranchPartnerConfig[];   // ordered routing config
  createdAt: string;
}
```

**Seed**: [src/mock/branches.ts](../src/mock/branches.ts) — 12 records (3 in Tashkent + 9 regional centres).
**Fetcher**: [src/api/branches.api.ts](../src/api/branches.api.ts) — `list()`, `get(id)`.
**Consumed by**: Dashboard topBranches bar chart, future `/branches` page, application routing logic.

---

### `SystemUser`
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | `usr_001` … |
| `fullName` | `string` | |
| `email` | `string` | `firstname.lastname@texnomart.uz` (auto-generated transliteration) |
| `phone` | `string` | Same 12-digit format as `Client.phone` |
| `role` | `Role` | `superadmin / admin / operator / agent` |
| `status` | `UserStatus` | `active / suspended / invited` |
| `branchId` | `string \| null` | agents are scoped to a branch; admins are `null` |
| `lastSeenAt` | `string \| null` | `null` when status is `invited` |
| `createdAt` | `string` | ISO date-time |

**Seed**: [src/mock/users.ts](../src/mock/users.ts) — 30 records weighted across roles + statuses.
**Fetcher**: [src/api/users.api.ts](../src/api/users.api.ts) — `list()`, `get(id)`.
**Consumed by**: future `/users` + `/user-statuses` pages; `mock/applications.ts` picks an `agent` from this list for each application.

---

### `CreditApplication`
The central entity.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | `app_00001` … |
| `number` | `string` | Human-readable `TM-2026-00001` |
| `clientId` / `clientName` / `clientPhone` / `clientPinfl` | denormalised client snapshot |
| `amount` | `number` | UZS, snapped to nearest 100 000 |
| `termMonths` | `number` | One of `CREDIT_TERMS_MONTHS` |
| `partnerId` / `partnerName` | denormalised partner |
| `branchId` / `branchName` | denormalised branch |
| `agentId` / `agentName` | denormalised agent |
| `status` | `ApplicationStatus` | See enum below |
| `scoringScore` | `number \| null` | 400–900-ish range when applicable |
| `rejectionReason` | `string \| null` | populated only for `rejected` |
| `productName` | `string` | "Потребительский кредит", "Рассрочка 0%", … |
| `createdAt` / `updatedAt` | `string` | ISO date-times |

**Seed**: [src/mock/applications.ts](../src/mock/applications.ts) — 200 records, weighted to skew toward `approved` and `disbursed` (realistic distribution).
**Fetcher**: [src/api/applications.api.ts](../src/api/applications.api.ts) — `list()`, `get(id)`, `recent(limit)`.
**Consumed by**: Dashboard (KPI cards, trend, status donut, recent table), future `/applications`, `/applications/:id`, charts in Analytics.

Also exposed: `applicationStatusCounts` — a `Record<ApplicationStatus, number>` derived at module init, used by `dashboardApi.statusBreakdown`.

---

### `NotificationItem`
```ts
interface NotificationItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  href?: string;       // deep-link when the notification is actionable
}
```
**Seed**: [src/mock/notifications.ts](../src/mock/notifications.ts) — 15 records.
**Fetcher**: [src/api/notifications.api.ts](../src/api/notifications.api.ts) — `list()`, `unreadCount()`.
**Consumed by**: [components/shared/NotificationsMenu.tsx](../src/components/shared/NotificationsMenu.tsx) in TopBar.

---

### `ReportItem`
```ts
type ReportKind = "applications" | "partners" | "agents" | "branches";
type ReportBreakdown = "applications" | "users" | "partners" | "statuses";
type ReportStatus = "ready" | "processing";
type ReportFormat = "xlsx" | "csv";

interface ReportItem {
  id: string;
  name: string;
  kind: ReportKind;
  status: ReportStatus;
  format: ReportFormat;
  breakdown: ReportBreakdown[];
  rangeFrom: string;
  rangeTo: string;
  generatedAt: string;
  generatedBy: string;   // user's fullName
  fileSize: number;      // bytes (0 while status === "processing")
}
```
**Seed**: [src/mock/reports.ts](../src/mock/reports.ts) — 10 records, all `status: "ready"`.
**Fetcher**: [src/api/reports.api.ts](../src/api/reports.api.ts) — `list()`, `create(input)` (returns a `processing` record + pushes onto the mock array), `markReady(id)` (flips status + recalculates `fileSize` from `breakdown.length`), `remove(id)`.
**Consumed by**: [src/pages/Analytics.tsx](../src/pages/Analytics.tsx) — reports history table + generate dialog. `create` is invoked from `GenerateReportDialog`'s onSubmit; `markReady` is fired by a 2-second `setTimeout` to simulate backend processing.

`CreateReportInput` (the `create` argument) is the same shape minus `id`, `status`, `generatedAt`, `fileSize`.

---

## Domain enums — [src/lib/constants/enums.ts](../src/lib/constants/enums.ts)

### `APPLICATION_STATUSES` / `ApplicationStatus`
```ts
const APPLICATION_STATUSES = [
  "draft", "submitted", "scoring", "partner_review",
  "approved", "contract_signed", "disbursed", "closed",
  "rejected", "cancelled",
] as const;
type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
```

Co-shipped maps:
- `APPLICATION_STATUS_LABELS_RU: Record<ApplicationStatus, string>` — UI labels (also mirrored in `i18n/locales/ru.json` under `status.*`)
- `APPLICATION_STATUS_VARIANTS: Record<ApplicationStatus, StatusVariant>` — drives badge colour

**Status → variant table:**

| Status | Variant | RU label |
|--------|---------|----------|
| `draft` | `neutral` | Черновик |
| `submitted` | `info` | Отправлена |
| `scoring` | `info` | Скоринг |
| `partner_review` | `warning` | У партнёра |
| `approved` | `success` | Одобрена |
| `contract_signed` | `success` | Договор |
| `disbursed` | `success` | Выдана |
| `closed` | `neutral` | Закрыта |
| `rejected` | `danger` | Отказ |
| `cancelled` | `neutral` | Отменена |

### `ROLES` / `Role`
```ts
const ROLES = ["superadmin", "admin", "operator", "agent"] as const;
```
Co-shipped: `ROLE_LABELS_RU`. Used by [components/shared/RoleBadge.tsx](../src/components/shared/RoleBadge.tsx), [components/shared/UserMenu.tsx](../src/components/shared/UserMenu.tsx), [stores/auth.store.ts](../src/stores/auth.store.ts).

### `USER_STATUSES` / `UserStatus`
```ts
const USER_STATUSES = ["active", "suspended", "invited"] as const;
```
Co-shipped: `USER_STATUS_LABELS_RU`, `USER_STATUS_VARIANTS`. Consumed by future `/users` and `/user-statuses` pages.

### `CREDIT_TERMS_MONTHS`
```ts
const CREDIT_TERMS_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 36] as const;
```
Used by `mock/applications.ts` (intersected with partner's `enabledTermsMonths`), and the future application creation form.

### `StatusVariant`
```ts
type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";
```
Drives Tailwind class lookups in [components/shared/StatusBadge.tsx](../src/components/shared/StatusBadge.tsx). When adding a new variant, update the class map there.

---

## Auth shape — [src/stores/auth.store.ts](../src/stores/auth.store.ts)

```ts
interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  initials: string;     // pre-computed, e.g. "АК"
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  signOut: () => void;
}
```

Today the store is hardcoded to `MOCK_USER = { id: "usr_001", fullName: "Алишер Каримов", role: "superadmin", ... }`. When real auth lands, the user object will be fetched via TanStack Query and only a token will live in Zustand (with `persist` middleware).

---

## Dashboard-derived shapes — [src/api/dashboard.api.ts](../src/api/dashboard.api.ts)

These aren't entities — they're shapes returned by aggregating fetchers and are co-located with the dashboard fetcher rather than in `types/`.

### `dashboardApi.kpi()` → 
```ts
{
  last3h: number;
  today: number;
  approvalRate: number;        // 0–100
  disbursedTodaySum: number;   // UZS
  activeAgents: number;
}
```

### `dashboardApi.trend(days)` → `Array<{ date: string; count: number }>`
ISO date (YYYY-MM-DD) → application count. Pre-padded so the chart always has `days` data points (zeros where no applications were created).

### `dashboardApi.statusBreakdown()` → `Array<{ status: ApplicationStatus; count: number }>`

### `dashboardApi.topPartners(limit)` → `Array<{ partnerId, partnerName, count }>`
Sorted desc by count.

### `dashboardApi.topBranches(limit)` → `Array<{ branchId, branchName, city, count }>`
Sorted desc by count.

---

## Query key factories

Every fetcher ships a co-located `*Keys` factory ([rules/07-data-layer.md](../.claude/rules/07-data-layer.md)):

| Factory | Source |
|---------|--------|
| `applicationsKeys` | [applications.api.ts](../src/api/applications.api.ts) |
| `clientsKeys` | [clients.api.ts](../src/api/clients.api.ts) |
| `partnersKeys` | [partners.api.ts](../src/api/partners.api.ts) |
| `branchesKeys` | [branches.api.ts](../src/api/branches.api.ts) |
| `usersKeys` | [users.api.ts](../src/api/users.api.ts) |
| `reportsKeys` | [reports.api.ts](../src/api/reports.api.ts) |
| `notificationsKeys` | [notifications.api.ts](../src/api/notifications.api.ts) |
| `dashboardKeys` | [dashboard.api.ts](../src/api/dashboard.api.ts) |

Hierarchy: `[entity]` → `[entity, "list" \| "detail" \| "recent" \| ...]` → `[entity, "detail", id]`. Use the factory, never inline keys.

---

## When the real backend lands
- Each `*.api.ts` body changes; signatures + return types do not
- `delay()` becomes the actual `fetch()` call
- Mock arrays in `src/mock/*` can be deleted in the same PR
- Pages don't change
- The mock seed conventions (deterministic, weighted, realistic) document the **shape** the real API must return — share this file with the backend team
