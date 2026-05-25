---
Title: AvtoLog — Mobile App Design Spec (MVP)
Created at: 2026-05-25
Status: Approved for build
Project: Car Maintenance App (AvtoLog / АвтоЛог)
Workspace: Paper Design — file `Fleet Management System`, page `Mobile App`
Related:
  - "[[VMS — Product Strategy]]"
  - "[[VMS — MVP Development Plan]]"
  - "[[VMS — Requirements]]"
  - "[[VMS — Business Analysis]]"
Tags:
  - project
  - design
  - mobile
  - avtolog
---

# AvtoLog — Mobile App Design Spec (MVP)

End-to-end design specification for the AvtoLog mobile app MVP. Translates the existing product strategy and MVP development plan into a concrete iOS design system + 25 screens + 4 modal sheets, ready to build in Paper Design.

This spec is the source of truth for the Paper file. The implementation plan (Paper build steps in order) lives in a separate document produced after this spec is approved.

---

## 1. Brief

Locked through a brainstorming pass on 2026-05-25.

| Decision | Choice |
|---|---|
| **Brand** | АвтоЛог / AvtoLog (working name from Product Strategy). Reads naturally in Russian as `АвтоЛог`. |
| **Platform** | iOS native first, iPhone 16 Pro frame (393×852). Android variant to follow MVP. |
| **Primary display language** | Русский (Russian). Uzbek + English added in localization pass after MVP visuals are signed off. |
| **Visual direction** | Automotive premium — dark canvas, restrained accent, mono tabular numerics. Tesla / BMW Connected reference points. |
| **Audience** | Both Sardor (everyday owner) and Rustam (enthusiast / multi-vehicle) — per Product Strategy. Premium dark serves both; features unchanged. |
| **Scope** | Full MVP equivalent: 25 screens + 4 modal sheets. Covers every flow currently spec'd in the Telegram bot, adapted to native mobile chrome. |
| **Build approach** | Foundations + anchor slice (Approach A) — design system first, then 3 anchor screens, then sweep remaining 22. |
| **Auth pattern** | Telegram Login deep-link primary + phone OTP secondary on the same screen. |
| **In-app notifications feed** | Included in MVP (mobile-specific addition beyond bot). |

The brand color is the single most load-bearing choice — see §2.

---

## 2. Design DNA

The premium-dark direction depends on three things: deep cool neutrals, a single confident accent, and tabular numerics for everything quantitative.

### Palette

```text
Surfaces
  Canvas         #0A0B0D    ── deepest bg, the "garage night"
  Surface        #14161A    ── cards, list rows
  Surface raised #1C1F25    ── modals, sheets, top bar on scroll
  Border subtle  #232830    ── 1px hairlines, dividers

Text
  Primary        #F4F5F7    ── titles + body
  Secondary      #9AA1AB    ── meta, labels, captions
  Tertiary       #5B6470    ── placeholders, disabled

Brand (the only chromatic primary)
  Brand          #00B3FF    ── electric cyan-blue. EV-tech coded.
  Brand hover    #33C3FF
  Brand quiet    #00B3FF · 14% alpha for fills behind active states

Semantic
  Success        #00E5A0    ── "Обслужено вовремя"
  Warning        #FFB020    ── "Скоро"
  Danger         #FF4D6D    ── "Просрочено / Удалить"

Charts (5-series, distinct hues)
  #00B3FF · #FF4D6D · #FFB020 · #B084FF · #00E5A0
```

**Accent restraint rule:** Brand cyan appears only on primary actions, active tab states, and key data highlights. Everything else lives in greyscale + semantic colors. Overuse of brand kills the premium feel.

### Typography

- **Sans (UI / body):** Inter (fallback chain: SF Pro Text → Helvetica Now → system) — neutral, tight Cyrillic shapes.
- **Mono / tabular (numerics):** JetBrains Mono (fallback: SF Mono → system mono) — for km, UZS amounts, mileage countdowns. Tabular figures lock vertical alignment in lists.
- **Font resolution:** if Paper does not have Inter / JetBrains Mono, fall back to system defaults at foundation build time. Call `get_font_family_info` before first typographic styling.

Scale (px / leading):

