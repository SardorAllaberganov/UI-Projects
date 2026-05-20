import { clients } from "@/mock/clients";
import { delay } from "./_client";

export const clientsApi = {
  list: () => delay(clients),
  get: (id: string) => delay(clients.find((c) => c.id === id) ?? null),
};

export const clientsKeys = {
  all: ["clients"] as const,
  list: () => [...clientsKeys.all, "list"] as const,
  detail: (id: string) => [...clientsKeys.all, "detail", id] as const,
};
