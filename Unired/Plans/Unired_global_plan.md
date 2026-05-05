# Unired Mobile V.3.2 — Global plan

Source file: `GJBbklVuiklO68yppUKYJq`
Captured: 2026-04-27

This doc synthesises the structural audit into a **product-level view**: what
Unired *is*, what it *does*, where each capability lives in the file, what's
ready, what's WIP, and what needs a product / design decision before any
redesign or DS-migration starts.

---

## 1 · Executive summary

Unired is a **CIS-market mobile fintech app** centered on Uzbekistan.
The product handles the four standard fintech jobs (account, card,
move money, pay bills) plus a heavy **cross-border remittance layer**
(UZ ↔ RU / KG / TJ / CN / KR) and a small set of **lifestyle services**
(avia tickets, Steam, UCoin loyalty, gamification). The Figma file
represents the v3.2 design pass: **~999 production-bound screens** on
*Final Design / Light Version*, **~284 in-flight screens** on *Working
files*, supported by a 33-component system library and a Manrope-based
type ramp.

**State of the design.** The system primitives are in place but the
application of them is uneven — duplicate "Bank account" sections exist,
the Auth flow has a **stronger WIP variant** that hasn't been promoted,
Dark mode is one-frame-deep, and ~480 asset variants (bank logos /
flags) bloat the local component library. A migration to the published
Mobile App Fintech DS (our 402×874 system) would mostly be a
screen-level rebuild, not a primitive lift-and-shift.

---

## 2 · Functional pillars

The app's surfaces group cleanly into 9 pillars. Each pillar maps to
one or more sections in the file.

### Pillar A · Identity & access
Sign-in, KYC, profile, security.

| Capability | Section | Frames | State |
|---|---|---|---|
| Splash + language | Light / Splash Screens | 3 | Stable |
| Phone-number → OTP → PIN → Password auth | Light / Auth | 38 | Stable, but a **stronger WIP exists** (see Authorization 1st Session below) |
| First-session-specific auth (richer error states) | Authorization 1st Session (Working files) | 20 | **Promote-ready** — adds Connection Error / Time Out / Loading |
| Account profile | Light / Account | 27 | Stable |
| Email setup + OTP | Light / Account / Set Email | (inside Account) | Stable |
| Identification / KYC | Light / Account / Identification User | (inside Account) | Stable |
| Settings (theme / language / PIN / password / sessions) | Light / Settings | 26 | Stable |
| Splash variant | standalone | 1 | OK |

### Pillar B · Cards
Bank cards, card art, card management.

| Capability | Section | Frames | State |
|---|---|---|---|
| Card list / detail / blocked | Light / My Cards | 55 | Stable |
| Add card form | Light / Add Cards Form | (inside My Cards) | Stable |
| Card bottom sheets — settings, limits, reissue, security, set new PIN | Light / My Cards / Bottom Sheet | (inside My Cards) | Stable |
| Verification / Select card type / Success | Light / My Cards | (inside) | Stable |
| Arrange card order | Light / My Cards / Arrange Card Order | (inside) | Stable |
| UCoin loyalty card | UCoin | 30 | Stable, but parallel to bank cards — review IA |

### Pillar C · Bank account
Account numbers / requisites / statements.

| Capability | Section | Frames | State |
|---|---|---|---|
| Bank account screens | Bank account (×2 sections) | 58 + 52 | **Two parallel sections** — reconcile before any redesign |
| Bank-requisites payment | Light / Requisite (Working files) | 9 | **Promote-ready** — unique to Working files |

### Pillar D · Move money — local
UZ ↔ UZ transfers.

| Capability | Section | Frames | State |
|---|---|---|---|
| Local transfers (Visa-network, in-country) | Mahalliy o'tkazmalar | 41 | Stable |
| SBP-style transfer (phone / card / cheque) | Light / P2P SBP | 13 | Stable |
| PTP Wallet | PTP Wallet | 11 | Looks like a presentation copy — references existing Local Transfers + UZ-TJ |
| Cash money transfer | Light / Ucash (Working files, ×2 cuts) | 21 + 10 | **Promote-ready**, two cuts to reconcile |

### Pillar E · Move money — cross-border
UZ ↔ KG / TJ / CN / RU / KR.

