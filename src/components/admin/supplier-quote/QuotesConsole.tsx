"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import type { SupplierQuote } from "@/hooks/useAdminSupplierQuotes";
import QuoteProfitMargin from "./QuoteProfitMargin";
import QuoteSupplierInfo from "./QuoteSupplierInfo";
import QuoteRequisitionSpecs from "./QuoteRequisitionSpecs";

interface QuotesConsoleProps {
  selectedQuote: SupplierQuote | null;
  calculateMargin: (q: SupplierQuote) => { supplierTotal: number; profit: number; marginPercent: number };
  handleDecision: (decision: "approve" | "reject") => Promise<void>;
  processing: boolean;
}

export default function QuotesConsole({
  selectedQuote,
  calculateMargin,
  handleDecision,
  processing,
}: QuotesConsoleProps) {
  return (
    <GlassCard className="h-full flex overflow-hidden p-0" glow>
      {selectedQuote ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20 shrink-0">
            <div>
              <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider block font-bold">Supplier Quote Details</span>
              <h4 className="text-xs font-bold text-white mt-0.5">{selectedQuote.orderId}</h4>
            </div>
            <div className="text-right font-mono text-[9px] text-zinc-500">
              <p>Submitted: {new Date(selectedQuote.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Details Scroll Section */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5 min-h-0 bg-black/10 scrollbar-thin">
            <QuoteProfitMargin quote={selectedQuote} calculateMargin={calculateMargin} />
            <QuoteSupplierInfo supplierName={selectedQuote.supplierName} estimatedDeliveryDays={selectedQuote.estimatedDeliveryDays} />
            <QuoteRequisitionSpecs items={selectedQuote.clientItems} />
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-white/10 bg-black/20 flex gap-3 shrink-0">
            <button
              onClick={() => handleDecision("reject")}
              disabled={processing}
              className="bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all disabled:opacity-40"
            >
              Reject Cost
            </button>
            <button
              onClick={() => handleDecision("approve")}
              disabled={processing}
              className="flex-1 bg-[#d4af37] text-[#090a0f] hover:bg-[#bfa032] px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] text-center disabled:opacity-40 cursor-pointer"
            >
              {processing ? "Authorizing supplier..." : "Approve Supplier Price"}
            </button>
          </div>

        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-xs text-zinc-500 font-mono">
          Select a supplier quote from the left list to review margins.
        </div>
      )}
    </GlassCard>
  );
}
