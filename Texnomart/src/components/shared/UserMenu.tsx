import { Check, LogOut, Settings, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoleBadge } from "./RoleBadge";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

const LOCALE_OPTIONS: Array<{ value: Locale; labelKey: string }> = [
  { value: "ru", labelKey: "locale.ru" },
  { value: "uz", labelKey: "locale.uz" },
];

export function UserMenu() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { locale, setLocale } = useLocale();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-foreground text-background text-xs font-semibold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="text-sm font-medium">{user.fullName}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
          <span className="pt-1">
            <RoleBadge role={user.role} />
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          {t("user.profile")}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          {t("user.settings")}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="sm:hidden" />
        <DropdownMenuLabel className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:hidden">
          {t("locale.title")}
        </DropdownMenuLabel>
        {LOCALE_OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onSelect={() => setLocale(opt.value)}
            className={cn("sm:hidden", locale === opt.value && "font-medium")}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                locale === opt.value ? "opacity-100" : "opacity-0",
              )}
            />
            {t(opt.labelKey)}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={signOut}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t("user.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
