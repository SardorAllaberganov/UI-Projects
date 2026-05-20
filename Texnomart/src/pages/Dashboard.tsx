import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  Inbox,
  RefreshCw,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { KPICard } from "@/components/charts/KPICard";
import { LineChartCard, type LineSeries } from "@/components/charts/LineChartCard";
import {
  DonutChartCard,
  type DonutSlice,
} from "@/components/charts/DonutChartCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatDate,
  formatNumber,
  formatRelative,
  formatUZS,
} from "@/lib/utils/formatters";
import {
  APPLICATION_STATUS_LABELS_RU,
  type ApplicationStatus,
} from "@/lib/constants/enums";
import { cn } from "@/lib/utils";
import {
  applicationsApi,
  applicationsKeys,
  clientsApi,
  clientsKeys,
  partnersApi,
  partnersKeys,
} from "@/api";
import type { CreditApplication } from "@/types";

type PeriodKey = "today" | "7d" | "30d" | "90d";

const PERIOD_DAYS: Record<Exclude<PeriodKey, "today">, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const TREND_DAYS = 7;

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  draft: "hsl(215 16% 65%)",
  submitted: "hsl(199 89% 55%)",
  scoring: "hsl(199 89% 45%)",
  partner_review: "hsl(38 92% 50%)",
  approved: "hsl(142 71% 45%)",
  contract_signed: "hsl(160 84% 39%)",
  disbursed: "hsl(262 83% 58%)",
  closed: "hsl(215 16% 47%)",
  rejected: "hsl(0 84% 60%)",
  cancelled: "hsl(215 16% 35%)",
};

const TREND_COLORS = {
  created: "hsl(215 25% 27%)", // slate-700
  approved: "hsl(160 84% 30%)", // emerald-600
  rejected: "hsl(350 89% 60%)", // rose-500
} as const;

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

interface TrendPoint extends Record<string, unknown> {
  date: string;
  created: number;
  approved: number;
  rejected: number;
}

interface TopPartnerRow {
  partnerId: string;
  partnerName: string;
  count: number;
  approvalRate: number;
}

function startOfDay(input: number): number {
  const d = new Date(input);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.at(0)?.toUpperCase() ?? "").join("");
}