```text
Display     56 / 64    medium · mono · tabular   ── hero number (mileage, savings)
Title L     28 / 34    semibold                  ── screen titles
Title M     22 / 28    semibold                  ── section headers
Title S     18 / 24    semibold                  ── card titles
Body        16 / 22    regular                   ── default
Body S      14 / 20    regular                   ── meta, secondary
Caption     12 / 16    regular                   ── timestamps, hints
Label mono  11 / 14    medium · uppercase · 0.06em tracking
```

### Spacing · radii · iconography · motion

```text
Spacing scale:   4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64  (4-base)
Radii:           sm 8 · md 12 · lg 16 · xl 24 · pill ∞
Icons:           24px line, 1.5px stroke; filled variants for active tab states only
Motion:          iOS-native springs; tap = 0.97 scale; sheet = native slide-up
Depth:           No drop shadows. Hierarchy via background lift (Surface → Raised) + 1px Border subtle stroke.
```

**No drop shadows** is deliberate — premium-dark looks cheap with glows. Elevation comes from background steps and accent-colored strokes.

---

## 3. Component Inventory

12 atoms + 9 molecules + 2 specialized. All built on the Foundations artboard before screens.

### 3.1 Atoms

| Component | Notes |
|---|---|
| **Button** | Variants: Primary (Brand fill), Ghost (1px Border subtle, Primary text), Destructive (Danger fill), Icon-only. Heights 44 / 52 / 32. Radius 12. Tap = 0.97 scale. |
| **Input** | Variants: Single-line, Number (mono tabular), Multiline (notes). Surface bg, 1px Border subtle → focus 1px Brand. Top label pattern. |
| **Chip** | Filter chips (multi-select), Status pills (`Просрочено` / `Скоро` / `OK`). Height 28, pill radius. |
| **Avatar / vehicle thumb** | 56×56, radius 12, fallback initials over make-colored chip. |
| **Icon** | 24px line, 1.5px stroke. Filled variants only for active tab states. |
| **Divider** | 1px Border subtle, 16 / 24 insets. |
| **Badge** | Numeric count (10×16 pill), 8px dot indicator. |
| **Switch / radio / checkbox** | iOS scale, tinted Brand. |
| **Stepper** | Mileage `−/+` around a mono number. |
| **Tab bar** | 4 tabs: `Гараж` · `Записать` · `История` · `Профиль`. `Записать` is the primary CTA — middle position, Brand-filled circle behind the icon, slightly elevated. |
| **Segmented control** | `Месяц / Год / Всё время` for cost views. |
| **Skeleton** | Surface base, animated 14161A → 1C1F25 sheen. |

### 3.2 Molecules

| Component | Notes |
|---|---|
| **Vehicle card** | Make · Model · Year top; big mono mileage in км; inline 32px health ring; next-service hint underneath. Used in Garage + picker. |
| **Service-type tile** | Icon + Russian label. 14 categories. 2-column grid. |
| **KPI tile** | Big mono number, label below, delta (`↑ 12%`) in semantic color. |
| **History row** | Left: type icon. Middle: Russian label + date + mileage. Right: cost mono right-aligned, UZS grouping (`350 000`). Optional photo dot. |
| **Reminder row** | Icon · service name · `Через 1 250 км` or `Через 5 дней`. Trailing snooze/done. Color-coded by urgency. |
| **Empty state** | Centered icon, title, one-line body, single CTA. One template, multiple copies. |
| **Chart card** | Donut (cost split by category) and Line (monthly spend). Chart 5-series palette. Tabular numeric labels. |
| **Health gauge** | Circular 0–100, Brand arc fill, mono number center. Renders at 96px (Vehicle Detail hero) and 32px (inline). |
| **QR card** | Vehicle name + plate + QR + short URL + expiry chip. Used on Share flow. |

### 3.3 Specialized

| Component | Notes |
|---|---|
| **Mileage countdown** | `ещё 1 250 км` — mono number, semantic color: green > 2000 / amber 500–2000 / red < 500 or overdue. |
| **Photo strip** | 1–3 square thumbs (64px), tap → lightbox. |

### 3.4 Load-bearing UX call

The `Записать` elevated middle-tab is the primary action across both Sardor and Rustam — putting it dead center in the chrome trains muscle memory from the first session. This is the single most important interaction choice in the layout.

---

