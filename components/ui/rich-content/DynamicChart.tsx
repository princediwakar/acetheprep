"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

export interface ChartSeries {
  key: string;
  label?: string;
  color?: string;
}

export interface DynamicChartProps {
  type: "bar" | "line" | "pie" | "area";
  title?: string;
  xAxis?: string;
  yAxis?: string;
  series?: ChartSeries[];
  data: Record<string, any>[];
  className?: string;
}

const PALETTE = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f43f5e", // Rose
  "#0ea5e9", // Sky
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#14b8a6", // Teal
  "#ec4899", // Pink
];

export function DynamicChart({
  type = "bar",
  title,
  xAxis,
  yAxis,
  series,
  data,
  className,
}: DynamicChartProps) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  // Determine X-axis key (default to first non-numeric key or 'name' or 'label')
  const sample = data[0] || {};
  const sampleKeys = Object.keys(sample);
  
  const resolvedXAxis =
    xAxis ||
    sampleKeys.find((k) => k === "name" || k === "label" || k === "category" || k === "x") ||
    sampleKeys.find((k) => typeof sample[k] === "string") ||
    sampleKeys[0];

  // Determine series to plot
  const resolvedSeries: ChartSeries[] = (series && series.length > 0)
    ? series
    : sampleKeys
        .filter((k) => k !== resolvedXAxis)
        .filter((k) => typeof sample[k] === "number" || !isNaN(Number(sample[k])))
        .map((k, i) => ({
          key: k,
          label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
          color: PALETTE[i % PALETTE.length],
        }));

  // Clean data numbers
  const cleanedData = data.map((item) => {
    const row: Record<string, any> = { ...item };
    for (const s of resolvedSeries) {
      if (row[s.key] !== undefined) {
        row[s.key] = Number(row[s.key]) || 0;
      }
    }
    return row;
  });

  return (
    <div className={cn("my-5 rounded-xl border border-border/80 bg-card p-4 sm:p-5 shadow-2xs", className)}>
      {title && (
        <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-2.5">
          <h4 className="text-sm font-semibold text-foreground tracking-tight">
            {title}
          </h4>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/50">
            {type} chart
          </span>
        </div>
      )}

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === "pie" ? (
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                  color: "var(--foreground)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
              />
              <Pie
                data={cleanedData}
                dataKey={resolvedSeries[0]?.key || "value"}
                nameKey={resolvedXAxis}
                cx="50%"
                cy="50%"
                outerRadius={85}
                innerRadius={type === "pie" ? 0 : 45}
                paddingAngle={2}
                label={({ name, percent }: { name?: string; percent?: number }) =>
                  `${name || ""}: ${((percent || 0) * 100).toFixed(0)}%`
                }
              >
                {cleanedData.map((_, idx) => (
                  <Cell
                    key={idx}
                    fill={PALETTE[idx % PALETTE.length]}
                    stroke="var(--card)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          ) : type === "line" ? (
            <LineChart data={cleanedData} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} />
              <XAxis
                dataKey={resolvedXAxis}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                label={
                  yAxis
                    ? { value: yAxis, angle: -90, position: "insideLeft", fill: "var(--muted-foreground)", fontSize: 11 }
                    : undefined
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                  color: "var(--foreground)",
                }}
              />
              {resolvedSeries.length > 1 && (
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              )}
              {resolvedSeries.map((s, idx) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label || s.key}
                  stroke={s.color || PALETTE[idx % PALETTE.length]}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: s.color || PALETTE[idx % PALETTE.length] }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          ) : type === "area" ? (
            <AreaChart data={cleanedData} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} />
              <XAxis
                dataKey={resolvedXAxis}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                  color: "var(--foreground)",
                }}
              />
              {resolvedSeries.length > 1 && (
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              )}
              {resolvedSeries.map((s, idx) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label || s.key}
                  stroke={s.color || PALETTE[idx % PALETTE.length]}
                  fill={s.color || PALETTE[idx % PALETTE.length]}
                  fillOpacity={0.2}
                />
              ))}
            </AreaChart>
          ) : (
            <BarChart data={cleanedData} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} />
              <XAxis
                dataKey={resolvedXAxis}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                label={
                  yAxis
                    ? { value: yAxis, angle: -90, position: "insideLeft", fill: "var(--muted-foreground)", fontSize: 11 }
                    : undefined
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                  color: "var(--foreground)",
                }}
              />
              {resolvedSeries.length > 1 && (
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              )}
              {resolvedSeries.map((s, idx) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label || s.key}
                  fill={s.color || PALETTE[idx % PALETTE.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

