import { applications } from "@/mock/applications";
import type { CreditApplication } from "@/types";
import { delay } from "./_client";

export const applicationsApi = {
  list: () => delay(applications),
  get: (id: string): Promise<CreditApplication | null> =>
    delay(applications.find((a) => a.id === id) ?? null),
  recent: (limit = 8) =>
    delay(
      [...applications]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, limit),
    ),
};

export const applicationsKeys = {
  all: ["applications"] as const,
  list: () => [...applicationsKeys.all, "list"] as const,
  detail: (id: string) => [...applicationsKeys.all, "detail", id] as const,
  recent: (limit: number) =>
    [...applicationsKeys.all, "recent", limit] as const,
};
