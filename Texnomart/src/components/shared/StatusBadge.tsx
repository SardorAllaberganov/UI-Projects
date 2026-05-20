import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  APPLICATION_STATUS_VARIANTS,
  type ApplicationStatus,
  type StatusVariant,
} from "@/lib/constants/enums";

const VARIANT_CLASSES: Record<StatusVariant, string> = {
  success:
    "bg-emerald-100 text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300",
  warning:
    "bg-amber-100 text-amber-900 hover:bg-amber-100 dark:bg-amber-500/15 dark:text-amber-300",
  danger:
    "bg-rose-100 text-rose-900 hover:bg-rose-100 dark:bg-rose-500/15 dark:text-rose-300",
  info: "bg-sky-100 text-sky-900 hover:bg-sky-100 dark:bg-sky-500/15 dark:text-sky-300",
  neutral:
    "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-500/15 dark:text-slate-300",
};

interface StatusBadgeProps {
  status: ApplicationStatus;
  variant?: StatusVariant;
  className?: string;
}

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const { t } = useTranslation();
  const v = variant ?? APPLICATION_STATUS_VARIANTS[status];
  return (
    <Badge
      variant="secondary"
      className={cn(
        "border-transparent font-medium",
        VARIANT_CLASSES[v],
        className,
      )}
    >
      {t(`status.${status}`)}
    </Badge>
  );
}

interface VariantBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

export function VariantBadge({
  variant,
  children,
  className,
}: VariantBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "border-transparent font-medium",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </Badge>
  );
}
