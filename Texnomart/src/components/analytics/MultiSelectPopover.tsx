import { useMemo, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectPopoverProps {
  label: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (next: string[]) => void;
  className?: string;
  placeholder?: string;
  width?: number;
}

export function MultiSelectPopover({
  label,
  options,
  value,
  onChange,
  className,
  placeholder,
  width = 280,
}: MultiSelectPopoverProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const selectedSet = useMemo(() => new Set(value), [value]);

  const allSelected = value.length === 0;
  const summary = allSelected
    ? t("analytics.filters.allSelected")
    : t("analytics.filters.selectedCount", { count: value.length });

  const toggle = (next: string) => {
    if (selectedSet.has(next)) {
      onChange(value.filter((v) => v !== next));
    } else {
      onChange([...value, next]);
    }
  };

  const reset = () => onChange([]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("h-9 justify-between gap-2 font-normal", className)}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="text-muted-foreground">{label}:</span>
            <span className="truncate font-medium text-foreground">
              {summary}
            </span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-0"
        style={{ width }}
      >
        <Command>
          <CommandInput
            placeholder={placeholder ?? t("analytics.filters.search")}
          />
          <CommandList>
            <CommandEmpty>{t("analytics.filters.noResults")}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const checked = selectedSet.has(opt.value);
                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.label}
                    onSelect={() => toggle(opt.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-input",
                        checked
                          ? "border-brand bg-brand text-brand-foreground"
                          : "opacity-70",
                      )}
                    >
                      {checked ? <Check className="h-3 w-3" /> : null}
                    </div>
                    <span className="truncate">{opt.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {value.length > 0 ? (
              <>
                <CommandSeparator />
                <div className="flex items-center justify-end p-1.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1 text-xs text-muted-foreground"
                    onClick={reset}
                  >
                    <X className="h-3 w-3" />
                    {t("analytics.filters.clear")}
                  </Button>
                </div>
              </>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
