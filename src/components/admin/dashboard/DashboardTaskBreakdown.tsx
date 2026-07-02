"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import type { PipelineCounts } from "@/hooks/useAdminDashboard";

interface DashboardTaskBreakdownProps {
  data: PipelineCounts;
}

export default function DashboardTaskBreakdown({ data }: DashboardTaskBreakdownProps) {
  const totalOrders = 
    data.sourcing + 
    data.review + 
    data.approved + 
    data.processing + 
    data.shipping + 
    data.delivered;

  const funnelStages = [
    { label: "Sourcing Inquiry", count: data.sourcing, color: "bg-zinc-500/80 shadow-zinc-500/20" },
    { label: "AI & Human Review", count: data.review, color: "bg-red-500/80 shadow-red-500/20" },
    { label: "Quote Approved", count: data.approved, color: "bg-purple-500/80 shadow-purple-500/20" },
    { label: "In Production", count: data.processing, color: "bg-blue-500/80 shadow-blue-500/20" },
    { label: "In Transit", count: data.shipping, color: "bg-amber-500/80 shadow-amber-500/20" },
    { label: "Completed", count: data.delivered, color: "bg-emerald-500/80 shadow-emerald-500/20" },
  ];

  return (
    <GlassCard className="p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-bold text-zinc-300">B2B Order Pipeline Funnel</h3>
        <span className="text-[10px] font-mono text-zinc-500 tracking-wider bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
          Active: {totalOrders} Orders
        </span>
      </div>

      <div className="space-y-4 relative z-10">
        {funnelStages.map((stage) => {
          const ratio = totalOrders > 0 ? (stage.count / totalOrders) * 100 : 0;
          return (
            <div key={stage.label} className="group">
              <div className="flex justify-between items-center mb-1 text-[11px]">
                <span className="font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors">{stage.label}</span>
                <span className="font-mono font-bold text-zinc-200 bg-white/5 px-2 py-0.5 rounded border border-white/5">{stage.count}</span>
              </div>
              
              <div className="w-full h-2.5 bg-black/40 border border-white/5 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out shadow-lg ${stage.color}`}
                  style={{ width: `${Math.max(3, ratio)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
          <span>Inbound Sourcing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span>Optimization Agentic Engine</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Fulfilled</span>
        </div>
      </div>
    </GlassCard>
  );
}
