import { notifications } from "@/mock/notifications";
import { delay } from "./_client";

export const notificationsApi = {
  list: () => delay(notifications),
  unreadCount: () => delay(notifications.filter((n) => !n.read).length),
};

export const notificationsKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationsKeys.all, "list"] as const,
  unreadCount: () => [...notificationsKeys.all, "unreadCount"] as const,
};
