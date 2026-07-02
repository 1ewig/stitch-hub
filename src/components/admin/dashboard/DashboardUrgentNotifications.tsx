"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

interface EscalationAlert {
  id: string;
  subject: string;
  body: string;
  userId: string;
}

interface DashboardUrgentNotificationsProps {
  escalations: EscalationAlert[];
  loading: boolean;
}

export default function DashboardUrgentNotifications({ escalations, loading }: DashboardUrgentNotificationsProps) {
  return (
    <GlassCard className="flex flex-col h-88">
      <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/2 z-10">
        <h3 className="text-sm font-bold text-zinc-300">Urgent Notifications</h3>
        <span className="bg-red-500/20 text-red-400 py-1 px-2.5 rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)] border border-red-500/30 font-mono">
          {loading ? "..." : escalations.length}
        </span>
      </div>
      <div className="p-5 flex-1 overflow-y-auto space-y-3">
        {loading ? (
          <LoadingSpinner />
        ) : escalations.length === 0 ? (
          <div className="text-xs text-zinc-500 font-mono text-center py-10">No active escalations.</div>
        ) : (
          escalations.map((alert) => (
            <div key={alert.id} className="p-4 bg-black/20 border border-white/5 rounded-xl hover:bg-white/4 hover:border-white/10 transition-all cursor-pointer group backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 shadow-red-500/50 animate-pulse shadow-lg" />
                <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors truncate">{alert.subject}</h4>
              </div>
              <p className="text-[11px] text-zinc-400 pl-4 leading-relaxed truncate">{alert.body}</p>
              <p className="text-[9px] font-mono text-zinc-600 pl-4 mt-2">User ID: {alert.userId?.slice(0, 8)}</p>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}
