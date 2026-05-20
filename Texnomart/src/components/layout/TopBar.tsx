import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NotificationsMenu } from "@/components/shared/NotificationsMenu";
import { UserMenu } from "@/components/shared/UserMenu";
import { NAV_ITEMS, SECONDARY_NAV } from "@/lib/constants/navigation";

function useCurrentNavItem() {
  const { pathname } = useLocation();
  const all = [...NAV_ITEMS, ...SECONDARY_NAV];
  if (pathname === "/") {
    return NAV_ITEMS[0];
  }
  return all.find(
    (item) =>
      item.path !== "/" &&
      (pathname === item.path || pathname.startsWith(`${item.path}/`)),
  );
}

function MobileMenuButton() {
  const { t } = useTranslation();
  const { isMobile, toggleSidebar } = useSidebar();
  if (!isMobile) return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="-ml-1 shrink-0"
      onClick={toggleSidebar}
      aria-label={t("common.openMenu")}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}

export function TopBar() {
  const { t } = useTranslation();
  const current = useCurrentNavItem();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-1.5 border-b bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:gap-2 sm:px-4 md:px-6">
      <MobileMenuButton />

      <nav
        aria-label="Breadcrumb"
        className="flex min-w-0 items-center gap-1 text-sm"
      >
        <Link
          to="/"
          className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline"
        >
          {t("app.shortName")}
        </Link>
        {current ? (
          <>
            <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground/60 sm:inline-block" />
            <span className="truncate font-medium text-foreground">
              {t(`nav.${current.key}`)}
            </span>
          </>
        ) : null}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
        <Button
          variant="outline"
          size="sm"
          className="hidden h-9 w-56 justify-start gap-2 text-muted-foreground md:flex"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">{t("common.search")}</span>
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={t("common.search")}
        >
          <Search className="h-4 w-4" />
        </Button>
        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>
        <ThemeToggle />
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}
