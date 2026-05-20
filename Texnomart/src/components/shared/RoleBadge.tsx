import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/constants/enums";

const ROLE_CLASSES: Record<Role, string> = {
  superadmin:
    "bg-violet-100 text-violet-900 hover:bg-violet-100 dark:bg-violet-500/15 dark:text-violet-300",
  admin:
    "bg-slate-200 text-slate-900 hover:bg-slate-200 dark:bg-slate-500/20 dark:text-slate-200",
  operator:
    "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-500/15 dark:text-slate-300",
  agent:
    "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-500/15 dark:text-slate-300",
};

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const { t } = useTranslation();
  return (
    <Badge
      variant="secondary"
      className={cn(
        "border-transparent font-medium",
        ROLE_CLASSES[role],
        className,
      )}
    >
      {t(`role.${role}`)}
    </Badge>
  );
}
