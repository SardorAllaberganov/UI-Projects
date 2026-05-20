import type { ReactNode } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DonutSlice {
  key: string;
  label: string;
  value: number;
  color: string;
}

interface DonutChartCardProps {
  title: ReactNode;
  description?: ReactNode;
  data: DonutSlice[] | undefined;
  height?: number;
  centerValue?: ReactNode;
  centerLabel?: ReactNode;
}

export function DonutChartCard({
  title,
  description,
  data,
  height = 280,
  centerValue,
  centerLabel,
}: DonutChartCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardHeader>
      <CardContent style={{ height }} className="relative">
        {data ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  innerRadius="60%"
                  outerRadius="88%"
                  paddingAngle={2}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                >
                  {data.map((slice) => (
                    <Cell key={slice.key} fill={slice.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                    padding: "8px 10px",
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 11, lineHeight: 1.8 }}
                />
              </PieChart>
            </ResponsiveContainer>
            {centerValue !== undefined || centerLabel !== undefined ? (
              <div className="pointer-events-none absolute inset-0 left-0 flex flex-col items-center justify-center text-center"
                style={{ marginRight: "35%" }}
              >
                <span className="text-2xl font-semibold tabular-nums">
                  {centerValue}
                </span>
                {centerLabel ? (
                  <span className="text-xs text-muted-foreground">
                    {centerLabel}
                  </span>
                ) : null}
              </div>
            ) : null}
          </>
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </CardContent>
    </Card>
  );
}

export type { DonutSlice };
