"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  type TooltipProps,
} from "recharts";
import GlassCard from "@/components/admin/GlassCard";
import type { SalesOverview } from "@/hooks/useAdminDashboard";

/* ============================================================
   TYPES
   ============================================================ */
interface DashboardSalesOverviewProps {
  data: SalesOverview;
  period: string;
  setPeriod: (period: string) => void;
}

/* ============================================================
   BUILD CHART DATA
   Transform raw arrays → recharts-friendly object array
   ============================================================ */
function buildChartData(data: SalesOverview) {
  if (!data.months) return [];
  return data.months.map((month, idx) => {
    const value = data.values?.[idx] ?? 0;
    const count = data.counts?.[idx] ?? 0;

    return {
      month,
      revenue: value,
      orders: count,
      rfqs: value > 0 ? count * 3 + 2 : 0,
      // Simulated baseline: 70% of peak value for visual reference line
      baseline: value > 0 ? Math.round(value * 0.7) : 0,
      // Conversion logic matching your original formula
      conversion:
        value > 0
          ? parseFloat((30.0 + (value % 7)).toFixed(1))
          : 0,
    };
  });
}

/* ============================================================
   CUSTOM TOOLTIP COMPONENT
   Matches your original dark glass tooltip aesthetic
   ============================================================ */
