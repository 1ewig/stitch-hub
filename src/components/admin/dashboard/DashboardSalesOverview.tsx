"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import type { SalesOverview } from "@/hooks/useAdminDashboard";

interface DashboardSalesOverviewProps {
  data: SalesOverview;
}

export default function DashboardSalesOverview({ data }: DashboardSalesOverviewProps) {
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
      return { x, y, month, value };
    });
  }, [data]);

  return (
    <GlassCard className="p-6 relative overflow-hidden" glow>
      {/* Visual top glow decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-12 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">Monthly Sourcing Sales</h3>
          <p className="text-3xl font-display font-bold text-white drop-shadow-md mt-1">{data.totalRevenue}</p>
          <p className="text-[10px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
            <span>▲</span> {data.growthPercent} vs previous period
          </p>
        </div>
        <div className="flex gap-4 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
            <span>Active Contract Volume</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full border border-dashed border-blue-500/50" />
            <span>Baseline Trend</span>
          </div>
        </div>
      </div>

      <div className="h-52 w-full relative z-10 mt-2">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-white/5 w-full" />
          ))}
        </div>

        {/* SVG Chart */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gold-chart-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Shaded Area */}
          <polygon points={`${data.goldPolyline} 100,100 0,100`} fill="url(#gold-chart-grad)" />
          
          {/* Baseline dotted line */}
          <polyline fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" points={data.bluePolyline} />
          
          {/* Active hover vertical guideline */}
          {hoveredIdx !== null && parsedPoints[hoveredIdx] && (
            <line
              x1={parsedPoints[hoveredIdx].x}
              y1="0"
              x2={parsedPoints[hoveredIdx].x}
              y2="100"
              stroke="rgba(212,175,55,0.25)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          )}

          {/* Active gold polyline */}
          <polyline 
            fill="none" 
            stroke="#d4af37" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            points={data.goldPolyline} 
            className="drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
          />
          
          {/* Chart Nodes / Dots */}
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
                  strokeWidth="1"
                  className="animate-ping"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Hover Detector Columns */}
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

        {/* Interactive Floating Tooltip */}
        {hoveredIdx !== null && parsedPoints[hoveredIdx] && (
          <div
            className="absolute z-40 bg-zinc-950/95 border border-[#d4af37]/30 rounded-xl p-3 shadow-[0_0_20px_rgba(212,175,55,0.2)] pointer-events-none transition-all duration-150 backdrop-blur-md"
            style={{
              left: `${parsedPoints[hoveredIdx].x}%`,
              top: `${parsedPoints[hoveredIdx].y}%`,
              transform: `translate(${
                parsedPoints[hoveredIdx].x > 75 
                  ? "-100%" 
                  : parsedPoints[hoveredIdx].x < 25 
                    ? "0%" 
                    : "-50%"
              }, -125%)`,
            }}
          >
            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{parsedPoints[hoveredIdx].month}</p>
            <p className="text-xs font-bold text-white mt-1">
              ${parsedPoints[hoveredIdx].value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
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
