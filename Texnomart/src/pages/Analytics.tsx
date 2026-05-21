import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  FileText,
  Percent,
  Plus,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/layout/PageHeader";
import { KPICard } from "@/components/charts/KPICard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import type { AnalyticsFiltersValue } from "@/components/analytics/AnalyticsFilters";
import {
  GenerateReportDialog,
  type GenerateReportFormValues,
} from "@/components/analytics/GenerateReportDialog";
import { ReportsHistoryCard } from "@/components/analytics/ReportsHistoryCard";

import {
  applicationsApi,
  applicationsKeys,
  partnersApi,
  partnersKeys,
  reportsApi,
  reportsKeys,
  usersApi,
  usersKeys,
} from "@/api";
import type { ApplicationStatus } from "@/lib/constants/enums";
import { formatDate, formatNumber, formatUZS } from "@/lib/utils/formatters";
import { downloadReport } from "@/lib/utils/xlsxExport";
import { useAuth } from "@/hooks/useAuth";
import type {
  CreditApplication,
  Partner,
  ReportItem,
  SystemUser,
} from "@/types";

const DAY = 86_400_000;

const APPROVED_STATUSES = new Set<ApplicationStatus>([
  "approved",
  "contract_signed",
  "disbursed",
  "closed",
]);
const DECIDED_STATUSES = new Set<ApplicationStatus>([
  ...APPROVED_STATUSES,
  "rejected",
]);
const DISBURSED_STATUSES = new Set<ApplicationStatus>([
  "disbursed",
  "closed",
]);

const DEFAULT_FILTERS: AnalyticsFiltersValue = {
  period: "1w",
  customRange: null,
  partnerIds: [],
  statuses: [],
};

interface PeriodBounds {
  from: number;
  to: number;
}

interface DayPoint extends Record<string, unknown> {
  day: string;
  count: number;
}

interface PartnerPoint extends Record<string, unknown> {
  partner: string;
  count: number;
}

interface ReportEnvelope {
  applications: CreditApplication[];
  partners: Partner[];
  users: SystemUser[];
}

function resolveBounds(
  value: AnalyticsFiltersValue,
  now: number,
): PeriodBounds {
  if (value.period === "custom" && value.customRange?.from) {
    const from = value.customRange.from.getTime();
    const to = (value.customRange.to ?? value.customRange.from).getTime();
    const endOfDay = new Date(to);
    endOfDay.setHours(23, 59, 59, 999);
    return { from, to: endOfDay.getTime() };
  }
  const span =
    value.period === "1d"
      ? DAY
      : value.period === "1w"
        ? 7 * DAY
        : value.period === "1m"
          ? 30 * DAY
          : 365 * DAY;
  return { from: now - span, to: now };
}

function bucketKey(input: string): string {
  return input.slice(0, 10);
}

