import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ReportBreakdown, ReportFormat } from "@/types";
import { formatDate } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils";

const ALL_BREAKDOWNS: ReportBreakdown[] = [
  "applications",
  "users",
  "partners",
  "statuses",
];

export interface GenerateReportFormValues {
  kind: "applications";
  range: { from: Date; to: Date };
  breakdown: ReportBreakdown[];
  format: ReportFormat;
}

interface GenerateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRange: { from: Date; to: Date };
  onSubmit: (values: GenerateReportFormValues) => void;
}

export function GenerateReportDialog({
  open,
  onOpenChange,
  defaultRange,
  onSubmit,
}: GenerateReportDialogProps) {
  const { t } = useTranslation();

  const schema = useMemo(
    () =>
      z.object({
        kind: z.literal("applications"),
        range: z.object({
          from: z.date({
            error: t("analytics.generate.validation.rangeRequired"),
          }),
          to: z.date({
            error: t("analytics.generate.validation.rangeRequired"),
          }),
        }),
        breakdown: z
          .array(z.enum(ALL_BREAKDOWNS))
          .min(1, t("analytics.generate.validation.breakdownRequired")),
        format: z.enum(["xlsx", "csv"]),
      }),
    [t],
  );

  const form = useForm<GenerateReportFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      kind: "applications",
      range: { from: defaultRange.from, to: defaultRange.to },
      breakdown: [...ALL_BREAKDOWNS],
      format: "xlsx",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        kind: "applications",
        range: { from: defaultRange.from, to: defaultRange.to },
        breakdown: [...ALL_BREAKDOWNS],
        format: "xlsx",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values);
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{t("analytics.generate.title")}</DialogTitle>
          <DialogDescription>
            {t("analytics.generate.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              control={form.control}
              name="kind"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("analytics.generate.field.kind")}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="applications">
                        {t("analytics.generate.kind.detailed")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="range"
              render={({ field }) => {
                const range: DateRange | undefined = field.value?.from
                  ? {
                      from: field.value.from,
                      to: field.value.to,
                    }
                  : undefined;
                const label = range?.from
                  ? t("analytics.filters.period.customRange", {
                      from: formatDate(range.from, "d MMM yyyy"),
                      to: range.to
                        ? formatDate(range.to, "d MMM yyyy")
                        : t("analytics.generate.pickRange"),
                    })
                  : t("analytics.generate.pickRange");
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      {t("analytics.generate.field.period")}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "h-9 w-full justify-start gap-2 font-normal",
                              !range?.from && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="h-4 w-4" />
                            {label}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="range"
                          numberOfMonths={2}
                          selected={range}
                          defaultMonth={range?.from}
                          onSelect={(next) => {
                            field.onChange({
                              from: next?.from ?? undefined,
                              to: next?.to ?? next?.from ?? undefined,
                            });
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="breakdown"
              render={() => (
                <FormItem>
                  <FormLabel>
                    {t("analytics.generate.field.breakdown")}
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {ALL_BREAKDOWNS.map((b) => (
                      <FormField
                        key={b}
                        control={form.control}
                        name="breakdown"
                        render={({ field }) => {
                          const checked = field.value.includes(b);
                          return (
                            <label
                              htmlFor={`bk-${b}`}
                              className="flex cursor-pointer items-center gap-2 rounded-md border bg-card p-2 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand"
                            >
                              <FormControl>
                                <Checkbox
                                  id={`bk-${b}`}
                                  checked={checked}
                                  onCheckedChange={(state) => {
                                    if (state) {
                                      field.onChange([...field.value, b]);
                                    } else {
                                      field.onChange(
                                        field.value.filter((v) => v !== b),
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <span>
                                {t(`analytics.generate.breakdown.${b}`)}
                              </span>
                            </label>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("analytics.generate.field.format")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-4"
                    >
                      <label
                        htmlFor="fmt-xlsx"
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <RadioGroupItem id="fmt-xlsx" value="xlsx" />
                        {t("analytics.generate.format.xlsx")}
                      </label>
                      <label
                        htmlFor="fmt-csv"
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <RadioGroupItem id="fmt-csv" value="csv" />
                        {t("analytics.generate.format.csv")}
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("actions.cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
              >
                {t("analytics.generate.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
