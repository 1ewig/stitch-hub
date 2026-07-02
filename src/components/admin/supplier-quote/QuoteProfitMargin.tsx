"use client";

import React from "react";
import type { SupplierQuote } from "@/hooks/useAdminSupplierQuotes";

interface QuoteProfitMarginProps {
  quote: SupplierQuote;
  calculateMargin: (q: SupplierQuote) => { supplierTotal: number; profit: number; marginPercent: number };
}

export default function QuoteProfitMargin({ quote, calculateMargin }: QuoteProfitMarginProps) {
  const { supplierTotal, profit, marginPercent } = calculateMargin(quote);

  return (
    <div>
      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 font-mono">Profit Margin Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">AI Client Price</span>
          <p className="text-sm font-bold text-white font-mono">${parseFloat(quote.clientTotalPrice || "0").toFixed(2)}</p>
          <span className="text-[9px] text-zinc-400 font-mono">@ ${parseFloat(quote.clientUnitPrice || "0").toFixed(2)}/unit</span>
        </div>

        <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">Supplier Cost</span>
          <p className="text-sm font-bold text-white font-mono">${supplierTotal.toFixed(2)}</p>
          <span className="text-[9px] text-zinc-400 font-mono">@ ${parseFloat(quote.quotedCostPerUnit).toFixed(2)}/unit</span>
        </div>

        <div className={`border p-4 rounded-xl space-y-1 ${
          marginPercent > 20
            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
            : marginPercent > 0
              ? "bg-amber-500/5 border-amber-500/20 text-amber-400"
              : "bg-red-500/5 border-red-500/20 text-red-400"
        }`}>
          <span className="text-[9px] uppercase font-mono tracking-wider">Projected Profit</span>
          <p className="text-sm font-bold font-mono">${profit.toFixed(2)}</p>
          <span className="text-[9px] font-mono">({marginPercent.toFixed(1)}% margin)</span>
        </div>
      </div>
    </div>
  );
}
