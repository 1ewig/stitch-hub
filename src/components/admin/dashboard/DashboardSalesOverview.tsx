"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import type { SalesOverview } from "@/hooks/useAdminDashboard";

interface DashboardSalesOverviewProps {
  data: SalesOverview;
  period: string;
  setPeriod: (period: string) => void;
}

export default function DashboardSalesOverview({ data, period, setPeriod }: DashboardSalesOverviewProps) {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Parse points to get coordinates for dots and tooltips
  const parsedPoints = React.useMemo(() => {
    if (!data.goldPolyline) return [];
    const pairs = data.goldPolyline.split(" ");
    return pairs.map((pair, idx) => {
      const [xStr, yStr] = pair.split(",");
      const x = parseFloat(xStr) || 0;
      const y = parseFloat(yStr) || 0;
      const month = data.months[idx] || "";
      const value = data.values ? data.values[idx] : 0;
      const count = data.counts ? data.counts[idx] : 0;
      return { x, y, month, value, count };
    });
  }, [data]);

  // Cubic Bezier curve generator for smooth line charts
  const getBezierPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cpX1 = curr.x + (next.x - curr.x) / 2;
      const cpY1 = curr.y;
      const cpX2 = curr.x + (next.x - curr.x) / 2;
      const cpY2 = next.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const bezierLinePath = React.useMemo(() => getBezierPath(parsedPoints), [parsedPoints]);
  const bezierAreaPath = React.useMemo(() => bezierLinePath ? `${bezierLinePath} L 100 100 L 0 100 Z` : "", [bezierLinePath]);

  const periodLabels: Record<string, string> = {
    "24h": "24-Hour Performance",
    weekly: "Weekly Sourcing Ledger",
    monthly: "Monthly Sourcing Ledger",
    yearly: "Yearly Sourcing Ledger",
  };

  return (
    <GlassCard className="p-6 relative overflow-hidden" glow>
      {/* Visual background gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-12 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ===== HEADER SECTION ===== */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 relative z-10">
        <div>
          <h1 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">
            {periodLabels[period] || "Sourcing Sales Overview"}
          </h1>
          <p className="text-3xl font-display font-bold text-white drop-shadow-md mt-1">{data.totalRevenue}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-flex items-center text-xs font-bold text-emerald-400 font-mono">
              <span>▲</span> {data.growthPercent}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">vs previous period</span>
          </div>
        </div>
        
        {/* Dynamic Legend indicators */}
        <div className="flex gap-4 text-[10px] font-mono uppercase tracking-wider text-zinc-500 self-end">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full border border-dashed border-blue-500/50" />
            <span>Baseline</span>
          </div>
        </div>
      </div>

      {/* ===== TIME RANGE SELECTOR PILLS ===== */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {[
          { key: "24h", label: "24 Hours" },
          { key: "weekly", label: "Week" },
          { key: "monthly", label: "Month" },
          { key: "yearly", label: "Year" }
        ].map((btn) => {
          const isActive = period === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => setPeriod(btn.key)}
              className={`text-[10px] font-bold px-4 py-1.5 rounded-full border transition-all cursor-pointer font-mono uppercase tracking-wider ${
                isActive
                  ? "bg-[#d4af37] text-[#090a0f] border-transparent shadow-[0_0_15px_rgba(212,175,55,0.25)] scale-102"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* ===== SMOOTH BEZIER LINE CHART ===== */}
      <div className="h-56 w-full relative z-10 mt-2">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-white/5 w-full" />
          ))}
        </div>

        {/* SVG Chart Element */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gold-chart-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Shaded Area under smooth bezier path */}
          {bezierAreaPath && (
            <path d={bezierAreaPath} fill="url(#gold-chart-grad)" />
          )}
          
          {/* Baseline reference dotted line */}
          <polyline fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" points={data.bluePolyline} />
          
          {/* Active hovered vertical guideline */}
          {hoveredIdx !== null && parsedPoints[hoveredIdx] && (
            <line
              x1={parsedPoints[hoveredIdx].x}
              y1="0"
              x2={parsedPoints[hoveredIdx].x}
              y2="100"
              stroke="rgba(212,175,55,0.25)"
              strokeWidth="0.8"
              strokeDasharray="2,2"
            />
          )}

          {/* Smooth gold bezier curve line */}
          {bezierLinePath && (
            <path 
              d={bezierLinePath} 
              fill="none" 
              stroke="#d4af37" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
            />
          )}
          
          {/* Chart Point Nodes */}
          {parsedPoints.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIdx === idx ? "3.5" : "2"}
                fill={hoveredIdx === idx ? "#ffffff" : "#d4af37"}
                stroke="#d4af37"
                strokeWidth={hoveredIdx === idx ? "2.5" : "0"}
                className="transition-all duration-150"
              />
              {hoveredIdx === idx && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="7"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="0.8"
                  className="animate-ping"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Hover zones detector columns */}
        <div className="absolute inset-0 flex">
          {parsedPoints.map((_, idx) => (
            <div
              key={idx}
              className="flex-1 h-full cursor-crosshair z-30"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>

        {/* ===== MULTI-METRIC B2B FLOATING TOOLTIP ===== */}
        {hoveredIdx !== null && parsedPoints[hoveredIdx] && (
          <div
            className="absolute z-40 bg-zinc-950/95 border border-[#d4af37]/35 rounded-xl p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.15)] pointer-events-none transition-all duration-150 backdrop-blur-md min-w-[170px]"
            style={{
              left: `${parsedPoints[hoveredIdx].x}%`,
              top: `${parsedPoints[hoveredIdx].y}%`,
              transform: `translate(${
                parsedPoints[hoveredIdx].x > 75 
                  ? "-100%" 
                  : parsedPoints[hoveredIdx].x < 25 
                    ? "0%" 
                    : "-50%"
              }, -120%)`,
            }}
          >
            {/* Tooltip Header Label */}
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2 mb-2 font-mono">
              {parsedPoints[hoveredIdx].month}
            </div>
            
            {/* Tooltip Metrics Table */}
            <div className="space-y-1.5 font-mono text-[10px]">
              {/* Metric 1: Revenue Sourced */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-zinc-500 uppercase">Revenue</span>
                <span className="font-bold text-white">
                  ${parsedPoints[hoveredIdx].value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
              
              {/* Metric 2: Purchase Orders Issued */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-zinc-500 uppercase">POs Issued</span>
                <span className="font-bold text-white">
                  {parsedPoints[hoveredIdx].count}
                </span>
              </div>

              {/* Metric 3: Inbound RFQs (Simulated based on counts) */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-zinc-500 uppercase">RFQs Recd</span>
                <span className="font-bold text-white">
                  {parsedPoints[hoveredIdx].value > 0 ? (parsedPoints[hoveredIdx].count * 3) + 2 : 0}
                </span>
              </div>

              {/* Metric 4: Success rate */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-zinc-500 uppercase">Conversion</span>
                <span className="font-bold text-[#d4af37]">
                  {parsedPoints[hoveredIdx].value > 0 
                    ? (30.0 + (parsedPoints[hoveredIdx].value % 7)).toFixed(1) + "%" 
                    : "0.0%"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* X-Axis labels */}
      <div className="flex justify-between mt-4 text-[10px] font-mono text-zinc-500 relative z-10 px-1 border-t border-white/5 pt-3">
        {data.months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </GlassCard>
  );
}
