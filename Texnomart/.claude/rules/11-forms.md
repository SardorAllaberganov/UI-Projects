# 11. Forms

## Stack
- **react-hook-form** — form state, validation timing, dirty/touched tracking
- **zod** — schema definition, type inference
- **@hookform/resolvers/zod** — wires the two
- **shadcn `<Form>` primitives** — `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormDescription>`, `<FormMessage>`

## Pattern

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().regex(/^998\d{9}$/, "Формат: 998XXXXXXXXX"),
  amount: z.coerce.number().int().positive(),
  termMonths: z.enum(["3","6","12","18","24","36"]).transform(Number),
});

type FormValues = z.infer<typeof schema>;

function MyForm() {
  const { t } = useTranslation();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phone: "", amount: 0, termMonths: 12 },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("client.fullName")}</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* … */}
        <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90">
          {t("actions.save")}
        </Button>
      </form>
    </Form>
  );
}
```

## Validation strategy
- **Schema lives next to the form**, in the same file. If reused, hoist to `<feature>/schemas.ts`
- **Validation runs on blur** (RHF default with zodResolver) — fast, doesn't spam errors as the user types
- **Submit validates everything** — `handleSubmit` won't fire onSubmit if any field fails
- **Error messages are translatable**: pass i18n keys to zod via `z.string().min(2, t("validation.minLength", { count: 2 }))` — note: this captures `t` at form-construction time. For dynamic locale switching, use zod's custom error map

## Domain validators (Uzbekistan-specific)

```ts
// Phone: must match 998 + 2-digit prefix + 7 digits
const phoneSchema = z.string().regex(/^998(90|91|93|94|97|98|99|33|55|88)\d{7}$/, "Неверный формат телефона");

// PINFL: 14 digits, starts with 1/3/4/5
const pinflSchema = z.string().regex(/^[1345]\d{13}$/, "ПИНФЛ должен начинаться с 1, 3, 4 или 5 и содержать 14 цифр");

// UZS amount: positive integer, capped by partner's max
const amountSchema = (max: number) => z.coerce.number().int().positive().max(max);

// Credit term: enum from constants
const termSchema = z.union(CREDIT_TERMS_MONTHS.map((m) => z.literal(m)));
```

Place these in [`src/lib/utils/validators.ts`](../../src/lib/utils/) when there's a second consumer (don't pre-extract).

## Error display
- Inline errors via `<FormMessage />` — already wired by shadcn
- Top-level errors (server / mutation) → Sonner: `toast.error(t("..."))`
- Per-field errors from a server response → `form.setError("fieldName", { message: "..." })`

## Don'ts
- ❌ Validate manually in `onChange` — use the schema
- ❌ Bypass `zodResolver` with custom validators for "speed" — schema-first means tests can validate the same shape
- ❌ Mix RHF with controlled inputs that don't use `field.value` / `field.onChange`
- ❌ Reset the form via `setState` — use `form.reset(defaults)`
- ❌ Submit the form on Enter inside a Select / Combobox — those keys belong to the widget
