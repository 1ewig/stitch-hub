"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import type { InventoryAlert } from "@/hooks/useAdminDashboard";

interface DashboardInventoryAlertsProps {
  alerts: InventoryAlert[];
  loading: boolean;
}

export default function DashboardInventoryAlerts({ alerts, loading }: DashboardInventoryAlertsProps) {
  return (
    <GlassCard className="flex flex-col h-80 relative overflow-hidden">
      {/* Visual background gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/2 z-10">
        <h3 className="text-sm font-bold text-zinc-300">Inventory Stock Alerts</h3>
        <span className={`py-1 px-2.5 rounded-full text-[10px] font-bold border font-mono ${
          loading 
            ? "bg-white/5 border-white/10 text-zinc-400"
            : alerts.length > 0 
              ? "bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)] animate-pulse"
              : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
        }`}>
          {loading ? "..." : alerts.length > 0 ? `${alerts.length} Warnings` : "Healthy"}
        </span>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-3 relative z-10 scrollbar-thin">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : alerts.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center space-y-2 py-8">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs text-zinc-400 font-medium">All material stockpiles healthy.</p>
            <p className="text-[10px] text-zinc-600 font-mono">Quantities exceed reorder thresholds.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, idx) => {
              const percentage = Math.min(100, Math.round((alert.stockQuantity / alert.reorderLevel) * 100));
              return (
                <div key={idx} className="p-3 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-zinc-300 truncate pr-2">{alert.productName}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/25 shrink-0">
                      {alert.stockQuantity} units
                    </span>
                  </div>
                  
                  {/* Custom progress bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        alert.stockQuantity <= alert.reorderLevel / 2
                          ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                          : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-1.5 text-[9px] font-mono text-zinc-500">
                    <span>Reorder Level: {alert.reorderLevel}</span>
                    <span>{percentage}% of min</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