| Capability | Section | Frames | State |
|---|---|---|---|
| **All cross-border corridors** (UZ↔KG, UZ↔TJ, UZ↔CN, UZ↔RU) | Light / P2P | **175** | Largest section in file — audit by corridor |
| Russia ↔ Uzbekistan dedicated | P2P Russia ↔ Uzbekistan | 54 | Stable |
| RU↔UZ + KR variants | Wallet transfer all | 14 | Stable |
| Visa Direct card-number entry | Light / Visa direct | 16 | Stable |
| Visa Alias connect / change | Light / Visa alias | 16 | Stable |

### Pillar F · Pay services
Bills, providers, QR.

| Capability | Section | Frames | State |
|---|---|---|---|
| Utility / phone bills / Steam / saved templates | Payment | 67 | Stable |
| QR payment (scan, location, tips, OTP, receipt) | Light / QR payment | 48 | Stable |
| Electronic-receipt QR (e-fiscal) | ELQR | 14 | Stable |
| Steam game payment | Steam | 21 | Stable |
| Steam skins catalog | Steam skins | 46 | Content tiles, not UI — out of scope |
| Payment to account number | standalone (Working files) | 14 | WIP — reconcile with Bank account / Requisite |
| Saved-payments + Save-payment setup | (inside Payment) | (inside) | Stable |
| Service hub (customisable rail of shortcuts) | Light / Services screens | 4 | Stable |
| Group-services-by-home | Light / My home (Working files) | 19 | **Promote-ready** unique feature |

### Pillar G · Currency & FX
| Capability | Section | Frames | State |
|---|---|---|---|
| Visa exchange (in-app FX) | Light / Visa exchange | 13 | Stable |
| Currency selector on Main | Light / Main / Authorized User / Select Currency | (inside Main) | Stable |

### Pillar H · Lifestyle & commerce
| Capability | Section | Frames | State |
|---|---|---|---|
| Avia ticket booking (search, filter, baggage, passengers, payment) | Light / Avia tickets | **67** | Stable, full flow |
| Card-order application (with map address) | Light / Application menus | 30 | Stable |

### Pillar I · Information & engagement
| Capability | Section | Frames | State |
|---|---|---|---|
| Home / Main (guest, authorized, with cards, search) | Light / Main | 18 | Stable |
| Transaction monitoring | Monitoring | 16 | Stable |
| News + push notifications | Light / News & Push messages | 3 | Thin — likely needs more states |
| In-app support chat | Chat | 6 | Stable |
| Support / FAQ | Light / Support screens (Working files) | 3 (+2 standalone) | **Promote-ready** |
| Stories | standalone (`21523:105023`) | 1 (375×812) | Likely incomplete |
| Gamification (rewards / streaks) | Gamification (Working files) | 12 | **Promote-ready** — has lone Dark variant |

---

## 3 · Feature matrix · what does Unired do, end to end

Combining the pillars into a feature list with promotion / completeness state.

