# AvtoLog Mobile App Design — Build Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 25 polished iOS screens + 4 modal sheets in Paper Desktop for the AvtoLog MVP, end-to-end, following the design spec at `docs/superpowers/specs/2026-05-25-avtolog-mobile-design.md`.

**Architecture:** Foundations-first. One DNA reference artboard establishes palette, typography, components. Then 3 anchor screens validate the system before sweep. Then remaining 22 screens build by flow priority. Sheets and state variants finish alongside their owners.

**Tech Stack:** Paper Desktop + Paper MCP plugin. iPhone 16 Pro frame (393×852). Russian UI strings throughout. Inter / JetBrains Mono fonts (with system fallback chain).

**Spec reference:** All design tokens, screen definitions, and acceptance criteria live in `docs/superpowers/specs/2026-05-25-avtolog-mobile-design.md`. This plan focuses on EXECUTION ORDER and per-artboard build instructions; do not duplicate the spec content here — reference it.

**Paper file:** `Fleet Management System` (id `01KSF6WB0MDQSVTG7NH8422QVA`), page `Mobile App`, team `Sardor's Team`.

---

## Pre-flight

### Task P.1: Session warmup

**Files:** none — Paper API only

- [ ] **Step 1: Load Paper MCP guide**

Tool: `mcp__plugin_paper-desktop_paper__get_guide`
Args: `{ "topic": "paper-mcp-instructions" }`
Purpose: required once-per-session per MCP server instructions.

- [ ] **Step 2: Confirm the right file is open**

Tool: `mcp__plugin_paper-desktop_paper__open_file`
Args: `{ "fileId": "01KSF6WB0MDQSVTG7NH8422QVA" }`
Expected response: `fileName: "Fleet Management System"`, `pageName: "Mobile App"`, `pageId: "1-0"`.

- [ ] **Step 3: Get basic info**

Tool: `mcp__plugin_paper-desktop_paper__get_basic_info`
Purpose: see existing artboards (should be empty for first run) and confirm we are on the Mobile App page.

- [ ] **Step 4: Get font family info**

Tool: `mcp__plugin_paper-desktop_paper__get_font_family_info`
Purpose: per Paper instructions, MUST be called before first typographic styling. Look for `Inter` and `JetBrains Mono` in the result. If absent, record the closest available system fonts (likely `SF Pro Text` and `SF Mono` on macOS, `Segoe UI` and `Consolas` on Windows) and use the fallback chain from spec §2.2.

**Acceptance:** session is ready — Paper file open on the Mobile App page, fonts resolved, MCP guide context loaded.

---

## Phase 0 — Foundations

One reference artboard with palette + type + components. Looking at it should let anyone predict what the screens will look like.

### Task 0.1: Create Foundations artboard

**Artboard:** `00 · Foundations` · 1200×1800

- [ ] **Step 1: Create the artboard**

Tool: `mcp__plugin_paper-desktop_paper__create_artboard`
Args: `{ "name": "00 · Foundations", "width": 1200, "height": 1800, "x": 0, "y": 0 }`

- [ ] **Step 2: Apply canvas background**

Use `update_styles` on the new artboard to set `backgroundColor: "#0A0B0D"` (Canvas surface from spec §2.1).

- [ ] **Step 3: Add a top header strip**

Use `write_html` to insert a header with the title `АвтоЛог · Design DNA · 2026-05-25` and subtitle `iPhone 16 Pro · Premium Dark · Русский`. Use `color: #F4F5F7` for the title and `color: #9AA1AB` for the subtitle. Title is Title L (28/34 semibold), subtitle is Body S (14/20 regular).

- [ ] **Step 4: Verify with screenshot**

Tool: `mcp__plugin_paper-desktop_paper__get_screenshot` on the new artboard.
Check: black canvas, header visible, no fit-content overflow.

### Task 0.2: Palette swatches block

**Adds to:** `00 · Foundations`
**Spec reference:** §2.1

- [ ] **Step 1: Add section header**

Write `Палитра` (Title M 22/28 semibold) at y ≈ 120 inside the artboard.

- [ ] **Step 2: Surface row (4 swatches)**

For each of `Canvas #0A0B0D`, `Surface #14161A`, `Surface raised #1C1F25`, `Border subtle #232830`: build a 240×140 card with the swatch on top (110px tall, the actual color) and a 30px label strip below with the role name (Body S Primary text) and the hex code (Label mono).

- [ ] **Step 3: Text row (3 swatches)**

Same template, for `Primary #F4F5F7`, `Secondary #9AA1AB`, `Tertiary #5B6470`.

- [ ] **Step 4: Brand row (3 swatches)**

For `Brand #00B3FF`, `Brand hover #33C3FF`, `Brand quiet #00B3FF @ 14%` (render the alpha swatch as the color on top of a Surface tile so the transparency reads).

- [ ] **Step 5: Semantic row (3 swatches)**

`Success #00E5A0`, `Warning #FFB020`, `Danger #FF4D6D`.

- [ ] **Step 6: Chart row (5 narrow chips)**

5 thinner chips at 100×40 with the 5 chart series colors and their hex.

- [ ] **Step 7: Verify**

