# Intl P2P — Unified Flow · Build Spec

Goal: rebuild the International P2P screen flow to match the approved schema
(FigJam section "International P2P flows", node `10831:32916`) and add the
missing screens. Gap analysis: [Intl_P2P_gap_analysis.md](./Intl_P2P_gap_analysis.md).

**File:** `QkpqlWpm90oZUxre2L9gqB` (Unired — v4.0 Project)
**Target page:** Transfers (canvas `10796:11296`)

## Approved decisions (2026-06-10)

1. **Style:** new 390×844 redesign language (anchor frames `10796:53295`,
   `10796:122635`, style ref `10796:53307`). Ice-blue background, card-per-item,
   floating dark pill controls, navy text.
2. **Placement:** NEW section on the Transfers page; existing corridor screens
   stay untouched.
3. **Scope:** one generic flow parameterized by method (card / phone / wallet /
   bank / cash) — not per-corridor. 30 frames.

## Schema → flow (what the screens must encode)

S2 country → S3 KYC gate (only if unidentified) → S4 method (5 options) →
S5 amount split by "UZB user?" (UZB: sender card + balance check; foreign: no
sender card) → S6 recipient details per method → S7 pre-check → S8 OTP (UZB)
or payment Form (foreign) + switch-payment-method → S9 receipt (success /
error / hold).

## Canvas placement

New section: **"Intl P2P — Unified Flow (Schema v1)"**
Position `x = -26656, y = -2100` (directly below the schema section, which ends
at y = -2448). Size ≈ 6400 × 3100. Stage columns left→right, states stacked
vertically inside a stage column, 80px gutters, stage label text above each
column group. Nothing else occupies this canvas area.

## Design DNA (refine via live harvest in Phase 1)

From anchors `10796:53295` / `10796:122635` / `10796:53307`:

