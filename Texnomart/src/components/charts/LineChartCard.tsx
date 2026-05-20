import type { ReactNode } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LineChartCardProps<T extends Record<string, unknown>> {
  title: ReactNode;
  description?: ReactNode;
  data: T[] | undefined;
  xKey: keyof T & string;
  yKey: keyof T & string;
  xTickFormatter?: (value: string) => string;
  height?: number;
  actions?: ReactNode;
  className?: string;
}

export function LineChartCard<T extends Record<string, unknown>>({
  title,
  description,
  data,
  xKey,
  yKey,
  xTickFormatter,
  height = 280,
  actions,
  className,
}: LineChartCardProps<T>) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base">{title}</CardTitle>
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions}
      </CardHeader>
      <CardContent style={{ height }}>
        {data ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: -8, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey={xKey as string}
                tickFormatter={xTickFormatter}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                fontSize={11}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
                width={32}
              />
              <Tooltip
                cursor={{ stroke: "hsl(var(--brand))", strokeWidth: 1 }}
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                  padding: "8px 10px",
                }}
              />
              <Line
                type="monotone"
                dataKey={yKey as string}
                stroke="hsl(var(--brand))"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--brand))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </CardContent>
    </Card>
  );
}
