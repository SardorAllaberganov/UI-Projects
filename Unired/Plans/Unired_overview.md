# Unired Mobile V.3.2 — File overview

Figma file: `GJBbklVuiklO68yppUKYJq`
File name: **Unired Mobile V.3.2 (Project)**
Captured: 2026-04-27

## Purpose

Unired is a CIS-market mobile fintech app (Uzbekistan-first, with cross-border
flows for Russia, Tajikistan, Kyrgyzstan, China, Korea). The Figma file is the
**single source of truth for the v3.2 design** — production-bound screens live
on the *Final Design / Light Version* page, in-flight iterations live on
*Working files*, and there's a parallel *About* page used as a presentation /
explainer canvas.

---

## Pages (12 total)

| # | Page name | ID | Top-level nodes | Role |
|---|---|---|---|---|
| 1 | 📃 About | `2190:15131` | 55 | Presentation canvas — magnet card, support, verification, "Demo mode" demo, mood/icon experiments. Mixed: SECTION blocks + many loose images, vectors, and a few embedded COMPONENTs (mood faces, etc.). |
| 2 | ⏰ Working files | `1019:10238` | 56 | **In-flight iterations.** 11 SECTION blocks (Section 1 scratch · Requisite · Support screens · My Cards · My home · Ucash ×2 · Gamification · Auth · Authorization 1st Session · Chat) + 43 standalone WIP frames (mostly Payment / Phone Number Empty State variants). |
| 3 | --- | `8840:181371` | 0 | Visual divider only. |
| 4 | ☑️ Final Design / Light Version | `310:731` | 43 | **Canonical screens.** 30 SECTION blocks covering every production flow + 13 standalone frames (splash, story sets, notification thumbnails). |
| 5 | --- | `8840:181373` | 0 | Visual divider only. |
| 6 | 📋 CJMs | `5703:64689` | 11 | Customer Journey Maps + horizontal brief schemes for the v3.2 redesign rationale. Existing artifacts (CJM, CJM p1, CJM p2, UCash scheme, etc.). |
| 7 | ❖ Components | `378:223` | 244 | Component library. 36 sets + 141 standalone components + 1 `System components` SECTION (33 items — the actual UI primitives). Heavy on illustration / logo / bank-icon assets. |
| 8 | 🎨 Styleguide | `1021:10245` | 3 | Design tokens — color palette + typography scale + state samples. |
| 9 | --- | `1019:10243` | 0 | Visual divider only. |
| 10 | ▚ Moodboard | `0:1` | 7 | Inspiration canvas — likely competitor refs, brand exploration. |
| 11 | 📂 Assets | `2:272` | 64 | Static asset bin — exports, third-party imagery, raw files. |
| 12 | 🖼 Cover | `1019:10242` | 0 | File cover thumbnail (empty). |

---

## Frame size convention

**Almost all production screens are 375 × 812** (iPhone 13 / 14 native size,
pre-Pro-Max). A handful use larger heights for scrolling-content captures
(1094, 1402, 1444, 1697, 1821, 2438) — these are full-page captures of
scrollable views, not phone-rendered screens.

A few outliers: 595 × 842 / 595 × 368 (A4 cheque exports), 304 × 304 (mood
faces), various asset sizes on the Assets / Components pages.

Important context for any future redesign: this is the **older 375-wide**
design. The DS we built (Mobile App Fintech DS) is **402 × 874** (iPhone 16
Pro). A redesign of Unired with our DS would shift every layout up by 27 px
horizontally and 62 px vertically.

---

## Frame totals

| Surface | Sections | Section frames | Standalone frames | Approx total |
|---|---|---|---|---|
| Final Design / Light Version | 30 | ~986 | 13 | **~999** |
| Working files | 11 | ~241 | 43 | **~284** |
| About | mixed | — | 55 | ~55 |
| CJMs | mixed | — | 11 | ~11 |

The redesign-relevant surface (Final Design + Working files) is **~1283
frames**. This is roughly **17×** the size of AsiaSend v.2 (75 frames).

---

## Language & market

Mixed RU / UZ / EN copy. Uzbekistan is the primary market (UZS currency,
Uzbek-bank icon library is the largest single asset set at 165 variants).
Cross-border flows: UZ ↔ RU / KG / TJ / CN / KR.

---

## Doc set

- [Unired_overview.md](./Unired_overview.md) — this file. Top-level structure.
- [Unired_library_audit.md](./Unired_library_audit.md) — tokens, text styles, component library.
- [Unired_FinalDesign_LightVersion_audit.md](./Unired_FinalDesign_LightVersion_audit.md) — section-by-section catalog of production screens.
- [Unired_WorkingFiles_audit.md](./Unired_WorkingFiles_audit.md) — section-by-section catalog of WIP screens + diff vs Final.

---

## Caveat on audit depth

A *full* per-frame audit (top-bar / body / CTAs / icons / copy) at the depth
of the AsiaSend Phase 1 audit would produce a ~6000-line markdown across
~1300 frames. This pass produces a **complete frame catalog** (every name, ID,
size, section group) plus **section-level flow descriptions** — sufficient to
plan a redesign or run a CJM. Per-frame deep details should be done
section-by-section in follow-up sessions, picking the section you want to act
on first.
