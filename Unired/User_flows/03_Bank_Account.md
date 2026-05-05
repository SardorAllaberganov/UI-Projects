# 03 · Bank Account · Pillar C

Bank account number, requisites, account statements, and payment by bank
requisites. **The smallest pillar by flow count, but flagged with the most
hygiene issues** — two duplicate sections + one unique WIP that hasn't been
promoted.

| Section | Page | Node ID | Frames | Status |
|---|---|---|---|---|
| Bank account (v1) | Final Design | `17273:118008` | 58 | Final — duplicate ⚠ |
| Bank account (v2) | Final Design | `17155:121512` | 52 | Final — duplicate ⚠ |
| Light / Requisite | Working files | `15836:170962` | 9 | **WIP — unique** |

**Total: 110 Final + 9 WIP = 119 frames.**

---

## C.1 · Bank account view & statement

**Entry:** Account → "Bank account" tile, OR Main → account-info card.
**Exit:** Pay → C.2; Statement → PDF export; Back → Account.

Both sections are named "Bank account" with **near-identical frame names**.
Until reconciliation, treat both as candidates and **diff by ID** before
acting.

```mermaid
flowchart LR
    Acct[Account / Authorized] -->|tap "Bank account"| View[Bank account view<br/>account number + balance]
    View -->|tap "Statement"| Stmt[Statement<br/>transaction list per period]
    View -->|tap "Requisites"| Reqs[Requisites detail<br/>IBAN / SWIFT / BIC info]
    Reqs -->|tap "Share"| Share[Share sheet<br/>OS share]
    Reqs -->|tap "Copy"| Copy[Toast: copied]
    View -->|tap "Pay by requisites"| Pay[→ C.2 pay-by-requisites]
    Stmt -->|tap row| Detail[Transaction detail<br/>same as Monitoring]
    Stmt -->|tap "Export"| PDF[A4 PDF export]
```

### Step ledger

| # | User action | Screen | Frame (cluster) |
|---|---|---|---|
| 1 | Tap "Bank account" tile on Account / Main | Account view | Light / Bank account (`17273:118008` v1 or `17155:121512` v2) |
| 2 | Tap "Statement" tab | Statement list | Light / Bank account / Statement |
| 3 | Tap a transaction row | Detail | Light / Bank account / Detail |
| 4 | Tap "Requisites" tab | Requisite detail | Light / Bank account / Requisites |
| 5 | Tap "Share" / "Copy" | OS share / toast | (system layer) |
| 6 | Tap "Pay by requisites" | → C.2 | (transition) |

Cross-references inside both sections:
- OTP states (cross-ref Auth)
- P2P / Local Transfers (cross-ref Pillar D)
- P2P / UZ → Russia (cross-ref Pillar E)

The two sections have heavy `Light / Bank account` repetition. The
difference is in IDs only — names match. **Open question §4.2 of the
global plan blocks any further work here.**

