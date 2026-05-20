import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: ReactNode;
  value: ReactNode;
  delta?: number;
  deltaLabel?: ReactNode;
  deltaText?: ReactNode;
  icon?: ReactNode;
  highlighted?: boolean;
  className?: string;
}

export function KPICard({
  label,
  value,
  delta,
  deltaLabel,
  deltaText,
  icon,
  highlighted = false,
  className,
}: KPICardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <Card
      className={cn(
        "h-full transition-shadow",
        highlighted && "border-l-4 border-l-brand bg-brand-soft/40",
        className,
      )}
    >
      <CardContent className="flex h-full items-start justify-between gap-3 p-5">
        <div className="space-y-1.5">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
          {deltaText !== undefined ? (
            <p className="text-xs text-muted-foreground">{deltaText}</p>
          ) : delta !== undefined ? (
            <p
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium",
                positive ? "text-emerald-600" : "text-rose-600",
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {Math.abs(delta).toFixed(1)}%
              {deltaLabel ? (
                <span className="text-muted-foreground font-normal">
                  · {deltaLabel}
                </span>
              ) : null}
            </p>
          ) : null}
        </div>
        {icon ? (
          <div className="shrink-0 rounded-md border bg-background/60 p-2 text-muted-foreground">
            {icon}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