export function Analytics() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<AnalyticsFiltersValue>(DEFAULT_FILTERS);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [nowTs] = useState<number>(() => Date.now());

  const appsQuery = useQuery({
    queryKey: applicationsKeys.list(),
    queryFn: applicationsApi.list,
  });
  const partnersQuery = useQuery({
    queryKey: partnersKeys.list(),
    queryFn: partnersApi.list,
  });
  const usersQuery = useQuery({
    queryKey: usersKeys.list(),
    queryFn: usersApi.list,
  });
  const reportsQuery = useQuery({
    queryKey: reportsKeys.list(),
    queryFn: reportsApi.list,
  });

  const bounds = useMemo(() => resolveBounds(filters, nowTs), [filters, nowTs]);

  const filteredApps = useMemo<CreditApplication[] | undefined>(() => {
    if (!appsQuery.data) return undefined;
    const partnerSet = new Set(filters.partnerIds);
    const statusSet = new Set(filters.statuses);
    return appsQuery.data.filter((a) => {
      const ts = new Date(a.createdAt).getTime();
      if (ts < bounds.from || ts > bounds.to) return false;
      if (partnerSet.size > 0 && !partnerSet.has(a.partnerId)) return false;
      if (statusSet.size > 0 && !statusSet.has(a.status)) return false;
      return true;
    });
  }, [appsQuery.data, bounds, filters.partnerIds, filters.statuses]);

  const summary = useMemo(() => {
    if (!filteredApps) return null;
    const total = filteredApps.length;
    const disbursed = filteredApps.filter((a) =>
      DISBURSED_STATUSES.has(a.status),
    );
    const disbursedAmount = disbursed.reduce((sum, a) => sum + a.amount, 0);
    const avgCheck =
      disbursed.length > 0 ? Math.round(disbursedAmount / disbursed.length) : 0;
    const decided = filteredApps.filter((a) => DECIDED_STATUSES.has(a.status));
    const approved = filteredApps.filter((a) =>
      APPROVED_STATUSES.has(a.status),
    );
    const conversion =
      decided.length > 0
        ? Math.round((approved.length / decided.length) * 100)
        : 0;
    return { total, disbursedAmount, avgCheck, conversion };
  }, [filteredApps]);

  const byDay = useMemo<DayPoint[] | undefined>(() => {
    if (!filteredApps) return undefined;
    const span = Math.max(1, Math.ceil((bounds.to - bounds.from) / DAY));
    const buckets: DayPoint[] = [];
    const startOfFrom = new Date(bounds.from);
    startOfFrom.setHours(0, 0, 0, 0);
    const baseTs = startOfFrom.getTime();
    for (let i = 0; i < span; i += 1) {
      const dayDate = new Date(baseTs + i * DAY);
      buckets.push({ day: dayDate.toISOString().slice(0, 10), count: 0 });
    }
    const byKey = new Map(buckets.map((b) => [b.day, b] as const));
    for (const app of filteredApps) {
      const bucket = byKey.get(bucketKey(app.createdAt));
      if (bucket) bucket.count += 1;
    }
    return buckets.map((b) => ({
      ...b,
      day: formatDate(b.day, "d MMM"),
    }));
  }, [bounds, filteredApps]);

  const byPartner = useMemo<PartnerPoint[] | undefined>(() => {
    if (!filteredApps || !partnersQuery.data) return undefined;
    const counts = new Map<string, number>();
    for (const a of filteredApps) {
      counts.set(a.partnerId, (counts.get(a.partnerId) ?? 0) + 1);
    }
    return partnersQuery.data
      .map((p) => ({
        partner: p.shortName ?? p.name,
        count: counts.get(p.id) ?? 0,
      }))
      .filter((row) => row.count > 0)
      .toSorted((a, b) => b.count - a.count);
  }, [filteredApps, partnersQuery.data]);

  const reportEnvelope = useCallback(
    (target: ReportItem | null): ReportEnvelope | null => {
      if (!appsQuery.data || !partnersQuery.data || !usersQuery.data) {
        return null;
      }
      if (!target) {
        return {
          applications: filteredApps ?? [],
          partners: partnersQuery.data,
          users: usersQuery.data,
        };
      }
      const fromTs = new Date(target.rangeFrom).getTime();
      const toTs = new Date(target.rangeTo).getTime();
      return {
        applications: appsQuery.data.filter((a) => {
          const ts = new Date(a.createdAt).getTime();
          return ts >= fromTs && ts <= toTs;
        }),
        partners: partnersQuery.data,
        users: usersQuery.data,
      };
    },
    [appsQuery.data, partnersQuery.data, usersQuery.data, filteredApps],
  );

  const createMutation = useMutation({
    mutationFn: reportsApi.create,
    onSuccess: (created) => {
      void queryClient.invalidateQueries({ queryKey: reportsKeys.list() });
      toast.message(t("analytics.generate.toastQueued"));
      window.setTimeout(() => {
        void reportsApi.markReady(created.id).then((ready) => {
          if (!ready) return;
          void queryClient.invalidateQueries({ queryKey: reportsKeys.list() });
          toast.success(
            t("analytics.generate.toastReadyName", { name: ready.name }),
          );
        });
      }, 2000);
    },
  });

  const removeMutation = useMutation({
    mutationFn: reportsApi.remove,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reportsKeys.list() });
      toast.success(t("analytics.generate.toastDeleted"));
    },
  });

  const handleGenerate = (values: GenerateReportFormValues) => {
    const fromIso = new Date(values.range.from).toISOString();
    const toEnd = new Date(values.range.to);
    toEnd.setHours(23, 59, 59, 999);
    const name = t("analytics.exportDefaultName", {
      date: formatDate(values.range.from, "d MMM yyyy"),
    });
    createMutation.mutate({
      name,
      kind: "applications",
      format: values.format,
      breakdown: values.breakdown,
      rangeFrom: fromIso,
      rangeTo: toEnd.toISOString(),
      generatedBy: user?.fullName ?? "—",
    });
  };

  const handleDownload = (report: ReportItem) => {
    const env = reportEnvelope(report);
    if (!env) return;
    downloadReport(report.name, report.format, {
      applications: env.applications,
      partners: env.partners,
      users: env.users,
      breakdown: report.breakdown,
    });
  };

  const handleExportAll = () => {
    const env = reportEnvelope(null);
    if (!env) return;
    const name = t("analytics.exportDefaultName", {
      date: formatDate(new Date(), "d MMM yyyy"),
    });
    downloadReport(name, "xlsx", {
      applications: env.applications,
      partners: env.partners,
      users: env.users,
      breakdown: ["applications", "users", "partners", "statuses"],
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("analytics.title")}
        description={t("analytics.subtitle")}
        actions={
          <Button
            type="button"
            onClick={() => setGenerateOpen(true)}
            className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Plus className="h-4 w-4" />
            {t("analytics.actions.generate")}
          </Button>
        }
      />

      <AnalyticsFilters
        value={filters}
        onChange={setFilters}
        partners={partnersQuery.data ?? []}
      />

      {summary ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            label={t("analytics.summary.totalApplications")}
            value={formatNumber(summary.total)}
            icon={<FileText className="h-4 w-4" />}
          />
          <KPICard
            label={t("analytics.summary.disbursedAmount")}
            value={formatUZS(summary.disbursedAmount)}
            icon={<Wallet className="h-4 w-4" />}
          />
          <KPICard
            label={t("analytics.summary.avgCheck")}
            value={formatUZS(summary.avgCheck)}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <KPICard
            label={t("analytics.summary.conversion")}
            value={`${summary.conversion}%`}
            icon={<Percent className="h-4 w-4" />}
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <BarChartCard<DayPoint>
          title={t("analytics.charts.byDay")}
          description={t("analytics.charts.byDayDescription")}
          data={byDay}
          xKey="day"
          yKey="count"
          layout="horizontal"
          height={300}
        />
        <BarChartCard<PartnerPoint>
          title={t("analytics.charts.byPartner")}
          description={t("analytics.charts.byPartnerDescription")}
          data={byPartner}
          xKey="partner"
          yKey="count"
          layout="vertical"
          height={300}
          yAxisWidth={120}
        />
      </div>

      <ReportsHistoryCard
        reports={reportsQuery.data}
        onDownload={handleDownload}
        onDelete={(r) => removeMutation.mutate(r.id)}
        onExportAll={handleExportAll}
      />

      <GenerateReportDialog
        open={generateOpen}
        onOpenChange={setGenerateOpen}
        defaultRange={{
          from: new Date(bounds.from),
          to: new Date(bounds.to),
        }}
        onSubmit={handleGenerate}
      />
    </div>
  );
}