*Reuses OTP template — see [00_Shared_flows § OTP](./00_Shared_flows.md#otp).*
*Reuses cheque template — see [00_Shared_flows § Cheque](./00_Shared_flows.md#cheque).*

---

## C.2 · Pay by requisites (cross-pillar dispatch)

**Entry:** C.1 → "Pay by requisites" CTA.
**Exit:** Cheque (success / error / hold).

This is a dispatcher: the user picks the destination, the form routes to
the matching pillar's payment screen.

```mermaid
flowchart LR
    C1[C.1 Bank account view] -->|tap "Pay by requisites"| Pick[Country / target picker]
    Pick -->|UZ recipient| Local[→ D.1 Mahalliy o'tkazmalar]
    Pick -->|RU recipient| RU[→ E.4 P2P RU↔UZ]
    Pick -->|other| Generic[Generic requisites form<br/>likely covered by WIP § C.3]
```

### Cross-pillar links

Bank account screens reference (do not own) these flows:

- **Local Transfers** — payment by requisites can fund a UZ↔UZ local
  transfer. See [04_Move_Money_Local.md § D.1](./04_Move_Money_Local.md#d1--mahalliy-otkazmalar--uzuz-local-transfers).
- **P2P UZ → Russia** — payment by requisites also feeds the cross-border
  RU corridor. See [05_Move_Money_Cross_Border.md § E.4](./05_Move_Money_Cross_Border.md#e4--p2p-russia--uzbekistan-dedicated).

---

## WIP / Working files

### C.3 · Light / Requisite — `15836:170962` · 9 frames · UNIQUE

Bank-requisites (RU IBAN-style) transfer flow — **does not exist on Final
Design**, so this is a genuinely missing feature.

**Entry:** C.1 → "Pay by requisites" → "Other" / "International" branch
(once promoted, this becomes the canonical international-requisites flow).
**Exit:** Cheque.
**Goal:** capture full IBAN + recipient bank + recipient personal info,
fund from a Unired card, post via SWIFT-style rail.

```mermaid
flowchart LR
    Entry[Bank account / Pay by requisites] -->|tap "International"| CS[Country Select<br/>flag list]
    CS -->|tap country| SO[Selector Opened<br/>bank picker]
    SO -->|tap bank| NA1[Normal Account / step 1<br/>IBAN entry]
    NA1 -->|type IBAN| NA2[step 2 / IBAN validated]
    NA2 -->|type recipient name| NA3[step 3 / recipient]
    NA3 -->|type amount + currency| NA4[step 4 / amount]
    NA4 -->|pick funding card| NA5[step 5 / card]
    NA5 -->|review| NA6[step 6 / Pre Cheque]
    NA6 -->|tap Confirm| NA7[step 7 / submit]
    NA7 --> OTP[OTP — see 00_Shared_flows]
    OTP -->|valid| Cheque[Cheque]
```

### Step ledger

| # | User action | Screen | Frame |
|---|---|---|---|
| 1 | (arrive from C.1) | Country picker | Requisite / Country Select |
| 2 | Tap a country (RU / UA / KZ / etc.) | Bank-list overlay | Requisite / Selector Opened |
| 3 | Tap a bank | IBAN entry | Requisite / Normal Account (step 1) |
| 4 | Type IBAN | Validated state | Requisite / Normal Account (step 2) |
| 5 | Type recipient name | Recipient state | Requisite / Normal Account (step 3) |
| 6 | Type amount + pick currency | Amount state | Requisite / Normal Account (step 4) |
| 7 | Pick funding card | Card-picked state | Requisite / Normal Account (step 5) |
| 8 | Review | Pre Cheque | Requisite / Normal Account (step 6) |
| 9 | Confirm | Submit / loading | Requisite / Normal Account (step 7) |
| 10 | (server: ok → OTP → cheque) | (cross-ref) | (Shared OTP + Cheque) |

> The 7 "Normal Account" step variants document a progressive form-fill
> — each step adds a field's state to the previous. The audit names them
> `Requisite / Normal Account (×7 step variants)` — sequence above is
> inferred from the IBAN-payment standard pattern.

**Promote-ready.** Pick canonical screens, create a new `Light / Requisite`
section on Final Design (global plan §5 Step 1).

---

## Open questions (from global plan §4)

1. **Bank account reconciliation (§4.2)** — there are two `Bank account`
   sections (58 + 52 frames). Pick one as canonical, archive the other.
   Diff by ID first — IDs differ even where names match, so post-promotion
   edits may exist on either side.
2. **Promote Requisite (§5 Step 1)** — Working-files Requisite is the only
   bank-requisites payment treatment in the file. No matching Final flow.

---

## Reusable components

From `Unired_library_audit.md`:

- **Country Flags** (96 variants) — country selector in C.3
- **Input** (35) — account-number / IBAN entry
- **Section Heading** — section dividers
- **Bottom Menu** (5) — see [00_Shared_flows § Bottom menu](./00_Shared_flows.md#bottom-menu)
- **Stamp** (6) — cheque overlay
- **Modal - status** — confirmation modals
- **Russian Bank Logos** (21) + **Russian Bank Icons** (154) — for RU IBAN
  bank picker inside Requisite
- **Card Input** (9) — funding-card entry inside Requisite
- **Loader** (8) — IBAN validation, OTP loading
