import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  PanelLeftClose,
  PanelLeftOpen,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SECONDARY_NAV } from "@/lib/constants/navigation";
import { Logo, LogoMark } from "./Logo";
import {
  applicationsApi,
  applicationsKeys,
} from "@/api/applications.api";

function useUnreadApplications(): number {
  const { data } = useQuery({
    queryKey: applicationsKeys.list(),
    queryFn: applicationsApi.list,
  });
  return (
    data?.filter((a) => a.status === "submitted" || a.status === "scoring")
      .length ?? 0
  );
}

interface NavLinkRowProps {
  to: string;
  label: string;
  icon: LucideIcon;
  badgeValue?: number;
  collapsed: boolean;
}

function NavLinkRow({
  to,
  label,
  icon: Icon,
  badgeValue,
  collapsed,
}: NavLinkRowProps) {
  const { pathname } = useLocation();
  const isActive =
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={label}>
        <NavLink
          to={to}
          end={to === "/"}
          className={cn(
            "relative flex items-center gap-2 transition-colors",
            isActive
              ? "font-semibold text-foreground before:absolute before:inset-y-1 before:left-0 before:w-[3px] before:rounded-r-full before:bg-brand before:shadow-[0_0_0_1px_hsl(var(--brand)/0.25)]"
              : "font-normal text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4 shrink-0 transition-colors",
              isActive ? "text-brand" : "text-current",
            )}
            strokeWidth={isActive ? 2.5 : 2}
          />
          <span className={cn(collapsed && "sr-only")}>{label}</span>
        </NavLink>
      </SidebarMenuButton>
      {badgeValue && badgeValue > 0 && !collapsed ? (
        <SidebarMenuBadge
          className={cn(
            "bg-brand-soft text-brand-foreground dark:bg-brand-soft dark:text-brand",
            isActive && "ring-1 ring-brand/40",
          )}
        >
          {badgeValue}
        </SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  );
}

function CollapseToggle({ collapsed }: { collapsed: boolean }) {
  const { t } = useTranslation();
  const { toggleSidebar } = useSidebar();
  const label = collapsed ? t("nav.expand") : t("nav.collapse");

  return (
    <SidebarMenuButton
      onClick={toggleSidebar}
      tooltip={label}
      aria-label={label}
      className="text-muted-foreground hover:text-foreground"
    >
      {collapsed ? (
        <PanelLeftOpen className="h-4 w-4 shrink-0" />
      ) : (
        <PanelLeftClose className="h-4 w-4 shrink-0" />
      )}
      <span className={cn(collapsed && "sr-only")}>{label}</span>
    </SidebarMenuButton>
  );
}

export function AppSidebar() {
  const { t } = useTranslation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const unreadApplications = useUnreadApplications();

  const badgeFor = (key?: string) =>
    key === "unreadApplications" ? unreadApplications : undefined;

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b">
        <div className="flex h-12 items-center px-2">
          {collapsed ? (
            <LogoMark size={26} className="mx-auto" />
          ) : (
            <Logo className="h-7 w-auto" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <NavLinkRow
                  key={item.key}
                  to={item.path}
                  label={t(`nav.${item.key}`)}
                  icon={item.icon}
                  badgeValue={badgeFor(item.badge)}
                  collapsed={collapsed}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SECONDARY_NAV.map((item) => (
                <NavLinkRow
                  key={item.key}
                  to={item.path}
                  label={t(`nav.${item.key}`)}
                  icon={item.icon}
                  collapsed={collapsed}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <CollapseToggle collapsed={collapsed} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
