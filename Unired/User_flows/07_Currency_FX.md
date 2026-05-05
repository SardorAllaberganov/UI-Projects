# 07 · Currency & FX · Pillar G

In-app currency conversion (Visa exchange) and the currency selector on
Main. Smallest pillar by frame count — narrow scope, single end-to-end
flow.

| Section | Page | Node ID | Frames | Status |
|---|---|---|---|---|
| Light / Visa exchange | Final Design | `13255:136716` | 13 | Final |
| Light / Main / Authorized User / Select Currency | Final Design | (in Main) | 1 | Final — selector only |

**Total: 14 Final frames.**

---

## G.1 · Visa exchange — currency conversion

**Entry:** Account → "Visa exchange", OR My Cards → card detail → "Convert
currency", OR Main → "Exchange" tile.
**Exit:** Cheque → returns to source card with new balance.
**Goal:** convert balance from one currency to another using Visa's
exchange rate, with the result deposited on a target card (or new wallet).

```mermaid
flowchart LR
    Entry[Account / My Cards / Main → Exchange] --> Empty1[Visa Exchange / Empty 1<br/>source-card field empty]
    Empty1 --> Empty2[Empty 2<br/>rate fetched]
    Empty2 -->|user has source card?| HasCard{Source card?}
    HasCard -->|no| NC1[No Card 1<br/>"Add a card to exchange"]
    NC1 --> NC2[No Card 2<br/>add-card prompt]
    NC2 -->|tap "Add card"| AddCard[→ B.2 Add card]
    HasCard -->|yes, tap "From currency"| Curr[Currencies picker<br/>UZS / USD / RUB / EUR…]
    Curr -->|tap a currency| Filled[Filled<br/>FX rate displayed, amount input enabled]
    Filled -->|type amount| Amt[Filled / amount typed]
    Amt -->|sufficient funds| OTP[OTP — see 00_Shared_flows]
    Amt -->|insufficient| InsufErr[Insufficient Funds Error<br/>FX rate visible, "adjust amount" CTA]
    InsufErr -->|tap "Edit"| Filled
    OTP -->|valid| Cheque[Cheque ×5<br/>success / variant / error]
    Cheque -->|tap "Done"| Card[Source card with new balance]
```

### Step ledger

| # | User action | Screen | Frame |
|---|---|---|---|
| 1 | Tap "Visa exchange" entry | Empty (rate fetching) | Visa Exchange / Empty (1) |
| 2 | (rate loaded) | Empty 2 | Visa Exchange / Empty (2) |
| 3a | (user has no Visa card) | No Card | Visa Exchange / No Card (1..2) |
| 3b | (user has card) Tap "From currency" | Currencies picker | Visa Exchange / Currencies |
| 4 | Tap a currency | Filled (rate shown) | Visa Exchange / Filled |
| 5 | Type amount | (variant) | (variant) |
| 5a | (insufficient) | Insufficient error | Visa Exchange / Insufficient Funds Error |
| 6 | Tap "Convert" | OTP | (cross-ref Auth / OTP / Empty State) |
| 7 | Type code | OTP Filled | (cross-ref) |
| 8 | (server: ok) | Cheque | Visa Exchange / Cheque (1..5) |
| 9 | Tap "Done" | → source card | — |

### Cluster

| Group | Count | Notes |
|---|---|---|
| Visa Exchange / Empty | 2 | Resting state, no rate fetched / rate fetched |
| Insufficient Funds Error | 1 | Source card balance too low; FX rate still shown |
| No Card | 2 | User has no Visa card to exchange from |
| Currencies | 1 | Currency-pair picker |
| Filled | 1 | Form completed, ready to submit |
| Cheque | 5 | Confirmation cheque variants |
| Auth / OTP / Empty State (cross-ref) | 1 | OTP fallback |

The **Insufficient Funds Error** state is keyed differently from Payment's
identically-named state — the Visa-exchange one shows the FX rate before
flagging the gap, so the user can adjust amount.

*Reuses OTP template — see [00_Shared_flows § OTP](./00_Shared_flows.md#otp).*
*Reuses cheque template — see [00_Shared_flows § Cheque](./00_Shared_flows.md#cheque).*

---

## G.2 · Currency selector on Main

A single frame inside `Light / Main`: `Light / Main / Authorized User /
Select Currency` (`10031:77293`). Switches the displayed currency on the
home screen — does **not** trigger a real conversion, just a UI preference.

**Entry:** Main → tap balance figure / tap currency chip.
**Exit:** Returns to Main with balances re-formatted in chosen currency.
**Goal:** view all card balances in a single chosen display currency
(real balances unchanged).

```mermaid
flowchart LR
    Main[I.1 Main / Authorized] -->|tap currency chip / balance| Sel[Select Currency<br/>UZS / USD / RUB / EUR list]
    Sel -->|tap currency| Main
    Sel -->|tap "Convert real money"| G1[→ G.1 Visa exchange]
```

### Step ledger

| # | User action | Screen | Frame |
|---|---|---|---|
| 1 | Tap currency chip on Main | Currency picker | `10031:77293` |
| 2 | Tap a currency | (preference saved) | (transition) |
| 3 | (returns to Main) | Balances re-formatted | (cross-ref I.1) |

Cross-reference to [09_Information_Engagement.md § I.1](./09_Information_Engagement.md#i1--main--home).

---

## Open questions

No pillar-specific open questions in the global plan. The thinness of this
pillar (13 frames) reflects FX being a niche use-case in the Unired product
mix; cross-border *transfers* are far heavier (see Pillar E).

The most likely coverage gap: **rate-locking** (capture the rate at view-
time so it doesn't move during OTP). Not visible in current screens.

---

## Reusable components

From `Unired_library_audit.md`:

- **Country Flags** (96) — currency-flag icons in selector
- **Payment System Logos** (26) — Visa indicator
- **Card Input** (9) — source card entry
- **Input** (35) — amount entry
- **Stamp** (6) — cheque overlay
- **Loader** (8) — rate-fetch loader
- **Modal - status** — error / no-card modals
- **Bottom Menu** — see [00_Shared_flows § Bottom menu](./00_Shared_flows.md#bottom-menu)
- **Action Buttons Section** — cheque CTA rail
