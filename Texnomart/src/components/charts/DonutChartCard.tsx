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
  legendFormatter?: (slice: DonutSlice, percent: number) => ReactNode;
  ariaLabel?: string;
}

export function DonutChartCard({
  title,
  description,
  data,
  height = 280,
  centerValue,
  centerLabel,
  legendFormatter,
  ariaLabel,
}: DonutChartCardProps) {
  const total = data?.reduce((s, x) => s + x.value, 0) ?? 0;
  const customLegend = legendFormatter !== undefined;

  return (
    <Card>
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardHeader>
      <CardContent
        style={{ height }}
        className="relative"
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
      >
        {data ? (
          customLegend ? (
            <div className="grid h-full grid-cols-[1fr_1fr] items-center gap-4">
              <div className="relative h-full">
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
                      isAnimationActive={false}
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
                  </PieChart>
                </ResponsiveContainer>
                {centerValue !== undefined || centerLabel !== undefined ? (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
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
              </div>
              <ul className="space-y-2">
                {data.map((slice) => {
                  const percent = total > 0 ? (slice.value / total) * 100 : 0;
                  return (
                    <li key={slice.key}>{legendFormatter(slice, percent)}</li>
                  );
                })}
              </ul>
            </div>
          ) : (
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
                <div
                  className="pointer-events-none absolute inset-0 left-0 flex flex-col items-center justify-center text-center"
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
          )
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </CardContent>
    </Card>
  );
}

export type { DonutSlice };
