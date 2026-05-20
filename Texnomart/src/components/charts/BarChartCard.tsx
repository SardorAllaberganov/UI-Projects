import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BarChartCardProps<T extends Record<string, unknown>> {
  title: ReactNode;
  description?: ReactNode;
  data: T[] | undefined;
  xKey: keyof T & string;
  yKey: keyof T & string;
  layout?: "horizontal" | "vertical";
  height?: number;
  yAxisWidth?: number;
}

export function BarChartCard<T extends Record<string, unknown>>({
  title,
  description,
  data,
  xKey,
  yKey,
  layout = "horizontal",
  height = 280,
  yAxisWidth = 32,
}: BarChartCardProps<T>) {
  return (
    <Card>
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardHeader>
      <CardContent style={{ height }}>
        {data ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={layout}
              margin={{ left: 4, right: 12, top: 4, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              {layout === "horizontal" ? (
                <>
                  <XAxis
                    dataKey={xKey as string}
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
                    width={yAxisWidth}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    type="number"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    type="category"
                    dataKey={xKey as string}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    width={yAxisWidth}
                  />
                </>
              )}
              <Tooltip
                cursor={{ fill: "hsl(var(--accent))", opacity: 0.4 }}
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                  padding: "8px 10px",
                }}
              />
              <Bar
                dataKey={yKey as string}
                fill="hsl(var(--foreground))"
                radius={layout === "horizontal" ? [4, 4, 0, 0] : [0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </CardContent>
    </Card>
  );
}