## 4. Screen Map — 25 screens + 4 sheets

Russian names are actual UI strings; English in parens for navigation. Each line = purpose + load-bearing data.

### A. Onboarding & auth (4)

1. **Splash** — АвтоЛог wordmark, single-line tagline. ≤1s routing.
2. **Выбор языка** *(Language picker)* — uz · ru. Default RU.
3. **Знакомство** *(Welcome)* — 3-slide value-prop carousel: track · remind · sell. Skip + next.
4. **Вход** *(Auth)* — Telegram Login deep-link primary; phone OTP secondary on same screen.

### B. Vehicle setup (3)

5. **Пустой гараж** *(Empty garage)* — empty state; CTA «Добавить автомобиль».
6. **Марка и модель** *(Make + model picker)* — pre-loaded UZ list: Chevrolet → BYD → Chery → Haval → Hyundai → Kia → Toyota → Другое.
7. **Параметры авто** *(Vehicle details)* — year · fuel (бензин / дизель / метан / пропан / гибрид / электро) · номер (skippable) · текущий пробег.

### C. Home (3)

8. **Гараж** *(Garage home)* — vehicle cards list, top KPI strip (расход за месяц + км за 30 дней), pull-to-refresh, no FAB.
9. **Машина** *(Vehicle detail — most-visited screen)* — hero (big mono mileage + 96px health ring), upcoming reminders (≤3), recent services (≤5), monthly cost sparkline, secondary action row.
10. **Уведомления** *(Notifications feed)* — chronological feed: reminders triggered, services logged, share-link views. Mobile-specific addition beyond bot.

### D. Service logging — wizard (4)

11. **Выбор авто** *(Pick vehicle)* — skipped if 1 car.
12. **Тип услуги** *(Service type picker)* — 14-tile grid: `Масло · Шины · Тормоза · Фильтр воздуха · Фильтр масла · Фильтр салона · Аккумулятор · Диагностика · Кузов · Электрика · Подвеска · КПП · Двигатель · Прочее`.
13. **Детали** *(Details)* — пробег (auto-suggest from current), стоимость UZS, заметки, мастер (опц.), фото (≤3).
14. **Готово** *(Done — confirmation)* — what was recorded, next reminder scheduled, CTAs «Посмотреть» / «Записать ещё».

### E. History & costs (3)

15. **История** *(History list)* — chronological list; filter chips (тип, период), text search.
16. **Запись** *(Service record detail)* — full info, photo strip → lightbox, edit/delete in overflow.
17. **Расходы** *(Costs)* — segmented `Месяц / Год / Всё время`, KPI tiles (Итого · Среднее в месяц · Стоимость за км), donut by category, line trend, top-5 ranked.

### F. Reminders (2)

18. **Напоминания** *(Reminders list)* — grouped: `Просрочено` / `Скоро` / `Запланировано`.
19. **Напоминание** *(Reminder detail)* — service info, due date + mileage, snooze sheet, mark done, edit/delete.

### G. Share & resale (3) — the killer-feature loop

20. **Поделиться** *(Share generate)* — pick expiry (24ч / 7д / 30д / без ограничений) → generate. Shows QR + short URL + copy.
21. **Предпросмотр** *(Public preview — buyer view)* — buyer-facing rendering at mobile size. Vehicle summary, full timeline, total spend, photos, footer CTA «Веди свою машину в АвтоЛоге». Drives viral signups.
22. **Мои ссылки** *(My links)* — active links list + view counts + revoke.

### H. Settings & profile (3)

23. **Профиль** *(Profile)* — имя, язык, часовой пояс, дата регистрации.
24. **Настройки** *(Settings)* — уведомления (toggles + время суток), единицы (locked to km), приватность, выход, удалить аккаунт.
25. **О приложении** *(About)* — версия, поддержка (TG handle), условия, конфиденциальность.

### Supporting sheets / modals (4)

- **Редактировать авто** — bottom sheet
- **Редактировать запись** — bottom sheet
- **Удалить?** — destructive confirmation alert
- **Отложить напоминание** *(Snooze)* — sheet (1д / 3д / 7д / другая дата)

### State variants (within screens, not separate counts)

Every data screen has explicit variants for: **empty / loading skeleton / error / offline**. Garage, History, Reminders, Costs each get dedicated empty-state designs. Offline state renders as a top banner.

