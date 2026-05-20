import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatRelative } from "@/lib/utils/formatters";
import {
  notificationsApi,
  notificationsKeys,
} from "@/api/notifications.api";

export function NotificationsMenu() {
  const { t } = useTranslation();
  const { data } = useQuery({
    queryKey: notificationsKeys.list(),
    queryFn: notificationsApi.list,
  });

  const unread = data?.filter((n) => !n.read).length ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("common.notifications")}
          className="relative"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 ? (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-brand-foreground tabular-nums">
              {unread}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold">
            {t("common.notifications")}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            {unread}/{data?.length ?? 0}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0" />
        <ScrollArea className="h-[360px]">
          <ul className="divide-y">
            {data?.map((n) => (
              <li
                key={n.id}
                className={cn(
                  "px-4 py-3 transition-colors hover:bg-accent/50",
                  !n.read && "bg-brand-soft/40 dark:bg-brand-soft/20",
                )}
              >
                <p className="text-sm font-medium leading-tight">{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {n.description}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {formatRelative(n.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
