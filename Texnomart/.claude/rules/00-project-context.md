# 00. Project context — Texnomart Credit Broker

> Active project. This `.claude/` folder and `CLAUDE.md` live at the project root.

## What it is
Admin panel for OOO Texnomart's credit broker product. Operators and agents at Texnomart branches submit credit applications to partner banks; partner banks score them; outcomes flow back through the panel.

This is the **foundation product for an expanding fintech ecosystem in Uzbekistan**. Every shared primitive (DataTable, StatusBadge, KPICard, formatters, token system) must be reusable across future products in the workspace.

## Domain quick-reference
- **8 partner banks**: Anorbank, Hamkorbank, Kapitalbank, Ipoteka Bank, TBC Bank UZ, Universal Bank, Davr Bank, Asaka Bank
- **12 branches**: Tashkent ×3 (Yunusobod, Chilonzor, Mirzo Ulug'bek), Samarqand, Buxoro, Andijon, Farg'ona, Namangan, Qarshi, Nukus, Urganch, Jizzax
- **Application lifecycle**: `draft → submitted → scoring → partner_review → (approved|rejected) → contract_signed → disbursed → closed | cancelled`
- **Roles**: `superadmin`, `admin`, `operator`, `agent`. Agents are scoped to a branch; admins are not
- **PINFL**: 14-digit Uzbek personal ID, starts with 1/3/4/5
- **Phone format**: `+998 (90|91|93|94|97|98|99|33|55|88) XXX XX XX`
- **Currency**: UZS — `formatUZS()` produces `"12 500 000 сум"`. USD supported but rare
- **Credit terms**: 1–12 months + 18 / 24 / 36

See [`src/lib/constants/enums.ts`](../../src/lib/constants/enums.ts) for the canonical union types.

## Status
- Layout shell, sidebar, topbar, all 11 routes wired
- **Dashboard** fully implemented (period filter + refresh, 4 KPIs, multi-series trend line + status donut, recent applications with desktop table + mobile card list, top partners with inline progress bars)
- **Analytics** fully implemented (ToggleGroup period + custom date-range Popover + multi-select Партнёры/Статусы; 4 reactive KPIs; horizontal-by-day + vertical-by-partner bar charts; reports history Card with sortable date column and DropdownMenu row actions; Generate dialog with RHF + zod + breakdown checkboxes + XLSX/CSV radio; real `xlsx` exporter producing valid `.xlsx` and CSV with UTF-8 BOM)
- 9 other pages render `<Placeholder>` ("Раздел в разработке") — each subsequent prompt fills one in
- Mock data covers 200 applications, 50 clients, 30 system users, 8 partners, 12 branches, 15 notifications, 10 reports

## Out of scope (today)
- Real auth (mock user always present via `auth.store.ts`)
- Real backend (mock fetchers only)
- File uploads / OCR / document handling
- UZ translations (locale file is `{}`; falls back to RU)
- Mobile-native shell (web SPA only; mobile = responsive web)
