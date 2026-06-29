"use client";

import React from "react";
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
    <div className="lg:col-span-4 flex flex-col space-y-3 h-full overflow-y-auto pr-2">
      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-1">Quotes Under Review</h3>
      {quotes.length === 0 ? (
        <div className="p-6 bg-white/1 border border-white/5 rounded-xl text-xs text-zinc-600 font-mono text-center">
          No active supplier quotes awaiting review.
        </div>
      ) : (
        quotes.map((q) => {
          const isSelected = selectedQuote?.id === q.id;
          const { marginPercent } = calculateMargin(q);
          return (
            <div
              key={q.id}
              onClick={() => setSelectedQuote(q)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#d4af37]/5 border-[#d4af37]/45 shadow-lg"
                  : "bg-white/1 border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <p className={`text-xs font-bold truncate max-w-[150px] ${isSelected ? "text-[#d4af37]" : "text-zinc-200"}`}>
                  {q.orderId}
                </p>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                  marginPercent > 20 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : marginPercent > 0 
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}>
                  {marginPercent.toFixed(0)}% Margin
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-2 truncate">{q.clientSubject || "Bulk Sourcing Request"}</p>
              <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-zinc-500">
                <span>{q.supplierName.split("@")[0]}</span>
                <span>{new Date(q.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
