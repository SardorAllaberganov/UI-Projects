# Unired Business — Pixel-Perfect Mobile Prototype

Interactive mobile prototype for **Unired Business** (Uzbek SMB banking app), built pixel-perfect to the Figma reference:
[MSB V2 — Project](https://www.figma.com/design/as5dbYenD0jBAn2KJiY2Fm/MSB-V2--Project-)

Plain HTML + CSS + vanilla JS. No build step, no dependencies. Open `index.html` and click around.

## Quick start

```
node _server.js               # Node 18+ (Windows works)
# → http://localhost:8765
```

Or simply open `index.html` in your browser (some screens use `fetch` for assets, so a local server is preferred).

**To log in:** Enter any phone (≥9 digits) and password `0000`.

## Pixel-perfect screens

All 14 screens below were built directly from the Figma file with extracted design tokens, real asset SVGs, and matching layout/typography/spacing.

| Screen | Figma nodeId | Path |
|---|---|---|
| Выбор языка | `2292:5828` | `screens/intro.html` |
| Авторизация | `2292:6037` | `screens/login.html` |
| Главная | `2338:7050` | `screens/home.html` |
| Меню | `2604:14527` | `screens/menu.html` |
| Мои счета | `2816:23762` | `screens/accounts.html` |
| Детали счета | `2818:23992` | `screens/account-detail.html` |
| Выписка по счету | `2819:20643` | `screens/account-statement.html` |
| Документы | `2559:12374` | `screens/documents.html` |
| Новое платёжное поручение | `2532:13191` | `screens/new-payment.html` |
| Кадры | `2712:12849` | `screens/staff.html` |
| Зарплата | `2438:7820` | `screens/payroll.html` |
| Мои контрагенты | `3830:17352` | `screens/counterparties.html` |
| QR оплата | `2643:17309` | `screens/qr.html` |
| Отчёты по QR | `2758:13257` | `screens/reports.html` |

## Design tokens

Extracted from Figma:

| Token | Value | Use |
|---|---|---|
| Brand gradient | `linear-gradient(114.77deg, #F93C65 23.888%, #E6303A 85.587%)` | Headers, CTAs |
| Text default | `#3F3F46` | Body text |
| Text secondary | `#7D7D85` / `#54545B` | Labels, hints |
| Surface elevated | `#FFFFFF` | Cards |
| Background app | `#F0F0F0` | Page background |
| Field background | `#F6F8F9` | Input wrappers |
| Border default | `#DFDFE4` | Card borders |
| Icon-card border | `#8CC5FF` (0.371px) | Menu tile icons |
| Status: error | `#D2222D` | Неутвержден, Истекший |
| Status: success | `#16A34A` | Утвержден, Зачислено |
| Status: warn | `#EAB308` | В процессе, Ожидание |
| Typography | Manrope (400 / 500 / 600 / 700) | All text |
| Radius card | `16px` / `24px` | Cards |
| Radius input | `12px` / `16px` | Inputs, buttons |

## Folder structure

```
MSB/
├── index.html                       Pixel-perfect launcher
├── _server.js                       Node static server (zero deps)
├── _figma_refs/                     Original Figma screenshot references
├── assets/                          SVG icons + flag PNGs from Figma
├── css/styles.css                   Design tokens + shared component styles
├── js/
│   ├── data.js                      Demo data (Demo Company 2, accounts, staff, QR, ops)
│   └── app.js                       MSB.* utilities + reusable bottomNav + pinkHeader
└── screens/                         All screen HTMLs
```

## Mock data

Modeled after the Figma file's demo company:

- **Company**: `OOO 'Demo Company 2'`, ИНН `123456789`, МФО `00444`
- **Accounts**: 3 accounts with statuses (Неутвержден / Утвержден / В процессе)
- **Staff**: 8 employees grouped by Demo Company 1 / 2
- **QR codes**: 3 codes (Активный / Использовано / Истекший)
- **QR operations**: 6 transactions (Ожидание / Обработка / Зачислено)

## Architecture

- **`js/app.js`** exports `MSB.*` API:
  - `MSB.pinkHeader({ title, back, showActions })` — reusable pink-gradient top bar
  - `MSB.bottomNav(active)` — 5-tab Figma-spec bottom navigation
  - `MSB.fmtMoney`, `MSB.fmtDate`, `MSB.relativeDay`, etc. — formatting
  - `MSB.login()` / `MSB.logout()` / `MSB.getState()` — auth + state via localStorage
  - `MSB.toast(msg)` — temporary toast notification
- **`js/data.js`** exposes `MSB_DATA` (all demo content)
- **`css/styles.css`** defines design tokens as CSS variables + shared components

## Adding new features

When you describe new features, each becomes:

1. A new screen under `screens/`, copying patterns from a similar screen
2. New mock data in `js/data.js`
3. A new card in `index.html` modules grid
4. A nav entry in `home.html` quick actions or `menu.html` tile grid

The design system is already established — new screens will inherit the Unired Business visual identity automatically.

## Notes

- The Figma file contains ~104 screens across 12 modules. This prototype implements the 14 most representative entry points end-to-end to demonstrate the full user journey.
- Other Figma screens (staff profile, edit employee, contract details, receivables drill-down, QR generation form, statement variants) follow the same patterns — implementing them is straightforward by copying the established layout.
- All screens are mobile-first, optimized for 430×932 (iPhone 14 Pro). They render fine on desktop in a centered 430px frame.
- "Coming soon" actions display a toast; replace with real screens as needed.
