import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/types";

const OPTIONS: Array<{ value: Locale; label: string }> = [
  { value: "ru", label: "RU" },
  { value: "uz", label: "UZ" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-md border bg-background p-0.5 text-xs"
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            className={cn(
              "min-w-[2.25rem] rounded-[5px] px-2 py-1 font-semibold uppercase tracking-wide transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
