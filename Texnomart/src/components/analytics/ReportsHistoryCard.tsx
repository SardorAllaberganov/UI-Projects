import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  Loader2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";

import { formatDate } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils";
import type { ReportItem } from "@/types";

type SortDir = "asc" | "desc";

interface ReportsHistoryCardProps {
  reports: ReportItem[] | undefined;
  onDownload: (report: ReportItem) => void;
  onDelete: (report: ReportItem) => void;
  onExportAll: () => void;
}

const MAX_ROWS = 10;

export function ReportsHistoryCard({
  reports,
  onDownload,
  onDelete,
  onExportAll,
}: ReportsHistoryCardProps) {
  const { t } = useTranslation();
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [confirmTarget, setConfirmTarget] = useState<ReportItem | null>(null);

  const sortedRows = useMemo(() => {
    if (!reports) return undefined;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...reports]
      .toSorted((a, b) => a.generatedAt.localeCompare(b.generatedAt) * dir)
      .slice(0, MAX_ROWS);
  }, [reports, sortDir]);

  const toggleSort = () =>
    setSortDir((prev) => (prev === "desc" ? "asc" : "desc"));

  const handleConfirmDelete = () => {
    if (!confirmTarget) return;
    onDelete(confirmTarget);
    setConfirmTarget(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base">
          {t("analytics.history.title")}
        </CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={onExportAll}
          disabled={!reports || reports.length === 0}
        >
          <Download className="h-3.5 w-3.5" />
          {t("analytics.actions.exportAll")}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {sortedRows ? (
          sortedRows.length === 0 ? (
            <div className="p-6">
              <EmptyState title={t("analytics.history.empty")} />
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">
                      <button
                        type="button"
                        onClick={toggleSort}
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={t("analytics.history.table.createdAt")}
                      >
                        {t("analytics.history.table.createdAt")}
                        {sortDir === "desc" ? (
                          <ArrowDown className="h-3 w-3" />
                        ) : sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </button>
                    </TableHead>
                    <TableHead>
                      {t("analytics.history.table.kind")}
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      {t("analytics.history.table.range")}
                    </TableHead>
                    <TableHead>
                      {t("analytics.history.table.author")}
                    </TableHead>
                    <TableHead>
                      {t("analytics.history.table.status")}
                    </TableHead>
                    <TableHead className="w-[60px] text-right">
                      <span className="sr-only">
                        {t("analytics.history.table.actions")}
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap tabular-nums text-sm">
                        {formatDate(r.generatedAt, "d MMM yyyy, HH:mm")}
                      </TableCell>
                      <TableCell className="text-sm">
                        {t(`analytics.kind.${r.kind}` as const)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground tabular-nums">
                        {formatDate(r.rangeFrom, "d MMM")} —{" "}
                        {formatDate(r.rangeTo, "d MMM yyyy")}
                      </TableCell>
                      <TableCell className="text-sm">{r.generatedBy}</TableCell>
                      <TableCell>
                        <ReportStatusPill status={r.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              aria-label={t("analytics.history.table.actions")}
                              disabled={r.status === "processing"}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem onClick={() => onDownload(r)}>
                              <Download className="mr-2 h-3.5 w-3.5" />
                              {r.format === "csv"
                                ? t("analytics.history.action.downloadCsv")
                                : t("analytics.history.action.downloadXlsx")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setConfirmTarget(r)}
                            >
                              <Trash2 className="mr-2 h-3.5 w-3.5" />
                              {t("analytics.history.action.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )
        ) : (
          <div className="space-y-2 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}
      </CardContent>

      <ConfirmDialog
        open={confirmTarget !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmTarget(null);
        }}
        title={t("analytics.history.deleteConfirmTitle")}
        description={
          confirmTarget
            ? t("analytics.history.deleteConfirmDescription", {
                name: confirmTarget.name,
              })
            : undefined
        }
        confirmLabel={t("actions.delete")}
        cancelLabel={t("actions.cancel")}
        variant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
}

function ReportStatusPill({ status }: { status: ReportItem["status"] }) {
  const { t } = useTranslation();
  if (status === "processing") {
    return (
      <Badge
        variant="outline"
        className={cn(
          "gap-1 border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
        )}
      >
        <Loader2 className="h-3 w-3 animate-spin" />
        {t("analytics.history.status.processing")}
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
    >
      {t("analytics.history.status.ready")}
    </Badge>
  );
}
