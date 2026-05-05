# 08 · Lifestyle & Commerce · Pillar H

Avia ticket booking + card-order applications + Steam skin catalog
(content-only). Two genuine app flows + one out-of-scope content module.

| Section | Page | Node ID | Frames | Status |
|---|---|---|---|---|
| Light / Avia tickets | Final Design | (per global plan) | 67 | Final — full flow |
| Light / Application menus | Final Design | `17155:121025` | 30 | Final — shared with Pillar F |
| Steam skins | Final Design | `17096:93687` | 46 | **Out of scope — content tiles** |

**Total: 97 Final frames (Avia + Application menus); 46 catalog frames excluded.**

> Pillar H overlaps with Pillar F (`Light / Application menus`). This file
> covers the **physical-card-order** angle of that section; the WIP /
> custom card aspects live in
> [06_Pay_Services.md § F.6](./06_Pay_Services.md#f6--application-menus-card-order--address).

---

## H.1 · Avia ticket booking — full flow

The most complete consumer-flow on the file. 67 frames cover search
through payment.

```mermaid
flowchart LR
    Search[Search] --> Filter[Filter]
    Filter --> Results[Results list]
    Results --> Detail[Flight detail]
    Detail --> Pax[Passengers]
    Pax --> Bag[Baggage]
    Bag --> Pay[Payment]
    Pay --> OTP[OTP — see 00_Shared_flows]
    OTP --> Cheque[Cheque / e-ticket]
```

**Note:** the audit file names `Light / Avia tickets` as a 67-frame
section in the global plan §"Pillar H · Lifestyle & commerce" but the
detailed audit listing focuses primarily on the other 30 sections of Final
Design. The 67-frame breakdown is documented at the pillar / global level
only — per-frame names are not enumerated in
`Unired_FinalDesign_LightVersion_audit.md`. The flow shape above is
inferred from the global plan's own description: *"search, filter, baggage,
passengers, payment"*.

For deep audit (top-bar / body / CTAs per frame), this section is a
candidate for a follow-up Phase 2 audit (global plan §"Caveat on audit
depth"). Until then, treat each named cluster (search, filter, results,
passengers, baggage, payment, cheque) as a Macy-style milestone rather
than a numbered step list.

*Reuses OTP template — see [00_Shared_flows § OTP](./00_Shared_flows.md#otp).*
*Reuses cheque template — see [00_Shared_flows § Cheque](./00_Shared_flows.md#cheque).*

---

## H.2 · Card-order application (physical card)

Source: `Light / Application menus` (`17155:121025`). 30 frames. Shared
with Pillar F — see
[06_Pay_Services.md § F.6](./06_Pay_Services.md#f6--application-menus-card-order--address)
for the full mermaid + cluster.

The **physical-card-order** is the lifestyle aspect:

```mermaid
flowchart LR
    Order[Order card ×9] --> Type[Pick card type]
    Type --> Custom[Custom card number ×11]
    Custom --> Apps[Applications]
    Apps --> Addr[Address ×3]
    Addr --> Map[Address / Map — pin drop]
    Map --> Filled[Address / Filled]
    Filled --> Submit[Submit application]
    Submit --> Mine[My applications — track status]
```

The map-pin-drop sub-flow is unique to this lifestyle pillar — used to
specify the physical delivery address for the new card.

---

## H.3 · Steam skins (out of scope)

Source: `Steam skins` (`17096:93687`). 46 frames.

A flat catalog of CS:GO weapon-skin tiles consumed by the Steam payment
integration. Tile examples (per audit):

> 3rd Commando Company KSK · AK-47 Elite Build · AK-47 Ice Coaled · AK-47
> Inheritance · AK-47 Olive Polycam · AWP Ice Coaled · Printstream · Broken
> Fang Gloves · Desert Eagle Mecha Industries / Serpent Strike / Trigger
> Discipline · Dragomir Sabre · …

These are **content tiles, not UI screens**. There's no flow through them
beyond pick-and-buy. Out of scope for any UI redesign work — treat as
embedded artwork. The actual purchase flow lives in
[06_Pay_Services.md § F.4 Steam payment](./06_Pay_Services.md#f4--steam-payment).

---

## Open questions

No pillar-specific open questions. The Avia booking flow is the deepest
unaudited surface in the file — a Phase 2 deep audit of the 67 Avia frames
would be the highest-leverage next investment for this pillar.

---

## Reusable components

From `Unired_library_audit.md`:

- **Section Heading** + heading decorator — Avia search header / filters
- **Input** (35) — passenger names, search fields
- **Card Input** (9) — payment card entry
- **Status Icons** (17) — status indicators on flight results
- **Bank Card** (9) — payment card visualisation
- **Loader** (8) — search / payment loading
- **Stamp** (6) — cheque overlay
- **Modal - status** — confirmation modals
- **Action Buttons Section** — final CTA rail
- **Bottom Menu** — see [00_Shared_flows § Bottom menu](./00_Shared_flows.md#bottom-menu)
