# Unired V.3.2 — Working files · audit + diff vs Final Design

Captured: 2026-04-27
Source page: `1019:10238` (⏰ Working files)

**Total: 11 sections + 43 standalone WIP frames ≈ 284 frames.**

This page hosts in-flight work — drafts, iterations, alternate
treatments, and screens that haven't been promoted to *Final Design / Light
Version*. Most sections are **WIP variants of sections that already exist on
Final Design** — this audit highlights the diff so you know which Working
files are duplicates vs. which contain unique work.

Frame size: all listed frames are **375 × 812** unless noted.

---

## Section index — relationship to Final Design

| # | Section (Working files) | Frames | Diff vs Final Design | Status |
|---|---|---|---|---|
| 1 | Section 1 | 50 | None — generic "Section 1" scratch container with numbered placeholder frames (44, 21, 2, 45, 2915, 7676, etc.). Looks like raw imports / scratch ID labels. | **Scratch — likely safe to ignore for design work.** |
| 2 | Light / Requisite | 9 | **No matching section on Final Design.** | **Unique to Working files** — Requisite (bank-requisites payment) flow is in WIP, not promoted. |
| 3 | Light / Support screens | 3 | Final Design has no `Support screens` section in the catalog — these are standalone frames (`Light / Support Screen` at `10358:85794` etc.) | Effectively unique — WIP support flow. |
| 4 | Light / My Cards | 53 | Final Design has its own `Light / My Cards` (55 frames) at `13128:107698`. Frame names are **near-identical**. | **Duplicate / iteration of Final Design.** Likely a snapshot before promotion. |
| 5 | Light / My home | 19 | **No matching section on Final Design.** | **Unique to Working files** — "My home" (services-by-home grouping) is WIP. |
| 6 | Light / Ucash (×2 — `19743:105949` + `19743:106657`) | 21 + 10 | Final Design has UCoin (different) but no UCash section. | **Unique to Working files** — UCash (cash-money transfer) is WIP. |
| 7 | Gamification | 12 | **No matching section on Final Design.** Includes a `Dark / Gamification` frame — only Dark variant on file. | **Unique to Working files** — full gamification flow is WIP. |
| 8 | Light / Auth | 38 | Final Design has `Light / Auth` at `9730:125922` with the **same 38 frame names**. | **Duplicate of Final Design.** |
| 9 | Authorization 1st Session | 20 | **No matching section on Final Design.** Naming uses different convention (`Auth /` instead of `Light / Auth /`). | **Unique to Working files** — alternate auth flow proposal (1st-session-only screens). |
| 10 | Chat | 6 | Final Design also has `Chat` at `18921:95858` (same 6 frame names). | **Duplicate of Final Design.** |

---

## Standalone WIP frames — 43 total

These are loose frames not grouped into a section.

| Group | Count | Frame names |
|---|---|---|
| Payment / Payment to account number | 14 | `Light / Payment / Payment to account number` × 14 (states). Includes `/ Cheque` variant. |
| Light / My Cards / Empty | 7 | Empty-state explorations. |
| Light / Auth / Phone Number / Empty State | 11 | Phone-number empty-state explorations (counter / variant tests). |
| Light / Main / Authorized User / Cards Added | 2 | |
| Light / My Cards | 2 | Full-page captures (h=2438) |
| Light / My Cards / Select Card Type | 1 | |
| Transfers / Fast transfers setted up | 1 | |
| Light / Auth / Help | 1 | |
| Light / Support Screen | 1 | |
| Light / Support Screen / FAQ List | 1 | |
| `17` (numbered placeholder) | 1 | A 1242×2688 frame — large mockup or capture |

The "11 phone-number empty state" cluster is notable — that's iterative
exploration of a single screen, suggesting the team was still resolving the
canonical Auth entry-point treatment when this snapshot was taken.

---

## Section-by-section detail

### 1 · Section 1 — `16242:114389`

