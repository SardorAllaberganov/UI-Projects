import * as XLSX from "xlsx";
import type {
  CreditApplication,
  Partner,
  ReportBreakdown,
  ReportFormat,
  SystemUser,
} from "@/types";
import {
  APPLICATION_STATUS_LABELS_RU,
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/lib/constants/enums";
import { formatDate } from "./formatters";

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

interface BuildWorkbookInput {
  applications: CreditApplication[];
  partners: Partner[];
  users: SystemUser[];
  breakdown: ReportBreakdown[];
}

const SHEET_LABELS: Record<ReportBreakdown, string> = {
  applications: "Заявки",
  users: "Пользователи",
  partners: "Партнёры",
  statuses: "Статусы",
};

function buildApplicationsSheet(rows: CreditApplication[]) {
  return rows.map((a) => ({
    "Номер": a.number,
    "Дата": formatDate(a.createdAt, "yyyy-MM-dd HH:mm"),
    "Клиент": a.clientName,
    "ПИНФЛ": a.clientPinfl,
    "Телефон": a.clientPhone,
    "Сумма (сум)": a.amount,
    "Срок (мес.)": a.termMonths,
    "Партнёр": a.partnerName,
    "Филиал": a.branchName,
    "Агент": a.agentName,
    "Статус": APPLICATION_STATUS_LABELS_RU[a.status],
    "Скоринг": a.scoringScore ?? "",
  }));
}

function buildUsersSheet(
  applications: CreditApplication[],
  users: SystemUser[],
) {
  const byAgent = new Map<
    string,
    { count: number; amount: number; approved: number; decided: number }
  >();
  for (const a of applications) {
    const slot =
      byAgent.get(a.agentId) ??
      { count: 0, amount: 0, approved: 0, decided: 0 };
    slot.count += 1;
    slot.amount += a.amount;
    if (DECIDED_STATUSES.has(a.status)) slot.decided += 1;
    if (APPROVED_STATUSES.has(a.status)) slot.approved += 1;
    byAgent.set(a.agentId, slot);
  }
  return [...byAgent.entries()]
    .toSorted((a, b) => b[1].count - a[1].count)
    .map(([agentId, m]) => {
      const user = users.find((u) => u.id === agentId);
      return {
        "Сотрудник": user?.fullName ?? "—",
        "Email": user?.email ?? "",
        "Роль": user?.role ?? "",
        "Заявок": m.count,
        "Сумма (сум)": m.amount,
        "Решений": m.decided,
        "Одобрено": m.approved,
        "% одобрения":
          m.decided > 0 ? Math.round((m.approved / m.decided) * 100) : 0,
      };
    });
}

function buildPartnersSheet(
  applications: CreditApplication[],
  partners: Partner[],
) {
  const byPartner = new Map<
    string,
    { count: number; amount: number; approved: number; decided: number }
  >();
  for (const a of applications) {
    const slot =
      byPartner.get(a.partnerId) ??
      { count: 0, amount: 0, approved: 0, decided: 0 };
    slot.count += 1;
    slot.amount += a.amount;
    if (DECIDED_STATUSES.has(a.status)) slot.decided += 1;
    if (APPROVED_STATUSES.has(a.status)) slot.approved += 1;
    byPartner.set(a.partnerId, slot);
  }
  return partners
    .map((p) => {
      const m =
        byPartner.get(p.id) ?? { count: 0, amount: 0, approved: 0, decided: 0 };
      return {
        "Партнёр": p.name,
        "Заявок": m.count,
        "Сумма (сум)": m.amount,
        "Решений": m.decided,
        "Одобрено": m.approved,
        "% одобрения (факт)":
          m.decided > 0 ? Math.round((m.approved / m.decided) * 100) : 0,
        "% одобрения (база)": p.approvalRate,
      };
    })
    .toSorted((a, b) => b["Заявок"] - a["Заявок"]);
}

function buildStatusesSheet(applications: CreditApplication[]) {
  const counts = new Map<ApplicationStatus, number>();
  for (const a of applications) {
    counts.set(a.status, (counts.get(a.status) ?? 0) + 1);
  }
  return APPLICATION_STATUSES.map((status) => ({
    "Статус": APPLICATION_STATUS_LABELS_RU[status],
    "Кол-во": counts.get(status) ?? 0,
  })).filter((row) => row["Кол-во"] > 0);
}

function buildSheet(
  dim: ReportBreakdown,
  input: BuildWorkbookInput,
): Record<string, unknown>[] {
  switch (dim) {
    case "applications":
      return buildApplicationsSheet(input.applications);
    case "users":
      return buildUsersSheet(input.applications, input.users);
    case "partners":
      return buildPartnersSheet(input.applications, input.partners);
    case "statuses":
      return buildStatusesSheet(input.applications);
  }
}

export function downloadReport(
  fileName: string,
  format: ReportFormat,
  input: BuildWorkbookInput,
) {
  const wb = XLSX.utils.book_new();
  const dims: ReportBreakdown[] =
    input.breakdown.length > 0 ? input.breakdown : ["applications"];
  for (const dim of dims) {
    const rows = buildSheet(dim, input);
    const sheet =
      rows.length > 0
        ? XLSX.utils.json_to_sheet(rows)
        : XLSX.utils.aoa_to_sheet([["Нет данных"]]);
    XLSX.utils.book_append_sheet(wb, sheet, SHEET_LABELS[dim]);
  }

  const safeName = fileName.replace(/[\\/:*?"<>|]+/g, "_");
  if (format === "csv") {
    const firstSheet = wb.SheetNames[0];
    if (!firstSheet) return;
    const csv = XLSX.utils.sheet_to_csv(wb.Sheets[firstSheet]!);
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8",
    });
    triggerDownload(blob, `${safeName}.csv`);
    return;
  }

  XLSX.writeFile(wb, `${safeName}.xlsx`);
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
