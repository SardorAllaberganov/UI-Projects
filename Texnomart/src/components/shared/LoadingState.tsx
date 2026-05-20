import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  variant?: "table" | "cards" | "page";
  rows?: number;
  className?: string;
}

export function LoadingState({
  variant = "table",
  rows = 8,
  className,
}: LoadingStateProps) {
  if (variant === "cards") {
    return (
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
          className,
        )}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div className={cn("space-y-6", className)}>
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
