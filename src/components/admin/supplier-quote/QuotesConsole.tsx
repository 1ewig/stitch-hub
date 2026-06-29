"use client";

import React from "react";
import type { SupplierQuote } from "@/hooks/useAdminSupplierQuotes";

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
    <div className="lg:col-span-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 h-full flex flex-col overflow-hidden">
      {selectedQuote ? (
        <div className="space-y-6 flex flex-col h-full overflow-y-auto">
          <div className="border-b border-white/10 pb-4 flex justify-between items-start gap-4 shrink-0">
            <div>
              <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider block font-bold">Supplier Quote Details</span>
              <h2 className="text-base font-bold text-white mt-1">{selectedQuote.orderId}</h2>
            </div>
            <div className="text-right font-mono text-[10px] text-zinc-500">
              <p>Submitted: {new Date(selectedQuote.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-1">
            {/* Profit Margin Analysis Section */}
            <div>
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 font-mono">Profit Margin Analysis</h3>
              {(() => {
                const { supplierTotal, profit, marginPercent } = calculateMargin(selectedQuote);
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1">
                      <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">AI Client Price</span>
                      <p className="text-xl font-bold text-white font-mono">${parseFloat(selectedQuote.clientTotalPrice || "0").toFixed(2)}</p>
                      <span className="text-[9px] text-zinc-400 font-mono">@ ${parseFloat(selectedQuote.clientUnitPrice || "0").toFixed(2)}/unit</span>
                    </div>

                    <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1">
                      <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">Supplier Cost</span>
                      <p className="text-xl font-bold text-white font-mono">${supplierTotal.toFixed(2)}</p>
                      <span className="text-[9px] text-zinc-400 font-mono">@ ${parseFloat(selectedQuote.quotedCostPerUnit).toFixed(2)}/unit</span>
                    </div>

                    <div className={`border p-4 rounded-xl space-y-1 ${
                      marginPercent > 20 
                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                        : marginPercent > 0 
                          ? "bg-amber-500/5 border-amber-500/20 text-amber-400" 
                          : "bg-red-500/5 border-red-500/20 text-red-400"
                    }`}>
                      <span className="text-[9px] uppercase font-mono tracking-wider">Projected Profit</span>
                      <p className="text-xl font-bold font-mono">${profit.toFixed(2)}</p>
                      <span className="text-[9px] font-mono">({marginPercent.toFixed(1)}% margin)</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Supplier & Delivery Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Supplier Profile</h3>
                <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1 text-xs">
                  <p className="text-white font-bold">{selectedQuote.supplierName}</p>
                  <p className="text-zinc-400 font-mono">Matches client requisition specifications</p>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Delivery Schedule</h3>
                <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1 text-xs">
                  <p className="text-white font-bold">{selectedQuote.estimatedDeliveryDays} Days to Warehouse</p>
                  <p className="text-zinc-400 font-mono">Fulfillment Lead Time Estimate</p>
                </div>
              </div>
            </div>

            {/* Sourcing Order Items Spec */}
            <div>
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 font-mono">Requisition Specifications</h3>
              <div className="space-y-2 bg-black/20 border border-white/5 p-4 rounded-xl max-h-[160px] overflow-y-auto">
                {selectedQuote.clientItems && Array.isArray(selectedQuote.clientItems) && selectedQuote.clientItems.length > 0 ? (
                  selectedQuote.clientItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <div>
                        <span className="font-bold text-zinc-200">{item.product?.title || "Custom Product"}</span>
                        <span className="text-zinc-500 ml-2">({item.size || "Standard"}, {item.color || "Default"})</span>
                      </div>
                      <span className="font-mono text-zinc-400">{item.quantity} units</span>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500 italic text-xs">No specifications parsed.</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex gap-3 pt-4 border-t border-white/10 mt-auto bg-transparent shrink-0">
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
              className="flex-1 bg-[#d4af37] text-[#090a0f] hover:bg-[#bfa032] px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] text-center disabled:opacity-40"
            >
              {processing ? "Authorizing Supplier Allocation..." : "Approve Supplier Price"}
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-xs text-zinc-600 font-mono">
          Select a supplier quote from the left list to review margins.
        </div>
      )}
    </div>
  );
}
