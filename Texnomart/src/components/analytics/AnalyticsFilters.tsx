import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import {
  APPLICATION_STATUS_LABELS_RU,
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/lib/constants/enums";
import type { Partner } from "@/types";
import { formatDate } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils";

import { MultiSelectPopover } from "./MultiSelectPopover";

export type AnalyticsPeriod = "1d" | "1w" | "1m" | "1y" | "custom";

export interface AnalyticsFiltersValue {
  period: AnalyticsPeriod;
  customRange: DateRange | null;
  partnerIds: string[];
  statuses: ApplicationStatus[];
}

interface AnalyticsFiltersProps {
  value: AnalyticsFiltersValue;
  onChange: (next: AnalyticsFiltersValue) => void;
  partners: Partner[];
}

const PRESET_PERIODS: AnalyticsPeriod[] = ["1d", "1w", "1m", "1y"];

export function AnalyticsFilters({
  value,
  onChange,
  partners,
}: AnalyticsFiltersProps) {
  const { t } = useTranslation();

  const partnerOptions = useMemo(
    () => partners.map((p) => ({ value: p.id, label: p.name })),
    [partners],
  );

  const statusOptions = useMemo(
    () =>
      APPLICATION_STATUSES.map((s) => ({
        value: s,
        label: APPLICATION_STATUS_LABELS_RU[s],
      })),
    [],
  );

  const handlePresetPeriod = (next: string) => {
    if (!next) return;
    onChange({
      ...value,
      period: next as AnalyticsPeriod,
      customRange: null,
    });
  };

  const handleRange = (range: DateRange | undefined) => {
    if (!range || !range.from) {
      onChange({ ...value, period: "1w", customRange: null });
      return;
    }
    onChange({
      ...value,
      period: "custom",
      customRange: range,
    });
  };

  const customLabel = useMemo(() => {
    if (value.period !== "custom" || !value.customRange?.from) {
      return t("analytics.filters.period.custom");
    }
    const fromTxt = formatDate(value.customRange.from, "d MMM");
    const toTxt = value.customRange.to
      ? formatDate(value.customRange.to, "d MMM yyyy")
      : t("analytics.generate.pickRange");
    return t("analytics.filters.period.customRange", {
      from: fromTxt,
      to: toTxt,
    });
  }, [t, value.customRange, value.period]);

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-3 p-4">
        <ToggleGroup
          type="single"
          value={value.period === "custom" ? "" : value.period}
          onValueChange={handlePresetPeriod}
          className="flex-wrap justify-start gap-1 rounded-md border bg-muted/40 p-1"
          aria-label={t("analytics.filters.period.label")}
        >
          {PRESET_PERIODS.map((key) => (
            <ToggleGroupItem
              key={key}
              value={key}
              size="sm"
              className={cn(
                "h-7 rounded-sm px-3 text-xs font-medium data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
              )}
            >
              {t(`analytics.filters.period.${key}` as const)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={cn(
                "h-9 gap-2 font-normal",
                value.period === "custom" && "border-brand text-foreground",
              )}
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              {customLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={value.customRange ?? undefined}
              onSelect={handleRange}
              defaultMonth={value.customRange?.from}
            />
          </PopoverContent>
        </Popover>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <MultiSelectPopover
            label={t("analytics.filters.partners")}
            options={partnerOptions}
            value={value.partnerIds}
            onChange={(partnerIds) => onChange({ ...value, partnerIds })}
            width={300}
          />
          <MultiSelectPopover
            label={t("analytics.filters.statuses")}
            options={statusOptions}
            value={value.statuses}
            onChange={(statuses) =>
              onChange({
                ...value,
                statuses: statuses as ApplicationStatus[],
              })
            }
            width={260}
          />
        </div>
      </CardContent>
    </Card>
  );
}
