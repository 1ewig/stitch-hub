"use client";

import React from "react";
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
    <div className="lg:col-span-4 flex flex-col space-y-3 h-full overflow-y-auto pr-2">
      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-1">Awaiting Human Review</h3>
      {tickets.length === 0 ? (
        <div className="p-6 bg-white/1 border border-white/5 rounded-xl text-xs text-zinc-600 font-mono text-center">
          Queue completely clear. No active interventions required.
        </div>
      ) : (
        tickets.map((t) => {
          const isSelected = selectedTicket?.id === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setSelectedTicket(t)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? (t.status === "review_required" || t.status === "escalated" || t.status === "review required")
                    ? "bg-red-500/5 border-red-500/40 shadow-lg"
                    : "bg-[#d4af37]/5 border-[#d4af37]/40 shadow-lg"
                  : "bg-white/1 border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <p className={`text-xs font-bold truncate max-w-[150px] ${
                  isSelected
                    ? (t.status === "review_required" || t.status === "escalated" || t.status === "review required")
                      ? "text-red-400"
                      : "text-[#d4af37]"
                    : "text-zinc-200"
                }`}>{t.subject}</p>
                <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase ${
                  (t.status === "review_required" || t.status === "escalated" || t.status === "review required")
                    ? "bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse"
                    : "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20"
                }`}>
                  {(t.status === "review_required" || t.status === "escalated" || t.status === "review required") ? "Intercept" : "Active"}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 truncate mt-1.5">{t.body || "No initial metadata prompt declared."}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
