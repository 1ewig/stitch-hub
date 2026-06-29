"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import type { TaskBreakdown } from "@/hooks/useAdminDashboard";

interface DashboardTaskBreakdownProps {
  data: TaskBreakdown;
}

export default function DashboardTaskBreakdown({ data }: DashboardTaskBreakdownProps) {
  return (
    <GlassCard className="p-6">
      <h3 className="text-sm font-bold text-zinc-300 mb-6">Task Breakdown</h3>
      <div className="h-40 flex items-end justify-between gap-3 border-b border-white/10 pb-3">
        {data.items.map((item) => (
          <div
            key={item.label}
            className={`w-1/4 ${item.color} rounded-t-lg`}
            style={{ height: `${item.height}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-3 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
        {data.items.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </GlassCard>
  );
}
