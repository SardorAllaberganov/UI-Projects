# Unired Mobile V.3.2 · User flows

Per-pillar user-flow documentation for the Unired Mobile V.3.2 Figma
project (`GJBbklVuiklO68yppUKYJq`). Each file maps the screens of a
functional pillar into named flows — entry → steps → success / error —
with frame names, node IDs, and Mermaid diagrams.

The pillar split mirrors `Plans/Unired_global_plan.md §2`. WIP / Working-
files flows live alongside their Final-Design counterparts at the bottom of
each pillar file. Cross-cutting templates (cheque, OTP, bottom menu) are
factored into `00_Shared_flows.md`.

**Source Figma file:** [Unired Mobile V.3.2 (Project)](https://www.figma.com/design/GJBbklVuiklO68yppUKYJq/Unired-Mobile-V.3.2--Project-)

---

## Files

| # | File | Pillar | Frame budget |
|---|---|---|---|
| 0 | [00_Shared_flows.md](./00_Shared_flows.md) | Cross-cutting templates (OTP · Cheque · Bottom menu · Status stamps · Money-flow skeleton) | — |
| 1 | [01_Identity_and_Access.md](./01_Identity_and_Access.md) | Splash · Auth · Account · Settings + WIP Authorization 1st Session | 94 + 33 WIP |
| 2 | [02_Cards.md](./02_Cards.md) | My Cards · UCoin + WIP iteration scratch | 85 + 63 WIP |
| 3 | [03_Bank_Account.md](./03_Bank_Account.md) | Bank account ×2 (reconciliation pending) + WIP Requisite | 110 + 9 WIP |
| 4 | [04_Move_Money_Local.md](./04_Move_Money_Local.md) | Mahalliy o'tkazmalar · P2P SBP · PTP Wallet + WIP UCash V1/V2 | 65 + 31 WIP |
| 5 | [05_Move_Money_Cross_Border.md](./05_Move_Money_Cross_Border.md) | P2P (UZ↔KG/TJ/CN/RU) · P2P RU↔UZ dedicated · Wallet transfer all (UZ→KR) · Visa direct · Visa alias | 275 |
| 6 | [06_Pay_Services.md](./06_Pay_Services.md) | Payment · QR payment · ELQR · Steam · Services hub · Application menus + WIP My home · Support · Payment-to-account | 184 + 36 WIP |
| 7 | [07_Currency_FX.md](./07_Currency_FX.md) | Visa exchange · Currency selector | 14 |
| 8 | [08_Lifestyle_Commerce.md](./08_Lifestyle_Commerce.md) | Avia tickets · Card-order applications · Steam skins (out of scope) | 97 |
| 9 | [09_Information_Engagement.md](./09_Information_Engagement.md) | Main · Monitoring · News & Push · Chat · Stories + WIP Gamification · Support / FAQ | 46 + 23 WIP |

**Combined coverage:** ~1,180 frames mapped across 9 pillars, plus shared
templates. Steam skins (46 content tiles) are explicitly out of scope.

---

## Format conventions

Every pillar file follows the same shape:

1. **Header table** — sections / page / node IDs / frames / Final-or-WIP
   status.
2. **Mermaid diagrams** — `flowchart LR` (or `stateDiagram-v2`) per named
   flow. Errors branch with labelled edges.
3. **Step lists** — frame name + node ID per step.
4. **State tables** — for screens with ≥3 explicit states.
5. **Cross-pillar callouts** — italic links to other pillar files or to
   `00_Shared_flows.md`.
6. **WIP / Working files** section — only if the pillar has WIP coverage.
7. **Open questions** — pillar-specific unresolved decisions from the
   global plan.
8. **Reusable components** — primitive / asset list pulled from the
   library audit.

---

## Source documents

The flow files build on these audits in `../Plans/`:

- [Unired_overview.md](../Plans/Unired_overview.md) — page list, frame totals.
- [Unired_global_plan.md](../Plans/Unired_global_plan.md) — pillar definitions, feature matrix, roadmap, open questions.
- [Unired_FinalDesign_LightVersion_audit.md](../Plans/Unired_FinalDesign_LightVersion_audit.md) — section-by-section frame catalog (Final).
- [Unired_WorkingFiles_audit.md](../Plans/Unired_WorkingFiles_audit.md) — section-by-section frame catalog (WIP) + diff vs Final.
- [Unired_library_audit.md](../Plans/Unired_library_audit.md) — tokens, type styles, component library.

---

## Cross-pillar reuse map (quick reference)

The same building blocks reappear across pillars. Knowing where they're
*defined* (vs. *used*) saves re-derivation:

| Template | Defined in | Used by |
|---|---|---|
| OTP — 5 states | [00_Shared_flows § OTP](./00_Shared_flows.md#otp) | A · B · C · D · E · F · G |
| Cheque (Success / Error / Hold) | [00_Shared_flows § Cheque](./00_Shared_flows.md#cheque) | B · C · D · E · F · G · H |
| Bottom Menu (5) + Bottom Menu New (4) | [00_Shared_flows § Bottom menu](./00_Shared_flows.md#bottom-menu) | All non-modal screens |
| Pre Cheque (confirmation) | [00_Shared_flows § Cheque](./00_Shared_flows.md#cheque) | D · E · F · G |
| Country picker | [05_Move_Money_Cross_Border.md § E.0](./05_Move_Money_Cross_Border.md#e0--universal-cross-border-skeleton) | C (Requisite) · D (PTP Wallet) · E (all corridors) |
| Card Input (9 variants) | [02_Cards.md § B.2](./02_Cards.md#b2--add-card) | E (Visa Direct) · F (Payment) · G (Visa exchange) · H (Avia) |
| Status Stamp (6) | [00_Shared_flows § Status icons](./00_Shared_flows.md#status-icons--illustrations) | Every cheque |
| Universal money-flow skeleton | [00_Shared_flows § Universal](./00_Shared_flows.md#universal-money-flow-skeleton) | D · E · F · G |

---

## Open questions consolidated

These block downstream redesign / DS-migration / dark-mode work. Sourced
from `Unired_global_plan.md §4`.

| # | Question | Pillar | File |
|---|---|---|---|
| 1 | Auth canonical — Final 38 frames vs WIP Authorization 1st Session 20 frames | A | [01](./01_Identity_and_Access.md#open-questions-from-global-plan-4) |
| 2 | Bank account — pick canonical from the two parallel sections | C | [03](./03_Bank_Account.md#open-questions-from-global-plan-4) |
| 3 | UCash V1 (21) vs V2 (10) — pick one before promotion | D | [04](./04_Move_Money_Local.md#open-questions-from-global-plan-4) |
| 4 | Dark mode — full theme or remove the lone Gamification dark frame | I + A | [09](./09_Information_Engagement.md#open-questions-from-global-plan-4) |
| 5 | Bottom menu — `Bottom menu` (5) vs `Bottom Menu New` (4), pick one | All | [Shared](./00_Shared_flows.md#bottom-menu) |
| 6 | Service illustrations — current 18 vs deprecated 20 | F | [06](./06_Pay_Services.md#open-questions-from-global-plan-4) |
| 7 | Stories — build out or remove entry-point | I | [09](./09_Information_Engagement.md#open-questions-from-global-plan-4) |
| 8 | News & Push — define surface area (3 frames is below typical coverage) | I | [09](./09_Information_Engagement.md#open-questions-from-global-plan-4) |
| 9 | PTP Wallet — confirm if it's a real feature or a duplicate of P2P + Local | D | [04](./04_Move_Money_Local.md#open-questions-from-global-plan-4) |

---

## What's promote-ready (WIP → Final)

Per global-plan §5 Step 1, these Working-files flows are promote-ready:

- **Authorization 1st Session** (20) — see [01 § WIP](./01_Identity_and_Access.md#wip--working-files)
- **Light / Requisite** (9) — see [03 § WIP](./03_Bank_Account.md#wip--working-files)
- **Light / My home** (19) — see [06 § F.7](./06_Pay_Services.md#f7--my-home-wip)
- **Light / Ucash** (canonical cut) — see [04 § WIP](./04_Move_Money_Local.md#wip--working-files)
- **Light / Support screens** (3 + 2) — see [09 § I.7](./09_Information_Engagement.md#i7--support--faq-wip)
- **Gamification** (12) — see [09 § I.6](./09_Information_Engagement.md#i6--gamification-wip)

---

## Out of scope

- Per-frame deep audits (top-bar / body / CTAs / icons / copy) — deferred
  per global plan §"Caveat on audit depth".
- Steam skins catalog (46 frames) — content, not UI.
- CJMs page (covered separately in the Figma file's CJMs page).
- Visual divider pages (3, 5, 9), Cover (12), Moodboard, Assets pages.
- Component library deep docs — see `../Plans/Unired_library_audit.md`.
