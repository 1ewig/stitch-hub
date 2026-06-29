"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import EmptyState from "@/components/admin/EmptyState";
import type { EscalationLog } from "@/hooks/useAdminApprovals";

interface ApprovalsQueueProps {
  tickets: EscalationLog[];
  selectedTicket: EscalationLog | null;
  setSelectedTicket: (t: EscalationLog | null) => void;
}

export default function ApprovalsQueue({
  tickets,
  selectedTicket,
  setSelectedTicket,
}: ApprovalsQueueProps) {
  return (
    <GlassCard className="p-6 h-full flex flex-col overflow-hidden" glow>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-bold text-zinc-300 font-display">Awaiting Review</h3>
        <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-full">
          {tickets.length}
        </span>
      </div>

      {tickets.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <EmptyState message="Queue completely clear. No active interventions required." />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
          {tickets.map((t) => {
            const isSelected = selectedTicket?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`p-4 bg-black/40 border border-white/5 rounded-xl cursor-pointer transition-all flex flex-col gap-2 ${
                  isSelected
                    ? "bg-white/[0.08] border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase ${
                    (t.status === "review_required" || t.status === "escalated" || t.status === "review required")
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20"
                  }`}>
                    {(t.status === "review_required" || t.status === "escalated" || t.status === "review required") ? "Intercept" : "Active"}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white truncate">{t.subject}</h4>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                    {t.body || "No initial metadata prompt declared."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