`get_screenshot` of the artboard. Check that every swatch is legible against the dark canvas. If the Border-subtle swatch (#232830) is hard to see, add a 1px Brand-quiet outline around it so it reads.

### Task 0.3: Type ramp block

**Adds to:** `00 · Foundations`
**Spec reference:** §2.2

- [ ] **Step 1: Add section header**

Write `Типографика` (Title M).

- [ ] **Step 2: Render each scale row**

For each row in the type scale, write the row with two columns:
- Left column (300px wide): the style name + size/leading (e.g. `Display · 56/64 · mono`)
- Right column: a sample string at that style, in Russian. Use these strings:
  - Display: `47 250`
  - Title L: `Привет, Сардор`
  - Title M: `Расходы за май`
  - Title S: `Замена масла`
  - Body: `Mobil 5W-30, синтетика. Магазин на Бунёдкор.`
  - Body S: `Через 1 250 км или 5 дней`
  - Caption: `25 мая 2026 · 14:32`
  - Label mono: `СЛЕДУЮЩИЙ СЕРВИС`

- [ ] **Step 3: Confirm font resolution**

If Inter / JetBrains Mono are unavailable, document which fallback was used by adding a small note at the bottom of the typography block: `Fonts: <actual sans> / <actual mono>`.

- [ ] **Step 4: Verify**

`get_screenshot`. Check Cyrillic characters render correctly at every size (no fallback boxes).

### Task 0.4: Spacing, radii, motion reference

**Adds to:** `00 · Foundations`
**Spec reference:** §2.3

- [ ] **Step 1: Section header `Шаг, радиусы, иконки`**

- [ ] **Step 2: Spacing scale visualizer**

11 horizontal Brand-cyan bars representing 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64 px widths, each with the numeric value beside it in Label mono.

- [ ] **Step 3: Radius samples**

5 Surface tiles (sized 96×96) with radii `sm 8`, `md 12`, `lg 16`, `xl 24`, `pill ∞`. Each labeled below.

- [ ] **Step 4: Iconography note**

A line of text: `Иконки · 24px line · stroke 1.5px · filled только для активного состояния таб-бара`. Optional: drop in 3 line-icons (home, plus, list) at 24px to show the style if Paper has Material Symbols or SF Symbols available — otherwise skip and add later.

- [ ] **Step 5: Verify with screenshot**

### Task 0.5: Atoms — buttons, inputs, chips

**Adds to:** `00 · Foundations`
**Spec reference:** §3.1

For each atom, render a horizontal row of variants. Use the spacing scale from Task 0.4 for gaps.

- [ ] **Step 1: Section header `Атомы`**

- [ ] **Step 2: Buttons row**

5 variants side by side at default size (height 44):
- Primary: `Записать` (Brand fill, Primary text)
- Ghost: `Отмена` (1px Border subtle, Primary text, transparent fill)
- Destructive: `Удалить` (Danger fill, Primary text)
- Icon-only: `+` (44×44 square, Brand fill)
- Primary CTA (height 52): `Добавить автомобиль` (Brand fill, Primary text)

Plus a row below showing disabled state for Primary + Ghost (opacity 0.5, no hover state).

- [ ] **Step 3: Inputs row**

3 variants at width 340:
- Single-line, label-top: label `Имя`, placeholder `Введите имя`
- Number mono: label `Пробег, км`, value `47 250` (tabular mono)
- Multiline: label `Заметки`, 3 rows tall, placeholder `Например: Mobil 5W-30, синтетика…`

Show one input in focus state (1px Brand border) for reference.

- [ ] **Step 4: Chips row**

- Filter chips: 4 chips `Все`, `Масло`, `Шины`, `Тормоза` with one selected (Brand-quiet fill + Brand text)
- Status pills: 3 pills `Просрочено` (Danger), `Скоро` (Warning), `OK` (Success). Each pill has a leading 8px dot.

- [ ] **Step 5: Misc atoms strip**

In one row: Avatar (vehicle thumb 56×56 with `CV` initials on a navy background), 24px Icon sample, Divider (240px wide), Badge (12 in pill), Switch (on + off), Stepper (`− 47 250 +`), Segmented control (`Месяц / Год / Всё время` with Месяц active), Skeleton (240×16 bar).

- [ ] **Step 6: Tab bar**

Render the bottom tab bar at full width 393, height 88. 4 tabs: `Гараж`, `Записать`, `История`, `Профиль`. The `Записать` middle tab is a 56px Brand-filled circle centered with `+` icon, lifted 4px above the bar baseline. Each tab has a 24px icon + Caption text (12/16). Active tab uses Brand color (cyan); inactive uses Secondary.

- [ ] **Step 7: Verify with screenshot**

Check all 4 active tab states render consistently. Touch targets visually look ≥ 44px tall.

### Task 0.6: Molecules — cards, rows, tiles

**Adds to:** `00 · Foundations`
**Spec reference:** §3.2

- [ ] **Step 1: Section header `Молекулы`**

- [ ] **Step 2: Vehicle card**

361×156 Surface card with radius lg 16, padding 20. Layout:
- Top row: `Chevrolet Cobalt · 2020` (Title S) on left, 32px health ring on right (87%)
- Middle: `47 250` (Display, mono) + `км` (Body S Secondary)
- Bottom row: `Замена масла через 1 250 км` (Body S, Warning color because <2000)

- [ ] **Step 3: Service-type tile**

2-column grid sample, 3 tiles to show pattern: `Масло`, `Шины`, `Тормоза`. Each tile is 168×120 Surface with 16 radius, 24px line icon centered, label below in Body.

- [ ] **Step 4: KPI tile**

3 tiles side by side, 220×120 each:
- `Итого: 1 450 000 UZS` with `↑ 12%` Success-colored delta
- `За месяц: 450 000 UZS` with `↓ 3%` Secondary-colored delta
- `За км: 24 UZS` with `→ 0%` Secondary delta

- [ ] **Step 5: History row**

Full-width (361×72) row: type icon left, middle column has `Замена масла` (Title S) + `25.05 · 47 250 км` (Caption Secondary), right column has `350 000 UZS` (mono Body) + a 6px photo dot below.

- [ ] **Step 6: Reminder row**

Full-width row: clock icon Warning-tinted, middle has `Замена масла` + `Через 1 250 км` (Warning), trailing has a snooze icon-button.

Render 3 variants stacked: Просрочено (Danger), Скоро (Warning), Запланировано (Secondary).

- [ ] **Step 7: Empty state**

A 361×240 block centered: empty icon 64px Tertiary, title `Гараж пуст` (Title M), body `Добавьте свой первый автомобиль, чтобы начать вести историю обслуживания.` (Body S Secondary), CTA button `Добавить автомобиль`.

- [ ] **Step 8: Chart cards**

Donut card: 361×240 Surface card with a centered 160px donut chart split into 5 chart-series colors. Legend below showing `Масло 38%`, `Шины 22%`, `Тормоза 18%`, `Фильтры 12%`, `Прочее 10%`.

Line chart card: 361×220 Surface card with a line chart showing 6 months of monthly spend, Brand-cyan stroke, tabular y-axis labels in UZS.

- [ ] **Step 9: QR card**

300×320 Raised-surface card: `Chevrolet Cobalt · 01 A 123 BA` header, 200×200 QR code (placeholder square with grid pattern), short URL `avtolog.uz/c/r7k9X2` (mono), expiry chip `7 дней`.

- [ ] **Step 10: Verify**

`get_screenshot`. Check that cards have consistent padding, the tabular numerics align column-wise, and the health-ring renders correctly with the arc fill at 87%.

### Task 0.7: Specialized — health gauge + mileage countdown

**Adds to:** `00 · Foundations`
**Spec reference:** §3.3

- [ ] **Step 1: Health gauge — 2 sizes**

Render 96px and 32px gauges side by side, both at 87%. Each:
- Background ring: 6px stroke (96px) / 3px stroke (32px) in Border subtle
- Foreground arc: Brand color, same stroke, drawn from 12-o'clock clockwise for 87% of circumference
- Center text: `87` (96px: Display mono; 32px: Title S mono)

- [ ] **Step 2: Mileage countdown — 3 urgency levels**

3 lines stacked:
- `ещё 2 450 км` in Success (>2000)
- `ещё 1 250 км` in Warning (500–2000)
- `ещё 230 км` in Danger (<500)

All in mono tabular at Title S.

- [ ] **Step 3: Verify**

### Task 0.8: Foundations sign-off

- [ ] **Step 1: Full-artboard screenshot**

`get_screenshot` of `00 · Foundations`. The image is the visual checkpoint.

- [ ] **Step 2: Sanity check against the spec**

Open `docs/superpowers/specs/2026-05-25-avtolog-mobile-design.md` §2 and §3. Walk each item and confirm it appears on the Foundations artboard. If anything is missing, add it before continuing.

- [ ] **Step 3: Switch artboard to fit-content**

`update_styles` on the artboard with `height: "fit-content"` if content overflowed the initial 1800px.

- [ ] **Step 4: finish_working_on_nodes**

Tool: `mcp__plugin_paper-desktop_paper__finish_working_on_nodes` on the artboard.

- [ ] **Step 5: STOP and review with user**

Show the screenshot to the user. Get explicit OK before starting Phase 1. This is the cheapest moment to course-correct.

---

## Phase 1 — Anchor slice (3 screens)

Build 3 screens that exercise the most components and the most layout complexity. Hard checkpoint at end.

Position screens left-to-right starting at `x = 1300` (right of Foundations), with 80px gaps. Y position aligned with Foundations top.

### Task 1.1: `08 · Гараж` (#8 — Garage home)

**Artboard:** `08 · Гараж` · 393×852 · iPhone 16 Pro
**Spec reference:** screen #8 (§4.C)

- [ ] **Step 1: Create the artboard**

Tool: `create_artboard`
Args: `{ "name": "08 · Гараж", "width": 393, "height": 852, "x": 1300, "y": 0 }`
Background: `#0A0B0D` (Canvas).

- [ ] **Step 2: Top app bar via write_html**

Header strip 393×56, background transparent (so canvas shows). Left: greeting `Привет, Сардор` (Title S). Right: 24px notification icon with a Brand dot if unread.

- [ ] **Step 3: KPI strip below header**

A 361-wide row of 2 KPI tiles side by side (177×96 each, 7px gap):
- `Расход · май` — `450 000 UZS` (mono) — `↑ 12%` (Warning)
- `Пробег · 30 дней` — `1 850 км` (mono) — `↓ 4%` (Secondary)

- [ ] **Step 4: Vehicles list section**

Section header `Мои автомобили` (Title S, Secondary) with a trailing `+ Добавить` ghost button.

Two stacked Vehicle cards (use molecule from Foundations):
- Chevrolet Cobalt · 2020 — `47 250 км` — health 87 — `Замена масла через 1 250 км` (Warning)
- Hyundai Sonata · 2022 — `12 400 км` — health 96 — `Всё в порядке` (Success)

- [ ] **Step 5: Recent activity strip**

Section header `Последние записи` (Title S Secondary) + 3 compact history rows (smaller variant — 56px tall) showing 3 recent services.

- [ ] **Step 6: Tab bar at bottom**

Duplicate the tab-bar molecule from Foundations and pin it to bottom (y = 764 if 88px tall). `Гараж` tab active.

- [ ] **Step 7: Verify with screenshot**

Check: KPI strip aligns column-wise, vehicle cards have consistent padding, tab bar `Записать` middle button is elevated, nothing overflows the artboard.

- [ ] **Step 8: finish_working_on_nodes**

### Task 1.2: `09 · Машина` (#9 — Vehicle detail)

**Artboard:** `09 · Машина` · 393×852 (likely needs `height: fit-content` because of stacked content)
**Spec reference:** screen #9 (§4.C) — most-visited screen, densest content.

- [ ] **Step 1: Create artboard at x = 1773 (right of Гараж + 80 gap)**

`create_artboard` with `{ "name": "09 · Машина", "width": 393, "height": 852, "x": 1773, "y": 0 }`.

- [ ] **Step 2: Top app bar with back button**

Left: 24px back chevron. Center: `Chevrolet Cobalt` (Title S). Right: 24px ellipsis (overflow menu).

- [ ] **Step 3: Hero block**

Centered: 96px health gauge (rendered with arc at 87%) with `87` mono number inside. Below gauge: `47 250` (Display mono) + `км` (Body S Secondary) on a single baseline.

Below that: line `2020 · бензин · 01 A 123 BA` in Caption Secondary, centered.

- [ ] **Step 4: Action row**

3 ghost buttons in a row, 32px tall:
- `+ Записать` (with mini Brand fill)
- `Напоминания`
- `Поделиться`

- [ ] **Step 5: Upcoming reminders section**

Section header `Скоро` (Title S Secondary). 3 Reminder rows stacked:
- `Замена масла · Через 1 250 км` (Warning)
- `Шины · Через 8 750 км` (Secondary)
- `Фильтр воздуха · OK через 12 400 км` (Success)

- [ ] **Step 6: Recent services section**

Section header `Последние записи` (Title S Secondary). 5 History rows. Trailing link `Посмотреть все →` (Brand) at the bottom.

- [ ] **Step 7: Monthly cost sparkline**

A Chart card (~360×140) showing 6 months as a sparkline + the current month value highlighted. Title `Расходы` + `За май: 450 000 UZS`.

- [ ] **Step 8: Tab bar at bottom (pinned)**

Position at bottom of artboard; same as 08. No tab active (this screen is reached from Гараж push, not a tab).

- [ ] **Step 9: Switch artboard to fit-content height**

`update_styles` with `height: "fit-content"`. If the screen overflows the initial 852, that's expected — vehicle detail is scrollable.

- [ ] **Step 10: Verify with screenshot + finish**

Check vertical rhythm, all 5 history rows render with tabular cost alignment, health gauge looks correct at 96px.

### Task 1.3: `12 · Тип услуги` (#12 — Service-type picker)

**Artboard:** `12 · Тип услуги` · 393×852
**Spec reference:** screen #12 (§4.D)

- [ ] **Step 1: Create artboard at x = 2246**

`create_artboard` with `{ "name": "12 · Тип услуги", "width": 393, "height": 852, "x": 2246, "y": 0 }`.

- [ ] **Step 2: Modal sheet styling**

Set background `#1C1F25` (Surface raised — sheet styling). Add a 32×4 pill grab-handle centered at top, 8px from top.

- [ ] **Step 3: Sheet header**

Below grab-handle: `Тип услуги` (Title M, centered) with a trailing `✕` close button on the right.

- [ ] **Step 4: Step indicator**

`2 из 4` (Caption Secondary) centered below the title.

- [ ] **Step 5: 14-tile grid**

2-column grid, 7 rows. Each tile 168×96 Surface (`#14161A`), radius 16, 16px gap. Each tile: 24px icon centered top, label centered below in Body. Russian labels exactly as spec §4.D #12:

`Масло` · `Шины` · `Тормоза` · `Фильтр воздуха` · `Фильтр масла` · `Фильтр салона` · `Аккумулятор` · `Диагностика` · `Кузов` · `Электрика` · `Подвеска` · `КПП` · `Двигатель` · `Прочее`.

Highlight `Масло` as selected (Brand-quiet fill + 1px Brand border + Brand-color icon).

- [ ] **Step 6: Sticky bottom CTA**

Full-width `Продолжить` Primary button (height 52) pinned 24px from bottom.

- [ ] **Step 7: Verify + finish**

Screenshot. Check the 14 tiles fit cleanly in 2 columns × 7 rows. Selected state is visibly distinct from default. CTA button doesn't overlap the last row.

### CHECKPOINT — Anchor review

- [ ] **Take screenshots of all 3 anchor screens** (`08`, `09`, `12`)

- [ ] **Present to user for hard review**

This is the spec-mandated checkpoint. If anchor screens feel right, the rest is mostly assembly. If they don't:
- Re-tune Foundations tokens
- Redo anchor screens
- Loop until aligned

Do NOT proceed to Phase 2 without explicit user OK.

---

## Phase 2 — Service-logging wizard end-to-end (4 screens)

Most-used path. Ships airtight.

Position screens at y = 932 (below anchor row, with 80px gap).

### Task 2.1: `05 · Пустой гараж` (#5 — Empty garage state)

**Artboard:** `05 · Пустой гараж` · 393×852
**Spec reference:** screen #5 (§4.B)

- [ ] **Step 1: Create artboard at x = 0, y = 932**

- [ ] **Step 2: Top app bar**

Just the greeting line `Привет, Сардор`.

- [ ] **Step 3: Center the Empty state molecule**

Use the Empty state molecule from Foundations: 64px car-outline icon, `Гараж пуст` title, body `Добавьте свой первый автомобиль, чтобы начать вести историю обслуживания.`, CTA `Добавить автомобиль` Primary 52px.

- [ ] **Step 4: Tab bar at bottom**

`Гараж` tab active (this IS the Garage tab, just empty).

- [ ] **Step 5: Verify + finish**

### Task 2.2: `11 · Выбор авто` (#11 — Pick vehicle for logging)

**Artboard:** `11 · Выбор авто` · 393×852
**Spec reference:** screen #11 (§4.D)

- [ ] **Step 1: Create artboard at x = 473, y = 932 (with 80px gap from Task 2.1)**

- [ ] **Step 2: Sheet styling (Surface raised) with grab-handle**

Same sheet pattern as Task 1.3.

- [ ] **Step 3: Sheet header**

Title: `Какой автомобиль?` (Title M). Step indicator `1 из 4`.

- [ ] **Step 4: Vehicle list**

Stack 2 Vehicle cards (using molecule). Each is tappable — highlight Cobalt as currently selected (Brand-quiet inner-fill + Brand 1px border).

- [ ] **Step 5: Bottom CTA**

`Продолжить` Primary 52px pinned bottom.

- [ ] **Step 6: Verify + finish**

### Task 2.3: `13 · Детали` (#13 — Service details form)

**Artboard:** `13 · Детали` · 393×852 (likely `height: fit-content` due to form length)
**Spec reference:** screen #13 (§4.D)

- [ ] **Step 1: Create artboard at x = 946, y = 932**

- [ ] **Step 2: Sheet styling with grab-handle + header**

Title: `Детали обслуживания` (Title M). Step indicator: `3 из 4`. Back chevron leading.

- [ ] **Step 3: Form fields stacked**

- `Пробег, км` — Number input prefilled `47 250` (mono), with helper text `Текущий: 47 250 км`
- `Стоимость` — Number input with `UZS` suffix, prefilled `350 000`
- `Заметки` — Multiline input (3 rows), placeholder `Например: Mobil 5W-30, синтетика, замена фильтра`
- `Мастер (необязательно)` — Single-line, placeholder `Имя мастера или СТО`
- `Фото (до 3)` — Photo upload UI: 3 dashed-border 100×100 squares, first one with `+` icon centered

- [ ] **Step 4: Bottom CTA**

`Продолжить` Primary 52px.

- [ ] **Step 5: Verify + finish**

Switch to `fit-content` height since form is long.

### Task 2.4: `14 · Готово` (#14 — Confirmation)

**Artboard:** `14 · Готово` · 393×852
**Spec reference:** screen #14 (§4.D)

- [ ] **Step 1: Create artboard at x = 1419, y = 932**

- [ ] **Step 2: Center a Success illustration block**

64px checkmark icon in Success-color circle background (Success-quiet fill). Title `Готово!` (Title L). Body `Замена масла записана на 47 250 км за 350 000 UZS.` (Body Primary, centered).

- [ ] **Step 3: Next reminder card**

A Surface card with Warning-tinted left border (3px). Inside:
- Label mono: `СЛЕДУЮЩЕЕ НАПОМИНАНИЕ`
- Body: `Замена масла`
- Body S Secondary: `Через 10 000 км (≈ 57 250 км) или 25 ноября 2026`

- [ ] **Step 4: CTAs**

Two stacked buttons:
- `Посмотреть запись` (Primary 52px)
- `Записать ещё` (Ghost 52px)

- [ ] **Step 5: Verify + finish**

---

## Phase 3 — Onboarding + history + costs (9 screens)

Position at y = 1864 (below Phase 2 row).

### Task 3.1: `01 · Splash` (#1)

**Artboard:** `01 · Splash` · 393×852 at x = 0, y = 1864.

- [ ] **Step 1: Create artboard, Canvas bg**

- [ ] **Step 2: Center АвтоЛог wordmark**

Display text `АвтоЛог` (centered, Brand color, semi-bold). Below in Caption Secondary: `История твоего авто — в одном месте`.

- [ ] **Step 3: Subtle loading indicator at bottom**

8×8 Brand dot pulsing (drawn static; motion implied).

- [ ] **Step 4: Verify + finish**

### Task 3.2: `02 · Выбор языка` (#2)

**Artboard:** `02 · Выбор языка` · 393×852 at x = 473, y = 1864.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top label `Выберите язык / Tilni tanlang`**

Title M.

- [ ] **Step 3: 3 language options as full-width list rows**

Each row: flag emoji (or country code chip) + language name + radio selection on right.
- `🇷🇺 Русский` (selected)
- `🇺🇿 O'zbekcha`
- `🇬🇧 English`

- [ ] **Step 4: Bottom CTA `Продолжить`**

- [ ] **Step 5: Verify + finish**

### Task 3.3: `03 · Знакомство` (#3)

**Artboard:** `03 · Знакомство` · 393×852 at x = 946, y = 1864.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top: 3-dot page indicator**

3 small horizontal pills, the first filled Brand, others Border subtle. Centered, 24px from top.

- [ ] **Step 3: Illustration block (placeholder)**

Centered 240×240 placeholder rectangle: Surface bg, radius lg 16, 1px dashed Border subtle, with a 64px car icon (Secondary color) centered and a small Label-mono caption `ILLUSTRATION` below the icon in Tertiary color. This block is explicitly a placeholder for a branded illustration added in a post-MVP pass — listed in spec §7 deferred.

- [ ] **Step 4: Slide content**

Title `Записывай каждое ТО` (Title L). Body `Замены масла, фильтры, шины — храни всю историю в одном месте.` (Body Primary centered).

- [ ] **Step 5: Bottom CTAs**

`Пропустить` (Ghost, left-aligned) + `Далее →` (Primary, right-aligned).

- [ ] **Step 6: Verify + finish**

Note: this is slide 1 of 3. Slides 2 + 3 would duplicate this with different copy:
- Slide 2: `Напомним, когда время` / `Получай уведомления по пробегу и времени.`
- Slide 3: `Продай дороже` / `Покажи покупателю полную историю — QR код или ссылка.`

For MVP design, build just Slide 1 fully and add a note in the spec mirror that the other two slides duplicate the layout with different copy.

### Task 3.4: `04 · Вход` (#4)

**Artboard:** `04 · Вход` · 393×852 at x = 1419, y = 1864.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Logo block at top (small wordmark)**

- [ ] **Step 3: Title block**

`Добро пожаловать` (Title L) centered. Body S Secondary: `Войдите через Telegram, чтобы синхронизировать историю.`

- [ ] **Step 4: Primary auth — Telegram button**

Full-width Primary 52px button with Telegram icon + text `Войти через Telegram`. Brand-colored.

- [ ] **Step 5: Secondary auth — phone**

Below Telegram, a "or" divider line with text `или` centered in Secondary color.

Then a Ghost 52px button `Войти по номеру телефона`.

- [ ] **Step 6: Footer**

Small Caption Tertiary text at bottom: `Продолжая, вы соглашаетесь с условиями и политикой конфиденциальности.`

- [ ] **Step 7: Verify + finish**

### Task 3.5: `06 · Марка и модель` (#6)

**Artboard:** `06 · Марка и модель` · 393×852 at x = 1892, y = 1864.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Sheet header with back chevron**

Title `Марка автомобиля` (Title M). Step `1 из 2`.

- [ ] **Step 3: Search input at top**

Single-line input with magnifier icon, placeholder `Поиск марки или модели`.

- [ ] **Step 4: Brand list (vertical scroll)**

List rows with leading brand logo (small monochrome SVG or placeholder rectangle) and brand name. Order per spec:
`Chevrolet` · `BYD` · `Chery` · `Haval` · `Hyundai` · `Kia` · `Toyota` · `Другое`.

Chevrolet is expanded showing models below as indented rows: `Cobalt`, `Lacetti`, `Gentra`, `Spark`, `Damas`, `Captiva`, `Tracker`, `Onix`, `Malibu`. Each model row tappable.

- [ ] **Step 5: Bottom CTA**

`Продолжить` Primary 52px (disabled until selection).

- [ ] **Step 6: Verify + finish**

### Task 3.6: `07 · Параметры авто` (#7)

**Artboard:** `07 · Параметры авто` · 393×852 (likely fit-content) at x = 2365, y = 1864.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Sheet header, step `2 из 2`**

Title `Параметры автомобиля`.

- [ ] **Step 3: Form fields**

- `Год выпуска` — Year picker (segmented or dropdown), `2020`
- `Тип топлива` — Chip group: `Бензин` (selected) · `Дизель` · `Метан` · `Пропан` · `Гибрид` · `Электро`
- `Гос. номер (необязательно)` — Single-line, placeholder `01 A 123 BA`
- `Текущий пробег, км` — Number input mono, placeholder `47 250`

- [ ] **Step 4: Bottom CTA**

`Добавить автомобиль` Primary 52px.

- [ ] **Step 5: Verify + finish**

### Task 3.7: `15 · История` (#15)

**Artboard:** `15 · История` · 393×852 (fit-content) at x = 0, y = 2796.

- [ ] **Step 1: Create artboard, Canvas bg**

- [ ] **Step 2: Top app bar**

Back chevron + title `История` (Title S). Right: filter icon.

- [ ] **Step 3: Vehicle picker chip**

Single chip near top: `Chevrolet Cobalt ▾` (tap to switch vehicle).

- [ ] **Step 4: Filter chips strip**

Horizontal scrollable chip row: `Все` (selected) · `Масло` · `Шины` · `Тормоза` · `Фильтры` · `Прочее`.

Below: a period segmented control `Месяц / Год / Всё время`.

- [ ] **Step 5: Search input**

Single-line with magnifier, placeholder `Поиск по заметкам`.

- [ ] **Step 6: Grouped history list**

Section header `Май 2026` (Title S Secondary) + 4 History rows.
Section header `Апрель 2026` + 3 History rows.
Section header `Март 2026` + 2 History rows.

- [ ] **Step 7: Tab bar (История active)**

- [ ] **Step 8: Verify + finish**

### Task 3.8: `16 · Запись` (#16)

**Artboard:** `16 · Запись` · 393×852 (fit-content) at x = 473, y = 2796.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `Замена масла`, overflow menu trailing**

- [ ] **Step 3: Hero block**

Centered service-type icon (large, 64px in Brand-quiet circle). Below: `350 000 UZS` (Display mono Primary). Below: `25 мая 2026 · 47 250 км` (Body S Secondary).

- [ ] **Step 4: Details list**

Surface card with rows:
- `Тип услуги` → `Замена масла`
- `Дата` → `25 мая 2026`
- `Пробег` → `47 250 км` (mono)
- `Стоимость` → `350 000 UZS` (mono)
- `Мастер` → `СТО Бунёдкор, Анвар-ака`

Each row: label left (Secondary), value right (Primary), 1px divider between.

- [ ] **Step 5: Notes block**

Section `Заметки`. Body text card: `Mobil 5W-30, синтетика. Заменили также прокладку поддона.`

- [ ] **Step 6: Photo strip**

3 photo thumbs in a row (each 100×100, radius 12). Tap → lightbox (no need to design lightbox separately for MVP).

- [ ] **Step 7: Bottom action row**

Two ghost buttons: `Редактировать` · `Удалить` (Danger).

- [ ] **Step 8: Verify + finish**

### Task 3.9: `17 · Расходы` (#17)

**Artboard:** `17 · Расходы` · 393×852 (fit-content) at x = 946, y = 2796.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `Расходы`**

- [ ] **Step 3: Period segmented control**

`Месяц` (selected) / `Год` / `Всё время`.

- [ ] **Step 4: KPI tiles strip**

3 tiles stacked vertically (or 2-column grid), full width:
- `Итого: 450 000 UZS` · `↑ 12% к апрелю` (Warning)
- `Среднее в месяц: 387 500 UZS`
- `Стоимость за км: 24 UZS`

- [ ] **Step 5: Donut chart card**

`По категориям` header. Donut chart with 5 segments + legend.

- [ ] **Step 6: Line chart card**

`Тренд` header. 6-month line chart of monthly spend.

- [ ] **Step 7: Top services ranked**

Section `Самые дорогие записи`. 5 History rows showing the highest-cost services in the period.

- [ ] **Step 8: Tab bar (no tab active — pushed screen)**

- [ ] **Step 9: Verify + finish**

---

## Phase 4 — Reminders + share + settings (9 screens)

Position at y = 3728.

### Task 4.1: `10 · Уведомления` (#10)

**Artboard:** `10 · Уведомления` · 393×852 (fit-content) at x = 0, y = 3728.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `Уведомления`**

- [ ] **Step 3: Filter strip**

Chips: `Все` (selected) · `Напоминания` · `Записи` · `Ссылки`.

- [ ] **Step 4: Grouped feed**

Section `Сегодня` + 2 rows:
- `🔔 Замена масла через 1 250 км · Chevrolet Cobalt` (Warning)
- `✓ Запись сохранена · Замена масла, 350 000 UZS` (Success)

Section `Вчера` + 1 row:
- `🔗 Кто-то открыл вашу ссылку (3 раза)` (Secondary)

Section `На этой неделе` + 2 more.

Each row: leading 24px icon, middle content (Body + Caption Secondary date), trailing time stamp small Caption Tertiary.

- [ ] **Step 5: Tab bar (no tab active)**

- [ ] **Step 6: Verify + finish**

### Task 4.2: `18 · Напоминания` (#18)

**Artboard:** `18 · Напоминания` · 393×852 (fit-content) at x = 473, y = 3728.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `Напоминания`, vehicle picker chip below**

- [ ] **Step 3: 3 grouped sections of Reminder rows**

- Section `Просрочено` (Danger label) + 1 row: `Фильтр салона · Просрочено на 1 200 км` (Danger)
- Section `Скоро` (Warning label) + 2 rows: `Замена масла · Через 1 250 км` (Warning), `Тормоза · Через 1 800 км` (Warning)
- Section `Запланировано` + 3 rows: shines, plugs, etc.

Each row has trailing snooze + done icon buttons.

- [ ] **Step 4: FAB-less — `+ Своё напоминание` ghost button at bottom of list**

- [ ] **Step 5: Tab bar (Гараж tab — secondary path)**

- [ ] **Step 6: Verify + finish**

### Task 4.3: `19 · Напоминание` (#19)

**Artboard:** `19 · Напоминание` · 393×852 at x = 946, y = 3728.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, back chevron, overflow trailing**

- [ ] **Step 3: Hero block**

Centered: large icon (64px Warning-tinted), `Замена масла` Title L centered, `Chevrolet Cobalt` Body S Secondary.

Big mono countdown: `1 250 км` (Display) below.

- [ ] **Step 4: Details card**

Surface card:
- `Срок` → `25 мая 2026` (or `1 250 км`)
- `Интервал` → `Каждые 10 000 км или 6 месяцев`
- `Стоимость (оценка)` → `300 000 – 500 000 UZS`

- [ ] **Step 5: Action buttons stacked**

- `Записать сейчас` (Primary)
- `Отложить` (Ghost) — opens snooze sheet (#sheet)
- `Изменить` (Ghost)
- `Удалить` (Ghost Danger text)

- [ ] **Step 6: Verify + finish**

### Task 4.4: `20 · Поделиться` (#20)

**Artboard:** `20 · Поделиться` · 393×852 (fit-content) at x = 1419, y = 3728.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `Поделиться историей`, back**

- [ ] **Step 3: Vehicle summary card**

Surface card: thumb + `Chevrolet Cobalt · 2020` + `12 записей · общая стоимость 1 450 000 UZS`.

- [ ] **Step 4: Expiry chooser**

Section header `Срок действия ссылки`. 4 chips (single-select): `24 часа` · `7 дней` (selected) · `30 дней` · `Без ограничений`.

- [ ] **Step 5: Generated link card**

Once "generated" state — show the QR card molecule with QR + short URL + copy icon button + expiry chip.

- [ ] **Step 6: Share-via row**

Buttons in a row: `Скопировать` · `Telegram` · `WhatsApp` · `Ещё`.

- [ ] **Step 7: Verify + finish**

### Task 4.5: `21 · Предпросмотр` (#21)

**Artboard:** `21 · Предпросмотр` · 393×852 (fit-content) at x = 1892, y = 3728.

This is the **buyer-facing** public view rendered at mobile size. Lives in a phone frame but represents a web page.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top banner — "Вы просматриваете публичную историю"**

Yellow Warning-quiet strip 32px tall with Caption text + close X.

- [ ] **Step 3: Vehicle hero block (light feel, even on dark canvas)**

Large vehicle thumb + `Chevrolet Cobalt · 2020` (Title L) + `47 250 км · бензин · 01 A 123 BA` (Body S Secondary).

- [ ] **Step 4: Trust card**

Surface card with 3 stats in a row:
- `12` записей
- `2 года` истории
- `1 450 000 UZS` потрачено

- [ ] **Step 5: Timeline (chronological reverse)**

Compact timeline of last 12 services. Each entry: date · service type · mileage · cost · photo dot. Group by month.

- [ ] **Step 6: AvtoLog footer CTA**

Large bottom block: АвтоЛог wordmark + `Веди свою машину в АвтоЛоге` + Primary button `Скачать приложение`.

- [ ] **Step 7: Verify + finish**

### Task 4.6: `22 · Мои ссылки` (#22)

**Artboard:** `22 · Мои ссылки` · 393×852 at x = 2365, y = 3728.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `Мои ссылки`, back**

- [ ] **Step 3: Links list**

For each active link, a Surface card:
- Vehicle name + plate
- Short URL (mono) + copy icon
- Stats row: `247 просмотров · 5 дней осталось`
- Trailing: overflow menu with `Открыть`, `Скопировать`, `Деактивировать`

Show 3 cards stacked.

- [ ] **Step 4: Empty state variant (optional, in a separate duplicate frame later)**

- [ ] **Step 5: Verify + finish**

### Task 4.7: `23 · Профиль` (#23)

**Artboard:** `23 · Профиль` · 393×852 at x = 2838, y = 3728.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `Профиль`**

- [ ] **Step 3: Avatar + name block centered**

96px Avatar (initials `СА`), name `Сардор Аллабергaнов` (Title L), Telegram handle `@sardor_a` (Body S Secondary).

- [ ] **Step 4: Info list (Surface card with rows)**

- `Язык` → `Русский` →
- `Часовой пояс` → `Asia/Tashkent` →
- `Дата регистрации` → `15 марта 2026`
- `План` → `Бесплатный`

- [ ] **Step 5: Tab bar (Профиль active)**

- [ ] **Step 6: Verify + finish**

### Task 4.8: `24 · Настройки` (#24)

**Artboard:** `24 · Настройки` · 393×852 (fit-content) at x = 3311, y = 3728.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `Настройки`, back**

- [ ] **Step 3: Sections of grouped list rows**

Group `Уведомления`:
- `Push-уведомления` → Switch (on)
- `Email` → Switch (off)
- `Время напоминаний` → `09:00 утра` →

Group `Данные`:
- `Единицы` → `Километры` (locked)
- `Валюта` → `UZS` (locked)
- `Экспорт данных (CSV)` →

Group `Аккаунт`:
- `Изменить язык` → `Русский` →
- `Конфиденциальность` →
- `Выйти` (Body, no chevron)
- `Удалить аккаунт` (Danger color, no chevron)

- [ ] **Step 4: Verify + finish**

### Task 4.9: `25 · О приложении` (#25)

**Artboard:** `25 · О приложении` · 393×852 at x = 3784, y = 3728.

- [ ] **Step 1: Create artboard**

- [ ] **Step 2: Top app bar, title `О приложении`, back**

- [ ] **Step 3: Logo block centered**

АвтоЛог wordmark + version `Версия 1.0.0`.

- [ ] **Step 4: Info card with rows**

- `Поддержка` → `@avtolog_support`
- `Сообщить о проблеме` →
- `Условия использования` →
- `Политика конфиденциальности` →
- `Лицензии` →

- [ ] **Step 5: Footer**

Caption Tertiary centered at bottom: `© 2026 АвтоЛог. Сделано в Ташкенте.`

- [ ] **Step 6: Verify + finish**

---

## Phase 5 — Sheets + state variants

Position at y = 4660.

### Task 5.1: Sheet — `Редактировать авто`

**Artboard:** `S1 · Редактировать авто` · 393×640 (sheet height, not full screen) at x = 0, y = 4660.

- [ ] **Step 1: Create artboard, Surface raised bg, grab-handle, header `Редактировать авто`, close X**

- [ ] **Step 2: Form fields matching `07 · Параметры авто` (year, fuel, plate, mileage), pre-filled**

- [ ] **Step 3: Bottom CTA `Сохранить` (Primary 52px)**

- [ ] **Step 4: Verify + finish**

### Task 5.2: Sheet — `Редактировать запись`

**Artboard:** `S2 · Редактировать запись` · 393×720 at x = 473, y = 4660.

- [ ] **Step 1: Create artboard, sheet styling**

- [ ] **Step 2: Form fields matching `13 · Детали`, pre-filled with the record data**

- [ ] **Step 3: Bottom CTAs: `Сохранить` (Primary) + `Удалить запись` (Danger text Ghost)**

- [ ] **Step 4: Verify + finish**

### Task 5.3: Alert — `Удалить?`

**Artboard:** `S3 · Удалить?` · 393×280 at x = 946, y = 4660.

- [ ] **Step 1: Create artboard, centered alert card (Surface raised, radius xl 24, max 320 wide)**

- [ ] **Step 2: Content**

- Icon: trash 32px Danger
- Title: `Удалить запись?` (Title S)
- Body: `Это действие нельзя отменить. Запись «Замена масла» будет удалена навсегда.` (Body S Secondary)

- [ ] **Step 3: Action row**

Two buttons side by side, equal width:
- `Отмена` (Ghost)
- `Удалить` (Destructive Danger fill)

- [ ] **Step 4: Verify + finish**

### Task 5.4: Sheet — `Отложить напоминание`

**Artboard:** `S4 · Отложить` · 393×440 at x = 1419, y = 4660.

- [ ] **Step 1: Create artboard, sheet styling, header `Отложить напоминание`**

- [ ] **Step 2: 4 options as full-width list rows with radio**

- `На 1 день`
- `На 3 дня`
- `На 7 дней`
- `Выбрать дату` →

- [ ] **Step 3: Bottom CTA `Подтвердить` (Primary)**

- [ ] **Step 4: Verify + finish**

### Task 5.5: State variants for data screens

Position at y = 5300.

For each of the 4 data-heavy screens — `Гараж` (#8), `История` (#15), `Напоминания` (#18), `Расходы` (#17) — produce 2 additional variants beyond the populated one:

- [ ] **Step 1: Duplicate the populated artboard for each, name it `<original> · empty`**

Tool: `duplicate_nodes` per artboard.
Then clear the data zone and drop in the Empty state molecule with screen-appropriate copy:
- Гараж empty: covered by `05 · Пустой гараж` already — skip
- История empty: title `Пока нет записей`, body `Запишите первое обслуживание, чтобы увидеть историю.`, CTA `Записать`
- Напоминания empty: title `Нет активных напоминаний`, body `Когда подойдёт время ТО, мы напомним.`, CTA `Записать ТО`
- Расходы empty: title `Расходы появятся позже`, body `Запишите несколько обслуживаний, чтобы увидеть аналитику.`, CTA `Записать`

- [ ] **Step 2: Duplicate the populated artboard for each, name it `<original> · loading`**

Replace the populated content area with Skeleton atoms — 5 stacked Skeleton bars (361×72 each) for History/Reminders, or a Skeleton placeholder for KPI tiles and chart cards.

- [ ] **Step 3: Verify + finish each variant**

State variants are now complete. Error states (`<original> · error`) can be added later — for MVP design sign-off, empty + loading are sufficient.

---

## Sign-off

### Task 6.1: Full screenshot pass

- [ ] **Step 1: For each of the 25 main screens + 4 sheets + state variants, take a screenshot**

Tool: `get_screenshot` per artboard.
Save IDs / arrange screenshots in a review document.

- [ ] **Step 2: Walk the spec acceptance criteria (§6)**

For each screen:
- iPhone 16 Pro frame (393×852)?
- Russian copy, no Lorem?
- Realistic data?
- Foundation tokens referenced (not hardcoded)?
- Tab bar middle CTA present on main-flow screens?

Mark any screen that fails and queue a fix-up pass.

### Task 6.2: User review

- [ ] **Step 1: Present full screenshot deck to user**

- [ ] **Step 2: Collect feedback, fix any flagged issues**

- [ ] **Step 3: Get final sign-off**

### Task 6.3: Wrap-up

- [ ] **Step 1: Commit the plan as completed**

Update task status in your task list, and commit any plan or spec edits made during the build.

```bash
git add docs/superpowers/specs/2026-05-25-avtolog-mobile-design.md
git add docs/superpowers/plans/2026-05-25-avtolog-mobile-design-build.md
git commit -m "docs(avtolog): finalize mobile design — all 25 screens + 4 sheets built in Paper"
```

- [ ] **Step 2: Mirror finalized spec changes to Obsidian vault if any updates were made during build**

- [ ] **Step 3: Note remaining work in spec §7 (Open Decisions Deferred Past MVP) for the next iteration**

---

## Notes for the Executor

- **Russian copy:** every UI string must be in Russian. Refer to spec §4 for canonical labels. Do not invent translations — match the spec's strings exactly so the Telegram bot strings (in MVP plan locales) can be reused.
- **Tabular numerics:** any number that appears in a list, KPI, or comparison must use mono tabular figures. Verify alignment in `get_screenshot` reviews.
- **No drop shadows:** every elevation is achieved via background lift + 1px Border subtle. If you find yourself reaching for box-shadow, you are off-spec.
- **Touch targets:** every interactive element should look ≥ 44px tall in screenshots.
- **Use existing tokens:** every color and font-size used in screens must trace back to a value defined on the Foundations artboard. If you need a new value, add it to Foundations first.
- **Iterate small:** build one task, screenshot, verify, then move to the next. Do not batch 5 screens then check — Paper drift compounds.
- **Spec is the source of truth:** if this plan and the spec disagree, the spec wins. If the spec is wrong, fix it before continuing.