---

## 5. Build Order

One foundation phase + four sweeps. Each sweep is one Paper session.

### Phase 0 — Foundations (1 artboard)

A single 1200×1800 reference artboard at the top of the Mobile App page:

- Palette swatches (surface + accent + semantic) with hex labels
- Type ramp (8 styles, in Russian — `Заголовок`, `Раздел`, etc.)
- Spacing / radii reference grid
- All 12 atoms × default + active + disabled states
- All 9 molecules × default state
- 2 specialized renders: health gauge at 96 + 32, mileage countdown at 3 urgency levels

**Acceptance:** looking at this artboard, every downstream screen is predictable in look and feel.

### Phase 1 — Anchor slice (3 screens)

Three screens chosen to exercise the most components and surface integration risk early:

1. **Гараж** (#8) — vehicle cards, KPI strip, tab bar
2. **Машина** (#9) — hero block, 96px health gauge, reminder + history rows, sparkline
3. **Тип услуги** (#12) — 14-tile picker grid, sheet header

**Hard checkpoint here.** If these three feel right, the rest is mostly assembly. If they don't, re-tune foundations before building 22 broken screens.

### Phase 2 — Service-logging wizard end-to-end (4 screens)

Finish the wizard — **#11 picker, #13 details form, #14 confirmation** — plus the empty-garage gate **#5**. (The `Записать` tab entry is a tab-bar component, not a screen.) Most-used path; ships airtight.

### Phase 3 — Onboarding + history + costs (9 screens)

- **#1–4** Onboarding (Splash → Lang → Welcome → Auth)
- **#6–7** Vehicle setup wizard (Make/model → Details)
- **#15–16** History list + Record detail
- **#17** Costs (densest analytics screen — proves chart components)

### Phase 4 — Reminders + share + settings (9 screens)

- **#18–19** Reminders
- **#20–22** Share trio (resale killer loop)
- **#10** Notifications feed
- **#23–25** Profile / Settings / About

### Phase 5 — Sheets + state variants (alongside owners, finished last)

The 4 modal sheets + empty / loading / error variants for the data screens. Built as duplicated frames of their owner screens.

---

## 6. Acceptance Criteria

Each screen meets all of the following before it's marked done:

- iPhone 16 Pro frame (393×852)
- All copy in Russian, no Lorem
- Realistic data values: UZS grouped as `350 000`, real km figures, real UZ market models (Cobalt, Lacetti, Captiva, Sonata)
- Data screens include both populated and empty variants
- Foundation tokens referenced (not hardcoded hex / font sizes inline)
- Layered correctly per the depth rules (no drop shadows; elevation via background lift + 1px border)
- Tab bar with elevated `Записать` middle CTA present on all main-flow screens

---

## 7. Open Decisions Deferred Past MVP

These come back after MVP visuals are signed off:

- **Localization to Uzbek (Latin) and English** — copy expansion, layout reflow at +30% string length
- **Android variant** — Material 3 conventions, system fonts (Roboto)
- **Light mode** — premium-dark is the default brand expression; light is a post-MVP accessibility pass
- **Mechanic profile / directory** — v2 per Product Strategy, not in MVP design
- **Fleet operator dashboard** — Paper file name suggests this; product docs do not. Track but do not design now.
- **OBD-II / GPS** — explicitly out per Product Strategy

---

## 8. Related Documents

- Product Strategy: `Notes/1. Projects/Personal Projects/Car Maintenance App/Product Strategy/en/VMS — Product Strategy.md`
- MVP Plan: `Notes/1. Projects/Personal Projects/Car Maintenance App/Technical/en/VMS — MVP Development Plan.md`
- Requirements: `Notes/1. Projects/Personal Projects/Car Maintenance App/Requirements/ru/VMS — Requirements.md`
- Business Analysis: `Notes/1. Projects/Personal Projects/Car Maintenance App/Business/ru/VMS — Business Analysis.md`

Paper workspace:
- File: `Fleet Management System` (id `01KSF6WB0MDQSVTG7NH8422QVA`)
- Page: `Mobile App`
- Team: Sardor's Team

---

*End of design spec. Next document: implementation plan (Paper build steps), produced after this spec is approved.*
