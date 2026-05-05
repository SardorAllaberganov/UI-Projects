# DS Lessons

Non-obvious Figma quirks and design decisions with lasting implications.
Append new entries at the bottom. Grep before adding — don't duplicate.

Entry template:
```
## <short title>
**Category:** [plugin-api | design-decision | pattern | tooling]
**Discovered:** YYYY-MM-DD
**Symptom:** What went wrong or was surprising.
**Cause:** Why it happens.
**Fix / Rule:** What to do next time.
```

---

## explicitVariableModes silently locks an instance's theme
**Category:** plugin-api
**Discovered:** 2026-04 (Account Card always-dark bug)
**Symptom:** Account Card rendered with its Light-mode fills regardless
of which mode the parent frame was switched to.
**Cause:** The master had `explicitVariableModes: { Color: Light }` set
during an earlier build step. Every instance inherited the lock and
ignored the ambient mode of its parent.
**Fix / Rule:** On any master that participates in theme inversion, call
`node.clearExplicitVariableModeForCollection(colorColl)` after binding.
If an instance still looks wrong, re-check the master — the lock can
get reintroduced by later edits.

---

## V-lookup drift when rebinding tokens in bulk
**Category:** plugin-api
**Discovered:** 2026-04 (Toast, Switch On, Checkbox Checked all bound
to wrong tokens)
**Symptom:** A sweep to rebind many fills (`const V = {...}; paint(V['color/brand-secondary'])`)
produced bindings to `color/positive` or `color/surface` instead.
**Cause:** Building a `{ name → variable }` object map at the top of a
script and reusing it across a large traversal captures stale refs when
intermediate operations (variable creation, renames) change the
`getLocalVariablesAsync()` result set.
**Fix / Rule:** In any sweep that creates AND binds variables in the
same script, resolve by name at the exact bind site:
```js
const v = (await figma.variables.getLocalVariablesAsync())
  .find(v => v.name === 'color/brand-secondary');
```
Pay the cost. Add a post-sweep verification pass that reads back every
binding and asserts the expected target name.

---

## resize() resets auto-layout sizing modes
**Category:** plugin-api
**Discovered:** 2026-04 (Input column clipping content)
**Symptom:** Calling `col.resize(560, 10)` after `col.primaryAxisSizingMode = 'AUTO'`
caused the column to clip content at 10px height.
**Cause:** `resize()` flips `primaryAxisSizingMode` (and counter-axis
mode) back to `FIXED` silently.
**Fix / Rule:** Always re-apply sizing modes after `resize()`:
```js
col.resize(560, 10);
col.primaryAxisSizingMode = 'AUTO';
col.counterAxisSizingMode = 'FIXED';
col.clipsContent = false;
```
Or don't resize at all — set width via `resize(w, currentHeight)` only
when counter-axis needs to change, and prefer `layoutSizingHorizontal`
after appending.

---

## Instance fill overrides survive master rebinds
**Category:** plugin-api
**Discovered:** 2026-04 (Account Card instances kept old `color/surface`
after master rebind to `color/surface-hero`)
**Symptom:** After rebinding the master's fill to a new variable,
instances still rendered the old variable.
**Cause:** An instance stores an override paint array that is decoupled
from the master once any prop has been customized. `resetOverrides()`
did not remove this.
**Fix / Rule:** After rebinding a master fill, loop over every instance
of that master and force-rebind its fill explicitly using
`setBoundVariableForPaint`. Same applies to stroke, effect, and text
overrides.

---

## Red is identity, not interaction
**Category:** design-decision
**Discovered:** 2026-04
**Symptom:** Every interactive hint in the DS read as a warning — tab
bar, switches, checkboxes, spinner, "See all" all looked like errors.
**Cause:** Brand red `#D2222D` was used as the universal accent color
across both identity moments and interactive moments.
**Fix / Rule:** Split the palette:
- Red stays for brand identity (logo, notification dot, brand avatar,
  and nothing else by default).
- Blue `#438BFA` (`color/brand-secondary`) owns the interactive accent
  layer: active tab, switch track, checkbox fill, spinner, progress,
  tertiary button text, "See all" links, focus rings.
- Primary button is `color/surface-hero` (neutral black), not brand red.

---

## Pattern B full inversion for hero cards
**Category:** pattern
**Discovered:** 2026-04
**Symptom:** The Account Card needed to always-look-inverted (light
text on dark surface in Light mode; dark text on light surface in Dark
mode), which semantic `color/surface` + `color/text-primary` cannot
express — those invert with the mode.
**Cause:** Needed tokens that themselves invert across modes,
independent of the surface/text pair.
**Fix / Rule:** Introduce `color/surface-hero` + `color/text-on-hero`
(+ `-muted`). Light: hero = stone/950, text = white. Dark: hero = stone/50,
text = stone/950. The card is then always hero-styled, and flips with
the theme. Reuse for Primary button.

---

