# Unired V.3.2 — Final Design / Light Version · audit

Captured: 2026-04-27
Source page: `310:731` (Final Design / Light Version)

**Total: 30 sections + 13 standalone frames ≈ 999 frames.**

This document catalogs every section, lists every frame inside it (name +
representative ID), and summarizes the flow each section covers. Use it as a
reference index when planning per-section deep work.

Frame size convention: all listed frames are **375 × 812** unless noted.

---

## Section index

| # | Section | Frames | Purpose |
|---|---|---|---|
| 1 | Light / Splash Screens | 3 | App-entry splash + language selector. |
| 2 | Light / Auth | 38 | Phone-number → OTP → set/enter PIN → set password flow. |
| 3 | Light / Main | 18 | Home (guest, authorized, with cards), search, monitoring entry. |
| 4 | Light / Services screens | 4 | "Services" hub list + setup. |
| 5 | Light / Account | 27 | Profile, identification, set email, share link. |
| 6 | Light / Settings | 26 | Theme, language, change PIN, change password, sessions. |
| 7 | Payment | 67 | Utility / phone bills / Steam / saved templates. |
| 8 | Light / My Cards | 55 | Card list, add card, card detail, PIN, limits, reissue, arrange order. |
| 9 | Light / Visa exchange | 13 | Visa-exchange currency conversion. |
| 10 | Light / News & Push messages | 3 | News feed + notifications. |
| 11 | Mahalliy o'tkazmalar | 41 | Local (UZ↔UZ) transfers, Visa transfers, OTP, cheques. |
| 12 | UCoin | 30 | UCoin loyalty card add / type select / loading variants. |
| 13 | **Light / P2P** | **175** | Cross-border P2P (UZ↔KG, UZ↔TJ, UZ↔CN, UZ↔RU) — by phone, card, QR. |
| 14 | Steam skins | 46 | Game-skin catalog tiles (CS:GO weapon skins for Steam payment). |
| 15 | Steam | 21 | Steam payment screens — empty, focused, filled, cheque, OTP. |
| 16 | Light / QR payment | 48 | QR scan, QR receipt, scanner states (location, payment, tips, OTP). |
| 17 | Light / Application menus | 30 | Order card, custom card number, applications/address, map. |
| 18 | ELQR | 14 | Electronic-receipt QR flow. |
| 19 | Bank account (×2) | 58 + 52 = 110 | Bank-account / account-statement screens — two parallel sections. |
| 20 | Chat | 6 | In-app chat / support. |
| 21 | Monitoring | 16 | Transaction monitoring + empty state. |
| 22 | Light / Visa alias | 16 | Visa-alias connect / change / deactivate. |
| 23 | Light / Visa direct | 16 | Visa Direct card-number entry / focused / filled. |
| 24 | PTP Wallet | 11 | Mostly references to Local Transfers + UZ-TJ phone transfers. |
| 25 | Wallet transfer all (e.g. GME) | 14 | UZ→RU and UZ→KR transfers, type-of-transfer picker. |
| 26 | P2P Russia ↔ Uzbekistan | 54 | RU↔UZ transfer, country select, OTP, cheque (success / error / hold). |
| 27 | (unnamed) | 4 | "NEW v1" / "NEW v2" / "OLD" comparison frames. |

13 standalone frames (outside sections): A4 cheque exports (×4 — `595×842`),
story mini-img (`88×64`), notification-img sets (`303×170`), Stories
(`375×812`), and a vertical scrollable Cards Added capture (`430×1821`).

---

## Section 1 · Light / Splash Screens · 3 frames

`9730:125894`

| ID | Name |
|---|---|
| `9730:125895` | Light / Splash Screens / Logo / Hidden Logo |
| `9730:125902` | Light / Splash Screens / Logo / Hidden Logo |
| `9730:125909` | Light / Splash Screens / Select Language |

Two logo states + a language picker. Entry point of the app.

---

## Section 2 · Light / Auth · 38 frames

`9730:125922`