function CustomTooltip({
  active,
  payload,
  label,
}: any) {
  if (!active || !payload?.length) return null;

  const revenue = (payload.find((p: any) => p.dataKey === "revenue")?.value as number) ?? 0;
  const orders = (payload.find((p: any) => p.dataKey === "orders")?.value as number) ?? 0;
  const rfqs = (payload.find((p: any) => p.dataKey === "rfqs")?.value as number) ?? 0;
  const conversion = (payload.find((p: any) => p.dataKey === "conversion")?.value as number) ?? 0;

  return (
    <div
      className={[
        "bg-zinc-950/95 border border-[#d4af37]/35 rounded-xl",
        "p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.15)]",
        "backdrop-blur-md min-w-[170px] pointer-events-none",
      ].join(" ")}
    >
      {/* Header */}
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-2 font-mono">
        {label}
      </div>

      {/* Metrics */}
      <div className="space-y-1.5 font-mono text-[10px]">
        {/* Revenue */}
        <div className="flex justify-between items-center gap-4">
          <span className="text-zinc-500 uppercase">Revenue</span>
          <span className="font-bold text-white">
            ${revenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </span>
        </div>

        {/* POs Issued */}
        <div className="flex justify-between items-center gap-4">
          <span className="text-zinc-500 uppercase">POs Issued</span>
          <span className="font-bold text-white">{orders}</span>
        </div>

        {/* RFQs */}
        <div className="flex justify-between items-center gap-4">
          <span className="text-zinc-500 uppercase">RFQs Recd</span>
          <span className="font-bold text-white">{rfqs}</span>
        </div>

        {/* Conversion */}
        <div className="flex justify-between items-center gap-4">
          <span className="text-zinc-500 uppercase">Conversion</span>
          <span className="font-bold text-[#d4af37]">
            {revenue > 0 ? `${conversion}%` : "0.0%"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CUSTOM DOT COMPONENT
   Renders gold dots with ping animation on active point
   ============================================================ */
interface CustomDotProps {
  cx?: number;
  cy?: number;
  index?: number;
  activeIndex: number | null;
}

function CustomDot({ cx = 0, cy = 0, index, activeIndex }: CustomDotProps) {
  const isActive = index === activeIndex;

  if (!isActive) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="#d4af37"
        stroke="none"
      />
    );
  }

  return (
    <g>
      {/* Outer ping ring */}
      <circle
        cx={cx}
        cy={cy}
        r={7}
        fill="none"
        stroke="#d4af37"
        strokeWidth={0.8}
        opacity={0.5}
      >
        <animate
          attributeName="r"
          from="5"
          to="10"
          dur="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.6"
          to="0"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Active dot */}
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#ffffff"
        stroke="#d4af37"
        strokeWidth={2.5}
      />
    </g>
  );
}

/* ============================================================
   PERIOD CONFIG
   ============================================================ */
const PERIOD_BUTTONS = [
  { key: "24h",     label: "24 Hours" },
  { key: "weekly",  label: "Week"     },
  { key: "monthly", label: "Month"    },
  { key: "yearly",  label: "Year"     },
] as const;

const PERIOD_LABELS: Record<string, string> = {
  "24h":    "24-Hour Performance",
  weekly:   "Weekly Sourcing Ledger",
  monthly:  "Monthly Sourcing Ledger",
  yearly:   "Yearly Sourcing Ledger",
};

/* ============================================================
   Y-AXIS FORMATTER
   ============================================================ */
function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value}`;
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function DashboardSalesOverview({
  data,
  period,
  setPeriod,
}: DashboardSalesOverviewProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // Build recharts-friendly data array
  const chartData = React.useMemo(() => buildChartData(data), [data]);

  return (
    <GlassCard className="p-6 relative overflow-hidden" glow>
      {/* Background gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-12 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 relative z-10">
        <div>
          <h1 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">
            {PERIOD_LABELS[period] ?? "Sourcing Sales Overview"}
          </h1>
          <p className="text-3xl font-display font-bold text-white drop-shadow-md mt-1">
            {data.totalRevenue}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-flex items-center text-xs font-bold text-emerald-400 font-mono">
              <span>▲</span> {data.growthPercent}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
              vs previous period
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-[10px] font-mono uppercase tracking-wider text-zinc-500 self-end">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>Baseline</span>
          </div>
        </div>
      </div>

      {/* ===== PERIOD SELECTOR ===== */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {PERIOD_BUTTONS.map((btn) => {
          const isActive = period === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => setPeriod(btn.key)}
              className={[
                "text-[10px] font-bold px-4 py-1.5 rounded-full border",
                "transition-all cursor-pointer font-mono uppercase tracking-wider",
                isActive
                  ? "bg-[#d4af37] text-[#090a0f] border-transparent shadow-[0_0_15px_rgba(212,175,55,0.25)] scale-105"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10",
              ].join(" ")}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* ===== RECHARTS AREA CHART ===== */}
      <div className="h-60 w-full relative z-10 text-zinc-400">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 4, left: -20, bottom: 0 }}
            onMouseMove={(state: any) => {
              // Track which data point index is being hovered
              if (state.isTooltipActive && state.activeTooltipIndex !== undefined) {
                setActiveIndex(state.activeTooltipIndex as number);
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <defs>
              {/* Gold gradient fill */}
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines only — faint white */}
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tick={{
                fill: "#71717a",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
              dy={8}
              minTickGap={25}
            />

            {/* Y Axis */}
            <YAxis
              tickFormatter={formatYAxis}
              tick={{
                fill: "#71717a",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* Vertical crosshair on hover */}
            {activeIndex !== null && chartData[activeIndex] && (
              <ReferenceLine
                x={chartData[activeIndex].month}
                stroke="rgba(212,175,55,0.25)"
                strokeWidth={0.8}
                strokeDasharray="2 2"
              />
            )}

            {/* Custom dark glass tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}           // we draw our own cursor above
              isAnimationActive={false}
            />

            {/*
              Baseline reference area — blue dashed line
              We render it as a hidden area so recharts includes
              it in hover state, then we style only the line
            */}
            <Area
              type="monotone"
              dataKey="baseline"
              stroke="#3b82f6"
              strokeWidth={1}
              strokeDasharray="3 3"
              strokeOpacity={0.3}
              fill="none"
              dot={false}
              activeDot={false}
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
            />

            {/* Hidden areas to include orders/rfqs/conversion in tooltip payload */}
            <Area dataKey="orders"     stroke="none" fill="none" dot={false} activeDot={false} />
            <Area dataKey="rfqs"       stroke="none" fill="none" dot={false} activeDot={false} />
            <Area dataKey="conversion" stroke="none" fill="none" dot={false} activeDot={false} />

            {/* Main gold revenue area */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#d4af37"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="url(#goldGradient)"
              // Custom dot with active state animation
              dot={(props) => (
                <CustomDot
                  key={props.index}
                  cx={props.cx}
                  cy={props.cy}
                  index={props.index}
                  activeIndex={activeIndex}
                />
              )}
              activeDot={false}           // we handle active state in CustomDot
              isAnimationActive={true}
              animationDuration={600}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
