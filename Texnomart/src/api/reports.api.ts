import { reports } from "@/mock/reports";
import { delay } from "./_client";

export const reportsApi = {
  list: () => delay(reports),
};

export const reportsKeys = {
  all: ["reports"] as const,
  list: () => [...reportsKeys.all, "list"] as const,
};
