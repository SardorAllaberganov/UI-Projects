import { reports } from "@/mock/reports";
import type {
  ReportBreakdown,
  ReportFormat,
  ReportItem,
  ReportKind,
} from "@/types";
import { delay } from "./_client";

export interface CreateReportInput {
  name: string;
  kind: ReportKind;
  format: ReportFormat;
  breakdown: ReportBreakdown[];
  rangeFrom: string;
  rangeTo: string;
  generatedBy: string;
}

let nextId = reports.length + 1;
const pad = (n: number) => n.toString().padStart(3, "0");

export const reportsApi = {
  list: () => delay([...reports]),

  create: async (input: CreateReportInput): Promise<ReportItem> => {
    const item: ReportItem = {
      id: `rep_${pad(nextId++)}`,
      name: input.name,
      kind: input.kind,
      status: "processing",
      format: input.format,
      breakdown: input.breakdown,
      rangeFrom: input.rangeFrom,
      rangeTo: input.rangeTo,
      generatedAt: new Date().toISOString(),
      generatedBy: input.generatedBy,
      fileSize: 0,
    };
    reports.unshift(item);
    return delay(item);
  },

  markReady: async (id: string): Promise<ReportItem | null> => {
    const idx = reports.findIndex((r) => r.id === id);
    if (idx === -1) return delay(null);
    const current = reports[idx]!;
    const updated: ReportItem = {
      ...current,
      status: "ready",
      fileSize: 80_000 + current.breakdown.length * 90_000,
      generatedAt: new Date().toISOString(),
    };
    reports[idx] = updated;
    return delay(updated);
  },

  remove: async (id: string): Promise<{ id: string } | null> => {
    const idx = reports.findIndex((r) => r.id === id);
    if (idx === -1) return delay(null);
    reports.splice(idx, 1);
    return delay({ id });
  },
};

export const reportsKeys = {
  all: ["reports"] as const,
  list: () => [...reportsKeys.all, "list"] as const,
};
