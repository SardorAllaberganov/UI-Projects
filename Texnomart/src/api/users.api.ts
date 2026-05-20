import { users } from "@/mock/users";
import { delay } from "./_client";

export const usersApi = {
  list: () => delay(users),
  get: (id: string) => delay(users.find((u) => u.id === id) ?? null),
};

export const usersKeys = {
  all: ["users"] as const,
  list: () => [...usersKeys.all, "list"] as const,
  detail: (id: string) => [...usersKeys.all, "detail", id] as const,
};
