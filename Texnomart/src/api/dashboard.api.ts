import {
  applications,
  applicationStatusCounts,
} from "@/mock/applications";
import { partners } from "@/mock/partners";
import { branches } from "@/mock/branches";
import { users } from "@/mock/users";
import { delay } from "./_client";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

function startOfDay(d: Date): number {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c.getTime();
}

export const dashboardApi = {
  kpi: () => {
    const now = Date.now();
    const todayStart = startOfDay(new Date(now));
    const last3h = applications.filter(
      (a) => new Date(a.createdAt).getTime() > now - 3 * HOUR,
    ).length;
    const today = applications.filter(
      (a) => new Date(a.createdAt).getTime() >= todayStart,
    ).length;
    const decided = applications.filter((a) =>
      ["approved", "contract_signed", "disbursed", "closed", "rejected"].includes(
        a.status,
      ),
    );
    const approved = decided.filter((a) =>
      ["approved", "contract_signed", "disbursed", "closed"].includes(a.status),
    );
    const approvalRate =
      decided.length > 0 ? (approved.length / decided.length) * 100 : 0;
    const disbursedTodaySum = applications
      .filter(
        (a) =>
          a.status === "disbursed" &&
          new Date(a.updatedAt).getTime() >= todayStart,
      )
      .reduce((s, a) => s + a.amount, 0);
    const activeAgents = users.filter(
      (u) => u.role === "agent" && u.status === "active",
    ).length;

    return delay({
      last3h,
      today,
      approvalRate,
      disbursedTodaySum,
      activeAgents,
    });
  },

  trend: (days = 14) => {
    const now = Date.now();
    const buckets = new Map<string, number>();
    for (let i = days - 1; i >= 0; i -= 1) {
      const key = new Date(now - i * DAY).toISOString().slice(0, 10);
      buckets.set(key, 0);
    }
    for (const app of applications) {
      const key = app.createdAt.slice(0, 10);
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    return delay(
      [...buckets.entries()].map(([date, count]) => ({ date, count })),
    );
  },

  statusBreakdown: () =>
    delay(
      Object.entries(applicationStatusCounts).map(([status, count]) => ({
        status,
        count,
      })),
    ),

  topPartners: (limit = 5) => {
    const counts = new Map<string, number>();
    for (const a of applications) {
      counts.set(a.partnerId, (counts.get(a.partnerId) ?? 0) + 1);
    }
    return delay(
      partners
        .map((p) => ({
          partnerId: p.id,
          partnerName: p.name,
          count: counts.get(p.id) ?? 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit),
    );
  },

  topBranches: (limit = 5) => {
    const counts = new Map<string, number>();
    for (const a of applications) {
      counts.set(a.branchId, (counts.get(a.branchId) ?? 0) + 1);
    }
    return delay(
      branches
        .map((b) => ({
          branchId: b.id,
          branchName: b.name,
          city: b.city,
          count: counts.get(b.id) ?? 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit),
    );
  },
};

export const dashboardKeys = {
  all: ["dashboard"] as const,
  kpi: () => [...dashboardKeys.all, "kpi"] as const,
  trend: (days: number) => [...dashboardKeys.all, "trend", days] as const,
  statusBreakdown: () =>
    [...dashboardKeys.all, "statusBreakdown"] as const,
  topPartners: (limit: number) =>
    [...dashboardKeys.all, "topPartners", limit] as const,
  topBranches: (limit: number) =>
    [...dashboardKeys.all, "topBranches", limit] as const,
};