function progressColor(rate: number): string {
  if (rate >= 70) return "hsl(142 71% 45%)";
  if (rate >= 60) return "hsl(160 71% 40%)";
  if (rate >= 50) return "hsl(38 92% 50%)";
  return "hsl(0 84% 60%)";
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<PeriodKey>("today");
  const [refreshing, setRefreshing] = useState(false);
  const [nowTs, setNowTs] = useState<number>(() => Date.now());

  const appsQuery = useQuery({
    queryKey: applicationsKeys.list(),
    queryFn: applicationsApi.list,
  });
  const partnersQuery = useQuery({
    queryKey: partnersKeys.list(),
    queryFn: partnersApi.list,
  });
  const clientsQuery = useQuery({
    queryKey: clientsKeys.list(),
    queryFn: clientsApi.list,
  });

  const isLoading =
    appsQuery.isLoading || partnersQuery.isLoading || clientsQuery.isLoading;

  const filteredApps = useMemo<CreditApplication[] | undefined>(() => {
    if (!appsQuery.data) return undefined;
    const fromTs =
      period === "today"
        ? startOfDay(nowTs)
        : nowTs - PERIOD_DAYS[period] * DAY;
    return appsQuery.data.filter(
      (a) => new Date(a.createdAt).getTime() >= fromTs,
    );
  }, [appsQuery.data, period, nowTs]);

  const kpiData = useMemo(() => {
    if (!appsQuery.data || !filteredApps || !clientsQuery.data) return null;
    const todayStart = startOfDay(nowTs);
    const last3hStart = nowTs - 3 * HOUR;

    const todayCount = appsQuery.data.filter(
      (a) => new Date(a.createdAt).getTime() >= todayStart,
    ).length;
    const last3hCount = appsQuery.data.filter(
      (a) => new Date(a.createdAt).getTime() >= last3hStart,
    ).length;

    const decided = filteredApps.filter((a) => DECIDED_STATUSES.has(a.status));
    const approved = filteredApps.filter((a) =>
      APPROVED_STATUSES.has(a.status),
    );
    const approvalRate =
      decided.length > 0
        ? Math.round((approved.length / decided.length) * 100)
        : 0;

    return {
      totalUsers: clientsQuery.data.length,
      today: todayCount,
      last3h: last3hCount,
      approvalRate,
    };
  }, [appsQuery.data, filteredApps, clientsQuery.data, nowTs]);

  const trendData = useMemo<TrendPoint[] | undefined>(() => {
    if (!appsQuery.data) return undefined;
    const buckets: TrendPoint[] = [];
    for (let i = TREND_DAYS - 1; i >= 0; i -= 1) {
      const date = new Date(nowTs - i * DAY).toISOString().slice(0, 10);
      buckets.push({ date, created: 0, approved: 0, rejected: 0 });
    }
    const byDate = new Map(buckets.map((b) => [b.date, b] as const));
    for (const app of appsQuery.data) {
      const bucket = byDate.get(app.createdAt.slice(0, 10));
      if (!bucket) continue;
      bucket.created += 1;
      if (APPROVED_STATUSES.has(app.status)) bucket.approved += 1;
      if (app.status === "rejected") bucket.rejected += 1;
    }
    return buckets;
  }, [appsQuery.data, nowTs]);

  const statusBreakdown = useMemo<DonutSlice[] | undefined>(() => {
    if (!filteredApps) return undefined;
    const counts = new Map<ApplicationStatus, number>();
    for (const a of filteredApps) {
      counts.set(a.status, (counts.get(a.status) ?? 0) + 1);
    }
    return [...counts.entries()]
      .toSorted((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([status, count]) => ({
        key: status,
        label: APPLICATION_STATUS_LABELS_RU[status],
        value: count,
        color: STATUS_COLORS[status] ?? "hsl(215 16% 47%)",
      }));
  }, [filteredApps]);

  const recentApps = useMemo<CreditApplication[] | undefined>(() => {
    if (!filteredApps) return undefined;
    return [...filteredApps]
      .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 6);
  }, [filteredApps]);

  const topPartners = useMemo<TopPartnerRow[] | undefined>(() => {
    if (!filteredApps || !partnersQuery.data) return undefined;
    const counts = new Map<string, number>();
    for (const a of filteredApps) {
      counts.set(a.partnerId, (counts.get(a.partnerId) ?? 0) + 1);
    }
    return partnersQuery.data
      .map((p) => ({
        partnerId: p.id,
        partnerName: p.name,
        count: counts.get(p.id) ?? 0,
        approvalRate: p.approvalRate,
      }))
      .filter((p) => p.count > 0)
      .toSorted((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredApps, partnersQuery.data]);

  const trendSeries: LineSeries[] = useMemo(
    () => [
      {
        key: "created",
        label: t("dashboard.trendSeries.created"),
        color: TREND_COLORS.created,
      },
      {
        key: "approved",
        label: t("dashboard.trendSeries.approved"),
        color: TREND_COLORS.approved,
      },
      {
        key: "rejected",
        label: t("dashboard.trendSeries.rejected"),
        color: TREND_COLORS.rejected,
      },
    ],
    [t],
  );

  const subtitleLabel = useMemo(
    () => capitalize(formatDate(new Date(nowTs), "EEEE, d MMMM yyyy")),
    [nowTs],
  );

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setNowTs(Date.now());
    void Promise.all([
      appsQuery.refetch(),
      partnersQuery.refetch(),
      clientsQuery.refetch(),
    ]);
    window.setTimeout(() => setRefreshing(false), 600);
  };

  const showEmpty = !isLoading && filteredApps?.length === 0;
  const totalForDonut = statusBreakdown?.reduce((s, x) => s + x.value, 0) ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("dashboard.title")}
        description={subtitleLabel}
        actions={
          <div className="flex items-center gap-2">
            <Select
              value={period}
              onValueChange={(value) => setPeriod(value as PeriodKey)}
            >
              <SelectTrigger
                className="w-36"
                aria-label={t("dashboard.period.ariaLabel")}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">
                  {t("dashboard.period.today")}
                </SelectItem>
                <SelectItem value="7d">{t("dashboard.period.7d")}</SelectItem>
                <SelectItem value="30d">{t("dashboard.period.30d")}</SelectItem>
                <SelectItem value="90d">{t("dashboard.period.90d")}</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              aria-label={t("actions.refresh")}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw
                className={cn(
                  "h-4 w-4",
                  refreshing && "animate-[spin_600ms_linear_1]",
                )}
              />
            </Button>
          </div>
        }
      />

      {kpiData ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            label={t("dashboard.kpi.totalUsers")}
            value={formatNumber(kpiData.totalUsers)}
            deltaText={t("dashboard.kpi.totalUsersDelta")}
            icon={<Users className="h-4 w-4" />}
          />
          <KPICard
            label={t("dashboard.kpi.applicationsToday")}
            value={formatNumber(kpiData.today)}
            deltaText={t("dashboard.kpi.applicationsTodayDelta")}
            icon={<FileText className="h-4 w-4" />}
          />
          <button
            type="button"
            onClick={() => navigate("/applications?period=3h")}
            className="rounded-lg text-left transition-shadow hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            aria-label={`${t("dashboard.kpi.applicationsLast3h")}: ${formatNumber(kpiData.last3h)}`}
          >
            <KPICard
              label={t("dashboard.kpi.applicationsLast3h")}
              value={formatNumber(kpiData.last3h)}
              deltaText={t("dashboard.kpi.applicationsLast3hDelta")}
              icon={<Clock className="h-4 w-4 text-brand" />}
              highlighted
            />
          </button>
          <KPICard
            label={t("dashboard.kpi.approved")}
            value={`${kpiData.approvalRate}%`}
            deltaText={t("dashboard.kpi.approvedDelta")}
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
      )}

      {showEmpty ? (
        <EmptyState
          icon={<Inbox className="h-5 w-5" />}
          title={t("dashboard.empty.title")}
          description={t("dashboard.empty.description")}
        />
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-5">
            <LineChartCard<TrendPoint>
              className="lg:col-span-3"
              title={t("dashboard.charts.applicationsTrend")}
              description={t("dashboard.charts.applicationsTrendDescription")}
              data={trendData}
              xKey="date"
              series={trendSeries}
              xTickFormatter={(value) => formatDate(value, "d MMM")}
              tooltipValueFormatter={(value, name) => [
                formatNumber(value),
                name,
              ]}
              tooltipLabelFormatter={(label) =>
                formatDate(label, "d MMMM yyyy")
              }
              ariaLabel={t("dashboard.charts.ariaTrend")}
            />
            <div className="lg:col-span-2">
              <DonutChartCard
                title={t("dashboard.charts.statusBreakdown")}
                data={statusBreakdown}
                centerValue={formatNumber(totalForDonut)}
                centerLabel={t("dashboard.recentApplications")}
                ariaLabel={t("dashboard.charts.ariaStatusBreakdown")}
                legendFormatter={(slice, percent) => (
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: slice.color }}
                      />
                      <span className="truncate text-xs">{slice.label}</span>
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {formatNumber(slice.value)} · {percent.toFixed(0)}%
                    </span>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.85fr_1fr]">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">
                  {t("dashboard.recent.title")}
                </CardTitle>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-muted-foreground hover:text-foreground"
                >
                  <Link to="/applications">
                    {t("dashboard.viewAll")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {recentApps ? (
                  <>
                    <div className="hidden sm:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t("table.id")}</TableHead>
                            <TableHead>{t("table.client")}</TableHead>
                            <TableHead className="text-right">
                              {t("table.amount")}
                            </TableHead>
                            <TableHead>{t("table.partner")}</TableHead>
                            <TableHead>{t("table.status")}</TableHead>
                            <TableHead>{t("dashboard.recent.time")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentApps.map((app) => (
                            <TableRow
                              key={app.id}
                              onClick={() => navigate(`/applications/${app.id}`)}
                              className="cursor-pointer hover:bg-muted/50"
                            >
                              <TableCell className="font-mono text-xs">
                                {app.number}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-7 w-7">
                                    <AvatarFallback className="bg-brand-soft text-[10px] font-medium text-brand-foreground">
                                      {getInitials(app.clientName)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">
                                    {app.clientName}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right tabular-nums">
                                {formatUZS(app.amount)}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {app.partnerName}
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={app.status} />
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {formatRelative(app.createdAt)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <ul className="space-y-2 p-3 sm:hidden">
                      {recentApps.map((app) => (
                        <li key={app.id}>
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/applications/${app.id}`)
                            }
                            className="block w-full rounded-lg border bg-card p-3 text-left transition-colors hover:border-foreground/20 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="min-w-0 truncate text-sm font-semibold">
                                {app.clientName}
                              </p>
                              <StatusBadge
                                status={app.status}
                                className="shrink-0"
                              />
                            </div>
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {app.partnerName} ·{" "}
                              {formatRelative(app.createdAt)}
                            </p>
                            <p className="mt-2 text-base font-semibold tabular-nums">
                              {formatUZS(app.amount)}
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="space-y-2 p-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {t("dashboard.charts.topPartners")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topPartners
                  ? topPartners.map((p) => (
                      <button
                        key={p.partnerId}
                        type="button"
                        onClick={() =>
                          navigate(`/partners?focus=${p.partnerId}`)
                        }
                        className="-mx-2 block w-full rounded-md p-2 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-medium">
                            {p.partnerName}
                          </span>
                          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                            {formatNumber(p.count)} ·{" "}
                            <span className="text-foreground">
                              {p.approvalRate}%
                            </span>
                          </span>
                        </div>
                        <div
                          className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                          role="progressbar"
                          aria-valuenow={p.approvalRate}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${p.partnerName}: ${t("dashboard.topPartners.approvalRate")} ${p.approvalRate}%`}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${p.approvalRate}%`,
                              background: progressColor(p.approvalRate),
                            }}
                          />
                        </div>
                      </button>
                    ))
                  : Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
