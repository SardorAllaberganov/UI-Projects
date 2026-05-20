import { branches } from "@/mock/branches";
import { delay } from "./_client";

export const branchesApi = {
  list: () => delay(branches),
  get: (id: string) => delay(branches.find((b) => b.id === id) ?? null),
};

export const branchesKeys = {
  all: ["branches"] as const,
  list: () => [...branchesKeys.all, "list"] as const,
  detail: (id: string) => [...branchesKeys.all, "detail", id] as const,
};