- Frame 390×844, light theme, pale ice-blue bg (~#E9F1F6)
- Inline header: back arrow + LEFT-aligned dark-navy title, no bar fill
- Every list item = its own white card, 16–20 radius, flat, 16px padding, ~10px gaps
- Dark-navy (#0E1B4D-ish) primary text, gray secondary, dot-separated metadata
- Floating near-black pill controls docked at bottom (search bar / CTA);
  explicit gray disabled CTA state
- Inputs: filled pale gray-blue rounded fields, label above, no outlines
- Circular flag avatars; light-blue rounded-square icon tiles
- iOS status bar (9:41) + home indicator on every frame

Phase 1 agent MUST harvest exact values (colors, corner radii, text styles,
variables if any) from the anchor frames via `get_design_context` /
`get_variable_defs` and record them in this file under "Harvested DNA".

**Reusable library components** (from Unired_library_audit.md): Country Flags
(96), Transfer Flags (13), Payment System Logos (26), Korean Bank Logos (54),
Stamp (6 — cheque overlays), Loader (8), Card Input (9). Prefer instances over
redrawing; if a library component clashes with the new DNA, redraw in DNA style.

## Canonical sample data (use EVERYWHERE — fixes current mock inconsistencies)

- Sender: **Asadbek Abdujalilov**, card `9860 12•• •••• 1456` (NBU · Humo),
  balance **987 654,32 UZS**
- Recipient: **Qodirov Rustam**, phone **+996 900 456 789**,
  card `2221 77•• •••• 0994`, bank **Optima Bank** (KG)
- Destination sample: **Qirg'iziston** (KG); currency **USD**
- Amount: **100 USD**; rate **1 USD = 12 650,00 UZS**;
  commission **0,5% — 6 325 UZS**; total debit **1 271 325 UZS**
- Foreign-sender sample: sender in Rossiya, pays **8 745 RUB** for 100 USD
- Date: **10.06.2026, 14:30**. OTP phone: `+998 99 *** ** 90`
- ALL copy in Uzbek (Latin). No Russian placeholders, no English labels.

## Screen map — 30 frames

Frame naming: `Intl P2P / <NN Stage> / <State>`.

### Stage 01 · Country (S2) — duplicates, 2 frames
| Frame | Content |
|---|---|
| `01 Country / Idle` | DUPLICATE of `10796:53295`, renamed |
| `01 Country / Search` | DUPLICATE of `10796:122635`, renamed |

### Stage 02 · KYC (S3) — 2 frames
Title "Shaxsiy ma'lumotlar". Blue info banner: "Xalqaro o'tkazmalar uchun
shaxsiy ma'lumotlaringiz talab qilinadi. Ma'lumotlar profilingizga saqlanadi."
Inputs (label above, filled style): Ism · Familiya · Pasport seriyasi va
raqami · Tug'ilgan sana (calendar icon). CTA "Keyingisi".
| Frame | State |
|---|---|
| `02 KYC / Empty` | empty inputs, disabled CTA |
| `02 KYC / Filled` | Mirjamol / Bekhzod / AS 1234567 / 07.10.1998, enabled CTA |

### Stage 03 · Method (S4) — 2 frames  ← NEW canonical screen, didn't exist
Header "Qirg'izistonga o'tkazma". Heading "O'tkazma usulini tanlang".
5 method cards (icon tile + title + subtitle + chevron):
1. **Karta raqami orqali** — "Qabul qiluvchining karta raqamiga"
2. **Telefon raqami orqali** — "Raqamga bog'langan karta yoki hamyonga"
3. **Hamyonga o'tkazma** — "Alipay, WeChat va boshqa hamyonlarga"
4. **Bank hisobiga** — "Bank hisob raqamiga o'tkazma"
5. **Naqd pul o'tkazmasi** — "Qabul qiluvchi naqd pul olib ketadi"
| Frame | State |
|---|---|
| `03 Method / Default` | all 5 enabled |
| `03 Method / Unavailable` | Hamyon + Naqd pul grayed, sub "Bu davlat uchun mavjud emas" |

### Stage 04 · Amount (S5) — 6 frames
Header "Qirg'izistonga o'tkazma". Sender-card row (white card: card art chip,
balance, `••1456 | NBU · Humo`, chevron). Amount input + USD dropdown, quick
chips +10/+20/+50/+100. FX/fee card: "Valyuta kursi · 1 USD = 12 650,00 UZS" /
"Komissiya · 0,5% — 6 325 UZS" / "Qabul qiladi · 100 USD". CTA "Keyingisi".
| Frame | State |
|---|---|
| `04 Amount / UZB sender / Empty` | placeholder amount, disabled CTA |
| `04 Amount / UZB sender / Filled` | 100 USD, computed fee/total, enabled CTA |
| `04 Amount / Card picker sheet` | bottom sheet "Kartani tanlang", 3 cards w/ balances, check on selected |
| `04 Amount / Insufficient balance` | amount 2 000 USD, red field + "Mablag' yetarli emas. Kartani o'zgartiring yoki miqdorni kamaytiring", secondary CTA "Kartani almashtirish" |
| `04 Amount / Foreign sender / Empty` | NO sender card row; info chip "Yuboruvchi: Rossiya"; amount RUB |
| `04 Amount / Foreign sender / Filled` | 8 745 RUB filled, FX 1 USD = 87,45 RUB, enabled CTA |

### Stage 05 · Recipient (S6) — 8 frames
Header "Qabul qiluvchi ma'lumotlari".
| Frame | Content |
|---|---|
| `05 Recipient / Card / Empty` | input "Karta raqamini kiriting" + scan icon, recents chips •0994 •7890 |
| `05 Recipient / Card / Resolved` | card filled, resolved chip: Qodirov Rustam · Optima Bank logo |
| `05 Recipient / Card / Error` | red field + "Karta raqami noto'g'ri kiritildi" |
| `05 Recipient / Phone / Empty` | phone input KG flag +996, contacts icon, recents |
| `05 Recipient / Phone / Wallet sheet` | sheet "Hamyonni tanlang": "Ushbu raqamga bog'langan hamyonlar" (WeChat, Alipay ✓) / "Boshqa hamyonlar"; CTA "Tasdiqlash" |
| `05 Recipient / Bank / Empty` | dropdown "Bankni tanlang", input "Hisob raqami", dropdowns "O'tkazma maqsadi", "Mablag' manbai" |
| `05 Recipient / Bank / Selector sheet` | sheet "Bankni tanlang" + search + bank rows w/ logos, ✓ on Optima Bank |
| `05 Recipient / Cash / Empty` | "Ismi", "Familiyasi", phone +996; banner "Qabul qiluvchi pasport bilan istalgan filialdan naqd pul olishi mumkin" |

### Stage 06 · Pre-check (S7) — 2 frames  ← unified template, replaces 7 inconsistent variants
Title "O'tkazmani tekshiring". White summary card, dotted-leader rows:
Qabul qiluvchi · Karta raqami · O'tkazma miqdori (100 USD) · Valyuta kursi ·
Komissiya (0,5% — 6 325 UZS) · **Jami yechiladi: 1 271 325 UZS** · Sana.
CTA "O'tkazmani tasdiqlash".
| Frame | State |
|---|---|
| `06 Pre-check / UZB sender` | + sender-card row with chevron (switch affordance) above CTA |
| `06 Pre-check / Foreign sender` | no sender row; note "To'lov keyingi qadamda amalga oshiriladi" |

### Stage 07 · Confirm (S8) — 4 frames
| Frame | Content |
|---|---|
| `07 Confirm / OTP / Empty` | "Tasdiqlash kodi" + "+998 99 *** ** 90 raqamiga yuborilgan kodni kiriting", amount banner "O'tkazma summasi: 100 USD ~ 1 265 000 UZS", 6 cells, "Qayta yuborish 00:57" disabled |
| `07 Confirm / OTP / Error` | red cells + "Kod noto'g'ri. Qayta urinib ko'ring" ← didn't exist anywhere |
| `07 Confirm / Foreign form` | "To'lov ma'lumotlari": Karta raqami / Amal qilish muddati / CVC, CTA "To'lash · 8 745 RUB", note "3-D Secure orqali himoyalangan" ← replaces "Web View ochiladi" placeholder |
| `07 Confirm / Switch method sheet` | sheet "To'lov usulini almashtirish": Saqlangan karta ✓ / Yangi karta / Bank ilovasi orqali ← schema requires, didn't exist |

### Stage 08 · Receipt (S9) — 4 frames
Cheque card (white, dashed perforation, Unired wordmark, amount `100 USD`,
status chip + datetime, dotted rows: "So'mdagi miqdor · 1 265 000 UZS",
"Komissiya · 0,5% — 6 325 UZS", "Yuboruvchi · Asadbek Abdujalilov",
"Qabul qiluvchi · Qodirov Rustam", "Qabul qiluvchi raqami · +996 900 456 789",
"To'lov ID · p2p_9876543210123"). Stamp overlays from library. Action rail
(Saqlash / Tafsilotlar / Takrorlash) + Share/close buttons. ALL Uzbek.
| Frame | State |
|---|---|
| `08 Receipt / Success` | "Muvaffaqiyatli" green, APPROVED stamp |
| `08 Receipt / Error` | "Rad etildi" red, REJECTED stamp, banner "O'tkazma amalga oshmadi. Bank tomonidan rad etildi", CTA "Boshqa usul bilan urinish" ← retry CTA didn't exist |
| `08 Receipt / Hold` | "Jarayonda" yellow, no stamp, banner + CTA "O'tkazma holatini tekshirish" |
| `08 Receipt / Cash success` | success + highlighted row "Pul olish kodi (MTCN) · 12 345 678" ← didn't exist |

## Build phases

| Phase | Scope | Frames |
|---|---|---|
| P1 anchor | Harvest DNA → create section + stage labels → duplicate 01 ×2 → build 02 KYC ×2, 03 Method ×2 | 6 |
| P2 | 04 Amount ×6 | 6 |
| P3 | 05 Recipient ×8 | 8 |
| P4 | 06 Pre-check ×2 + 07 Confirm ×4 | 6 |
| P5 | 08 Receipt ×4 | 4 |
| P6 QA | Screenshot sweep vs this spec, fix deviations | — |

Each phase: one figma-builder run. Later phases copy an existing built frame
as the starting template (header/CTA/status bar already correct), then edit.

## Harvested DNA (filled by Phase 1)

Harvested from anchor frames `10796:53295` (Country / Idle), `10796:122635`
(Country / Search), `10796:53307` (Cards / Add Cards) via `get_design_context`
+ `get_variable_defs` on 2026-06-10.

### Colors (token name → resolved hex)
| Token | Hex | Usage |
|---|---|---|
| `bg/main` | `#f2f3f4` | Screen background |
| `bg/elevated` | `#ffffff` | Cards, input backgrounds raised |
| `bg/state/info` | `#eaf3ff` | Gradient top stop, info banners |
| `bg/muted` | `#e5e7eb` | Disabled CTA background |
| `text/main` | `#0f172a` | Primary text, nav title, card headings |
| `text/secondary` | `#556379` | Subtitles, input labels, metadata |
| `text/disable` | `#9ca3af` | Placeholder text, disabled CTA label |
| `primary/main` | `#1c1c1c` | Enabled CTA pill, home indicator bar |
| `primary/disable` | `#9cb5c9` | Flag border ring |
| Interactive accent | `#438BFA` | Info icon, info text, banner fill, icon tiles |

### Background treatment
Gradient: linear, top→down, `bg/state/info` (#eaf3ff) at 0% → `bg/main`
(#f2f3f4) at 30%, remainder stays `bg/main`. Applied to every screen frame fill.

### Typography
| Style name | Family | Style | Size | Weight | Line-height |
|---|---|---|---|---|---|
| `text-lg/medium` | Text (Clash Display) | Medium | 18px | 500 | 100% |
| `text-md/medium` | Text (Clash Display) | Medium | 16px | 500 | 150% |
| `text-sm/medium` | Text (Clash Display) | Medium | 14px | 500 | 100% |
| `text-xs/regular` | Text (Clash Display) | Regular | 12px | 400 | 100% |
| `text-md/regular` | Text (Clash Display) | Regular | 16px | 400 | 150% |
| `text-sm/regular` | Text (Clash Display) | Regular | 14px | 400 | 100% |
| Status bar time | SF Pro Display | Semibold | 15px | — | normal |

**Note on font family:** The `Text` variable resolves to `Clash Display` at
runtime. In `use_figma` scripts use `Geologica` (the live available equivalent)
until Clash Display is manually swapped in, per DS convention.

### Spacing tokens (all in px)
`spacing-4=4`, `spacing-8=8`, `spacing-12=12`, `spacing-16=16`, `spacing-20=20`,
`spacing-24=24`, `spacing-40=40`, `spacing-48=48`, `spacing-56=56`, `spacing-64=64`

### Component measurements
- Frame: `390 × 844` (iOS, no safe-area offset in frame itself)
- Status bar height: `43px` (Top Label, contains 9:41 + status icons at 68×11px)
- Navbar height: `56px` (min-h), paddingH `16px`, gap `12px`; back arrow 24×24px
- Country list item card: `h=64px`, radius `16px`, padding `12px`, gap `12px`
- Country flag avatar: `40×40px`, circular, border `primary/disable`
- Input field: `h=48px`, radius `16px`, fill `bg/main`, paddingH `16px`
- Input label: above field, font `text-sm/medium`, color `text/secondary`, indent `8px`
- CTA enabled: `h=48px`, radius `24px`, fill `primary/main (#1c1c1c)`, text white `text-md/medium`
- CTA disabled: same shape, fill `bg/muted (#e5e7eb)`, text `text/disable`
- Search pill (bottom docked): `h=48px`, radius `24px`, fill `primary/main`; on
  Country/Search variant the pill floats above keyboard
- Home indicator bar: `139×5px`, radius `100px`, fill `primary/main`, y offset `21px`
  within `34px` home indicator frame
- Card gap (list): `8px`; body container padding: `16px` H, `12px` V
- Country item gap (inner): `12px`

### Effects
- Card shadow: `DROP_SHADOW, rgba(0,0,0,0.08), offset (0,1), radius 4, spread 0`

### iOS chrome
- Status bar: `43px`, no background fill (transparent over gradient)
- Home indicator: `34px` frame at y=810 within the 844px frame

## Build log (Phase 1 — 2026-06-10)

### Section
| Key | Value |
|---|---|
| Section node ID | `10843:39091` |
| Name | Intl P2P — Unified Flow (Schema v1) |
| Canvas position | x=-26656, y=-2100 |
| Size | 6400 × 3100 |
| Fill | Solid `rgba(239,242,245,1)` (light blue-gray, consistent with other sections) |
| Stage label IDs | `10843:39092` … `10843:39099` (8 labels, Geologica Regular 13px) |

### Frames created
| Name | Node ID | Notes |
|---|---|---|
| `Intl P2P / 01 Country / Idle` | `10844:39091` | Clone of `10796:53295`; originals untouched |
| `Intl P2P / 01 Country / Search` | `10844:39112` | Clone of `10796:122635`; originals untouched |
| `Intl P2P / 02 KYC / Empty` | `10847:39459` | Built from scratch per DNA; 4 empty inputs; disabled CTA |
| `Intl P2P / 02 KYC / Filled` | `10848:39459` | Clone of Empty; filled: Mirjamol/Bekhzod/AS 1234567/07.10.1998; enabled dark pill CTA |
| `Intl P2P / 03 Method / Default` | `10849:39459` | New canonical screen; 5 method cards all enabled |
| `Intl P2P / 03 Method / Unavailable` | `10850:39459` | Clone of Default; Hamyon + Naqd pul grayed, subtitle "Bu davlat uchun mavjud emas" |

### Deviations / decisions
1. **Font substitution:** Figma runtime has `Geologica` available (not `Clash
   Display` directly in the plugin namespace). All new frames use `Geologica`
   family. The Phase 1 builder noted where Clash Display would be used — the
   nav title, headings, and card titles. Manual font swap is required before
   final QA (Phase 6).
2. **Status bar icons:** Rendered as a `68×11 Rectangle` with 30% opacity fill
   (no actual icon glyphs) because SF Pro symbols are not available in the
   plugin context. The cloned Country frames retain the real status icon
   instances from the library. Same approach used in `02 KYC` and `03 Method`
   built frames — acceptable for mock fidelity, matches anchor pattern.
3. **Back arrow:** Represented as a small 10×16 rounded rectangle (no actual
   chevron icon glyph) in the built frames. Cloned Country frames retain real
   back-arrow instances.
4. **Info icon in banner:** Rendered as a 20×20 filled ellipse in `#438BFA` —
   no actual `ⓘ` glyph because icon library components require import by key
   which is outside Phase 1 scope.
5. **Method card icons:** 20×20 ellipse dots in `#438BFA` on light blue tile —
   placeholder for actual method-specific icons (card, phone, wallet, bank,
   cash). Phase P3 builder should replace with library icon instances.
6. **Stage column grid:** 8 stage labels placed at column x offsets
   `80 + i*(390+80)`. Frames in col-01 start y=100, col-02 frames stacked
   vertically with 60px gap per spec.

## Build log (Phase 2 — 2026-06-10)

### Frames created
| Name | Node ID | Canvas position (section-relative) |
|---|---|---|
| `Intl P2P / 04 Amount / UZB sender / Empty` | `10860:39459` | x=1490, y=100 |
| `Intl P2P / 04 Amount / UZB sender / Filled` | `10864:39459` | x=1490, y=1004 |
| `Intl P2P / 04 Amount / Card picker sheet` | `10867:39459` | x=1960, y=100 |
| `Intl P2P / 04 Amount / Insufficient balance` | `10869:39459` | x=1960, y=1004 |
| `Intl P2P / 04 Amount / Foreign sender / Empty` | `10870:39459` | x=2430, y=100 |
| `Intl P2P / 04 Amount / Foreign sender / Filled` | `10871:39459` | x=2430, y=1004 |

### Stage label positions updated
Stage 04 uses two columns (x=1490 and x=1960), so downstream labels were shifted right by one column pitch (470px):
| Label | Old x | New x |
|---|---|---|
| 05 · Qabul qiluvchi (S6) | 1960 | 2900 |
| 06 · Tekshirish (S7) | 2430 | 3370 |
| 07 · Tasdiqlash (S8) | 2900 | 3840 |
| 08 · Chek (S9) | 3370 | 4310 |

### Deviations / decisions (Phase 2)
1. **CTA docking fixed**: All 6 frames use a full-width 390×72 Button wrapper with paddingH=16, paddingTop=4, paddingBottom=20 — CTA pill is 358×48 FILL-width inside it, docked at y=738. This corrects the Phase 1 defect.
2. **Sender card spacer**: Uses a FILL-width rectangle spacer (after appendChild) inside the horizontal auto-layout to push chevron right — resolves the FILL-before-parent error pattern.
3. **FX card rows**: FX rows required `primaryAxisSizingMode='AUTO'` (HUG vertical) to expand from their initial FIXED 10px height. Applied post-creation fix in same session.
4. **Russia flag**: Rendered as a 20×20 clipped frame with three stacked rectangles (white/blue/red stripes, `clipsContent=true`). No library flag instance used (search deferred; approximate rendering acceptable for mock).
5. **Card picker sheet check indicator**: The selected state uses a FILL blue circle frame with a white rectangle tick inside. Ellipse nodes cannot have children — used frame with cornerRadius=10 instead.
6. **Body AUTO height**: Body container initial `resize(390, 10)` with `primaryAxisSizingMode='AUTO'` caused children to collapse. Fix: re-assert `primaryAxisSizingMode='AUTO'` after all children are appended. Applied to Foreign sender frames post-creation.
7. **Column 2 x=1960**: Card picker sheet and Insufficient balance share col-2 at x=1960. Stage 04 label at x=1490 covers only col-1 visually — acceptable for section reading.

## QA fix list (verified from section screenshot after P1)

- [ ] 02 KYC frames: back arrow is a dark square placeholder; status bar (9:41) missing
- [ ] 02 KYC / Empty: "Keyingisi" CTA floats mid-screen, small — must be full-width pill docked above home indicator (disabled gray)
- [ ] 02 KYC / Filled: CTA is a small floating chip — acceptable only above keyboard; no keyboard on this frame, so dock full-width
- [ ] 03 Method cards: blue dot icon placeholders — swap to real method icons (card/phone/wallet/bank/cash)
- [ ] All new frames: font is Geologica (substitute) — swap to Clash Display when available

## QA notes (Phase 2 post-verification)
- [x] All 6 Stage 04 frames: CTA docked full-width above home indicator (defect from P1 spec avoided)
- [x] Status bar (9:41) present on all 6 frames
- [x] Home indicator present on all 6 frames
- [ ] Card picker sheet: selected check indicator is a simplified blue circle + white bar (not a real checkmark glyph) — acceptable for mock
- [ ] FX dotted leader lines: rendered as dashed rectangles (Figma `dashPattern`), not actual dotted SVG leaders — visual fidelity acceptable
- [ ] Amount input USD/RUB spacer is a fixed-width rectangle, not FILL — may leave visible gap on some zoom levels; review in P6 QA pass

## Build log (Phase 3 — 2026-06-10)

### Frames created
| Name | Node ID | Canvas position (section-relative) |
|---|---|---|
| `Intl P2P / 05 Recipient / Card / Empty` | `10879:39459` | x=2900, y=100 |
| `Intl P2P / 05 Recipient / Card / Resolved` | `10880:39459` | x=2900, y=1004 |
| `Intl P2P / 05 Recipient / Card / Error` | `10881:39459` | x=2900, y=1908 |
| `Intl P2P / 05 Recipient / Phone / Empty` | `10882:39459` | x=3370, y=100 |
| `Intl P2P / 05 Recipient / Phone / Wallet sheet` | `10883:39459` | x=3370, y=1004 |
| `Intl P2P / 05 Recipient / Bank / Empty` | `10884:39459` | x=3370, y=1908 |
| `Intl P2P / 05 Recipient / Bank / Selector sheet` | `10885:39459` | x=3840, y=100 |
| `Intl P2P / 05 Recipient / Cash / Empty` | `10886:39459` | x=3840, y=1004 |

### Stage label positions updated
Stage 05 uses three columns (x=2900, x=3370, x=3840); downstream labels shifted +940px:
| Label | Old x | New x |
|---|---|---|
| 06 · Tekshirish (S7) | 3370 | 4310 |
| 07 · Tasdiqlash (S8) | 3840 | 4780 |
| 08 · Chek (S9) | 4310 | 5250 |

### Deviations / decisions (Phase 3)
1. **Scan icon**: Rendered as a rounded-square outline frame (6px cornerRadius, 1.5px stroke) with two crossing rectangle lines inside — no actual QR/scan glyph. Acceptable for mock.
2. **KG flag**: Simplified as a red circle with a small white circle center (no actual Kyrgyzstan flag detail). Acceptable for mock.
3. **Contacts icon**: Rendered as a solid `#438BFA` circle — placeholder for actual person-silhouette icon.
4. **Wallet brand icons**: Rendered as colored circles with single initial letter (WeChat green `#07C160`, Alipay blue `#1677FF`). Library search for Transfer App logos deferred — circle tiles are per spec fallback.
5. **Check indicator in sheets**: Blue circle with white 10×2px bar inside (reads as dash, not checkmark glyph). Same pattern as Phase 2 card picker sheet.
6. **Info banner (Cash/Empty)**: `BG_INFO` (`#EAF3FF`) is very close to the screen bg (`#F2F3F4`) — banner is subtle but structurally correct. Text and icon render in `#438BFA`. Fix in P6 QA: add a 1px border or slightly darker bg to increase contrast.
7. **Banner text wrapping**: `textAutoResize = 'HEIGHT'` with `resize(300, 20)` required; initial `FILL` sizing caused height to collapse to 10px. Fixed by rebuilding banner children with explicit width.
8. **Body AUTO re-assert**: `primaryAxisSizingMode = 'AUTO'` re-asserted after all children appended (per Phase 2 lesson).

## QA notes (Phase 3 post-verification)
- [x] All 8 Stage 05 frames: status bar (9:41) present
- [x] All 8 frames: home indicator bar present at y=810
- [x] All 8 frames: CTA docked full-width at y=738 (Button wrapper 390×72)
- [x] Card/Empty: scan icon renders, recents chips •0994 and •7890 present
- [x] Card/Resolved: filled card number, QR avatar, Qodirov Rustam / Optima Bank, enabled dark CTA
- [x] Card/Error: red border 1.5px, red error text, disabled CTA
- [x] Phone/Empty: KG flag + +996 prefix + divider + placeholder + contacts circle
- [x] Phone/Wallet sheet: dim overlay, WeChat/Alipay rows, grayed PayPal, Tasdiqlash CTA
- [x] Bank/Empty: 4 fields (Bank dropdown, Hisob raqami, O'tkazma maqsadi, Mablag' manbai)
- [x] Bank/Selector sheet: dim overlay, search field, 5 bank rows with colored logos, Optima selected
- [x] Cash/Empty: Ismi + Familiyasi + +996 phone + info banner with blue text
- [ ] Cash/Empty info banner: background is very subtle (EAF3FF on F2F3F4) — add 1px `#438BFA` border in P6 QA for visibility

## Build log (Phase 4 — 2026-06-10)

### Pre-build layout fix
Stage label 8 moved from x=5250 → x=5720 (section-relative) to avoid collision with Stage 07 col-2.
Section resized 6400 → 6740 wide to accommodate Stage 08 at x=5720 (two columns ending at ~x=6580).

### Frames created
| Name | Node ID | Canvas position (section-relative) |
|---|---|---|
| `Intl P2P / 06 Pre-check / UZB sender` | `10893:39459` | x=4310, y=100 |
| `Intl P2P / 06 Pre-check / Foreign sender` | `10894:39459` | x=4310, y=960 |
| `Intl P2P / 07 Confirm / OTP / Empty` | `10895:39459` | x=4780, y=100 |
| `Intl P2P / 07 Confirm / OTP / Error` | `10896:39459` | x=4780, y=960 |
| `Intl P2P / 07 Confirm / Foreign form` | `10897:39459` | x=5250, y=100 |
| `Intl P2P / 07 Confirm / Switch method sheet` | `10899:39459` | x=5250, y=960 |

### Deviations / decisions (Phase 4)
1. **SF Pro Display not available**: Status bar time uses `SF Pro Semibold` (correct family name in plugin context is `SF Pro`, not `SF Pro Display`). Same as all prior phases.
2. **Summary card dotted leaders**: Rendered as dashed rectangles with `dashPattern=[2,3]` and `layoutSizingHorizontal=FILL` — same technique as Phase 2 FX rows. Visual fidelity acceptable.
3. **Sender card chevron**: Rendered as a rounded 8×14 rectangle in gray (#99A4B2) — no actual SVG chevron. Consistent with prior phases.
4. **06 Foreign sender note**: Gray pill frame (#F2F3F4) with blue circle info icon + gray text. Structurally correct; subtle vs white card — acceptable for mock.
5. **OTP cells focus state**: Cell 1 has 2px #438BFA stroke (INSIDE), cells 2-6 have 1px #E5E9EE. Per spec.
6. **OTP Error digits**: All 6 cells filled (4 8 2 9 1 5) with red bg tint + 2px #E5484D border + "Kod noto'g'ri. Qayta urinib ko'ring" red text. Resend pill dark/enabled.
7. **Foreign form card badges**: VISA badge (dark blue #162280) and МИР badge (green #0AA15D) rendered as small labeled frames 36×22. Trailing Visa/MIR per spec.
8. **Switch method sheet**: Frame fill is gradient bg; dim overlay is a full-frame rectangle at 0.4 opacity; sheet panel is a 390×400 frame with top-corner radius 24, placed at y=444. `layoutPositioning=ABSOLUTE` not used (parent is not auto-layout) — sheet positioned by direct x/y on plain frame child. Structurally correct.
9. **Switch method selected row**: Saqlangan karta row has light-blue bg highlight (#EFF5FF), blue check circle, dark title + gray subtitle. Unselected rows have chevron only.
10. **Sheet CTA**: "Tasdiqlash" dark pill 358×48 inside 390×92 CTA area at y=310 within sheet.

## QA notes (Phase 4 post-verification)
- [x] All 6 frames: 390×844, gradient bg present
- [x] All 6 frames: status bar (9:41) + home indicator present
- [x] 06 Pre-check / UZB sender: summary card 7 rows + sender card row (NBU chip, balance, ••1456, chevron) + enabled CTA
- [x] 06 Pre-check / Foreign sender: summary card 7 rows + gray note (no sender card row) + enabled CTA
- [x] 07 OTP / Empty: title + subtitle + amount banner + 6 empty cells (cell 1 blue focus border) + disabled resend pill
- [x] 07 OTP / Error: 6 filled cells all red border + red error text below + enabled dark resend pill
- [x] 07 Foreign form: "To'lov ma'lumotlari" header + white input card (card number + Visa/MIR badges + expiry + CVC) + 3-D Secure note + "To'lash · 8 745 RUB" CTA
- [x] 07 Switch method sheet: dim overlay + bottom sheet + 3 method rows (Saqlangan karta ✓ selected, Yangi karta, Bank ilovasi) + Tasdiqlash CTA
- [ ] Switch method sheet: sheet height is approximate (400px fixed); check row text may clip if subtitle wraps — review in P6 QA
- [ ] Foreign form expiry/CVC: half-width inputs use fixed 157px each; may need FILL adjust if text overflows — review in P6 QA

## Build log (Phase 5 — 2026-06-10)

### Pre-build research
- Sampled existing cheque frame `10796:19389` via `get_design_context`: Unired wordmark hex `#E2231A` (brand red), Manrope font, APPROVED stamp is inline (not a library component) — blue `#438BFA` bordered rounded-rect rotated ~-6°, text "UNIRED MOBILE / APPROVED".
- Library search for "Stamp" found no Unired-specific 6-variant Stamp component set — only Phosphor icon "Stamp" and a shadcn stamp. Built inline stamp per existing cheque pattern.
- Template frame `10860:39459` (04 Amount / UZB sender / Empty) used for shell measurements.

### Stage label update
Stage 08 label was already moved to x=5720 in Phase 4 pre-build fix. Section width already 6740. No additional label moves needed.

### Frames created
| Name | Node ID | Canvas position |
|---|---|---|
| `Intl P2P / 08 Receipt / Success` | `10904:39459` | col1 x=5720, y=100 (canvas: -20936, -2000) |
| `Intl P2P / 08 Receipt / Error` | `10905:39459` | col2 x=6190, y=100 (canvas: -20466, -2000) |
| `Intl P2P / 08 Receipt / Hold` | `10906:39459` | col1 x=5720, y=1004 (canvas: -20936, -1096) |
| `Intl P2P / 08 Receipt / Cash success` | `10908:39459` | col2 x=6190, y=1004 (canvas: -20466, -1096) |

### Deviations / decisions (Phase 5)
1. **Stamp component**: No matching library "Stamp (6 variants)" found in design system search. Built inline per existing cheque pattern: bordered rounded-rect (cornerRadius 5, 1.5px stroke), two text lines "UNIRED MOBILE" / "APPROVED" or "REJECTED", rotation -12° (existing cheque uses -6°; -12° matches spec's "~-12°"). APPROVED blue `#438BFA`, REJECTED red `#E5484D`.
2. **Hold frame — no stamp**: "Tekshirilmoqda..." italic placeholder text in muted gray replaces the stamp area (per spec: "NO stamp"). This clearly signals pending state.
3. **Action rail labels clipping**: Body container is FIXED 723px with `clipsContent=true`. Action rail items use FILL-width columns; tile labels ("Saqlash" etc.) may clip in the fixed-height scroll zone at certain content heights. Visually acceptable for mock fidelity. Fix in P6 QA: increase body height or remove clipsContent.
4. **Wordmark font**: Used `Geologica Bold` (live available) for "Unired" wordmark in brand red `#E2231A`, consistent with existing cheque's Manrope Bold — the visual weight is similar. Manual font swap to Clash Display/Manrope required before P6 QA.
5. **MTCN row highlight**: Used light-blue pill bg `#EFF5FF`, label "Pul olish kodi (MTCN)" in `Geologica SemiBold` blue, value "12 345 678" in Bold blue. The row sits above the standard leader rows, giving clear prominence to the cash code.
6. **Error action states**: Spec says "Saqlash/Tafsilotlar gray (disabled)". Takrorlash enabled (blue) — user can retry with another method. This matches the retry-flow logic.
7. **Banner icon**: Rendered as solid 20×20 ellipse in banner color — placeholder for actual info/warning/error icon. Consistent with Phase 3 pattern.

## QA notes (Phase 5 post-verification)
- [x] All 4 frames: 390×844, gradient bg, 9:41 status bar, home indicator bar
- [x] Success: green "Muvaffaqiyatli" chip + datetime, 6 dotted leader rows, dashed perforation, APPROVED blue stamp -12°, action rail (3 blue enabled), Ulashish+Yopish
- [x] Error: red "Rad etildi" chip, REJECTED red stamp, red error banner "O'tkazma amalga oshmadi. Bank tomonidan rad etildi", "Boshqa usul bilan urinish" white pill CTA, Saqlash/Tafsilotlar gray, Takrorlash blue
- [x] Hold: amber "Jarayonda" chip, no stamp (placeholder "Tekshirilmoqda..."), blue info banner "O'tkazma ko'rib chiqilmoqda...", blue "O'tkazma holatini tekshirish" CTA, all 3 actions gray disabled
- [x] Cash success: green chip, MTCN highlighted blue-bg row "Pul olish kodi (MTCN) · 12 345 678" at top, standard 7 rows including "Olish usuli · Naqd pul (filial)", APPROVED stamp, all 3 actions enabled
- [x] P6 FIXED: Action rail label visibility — body clipsContent=false, rail items primaryAxisSizingMode=AUTO; all labels now visible
- [x] P6 FIXED: Stamp placement — stamp horizontally centered in container (stamp.x = (container.width - stamp.width) / 2)
- [ ] Font: Clash Display not available in plugin runtime (loadFontAsync returns "font family does not exist"). All new frames remain Geologica. Manual swap required.

## Build log (Phase 6 QA — 2026-06-10)

### BLOCKERS fixed (20 → 20 resolved)

| # | Frame(s) | Issue | Fix applied |
|---|---|---|---|
| B1 | 10847, 10848 KYC | CTA hug-width gray chip | Button wrapper padding=16/4/20, CTA layoutSizingHorizontal=FILL, cornerRadius=24 |
| B2 | 10847, 10848 KYC | Input fields hug text width | All 8 input groups + input fields set layoutSizingHorizontal=FILL |
| B3 | 10849, 10850 Method | Subtitle clips at card edge | Text Col FILL, subtitle textAutoResize=HEIGHT + layoutSizingHorizontal=FILL; all 10 cards in both frames |
| B4 | 10867 Card picker | Home indicator behind sheet panel | appendChild(homeIndicator) to move to front of frame z-order |
| B5-B6 | 10893 Pre-check UZB | Summary card 358×10 sliver | Bottom-up: 7 row frames primaryAxisSizingMode=AUTO, then Summary Card AUTO; Body Container layoutMode=VERTICAL + AUTO + clipsContent=false |
| B7 | 10893 Pre-check UZB | Sender Card Row 358×10 | resize(358, 64), counterAxisAlignItems=CENTER |
| B8-B9 | 10894 Pre-check Foreign | Summary card + Note pill collapse | Same row fix; Body Container AUTO; Note pill resize(358, 44) |
| B10-B11 | 10895, 10896 OTP | Title Stack 342×10 | primaryAxisSizingMode=AUTO on Title Stack; OTP Body AUTO + clipsContent=false |
| B12 | 10897 Foreign form | Input Card + nested collapses | Bottom-up AUTO: Expiry/CVC blocks, CardInputRow counterAxis AUTO, CardNumberBlock AUTO, ExpiryRow counterAxis AUTO, InputCard AUTO; Body AUTO |
| B13 | 10906 Hold receipt | 'Tekshirilmoqda...' placeholder | Node 10906:39498 deleted |
| B14-B17 | 10904-10908 Receipts (×4) | Action rail clipped (h=34, items h=10) | Rail items AUTO, rail counterAxisSizingMode=AUTO, Body clipsContent=false |
| B18-B21 | 10904-10908 Receipts (×4) | Ulashish/Yopish floating mid-screen | Button Row reparented into new 390×72 footer frame at y=738, pills FILL width |

### MINORS fixed (selected, ~25 of 41)

| Fix | Frames |
|---|---|
| Check indicators: replaced white-dash rect with real checkmark vector (M 4 10 L 8 14 L 16 6) | 10867, 10883, 10885, 10899 |
| FX card data consistency: 0-values on empty states, corrected 0.5% math on insufficient/filled | 10860, 10869, 10870, 10871 |
| Cash placeholders: 'Ismini kiriting' / 'Familiyasini kiriting' (third person) | 10886 |
| Cash banner: 1px #438BFA stroke added | 10886 |
| Dropdown chevron-down vectors: replaced dash rects | 10884 (3 dropdowns) |
| Back-arrow chevron vectors: replaced dark rounded-rect placeholders | 10847-10886, 10893-10897 (23 frames) |
| Status icons placeholder: right-aligned at x=306 in all built frames | All 28 frames |
| Status bar: resized to 390px on KYC + Method frames (was 283px) | 10847-10850 |
| Stamp centering: stamp.x = (container.width - stamp.width) / 2 | 10904, 10905, 10908 |
| Magnifier icon: replaced gray circle with lens+handle construction | 10885 |
| Chevron-right vectors on sheet method rows | 10899 |
| Status icons added to Switch method sheet status bar | 10899 |
| RU flag: added #E5E7EB hairline border, white stripe enlarged to 7px | 10870, 10871 |

### Remaining items (not fixed in P6)

| Frame | Issue | Reason deferred |
|---|---|---|
| All new frames | Font: Geologica instead of Clash Display | Clash Display not available in plugin runtime; requires manual font swap in Figma UI |
| 10870, 10871 | Russia flag hand-drawn stripes still approximate (no library flag component found) | Country Flags component set not in this file or accessible library pages |
| 10882, 10886 | KG flag is still a plain red circle (no Kyrgyzstan library component found) | Same reason as RU flag |
| 10883, 10885 | Sheet overlay z-order: nav header renders above dim (would require full body clone + layer reorder) | Complex structural rework; content is readable, not a P6 priority |
| 10880 | Card/Resolved: bank logo tile (Optima) missing; trailing scan icon inconsistency | Low fidelity impact; bank tile requires font load + rebuild |
| 10883, 10885 | Wallet/Bank sheet: underlying body content not duplicated behind overlay | Structural complexity; sheets are readable |
| 10904, 10905, 10908 | Stamp rotation: stamp may still drift visually at exact pixel level under rotation | Centering applied; visual check shows acceptable alignment |
| 10899 | Switch method sheet icon tiles: blue circle placeholders (no card/bank/app glyph) | Minor fidelity; outside P6 blocker scope |
| Various | Method icon tiles: blue dot placeholders instead of card/phone/wallet/bank/cash glyphs | Phase P3 known deviation; not a blocker |