| Feature | Pillar | Status | Where |
|---|---|---|---|
| Splash + language picker | Identity | ✅ Final | Splash Screens |
| Phone-number sign-in | Identity | ✅ Final | Auth |
| First-session error / time-out / loading states | Identity | 🟡 WIP — better than Final | Auth 1st Session (WF) |
| Set / change PIN | Identity | ✅ Final | Auth + Settings |
| Set / change password | Identity | ✅ Final | Auth + Settings |
| Sessions list + delete | Identity | ✅ Final | Settings |
| Theme switch | Identity | 🟡 Partial — only Gamification has Dark | Settings (light only ships) |
| Language switch | Identity | ✅ Final | Settings |
| KYC / identification | Identity | ✅ Final | Account |
| Set email + OTP | Identity | ✅ Final | Account |
| Profile / share link | Identity | ✅ Final | Account |
| Card list + reorder | Cards | ✅ Final | My Cards |
| Add card form (UZ + RU formats) | Cards | ✅ Final | My Cards / Add Cards Form |
| Card limits / reissue / set-new-PIN / security | Cards | ✅ Final | My Cards bottom sheets |
| UCoin loyalty card | Cards | ✅ Final | UCoin |
| Bank account view | Bank account | ⚠️ Two parallel sections | Bank account ×2 |
| Bank requisites payment | Pay services | 🟡 WIP | Requisite (WF) |
| Local UZ↔UZ transfer | Local money | ✅ Final | Mahalliy o'tkazmalar |
| Local UZ↔UZ via SBP | Local money | ✅ Final | P2P SBP |
| Cash transfer (UCash) | Local money | 🟡 WIP, two cuts | Ucash ×2 (WF) |
| **UZ↔KG transfer** (phone / card / QR) | Cross-border | ✅ Final | P2P |
| **UZ↔TJ transfer** (phone / card) | Cross-border | ✅ Final | P2P |
| **UZ↔CN transfer** | Cross-border | 🟡 Thin set | P2P (UZ-CN) |
| **UZ↔RU transfer** (phone / card / requisites / OTP) | Cross-border | ✅ Final | P2P + Wallet transfer all + P2P Russia↔Uzbekistan |
| **UZ↔KR transfer** (bank info + personal info) | Cross-border | ✅ Final | Wallet transfer all |
| Visa Direct entry | Cross-border | ✅ Final | Visa direct |
| Visa Alias setup | Cross-border | ✅ Final | Visa alias |
| Cheque (success / error / hold) | Cross-cutting | ✅ Final | duplicated in many sections |
| Utility / Phone-bill / electricity payment | Pay services | ✅ Final | Payment |
| Steam payment | Pay services | ✅ Final | Steam |
| QR payment (scan / location / tips / pay) | Pay services | ✅ Final | QR payment |
| Electronic-receipt QR | Pay services | ✅ Final | ELQR |
| Save-payment templates | Pay services | ✅ Final | Payment / Saved |
| My home (group services by household) | Pay services | 🟡 WIP, full flow | My home (WF) |
| Services hub (shortcut rail) | Information | ✅ Final | Services screens |
| Visa exchange (FX) | Currency | ✅ Final | Visa exchange |
| Avia ticket booking (full flow) | Lifestyle | ✅ Final | Avia tickets |
| Card-order application (with map) | Lifestyle | ✅ Final | Application menus |
| Home (guest / authorized / cards) | Information | ✅ Final | Main |
| Search | Information | ✅ Final | Main / Search |
| Transaction monitoring | Information | ✅ Final | Monitoring |
| News feed | Information | ⚠️ Thin (3 frames) | News & Push messages |
| Push notifications | Information | ⚠️ Thin | News & Push messages |
| In-app chat / support | Information | ✅ Final | Chat |
| Support / FAQ | Information | 🟡 WIP | Support screens (WF) |
| Stories block | Engagement | ⚠️ Single frame | standalone |
| Gamification rewards | Engagement | 🟡 WIP | Gamification (WF) |
| Cheque PDF (A4) export | Cross-cutting | ✅ Final | standalones |

Legend: ✅ Final = on Final Design and complete · 🟡 WIP = on Working files, promotion candidate · ⚠️ = exists but undercovered.

---

## 4 · Decisions / open questions for product

Each of these blocks downstream work (redesign planning, DS migration, dark
mode, etc.) until resolved.

1. **Auth canonical** — keep Final Design's `Light / Auth` (38 frames) or
   promote *Authorization 1st Session* (20 frames, richer error coverage)?
   Recommendation: promote, then port the missing 1st-session screens onto
   the existing 38-frame skeleton.
2. **Bank account reconciliation** — there are two `Bank account` sections
   (58 + 52 frames). Pick one as canonical, archive the other.
3. **UCash V1 vs V2** — two cuts on Working files (21 + 10 frames). Pick
   one and promote.
4. **Dark mode policy** — only `Dark / Gamification` exists. Either commit
   to a full Dark theme (then audit `Main variables collection` which is
   Light-only) or remove the lone Dark frame to avoid implying Dark support.
5. **Bottom menu generation** — `Bottom menu` (5 variants) and `Bottom Menu
   New` (4 variants) both ship. Some screens reference one, some the other.
   Pick one.
6. **Service illustrations** — `Service illustrations` (18) and `Service
   illustrations - old` (20) coexist. Adoption is partial. Decide and
   prune.
7. **Stories** — only one Stories frame on Final Design. Either build out
   the full Stories experience or remove the entry-point.
8. **News & Push depth** — 3 frames is below typical coverage (need empty
   state, error, paginated, filter). Define the news feature's surface
   area before building.
