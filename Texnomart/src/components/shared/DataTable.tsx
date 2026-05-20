import {
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface FilterChip<T> {
  key: string;
  label: ReactNode;
  active: boolean;
  onClear: () => void;
  predicate: (row: T) => boolean;
}

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  searchKeys?: Array<keyof T>;
  searchPlaceholder?: string;
  filters?: FilterChip<T>[];
  onRowClick?: (row: T) => void;
  pagination?: boolean;
  initialPageSize?: number;
  emptyState?: ReactNode;
  className?: string;
  toolbarActions?: ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  searchKeys,
  searchPlaceholder,
  filters,
  onRowClick,
  pagination = true,
  initialPageSize = 10,
  emptyState,
  className,
  toolbarActions,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const filteredData = useMemo(() => {
    let rows = data;
    if (search && searchKeys && searchKeys.length > 0) {
      const q = search.toLowerCase().trim();
      rows = rows.filter((row) =>
        searchKeys.some((k) => {
          const v = row[k];
          return v != null && String(v).toLowerCase().includes(q);
        }),
      );
    }
    if (filters) {
      for (const f of filters) {
        if (f.active) rows = rows.filter((r) => f.predicate(r));
      }
    }
    return rows;
  }, [data, search, searchKeys, filters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    initialState: pagination
      ? { pagination: { pageSize: initialPageSize, pageIndex: 0 } }
      : undefined,
  });

  const activeFilters = filters?.filter((f) => f.active) ?? [];
  const total = filteredData.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const from = total === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {searchKeys && searchKeys.length > 0 ? (
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder ?? t("actions.search")}
                className="pl-9"
              />
            </div>
          ) : null}

          {activeFilters.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <Button
                  key={f.key}
                  variant="secondary"
                  size="sm"
                  onClick={f.onClear}
                  className="h-7 gap-1.5 rounded-full px-2.5 text-xs"
                >
                  {f.label}
                  <X className="h-3 w-3" />
                </Button>
              ))}
              <button
                type="button"
                onClick={() => activeFilters.forEach((f) => f.onClear())}
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {t("actions.resetFilters")}
              </button>
            </div>
          ) : null}
        </div>
        {toolbarActions ? <div className="flex items-center gap-2">{toolbarActions}</div> : null}
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 p-0"
                >
                  {emptyState ?? (
                    <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                      {t("common.noResults")}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={onRowClick ? "cursor-pointer" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && total > 0 ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground tabular-nums">
            {t("table.showing", { from, to, total })}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {t("table.rowsPerPage")}
              </span>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => table.setPageSize(Number(v))}
              >
                <SelectTrigger className="h-8 w-[72px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 50, 100].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-2 text-xs tabular-nums text-muted-foreground">
                {t("table.page", {
                  page: pageIndex + 1,
                  pages: table.getPageCount() || 1,
                })}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