A 50-frame scratch container holding numbered placeholder frames:
`44, 21, 2, 45, 2915, 7676, 49482, 48267, 174, 194, 694, 736, 774, 794, 814,
834, 874, 3055, 3155, 374, 46, 674, ID 3, Topilmadi (×3), 31077, ID 9, 8618 1,
8619 1, 7537 1, Frame 314374, 11678 (×2), 6839 (×2), 8016 (×2), 6581 (×2),
12857 (×2), 17857 (×2), 13297 (×2), 13957 (×2), ID 10, ID 12`.

The pairs of identical names (e.g. "11678 (×2)") suggest copy-paste
duplicates. "Topilmadi" is Uzbek for "not found" — likely a search-result
empty state explored in 3 variants. **Treat as scratch.**

---

### 2 · Light / Requisite — `15836:170962` · 9 frames · UNIQUE

Bank-requisites (RU IBAN-style) transfer flow — **does not exist in Final
Design**, so this is genuinely a WIP feature.

| Frame |
|---|
| Requisite / Country Select |
| Requisite / Selector Opened |
| Requisite / Normal Account (×7 step variants) |

To promote: pick canonical screens, create a new `Light / Requisite` section
on Final Design.

---

### 3 · Light / Support screens — `10358:85629` · 3 frames

| Frame |
|---|
| Support screens |
| Support screens / FAQ |
| Support screens / FAQ / Collapsed Question |

Plus 2 standalone Support frames outside the section. Effectively unique to
Working files — Support / FAQ feature isn't on Final Design.

---

### 4 · Light / My Cards — `18401:105974` · 53 frames · DUPLICATE

