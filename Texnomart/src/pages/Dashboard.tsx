import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  Wallet,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { KPICard } from "@/components/charts/KPICard";
import { LineChartCard } from "@/components/charts/LineChartCard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import {
  DonutChartCard,
  type DonutSlice,
} from "@/components/charts/DonutChartCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { LoadingState } from "@/components/shared/LoadingState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatUZS,
  formatDate,
  formatPercent,
  formatNumber,
} from "@/lib/utils/formatters";
import {
  APPLICATION_STATUS_VARIANTS,
  APPLICATION_STATUS_LABELS_RU,
  type ApplicationStatus,
} from "@/lib/constants/enums";
import {
  applicationsApi,
  applicationsKeys,
  dashboardApi,
  dashboardKeys,
} from "@/api";

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

export function Dashboard() {
  const { t } = useTranslation();

  const kpiQuery = useQuery({
    queryKey: dashboardKeys.kpi(),
    queryFn: dashboardApi.kpi,
  });
  const trendQuery = useQuery({
    queryKey: dashboardKeys.trend(14),
    queryFn: () => dashboardApi.trend(14),
  });
  const statusQuery = useQuery({
    queryKey: dashboardKeys.statusBreakdown(),
    queryFn: dashboardApi.statusBreakdown,
  });
  const partnersQuery = useQuery({
    queryKey: dashboardKeys.topPartners(6),
    queryFn: () => dashboardApi.topPartners(6),
  });
  const branchesQuery = useQuery({
    queryKey: dashboardKeys.topBranches(6),
    queryFn: () => dashboardApi.topBranches(6),
  });
  const recentQuery = useQuery({
    queryKey: applicationsKeys.recent(8),
    queryFn: () => applicationsApi.recent(8),
  });

  const kpi = kpiQuery.data;
  const totalApps =
    statusQuery.data?.reduce((s, x) => s + x.count, 0) ?? 0;

  const donutData: DonutSlice[] | undefined = statusQuery.data?.map((s) => ({
    key: s.status,
    label:
      APPLICATION_STATUS_LABELS_RU[s.status as ApplicationStatus] ?? s.status,
    value: s.count,
    color: STATUS_COLORS[s.status as ApplicationStatus] ?? "hsl(215 16% 47%)",
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("dashboard.title")}
        description={t("dashboard.subtitle")}
        actions={
          <Button
            asChild
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Link to="/applications">{t("actions.newApplication")}</Link>
          </Button>
        }
      />

      {kpi ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <KPICard
            label={t("dashboard.kpi.applicationsLast3h")}
            value={formatNumber(kpi.last3h)}
            icon={<Clock className="h-4 w-4" />}
            highlighted
          />
          <KPICard
            label={t("dashboard.kpi.applicationsToday")}
            value={formatNumber(kpi.today)}
            delta={8.2}
            icon={<FileText className="h-4 w-4" />}
          />
          <KPICard
            label={t("dashboard.kpi.approvalRate")}
            value={formatPercent(kpi.approvalRate)}
            delta={2.4}
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
          <KPICard
            label={t("dashboard.kpi.disbursedToday")}
            value={formatUZS(kpi.disbursedTodaySum)}
            delta={-1.3}
            icon={<Wallet className="h-4 w-4" />}
          />
          <KPICard
            label={t("dashboard.kpi.activeAgents")}
            value={formatNumber(kpi.activeAgents)}
            delta={4.7}
            icon={<Briefcase className="h-4 w-4" />}
          />
        </div>
      ) : (
        <LoadingState variant="cards" />
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <LineChartCard
          className="lg:col-span-2"
          title={t("dashboard.charts.applicationsTrend")}
          description={t("table.showing", {
            from: 1,
            to: 14,
            total: 14,
          })}
          data={trendQuery.data}
          xKey="date"
          yKey="count"
          xTickFormatter={(v) => v.slice(5)}
        />
        <DonutChartCard
          title={t("dashboard.charts.statusBreakdown")}
          data={donutData}
          centerValue={formatNumber(totalApps)}
          centerLabel={t("nav.applications")}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarChartCard
          title={t("dashboard.charts.topPartners")}
          data={partnersQuery.data}
          xKey="partnerName"
          yKey="count"
          layout="vertical"
          yAxisWidth={120}
        />
        <BarChartCard
          title={t("dashboard.charts.topBranches")}
          data={branchesQuery.data}
          xKey="branchName"
          yKey="count"
          layout="vertical"
          yAxisWidth={160}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base">
            {t("dashboard.recentApplications")}
          </CardTitle>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link to="/applications">
              {t("dashboard.viewAll")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.id")}</TableHead>
                <TableHead>{t("table.client")}</TableHead>
                <TableHead>{t("table.partner")}</TableHead>
                <TableHead className="text-right">
                  {t("table.amount")}
                </TableHead>
                <TableHead>{t("table.term")}</TableHead>
                <TableHead>{t("table.status")}</TableHead>
                <TableHead>{t("table.createdAt")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentQuery.data?.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-mono text-xs">
                    {app.number}
                  </TableCell>
                  <TableCell className="font-medium">
                    {app.clientName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {app.partnerName}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatUZS(app.amount)}
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {t("table.term_months", { count: app.termMonths })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={app.status}
                      variant={APPLICATION_STATUS_VARIANTS[app.status]}
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(app.createdAt, "d MMM, HH:mm")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
