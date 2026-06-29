"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import EmptyState from "@/components/admin/EmptyState";
import type { SupplierQuote } from "@/hooks/useAdminSupplierQuotes";

interface QuotesQueueProps {
  quotes: SupplierQuote[];
  selectedQuote: SupplierQuote | null;
  setSelectedQuote: (q: SupplierQuote | null) => void;
  calculateMargin: (q: SupplierQuote) => { supplierTotal: number; profit: number; marginPercent: number };
}

export default function QuotesQueue({
  quotes,
  selectedQuote,
  setSelectedQuote,
  calculateMargin,
}: QuotesQueueProps) {
  return (
    <GlassCard className="p-6 h-full flex flex-col overflow-hidden" glow>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-bold text-zinc-300 font-display">Quotes Under Review</h3>
        <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-full">
          {quotes.length}
        </span>
      </div>

      {quotes.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <EmptyState message="No active supplier quotes awaiting review." />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
          {quotes.map((q) => {
            const isSelected = selectedQuote?.id === q.id;
            const { marginPercent } = calculateMargin(q);
            return (
              <div
                key={q.id}
                onClick={() => setSelectedQuote(q)}
                className={`p-4 bg-black/40 border border-white/5 rounded-xl cursor-pointer transition-all flex flex-col gap-2 ${
                  isSelected
                    ? "bg-white/[0.08] border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase ${
                    marginPercent > 20 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : marginPercent > 0 
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {marginPercent.toFixed(0)}% Margin
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white truncate">{q.orderId}</h4>
                  <p className="text-[10px] text-zinc-400 mt-1 truncate">
                    {q.clientSubject || "Bulk Sourcing Request"}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <span className="truncate">{q.supplierName.split("@")[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