Auth flow: **phone → OTP → set/confirm PIN → set/enter password**.

**Phone (4):** Empty State · Focused/Empty · Focused/Filled · Filled.
**OTP (5):** Empty · Code Didn't Come · Code in Prediction · Filled · OTP Error.
**Set PIN / Enter PIN (10):** Set PIN/Empty · PIN/Empty · PIN/Empty/Error · PIN/Filled Step 1..5 · PIN/Filled/Loading · PIN/Filled/Check Mark.
**Confirm Code Animations (7):** Animation Step 1, 2, 3 (Loading + Check mark) · Confirmation · Error in Confirmation + duplicates.
**Set / Enter Password (8):** Set/Empty Focused · Enter/Empty Focused (×2) · Enter/Empty Placeholder · Set/Filled Focused · Set/Filled (×3) · Set/Filled/Password Showed.
+ Misc: Line 8 vector, Error States text label, Cards Added screen pinned for context.

Master IDs: phone empty `9730:125923`, OTP empty `9730:125982`, Set PIN
empty `9730:126068`, Set Password empty `9730:126284`.

---

## Section 3 · Light / Main · 18 frames

`9730:130203`

Home / dashboard variants:

| Variant | Frame |
|---|---|
| Guest user (no cards) | `9730:130204`, `9730:130411` (tall scroll, h=1444) |
| Authorized user | `9730:130248` |
| Authorized + Cards Added | `10031:76934` (h=1402), `17752:130696`, `18765:99886` |
| Authorized + Active Notification | `9730:130306` |
| Search / New | `9730:130364` |
| Search / Last Search | `9730:130380`, `9730:130397` |
| Authorized / Select Currency | `10031:77293` |
| Account / Guest / Stories | `10573:77975`, `10573:77992` |
| Update Available | `19692:106767` (h=808) |
| Monitoring | `17688:104472`, `17688:110396` (h=1246) |
| Misc | Frame 314537, Frame 314550 |

---

## Section 4 · Light / Services screens · 4 frames

`9917:75406`

| ID | Name |
|---|---|
| `9917:75407` | Light / Services / List (h=1184) |
| `9917:75430` | Light / Services / Empty List |
| `9917:75440` | Light / Services / Setting Up Services (h=1174) |
| `9917:75466` | Light / Services / Setting Up Services / Changes (h=1254) |

The "Services" hub — a customizable rail of payment shortcuts.

---

## Section 5 · Light / Account · 27 frames

`10358:83682`

Account / profile flow.

- **Guest user:** Guest User · Guest / Dark Theme Icon
- **Authorized user:** Authorized User
- **Identification (KYC):** Identification User (×4) · Focused (×6) · Term of Use (×3)
- **Set Email:** Empty · Empty/Focused · Focused/Filled · Filled · OTP (×2) · Success message
- **Share Link**
- 2 Frames at 617×972 (presumably modal compositions or oversized canvases)

---

## Section 6 · Light / Settings · 26 frames

`11400:77528`

| Cluster | Screens |
|---|---|
| Settings entry | `11400:77529` |
| Change Theme | `11442:84239` |
| Change Language | `11563:81643` |
| Change PIN Code | Enter Current · Enter New · Confirm New · Success message |
| Change Password | Empty · Current password (×2) · Focused · Forgot Password OTP |
| Sessions | Sessions list · Current session · Delete Session · Delete (Android) |

8 frames with the misleading name `Light / Auth / Set Password / Filled
Focused State` are pinned inside this section — they're cross-references for
context, not Settings flow proper.

---

## Section 7 · Payment · 67 frames

`13124:97996`

The largest payments-flow section. Covers every payment type:

