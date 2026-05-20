# 09. TypeScript strict mode

## Configuration
[`tsconfig.app.json`](../../tsconfig.app.json) has the following non-default flags enabled:

```jsonc
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "strictPropertyInitialization": true,
  "noImplicitThis": true,
  "alwaysStrict": true,

  "verbatimModuleSyntax": true,   // ← critical: type-only imports MUST use `import type`
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "erasableSyntaxOnly": true,
  "noFallthroughCasesInSwitch": true,

  "moduleResolution": "bundler",
  "allowImportingTsExtensions": true,
  "jsx": "react-jsx",
  "resolveJsonModule": true,
  "esModuleInterop": true,

  "paths": { "@/*": ["./src/*"] }   // matches vite.config.ts alias
}
```

## Key rules

### `verbatimModuleSyntax: true`
Mixing types and values in a single import is a hard error.

```ts
// ✅ correct
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

// ❌ wrong — fails the build
import { Button, ButtonProps } from "@/components/ui/button";
```

This bit us on `pagination.tsx` from shadcn (template uses the mixed form). Lesson: [`docs/lessons/`](../../docs/lessons/).

### `noUnusedLocals` + `noUnusedParameters`
Unused imports and parameters fail typecheck. Prefix intentionally-unused params with `_` to opt out: `(_unused, idx) => …`.

### Path alias `@/*`
Defined in BOTH `tsconfig.app.json` AND `vite.config.ts`. Update both in sync or imports work at typecheck but fail at runtime (or vice versa).

### `baseUrl` is deprecated
TypeScript 6 deprecates `baseUrl`. We have `paths` only — TS resolves them relative to the config file. Don't add `baseUrl` back.

### Recharts `dataKey` typing
`recharts` v3 introduced a `TypedDataKey<T>` type that's stricter than `keyof T`. When passing a generic `keyof T` from a wrapper component, cast at the call site:
```tsx
<XAxis dataKey={xKey as string} />
<Bar dataKey={yKey as string} />
```
This is how `LineChartCard` and `BarChartCard` are typed today.

## Style preferences

- **Function components**: `export function MyComponent() {}` — no `React.FC`
- **Component props**: explicit interface above the component, no inline anonymous types
- **Return types**: optional for components and pages, **required** for exported utility functions
- **Generics**: name them descriptively (`<T extends Record<string, unknown>>`) when the constraint is non-trivial
- **`as const`**: use for tuple-typed config arrays (status orders, role lists) so the union types stay narrow

## Don'ts
- ❌ `any` — use `unknown` and narrow, or write the proper type
- ❌ `// @ts-ignore` / `// @ts-expect-error` without a one-line comment explaining why
- ❌ Function expressions for components (`const Foo = () => …` loses display name in devtools and breaks `displayName` for `forwardRef` patterns)
- ❌ Default exports for components — named only. Default exports break IDE auto-import naming consistency
- ❌ Asserting types via `as` when a `satisfies` operator would express intent better