9. **PTP Wallet** — section appears to be a re-presentation of existing
   P2P / Local Transfers. Confirm whether it's a new feature or a duplicate
   to delete.

---

## 5 · Roadmap (suggested ordering)

If the goal is **a clean v3.3 ready for DS migration**, work in this order.

### Step 0 — Reconciliation (no new design)
Resolve the open questions above. Archive duplicates. Pick canonical
versions.

### Step 1 — Promote WIP features
Move from Working files → Final Design:
- Authorization 1st Session (replaces / augments Auth)
- Light / Requisite
- Light / My home
- Light / Ucash (canonical cut)
- Light / Support screens
- Gamification

### Step 2 — Component cleanup
- Consolidate List Item flavors (4 masters → 1).
- Merge `Bottom menu` and `Bottom Menu New`.
- Wrap asset sets (bank logos / flags) as INSTANCE_SWAP slots, not 480
  individually-published components.
- Add Dark mode bindings to `Main variables collection` (or split tokens
  cleanly).

### Step 3 — Coverage gaps
- Build out News & Push messages (5–10 more states).
- Build out Stories (or remove).
- Define error-state coverage uniformly across flows (Auth 1st Session is
  the model — apply that depth elsewhere).

### Step 4 — DS migration (optional, if greenlit)
Port Final Design / Light Version to the Mobile App Fintech DS
(`gSas2PBv3XMAXj36FQDhFa`):
- Phase 1: Auth + Main (high-leverage, canonical)
- Phase 2: My Cards + Payment (highest-traffic surfaces)
- Phase 3: P2P (audit by corridor)
- Phase 4: Avia + Steam + QR + ELQR + remainder
- Phase 5: Lifestyle / engagement (UCoin, Gamification, Stories)
- Each phase = audit → build any missing DS components → publish → compose
  → validate (the AsiaSend pattern).

Frame-canvas size shift: Unired is 375×812; the DS is 402×874.
A redesign relayouts every screen — it isn't a 1:1 lift.

---

## 6 · Risk register

| Risk | Severity | Mitigation |
|---|---|---|
| Duplicate sections (Bank account ×2) ship inconsistent variants | High | Reconcile before any further section work |
| Working-files Auth is more mature than canonical | Medium | Compare frame-by-frame, port stronger states into canonical |
| 175-frame P2P section is too dense to audit in one pass | High | Break by corridor; treat each corridor as a Phase |
| 480+ asset components bloat library publishing | Medium | Wrap as INSTANCE_SWAP slots before any DS publish |
| Theming gap (Light-only `Main variables collection`) | Medium | Either add Dark mode or remove the lone Dark frame |
| 33 system components, but variant coverage is thin (Switch=4, Tooltip=2) | Medium | Audit primitive coverage before screen-level redesign |
| No published library — every consumer needs to clone | Low | Publish as remote library (mirrors what we did with Mobile App Fintech DS) |

---

## 7 · Quick metrics

| Metric | Value |
|---|---|
| Total screens on Final Design / Light Version | ~999 |
| Total screens on Working files | ~284 |
| Largest section | Light / P2P (175) |
| Smallest section | News & Push messages (3) |
| Sections | 30 (Final) + 11 (WF) = 41 |
| Cross-border corridors covered | 5 (UZ↔KG / TJ / CN / RU / KR) |
| Lifestyle features | 2 (Avia tickets, Steam payment + skin catalog) |
| Type styles | 46 (Manrope) |
| Variable collections | 2 (one Light-only) |
| System UI components | 33 |
| Asset components | 480+ |
| Frame canvas | 375 × 812 (Unired) vs 402 × 874 (our DS) |

---

## 8 · Doc set

- [Unired_overview.md](./Unired_overview.md) — page list + frame totals.
- [Unired_library_audit.md](./Unired_library_audit.md) — tokens + components.
- [Unired_FinalDesign_LightVersion_audit.md](./Unired_FinalDesign_LightVersion_audit.md) — Final-Design section catalog.
- [Unired_WorkingFiles_audit.md](./Unired_WorkingFiles_audit.md) — Working-files catalog + diff.
- **[Unired_global_plan.md](./Unired_global_plan.md)** — this file.