- **Empty / Search:** Empty (×2) · Search/Empty · Search/Filled
- **Saved Payments:** Saved Payment Added (×4) · Saved List · Action Buttons · Delete button
- **Save payments setup:** Select Category · Select Provider (×3)
- **Utility Card / Electricity:** Utility Card · Electricity (×8 variants of empty)
- **Save payment / Phone bills / Contacts:** Contact List (×3) · Numpad/Focused · Phone bills (×3) · Template Name (×3)
- **Phone bills detail:** Empty · Empty Rus · Service Info · Cards list (×6) · With Insufficient Funds
- **Steam Payment:** Steam Payment · Enter Amount/Filled · Focus Input · Amount · Focus Input/With History · Focus Input/Filled
- **Cheque / Success:** Cheque (×6) · Save payment / Success
- **OTP fallback:** Auth / OTP / Empty State (cross-reference)

---

## Section 8 · Light / My Cards · 55 frames

`13128:107698`

Card management — list, detail, add, security, limits, reissue, ordering.

- **List states:** Empty · Cards (×6) · PIN COD · Blocked Card
- **Add Cards Form:** Empty · Focused/Empty · Filled/Error · Filled/Error - Russian Card · Filled (×2)
- **Bottom Sheets:** Bottom Sheet (×3) · Card Settings (×3) · Card Limits / Daily · Card Limits / Monthly (×2) · Reissue Card / Virtual Card (×2) · Set New Pin (×4 with Empty/Filled/Error)
- **Security:** Security · Security / Reset PIN attempts (×3)
- **Verification:** Verification Info · Select Card Type · Success Dialogue
- **Arrange Card Order:** Arrange Card Order (×4)
- **OTP fallback:** OTP states (×5)
- **Limits info bottom sheet:** `Bottom sheet / Limits info`

---

## Section 9 · Light / Visa exchange · 13 frames

`13255:136716`

Visa currency exchange (in-app FX).

- Cheque (×5)
- Auth / OTP / Empty State (cross-ref)
- Visa Exchange: Empty (×2) · Insufficient Funds Error · No Card (×2) · Currencies · Filled

---

## Section 10 · Light / News & Push messages · 3 frames

`13934:108807`

| ID | Name |
|---|---|
| `13934:?` | Light / All News |
| `13934:?` | Light / Notification |
| `13934:?` | Light / All News / Empty |

---

## Section 11 · Mahalliy o'tkazmalar (Local transfers) · 41 frames

`15065:97898`

UZ ↔ UZ transfers (Visa-network, local cards). Heavy on `P2P / Local
Transfers` repeated frames (×~25 — many step variants).

- P2P / Local Transfers (×25)
- P2P / Transfer To Visa: Enter Amount · Amount Filled/Focused · Amount Filled · Card Filled/Focused · Filled Fields
- Cheque (×3)
- Auth / OTP states (×5)
- Transfers / Fast transfers setted up

---

## Section 12 · UCoin · 30 frames

`15680:105038`

UCoin loyalty card.

- Add UCoin card from My Cards (×2) and Main (×2)
- Add UCoin card / Type / Loading animation (×2) · Type (×2) · Loading (×6)
- Application menu / Applications / Address (cross-ref)
- UCOIN Card FRONT · BACK · Variants
- My Cards (×7 — UCoin card visible in stack)
- Cheque · UCoin QR Shared · Ucoin / Info

---

## Section 13 · Light / P2P · 175 frames (largest section in file)

`15680:108656`

The cross-border P2P heart of the app. Covers transfer flows for:

- **UZ ↔ KG** (Kyrgyzstan): By phone · By Card · QR transfer · Pre Cheque
- **UZ ↔ TJ** (Tajikistan): same flow set
- **UZ ↔ CN** (China): Empty · Focused (newer flow, fewer screens)
- **Country Selector** variants
- Cross-references to QR payment, Section Heading components

The 175 screens encode every state for each corridor (empty / focused / filled
/ error / pre-cheque / OTP / success). Audit this section by **corridor**
rather than chronologically — group by destination country.

---

## Section 14 · Steam skins · 46 frames

`17096:93687`