## Slot pattern for Bottom Sheet content
**Category:** pattern
**Discovered:** 2026-04
**Symptom:** Bottom Sheet needed to carry arbitrary inner content
(account picker, action menu, empty state) without exploding into
variants.
**Cause:** Variant matrix would blow past 30+ states once content types
multiplied.
**Fix / Rule:** Extract the inner frame into a dedicated "Sheet Slot"
component. Give the Bottom Sheet master a `Content` property of type
INSTANCE_SWAP targeting that slot, with `preferredValues` listing all
built slot variants. New content = new Sheet Slot component, no change
to the Bottom Sheet itself.

---

## Auto-layout frame's primary axis defaults to AUTO — shrinks to child
**Category:** plugin-api
**Discovered:** 2026-04 (Stepper buttons rendered 13 × 32 instead of
32 × 32; Alert Dialog icon bg rendered 24 × 40 instead of 40 × 40;
FAB from an earlier session also bitten by the same issue)
**Symptom:** After calling `frame.resize(w, h)` followed by
`appendChild(child)` on a HORIZONTAL auto-layout frame, the frame
width reset to the child's width (primary axis = AUTO / hug).
**Cause:** Auto-layout frames default to `primaryAxisSizingMode =
'AUTO'` — the primary axis hugs content, overriding any earlier
`resize()`. Similarly for VERTICAL frames in the counter direction.
**Fix / Rule:** After appending children, lock sizing explicitly:
```js
frame.resize(w, h);
frame.primaryAxisSizingMode = 'FIXED';
frame.counterAxisSizingMode = 'FIXED';
```
Both lines matter. Do it AFTER the last `appendChild` so subsequent
children don't flip modes back. If any axis should hug, leave it
`'AUTO'` intentionally — but always set the FIXED ones explicitly.

---

## figma.createFrame() defaults to clipsContent = true
**Category:** plugin-api
**Discovered:** 2026-04 (critical-gap components; especially Card
Visual, where the cardholder name clipped subtly at certain preview
scales)
**Symptom:** Newly-built components rendered fine at their master
size but clipped content at slightly smaller preview scales, or when
a sibling pushed the layout. The clipping was invisible until a
structural change (e.g. swapping a longer name) revealed it.
**Cause:** `figma.createFrame()` returns a FRAME with
`clipsContent = true` by default. For auto-layout wrappers that are
not meant to be masks, this is unintended — the wrapper should let
content overflow if authoring leaves slack.
**Fix / Rule:** When a frame is only a layout container (not a
visual card / mask / scroll region), explicitly set
`frame.clipsContent = false` after creation. Consider adding a
`mkFrame()` helper to component-build scripts that defaults
`clipsContent` to false.

---

## setBoundVariableForPaint doesn't preserve the paint.color you pass
**Category:** plugin-api
**Discovered:** 2026-04 (iOS kit rebind)
**Symptom:** Passed the original loose hex as the `color` field to
`figma.variables.setBoundVariableForPaint(paint, 'color', variable)`
expecting `paint.color` to remain the authored fallback for future
reads. Later reads of `node.fills[0].color` returned the *resolved*
value of the bound variable (e.g. `#d8d5ce` for a paint bound to
`color/border`), not the original `#d0d4dc` that was passed in.
**Cause:** For any paint with a bound variable, Figma reports
`paint.color` as the resolved token value — the authored fallback is
lost on read.
**Fix / Rule:** Do not rely on `paint.color` to recover the pre-bind
hex. If you need traceability across multiple rebind passes, either:
(a) snapshot every loose hex + nodeId into a return value in the same
call that binds, and drive follow-up passes from that snapshot;
(b) use node name / role semantics to infer the intended token
independent of the current hex.

---

## Imported kits bind paints to external library variables
**Category:** plugin-api
**Discovered:** 2026-04 (iOS kit rebind, second pass)
**Symptom:** After a full rebind that claimed 100 % tokenization, a
follow-up audit counted 128 paints still bound to variables whose IDs
weren't in `figma.variables.getLocalVariablesAsync()`. The rebind
script had silently skipped them — `byId.get(bv.id)` returned
undefined and the code bailed.
**Cause:** When a component set is imported from an external library,
its paints carry bindings to that library's variables. Those variable
IDs exist in the paint's `boundVariables` but aren't owned locally, so
they don't appear in `getLocalVariablesAsync()` results.
**Fix / Rule:** When rebinding an imported set, always make a second
pass that classifies every paint by binding locality:
`localIds.has(bv.id)` vs external. For external-bound paints, read
`paint.color` (which reflects the library variable's *resolved* value)
and map that hex to your local token. Don't assume a first pass covers
them.

---

## Clash Display can't be loaded via loadFontAsync
**Category:** tooling
**Discovered:** 2026-04
**Symptom:** `figma.loadFontAsync({ family: 'Clash Display', style: 'Semibold' })`
throws even though Clash Display is installed and usable via the Figma
UI font picker.
**Cause:** Font discovery in `use_figma` returns an empty list for Clash
Display; the typefaces are not visible to the Plugin API in this env.
**Fix / Rule:** Define the intended Clash Display text styles anyway
(so the spec is correct), render preview text with Geologica as a
fallback, and call out in the doc that Clash styles need a manual swap
in Figma desktop after the file is reopened.