The frame name list is **almost identical** to Final Design's `Light / My
Cards` (55 frames). Same Empty / List / PIN COD / Bottom Sheet / Add Cards
Form / Card Settings / Limits / Reissue / Set New Pin / Verification / Select
Card Type / Success Dialogue / OTP / Arrange Card Order / Limits info.

Diff: Final Design has 55 frames, Working files has 53 — Final Design has 2
extra screens (`Bottom sheet / Limits info`, `image 435`). The 53 Working
frames are pre-promotion snapshots.

---

### 5 · Light / My home — `19743:105449` · 19 frames · UNIQUE

A full "My home" feature — group services by home/household.

| Frame |
|---|
| My home / Empty |
| My home / Add home |
| My home / Add home / Focused |
| My home / Change home name / Empty |
| My home / Change home name / Focused |
| My home / Services selection (×2) |
| My home / Services selection / Mobil aloqa / To'lov |
| My home / Services selection / Mobil aloqa / To'lov / Filled |
| My home / Add services |
| My home / Add services / Saved payments |
| My home / Add services / Saved payments / Add from saved |
| My home / Add services / Home settings |
| My home / Inner / Services list (×2) |
| My home / Inner / Services list / Payment |
| My home / Inner / Services list / Payment / Payment cheque |
| My home / Inner / Services list / Success info |
| My home / Delete home |

Promote-ready — covers full empty / add / configure / payment / cheque arc.

---

### 6 · Light / Ucash — `19743:105949` (21) + `19743:106657` (10) · UNIQUE

UCash = cash-money transfer (Western-Union-style).

**`19743:105949` (21 frames):**
- Cash money transfers (×2 entry)
- Enter amount (×8 numeric-pad variants)
- Receiver info (×2)
- Pre check
- Transfer details (×4)
- Check (final cheque)
- Monitoring
- P2P / UZ - KR / Step - 2 / History select (cross-ref)

**`19743:106657` (10 frames):**
A trimmed alternate version of the same flow — Cash money transfers entry,
6 Enter amount variants, 2 Transfer details, 1 P2P UZ-KR cross-ref, 1
Transfers / Fast transfers setted up. Two parallel cuts of the same UCash
flow — likely V1 and V2.

---

### 7 · Gamification — `20917:117600` · 12 frames · UNIQUE

| Frame |
|---|
| Group 38095 (header / decoration) |
| Light / Gamification / Empty state |
| Light / Gamification (×2) |
| **Dark / Gamification** (only Dark variant on file) |
| Light / Gamification / More (×2) |
| Group 38094 |
| Product Image (×3) |
| Group 38096 |

Gamification — likely rewards / streaks / mission UI. Dark mode exists for
this single frame, but not for the rest of the app.

---

### 8 · Light / Auth — `21534:122711` · 38 frames · DUPLICATE

Identical frame-name list to Final Design's `Light / Auth` (38 frames). All
38 Phone / OTP / PIN / Set Password states present in both.

This is a snapshot of the Auth section before promotion. Diff against Final
Design with `id` lookup before deleting — the *Working files* copy may
contain newer iterations even though the names match.

---

### 9 · Authorization 1st Session — `21534:127428` · 20 frames · UNIQUE

A separate auth proposal targeting the **first-session** flow specifically.
Naming uses `Auth /` (not `Light / Auth /`) — different convention.

| Frame |
|---|
| Auth / Phone Number / Empty |
| Auth / Phone Number / Empty & Focused |
| Auth / Connection Error |
| Auth / Phone Number / Filled & Focused |
| Auth / Phone Number / Filled |
| Auth / OTP Code / Focused & Empty |
| Auth / OTP Code / Time Out |
| Auth / OTP Code / Focused & Filled |
| Auth / OTP Code / Error Code (×2) |
| Auth / OTP Code / Loading |
| Auth / Set New Password / Focused & Empty (×3) |
| Auth / Set New Password / Focused & Filled |
| Auth / Confirm New Password / Focused & Filled (×2) |
| Auth / Confirm New Password / Loading |
| Auth / Confirm New Password / Success |
| Annotations |

Notable additions vs canonical Auth: explicit **Connection Error**, **Time
Out** for OTP, dedicated **Loading** states for OTP and Confirm Password.
This is a richer error-state set than Final Design's Auth.

---

### 10 · Chat — `21534:131112` · 6 frames · DUPLICATE

Same 6 frame names as Final Design's Chat (`18921:95858`).

---

## What's promote-ready

These sections exist only on Working files and represent unfinished features
that could be promoted into Final Design:

| Section | Frames | Notes |
|---|---|---|
| Light / Requisite | 9 | Bank-requisites transfer — coherent flow. |
| Light / Support screens | 3 (+ 2 standalone) | Support / FAQ — small. |
| Light / My home | 19 | Home/household services grouping — full empty→cheque flow. |
| Light / Ucash (both) | 21 + 10 | Pick canonical version, then promote. |
| Gamification | 12 | Rewards / streaks UI. |
| Authorization 1st Session | 20 | Stronger error-state coverage than canonical Auth. **Could replace Final Design's Auth.** |

## What's safe to delete after reconciliation

| Section | Frames | Why |
|---|---|---|
| Section 1 | 50 | Numbered scratch frames. |
| Light / My Cards | 53 | Older snapshot of Final Design's My Cards (55). |
| Light / Auth | 38 | Older snapshot of Final Design's Auth (38). |
| Chat | 6 | Older snapshot of Final Design's Chat (6). |

Diff before deleting — the IDs are unique even when names match, so a frame
that *looks* like a duplicate may have post-promotion edits worth merging.

---

## Cross-cutting observations

1. **The page is doing two jobs.** Some sections are scratch (Section 1,
   single-frame iterations like the 11 Phone Number Empty State variants).
   Others are coherent unfinished features (Requisite, My home, Ucash,
   Gamification, Authorization 1st Session).
2. **No naming convention enforces WIP-vs-Final.** Working files and Final
   Design happily share section names. The only way to know which is which
   is the page they live on.
3. **Authorization 1st Session is a more mature Auth proposal** than the
   canonical Auth on Final Design — adds Connection Error / Time Out /
   Loading states. Worth a dedicated comparison pass.
4. **Dark mode is one-frame deep.** Only `Dark / Gamification` exists on
   either page. The rest of the app has no Dark counterpart, despite the
   `Color palette` variable collection having a Dark mode.