A catalog of CS:GO weapon-skin tiles used by the Steam payment integration.
Every tile is a flat presentation card (3rd Commando Company KSK · AK-47
Elite Build · AK-47 Ice Coaled · AK-47 Inheritance · AK-47 Olive Polycam ·
AWP Ice Coaled · Printstream · Broken Fang Gloves · Desert Eagle Mecha
Industries / Serpent Strike / Trigger Discipline · Dragomir Sabre · etc.)

These are content tiles, not UI screens. Out of scope for any UI-redesign
work — treat as embedded artwork.

---

## Section 15 · Steam · 21 frames

`17096:93688`

Steam payment screens.

- Steam Payment (×9 base variants)
- Cheque (×3)
- Steam Payment / Enter Amount / Filled
- Steam Payment / Focus Input · With History · Filled
- Steam Payment / Amount
- Electricity / Empty (cross-ref)
- Auth / OTP / Empty State (cross-ref)
- PIC, Frame 13 (misc)

---

## Section 16 · Light / QR payment · 48 frames

`17155:118561`

QR scanning flow. Screens cover:

- Scan / Scan - External link / Scan - unrecognizable QR
- QR (×2 entry states)
- Scanner (×6 — base variants)
- Scanner / Payment loading
- Scanner / My cards · My cards / Insufficient balance
- Scanner / Location · Tips / Location
- Scanner / Receipt (×3) · Receipt → details
- Scanner / Tips / Payment · Focused · Filled (×2) · Rate · Rated · Comment
- Scanner / Filled · Payment (×2)
- Scanner / OTP (×4)
- QR Payment (×8 final-state variants)
- Variants frame (component organizer)

---

## Section 17 · Light / Application menus · 30 frames

`17155:121025`

"Order card" + "Custom card number" + Applications / Address flows.

- Order card (×9 step variants)
- Application menu / Custom card number (×11 form states)
- Application menu / Applications / Address (×3) · Address / Map · Address / Filled
- Light / Add UCoin card / Type / Loading (×2 cross-ref)
- My applications list
- Main / Authorized User / Cards Added (×2 cross-ref)
- Frame 277134019 / IMG (misc)

---

## Section 18 · ELQR · 14 frames

`17155:122610`

Electronic-receipt QR (e-fiscal-receipt scan).

Scanner (×4) · Scan · Section Heading · QR Image ↔ Scanner · Input ↔ Input
(×2) · Scanner / OTP (×2) · Button ↔ variants (×3).

---

## Section 19 · Bank account (×2) · 58 + 52 = 110 frames

`17273:118008` and `17155:121512`

**Two parallel sections both named "Bank account"** — likely an iteration
that didn't get reconciled. Heavy duplication of `Light / Bank account`
frames in both. Cross-references to OTP states, P2P / Local Transfers, P2P /
Uzbekistan → Russia.

A future cleanup task: pick the canonical "Bank account" section and delete
the other.

---

## Section 20 · Chat · 6 frames

`18921:95858`

| ID | Name |
|---|---|
| 6× | Light / Main / Authorized User / Chat |

In-app support chat — 6 conversation states.

---

## Section 21 · Monitoring · 16 frames

`19481:106128`

Transaction monitoring (transaction list + analytics).

- Light / Monitoring (×13)
- Light / Monitoring / Empty state (×2)
- image 419

---

## Section 22 · Light / Visa alias · 16 frames

`19534:113178`

Visa Alias connect / change / deactivate flow.

- Visa alias / Connect · Change alias (×2) · Deactivate confirmation (×2) · Change · Connect / Selected · Result (×2) · Confirmation · Change / Alert
- Button Group · Section heading description (×3)
- Light / My Cards (cross-ref)

---

## Section 23 · Light / Visa direct · 16 frames

`19581:195976`

Visa Direct card-number entry.

- Visa Direct / Card number (×5)
- Visa Direct / Card number / Focused & Filled (×6)
- Visa Direct (×5 final states)

---

## Section 24 · PTP Wallet · 11 frames

`21309:124234`

Mostly references to existing `P2P / Local Transfers` (×5) and `P2P / UZ -
TJ / By phone number` (×5) plus the country selector. This section appears
to be a copy/paste presentation block, not a new flow.

