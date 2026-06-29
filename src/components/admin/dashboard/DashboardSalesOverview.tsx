"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import type { SalesOverview } from "@/hooks/useAdminDashboard";

interface DashboardSalesOverviewProps {
  data: SalesOverview;
}

export default function DashboardSalesOverview({ data }: DashboardSalesOverviewProps) {
  return (
    <GlassCard className="p-6" glow>
      <h3 className="text-sm font-bold text-zinc-300 mb-6 relative z-10">Sales Overview</h3>
      <div className="flex items-end justify-between mb-8 relative z-10">
        <div>
          <p className="text-4xl font-display font-bold text-white drop-shadow-md">{data.totalRevenue}</p>
          <p className="text-xs text-emerald-400 mt-2 font-mono flex items-center gap-1">
            <span>▲</span> {data.growthPercent} vs last month
          </p>
        </div>
      </div>
      <div className="h-48 w-full relative z-10">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-white/5 w-full" />
          ))}
        </div>
        <svg className="absolute inset-0 h-full w-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polyline fill="none" stroke="#d4af37" strokeWidth="2.5" points={data.goldPolyline} />
          <polyline fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" points={data.bluePolyline} />
        </svg>
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-mono text-zinc-500 relative z-10">
        {data.months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </GlassCard>
  );
}
