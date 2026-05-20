import { partners } from "@/mock/partners";
import { delay } from "./_client";

export const partnersApi = {
  list: () => delay(partners),
  get: (id: string) => delay(partners.find((p) => p.id === id) ?? null),
};

export const partnersKeys = {
  all: ["partners"] as const,
  list: () => [...partnersKeys.all, "list"] as const,
  detail: (id: string) => [...partnersKeys.all, "detail", id] as const,
};