---

## Section 25 · Wallet transfer all (e.g. GME) · 14 frames

`21328:122675`

UZ → RU phone transfer + UZ → KR (Korea) bank-info / personal-info /
pre-cheque flow + Type of transfer pickers.

---

## Section 26 · P2P Russia ↔ Uzbekistan · 54 frames

`21328:122978`

The dedicated RU ↔ UZ corridor.

- Section Heading
- International transfers / Countries (×7) · Countries / Selection · Countries / Transfer type (×2)
- RU → UZ transfer / Type of transfer (×4)
- RU - UZ / Cheque / Success (×3) · Error (×3) · Hold (×6)
- UZ - RU / OTP (×4)
- UZ → Russia (×10 base flow)
- UZ - RU / By phone number (×9) · By Card number / Pre Cheque (×2)
- International transfers / Last transfers

---

## Section 27 · (unnamed) · 4 frames

`19420:100866`

A comparison block with frames named "NEW v1", "NEW v2" (×2), and "OLD".
A/B reference for some component — likely Bank Card or Service tile.

---

## Standalone (outside sections) — 13 frames

| ID | Name | Size | Note |
|---|---|---|---|
| `10249:76492` | A4 - Cheque for Payment by requisites | 595×368 | Print export |
| `11394:76902` | Unired v2 | 595×842 | A4 cheque |
| `11527:50530` | Universalbank | 595×842 | A4 cheque |
| `12829:95024` | Universalbank | 595×842 | A4 cheque |
| `11421:47153` | Unired v1 | 595×842 | A4 cheque |
| `11105:75477` | Light / Main / Authorized User / Cards Added | 430×1821 | Tall scroll capture |
| `13581:65001` | Light / Splash Screens / Logo / Hidden Logo | 375×812 | Splash variant |
| `17703:112332` | METRO ICON | 24×24 | Icon component |
| `18132:112356` | PS Logos | 115×24 | Logo component |
| `19743:105448` | Icon | 480×481 | Asset |
| `21523:104977` | Story mini img | 88×64 | Story thumbnail |
| `21523:105075` | Notification img | 303×170 | Notification thumbnail |
| `21523:105023` | Stories | 375×812 | Stories full-screen |

---

## Cross-cutting observations

1. **OTP and Cheque screens are massively duplicated.** Almost every
   payment / transfer section embeds 3–6 cheque variants and 3–5 OTP states
   as screen-level frames inside its own section. A single canonical OTP
   master + cheque-by-context master (with INSTANCE_SWAP slots) would
   eliminate hundreds of duplicate frames.
2. **`Light / P2P` is the largest section by 3×.** Audit it by corridor
   (UZ↔KG, UZ↔TJ, UZ↔CN, UZ↔RU, UZ↔KR) rather than as a single section.
3. **Two "Bank account" sections.** Reconcile or delete one before any
   redesign work.
4. **Steam skins is content, not UI.** 46 frames of weapon-skin tiles —
   skip during UI audits.
5. **Many "by-name" duplicates.** Multiple frames share identical names
   (e.g. ten different frames named `P2P / UZ - KG / By Card number`).
   Cross-reference by ID, never by name.
6. **No published-library origin.** All instances on this page are sourced
   from local masters (the Components page) — no external Apple iOS Kit or
   third-party DS dependencies inside the production screens. (The Auth
   section's `Status Bar` and `Bottom menu` come from local System
   components, confirmed by their match in the library audit.)

---

## Suggested deep-audit order (if you want per-frame detail next)

The catalog above is the structural index. If you want the AsiaSend-style
deep audit (top-bar / body / CTAs / icons / copy per frame), tackle in this
order:

1. **Auth** (38) — universal entry, contained scope, biggest leverage.
2. **Main** (18) — drives everything else.
3. **Payment** (67) — recurring user task.
4. **My Cards** (55) — high-traffic surface.
5. **Light / P2P** (175, audited per corridor) — largest revenue surface.
6. The rest, by traffic / business priority.
