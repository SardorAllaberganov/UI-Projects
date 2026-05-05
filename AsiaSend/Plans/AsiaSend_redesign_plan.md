# Redesign AsiaSend v.2 with our Fintech DS

## Context

**The goal:** redesign the AsiaSend v.2 app screens using our published Mobile App Fintech DS as the single source of truth, building any new components we need along the way.

**Starting state:**
- AsiaSend file (`lG8fs0XBSkDeX9Jyxr43Tk`) contains **75 iPhone-sized frames (402×874)** across 8 sections:
  Auth (21), Main (18), Transfer (15), Monitoring (3), News & Notifications (6), News (1), Status (4), Chat with support (7).
- The file currently depends on **Apple iOS UI Kit** (2087 remote instances, 113 unique remote components — iPhone keys, status bars, navigation bars, home indicators, materials) plus a non-DS Button library (`Disabled=False, Type=Primary, State=Default` axis naming).
- **Zero instances of our DS components are in the file yet** (verified by scanning every remote `mainComponent` against our DS's 33 component-set names and 19 single-component names).
- UI copy is in Russian (target market is CIS / Uzbekistan).
- Our DS file (`gSas2PBv3XMAXj36FQDhFa`) has 30 component sets + 21 single components + 24 icons + 4 iOS platform-chrome components, all using tokens (`color/*`, `space/*`, `radius/*`, `color/ios-*`).
- User has **published the DS as a library and enabled it in AsiaSend** (confirmed via Assets panel). No instances placed yet — redesign is green-field.

**Confirmed decisions (from user):**
- **Phase 1 target:** Auth section (21 frames).
- **Redesign process:** duplicate each original frame, redesign the copy. Originals preserved for side-by-side diff / rollback.
- **Input style:** add a new `Style` axis to our Input component (`Boxed` / `Bottom-lined`) — preserves the AsiaSend look and keeps everything inside the DS.

---

## Phased scope

| Phase | Section | Frames |
|---|---|---|
| 1 | **Auth** | 21 |
| 2 | Main | 18 |
| 3 | Transfer | 15 |
| 4 | Monitoring + Status + News & Notifications + News + Chat with support | 21 |

Each phase runs end-to-end (audit → build missing DS components → publish → compose screens → validate) before moving to the next.

---

## Technical approach

### Library access from AsiaSend

Each DS component is reachable via its published key:

```js
const master = await figma.importComponentByKeyAsync('<key>');
const inst = master.createInstance();
```

One read-only pass into our DS file (`gSas2PBv3XMAXj36FQDhFa`) captures every component's `.key`:

```js
const comps = figma.currentPage.findAllWithCriteria({ types: ['COMPONENT','COMPONENT_SET'] });
return comps.map(c => ({ name: c.name, parent: c.parent ? c.parent.name : null, key: c.key }));
```

The resulting **name → key map** (~75 components) is then used in every AsiaSend build script.

### Build-then-publish loop for new components

When a phase needs a new component, it is built in **our DS file** (not AsiaSend) so it remains library-sourced:

1. Build master in `gSas2PBv3XMAXj36FQDhFa` using existing DS tokens.
2. User publishes the DS library (Figma UI → "Publish Library").
3. Wait for the library update in AsiaSend (user confirms via Assets panel).
4. Query the new component's key, add to the name → key map, then use in subsequent builds.

This adds manual publish steps between the DS-edit and AsiaSend-use, but keeps the single-source-of-truth guarantee.

### Per-screen composition loop (duplicate-then-redesign)

For each original AsiaSend frame in the current phase:

1. **Duplicate** the frame via `original.clone()`; append to the same parent section. Name: `<original-name> · DS`.
2. Position the duplicate to the right of the original (x offset = original.width + 64) so it sits alongside.
3. Clear the duplicate's children.
4. Rebuild the duplicate with DS library instances via `importComponentByKeyAsync` + `createInstance`, preserving the original's logical structure (top bar / body / bottom chrome).
5. Copy all Russian text content from the original into the new components' TEXT props.
6. Screenshot both frames and compare.

Original frames remain untouched.

---

## Component gap analysis (Phase 1 · Auth)

Preliminary list — finalized after the Phase 1 audit pass.

### Almost certainly needed

| New component | Where it's needed | Shape |
|---|---|---|
| **Input — Bottom-lined style** | Every Auth input (Pre-identification, Set PIN, Email, etc.) | Add a new `Style` axis (`Boxed` / `Bottom-lined`) to the existing Input component set (`36:107`). Bottom-lined variant: floating label, 1 px bottom border that becomes `color/brand-secondary` on focus, `color/negative` on error. All 5 existing State variants × 2 styles = **10 variants total** in the set after the change. |
| **Full-screen Loader** | `Light / Auth / Loader` | 402 × 874 frame, `color/background` fill, centered Spinner (lg) + optional TEXT below. Intended as a blocking full-screen state. |
| **Phone Number Input** | Phone identification screens | Country-code picker (flag + dial code) + number field. Either a separate component, or an instance-swap-driven prefix slot on the Bottom-lined Input. Decide in audit. |

### Likely needed (confirmed in audit)

- **PIN Dots indicator** — 4 or 6 dots showing PIN entry progress.
- Possibly a specialized **OTP container with timer** if the existing OTP Input doesn't cover resend.

### Already covered by the DS

Button · Modal · Alert Dialog · App Numpad (PIN layout) · OTP Input · Top Bar · iOS Status Bar · iOS Home Indicator · Radio Row · Switch Row · Checkbox Row · Empty State · Error State · Success State.

---

## Phase 1 execution plan (Auth · 21 frames)

### Step 1 — Capture DS component keys (read-only, ~1 call)

Query our DS file for every `COMPONENT` and `COMPONENT_SET`, return `name → key` map. Save in-memory for the session.

### Step 2 — Audit all 21 Auth frames (read-only, ~1 call)

Walk each Auth frame, report: screen role, top-bar type, body composition, input style, CTA buttons, bottom chrome, icons used. Produces a structured inventory that confirms the new-component list.

### Step 3 — Build missing DS masters (in our DS file)

At minimum:
1. **Input → new `Style` axis** — extend the existing Input component set. Five existing variants become the `Style = Boxed` set; add five more for `Style = Bottom-lined`. Keep existing keys so any current Boxed-style bindings keep working; the new Bottom-lined variants get fresh keys.
2. **Full-screen Loader** component (new single component).
3. **Phone Number Input** or **Bottom-lined prefix slot** — pending audit.
4. **PIN Dots** — pending audit.

### Step 4 — Publish the DS (user action, Figma UI)

User clicks "Publish Library" in Figma → confirms the new masters are published.

### Step 5 — Compose 21 Auth screens in AsiaSend

For each of the 21 frames:

1. `original.clone()` → duplicate beside the original.
2. Clear duplicate's children.
3. `importComponentByKeyAsync` for each DS master the screen needs; `createInstance()`; compose with auto-layout.
4. Set properties (text, BOOLEAN, INSTANCE_SWAP).
5. Copy Russian copy from the original's TEXT nodes.

### Step 6 — Validate

- Screenshot each new frame, spot-check alignment and token usage.
- Assert every new frame's instances all have `mainComponent.remote === true` and keys that appear in our DS's name→key map (no accidental local masters).
- Report: N frames redesigned / M components used / K gaps surfaced that need follow-up.

---

## Critical files & tools

- **AsiaSend (target):** `lG8fs0XBSkDeX9Jyxr43Tk` — all redesign operations land here.
- **Our DS (source):** `gSas2PBv3XMAXj36FQDhFa` — new component masters built here.
- **Plugin API:**
  - `figma.importComponentByKeyAsync(key)` to pull library masters into AsiaSend.
  - `master.createInstance()` to place instances.
  - `findAllWithCriteria`, `mainComponent.remote`, `mainComponent.key` for inventory passes.
- **MCP:** `get_screenshot` for visual validation.

---

## Verification

- Visual: `get_screenshot` on each redesigned frame; compare against the adjacent original.
- Token compliance: walk each new instance's descendants, verify every paint has `boundVariables.fills[0]` set (no loose hex introduced).
- Library sourcing: every instance in a redesigned frame must have `mainComponent.remote === true` AND `mainComponent.key` ∈ our DS name→key map.
- Summary at end of phase: list of screens redesigned, component keys touched, missing-component follow-ups surfaced for phase 2+.

---

## Docs to update when Phase 1 lands

- `DS_COMPONENTS.md` — new entries for the Input Style axis extension, Full-screen Loader, and any other masters built.
- `DS_CONTEXT.md` — add AsiaSend as a consumer file; note the cross-file DS usage pattern.
- `DS_HISTORY.md` — phase-1 entry: screens redesigned, components added, Russian-copy handling, any cross-file quirks hit during publish/enable.
