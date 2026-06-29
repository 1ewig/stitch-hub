"use client";

import React from "react";
import Image from "next/image";
import GlassCard from "@/components/admin/GlassCard";
import type { Order } from "@/types";

interface SpecificationsModalProps {
  selectedOrder: Order;
  isSpecsOpen: boolean;
  setIsSpecsOpen: (open: boolean) => void;
  updatingId: string | null;
  handleUpdateStatus: (orderId: string, status: string) => Promise<void>;
  isEditingQuote: boolean;
  setIsEditingQuote: (editing: boolean) => void;
  quoteValue: string;
  setQuoteValue: (value: string) => void;
  handleUpdateQuote: (e: React.FormEvent) => Promise<void>;
}

export default function SpecificationsModal({
  selectedOrder,
  isSpecsOpen,
  setIsSpecsOpen,
  updatingId,
  handleUpdateStatus,
  isEditingQuote,
  setIsEditingQuote,
  quoteValue,
  setQuoteValue,
  handleUpdateQuote,
}: SpecificationsModalProps) {
  if (!isSpecsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" 
        onClick={() => setIsSpecsOpen(false)}
      />
      
      {/* Modal Content */}
      <GlassCard 
        className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-white/15 p-0" 
        glow
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40 shrink-0">
          <div>
            <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider block font-bold">Order Requisition Details</span>
            <h3 className="text-sm font-bold text-white font-mono mt-0.5">{selectedOrder.invoiceNumber}</h3>
          </div>
          <button 
            onClick={() => setIsSpecsOpen(false)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin">
          
          {/* Status and Pricing Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Status Dropdown */}
            <div>
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">Status Lifecycle</h4>
              <div className="relative">
                <select
                  disabled={updatingId === selectedOrder.id}
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors font-mono uppercase tracking-wider cursor-pointer appearance-none"
                >
                  {["draft sourcing", "review required", "approved", "processing", "shipping", "delivered"].map((status) => (
                    <option key={status} value={status} className="bg-[#090a0f] text-zinc-200">
                      {status}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                  <span className="text-[10px]">▼</span>
                </div>
              </div>
            </div>

            {/* Price Quote */}
            <div>
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">Invoice Pricing</h4>
              <div className="bg-black/40 border border-white/5 p-3 rounded-xl h-[46px] flex items-center justify-between">
                {isEditingQuote ? (
                  <form onSubmit={handleUpdateQuote} className="flex gap-2 w-full items-center">
                    <input
                      type="text"
                      value={quoteValue}
                      onChange={(e) => setQuoteValue(e.target.value)}
                      className="flex-grow bg-black/60 border border-[#d4af37]/45 rounded px-2.5 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
                      placeholder="e.g. $1,420.00"
                    />
                    <div className="flex gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setIsEditingQuote(false)}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-bold hover:bg-white/10 font-mono uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-2 py-1 bg-[#d4af37] text-[#090a0f] rounded text-[9px] font-bold hover:bg-[#bfa032] font-mono uppercase"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-mono font-bold text-white">{selectedOrder.totalAmount}</span>
                    <button
                      onClick={() => setIsEditingQuote(true)}
                      className="text-[9px] text-[#d4af37] hover:underline font-mono uppercase font-bold"
                    >
                      Update Quote
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Client Profile */}
          <div>
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">Client Details</h4>
            <div className="bg-black/45 border border-white/5 p-4 rounded-xl flex gap-4 items-center">
              <div className="h-10 w-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] flex items-center justify-center text-xs font-bold font-mono shrink-0 shadow-inner">
                {(selectedOrder.user?.name || "CL").slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white">{selectedOrder.user?.name || "Unregistered User"}</p>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{selectedOrder.user?.email}</p>
                <p className="text-[9px] text-zinc-600 font-mono mt-1">Requisition Created: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Items Snapshot */}
          <div>
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">Items Snapshot</h4>
            <div className="space-y-3.5">
              {selectedOrder.itemsSnapshot.map((item, idx) => (
                <div key={idx} className="bg-black/45 border border-white/5 p-4 rounded-xl space-y-3.5">
                  <div className="flex gap-4">
                    <div className="h-14 w-14 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.img}
                        alt={item.product.title}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <span className="text-[8px] font-mono text-[#d4af37]/80 uppercase tracking-wider bg-[#d4af37]/5 px-2.5 py-0.5 rounded-full border border-[#d4af37]/10">
                        {item.product.cat}
                      </span>
                      <h5 className="text-xs font-bold text-white mt-2 truncate">{item.product.title}</h5>
                      <div className="flex gap-4 mt-1 text-[10px] font-mono text-zinc-400">
                        <span>Qty: {item.quantity}</span>
                        <span>Size: {item.size || "Standard"}</span>
                      </div>
                    </div>
                  </div>
                  {item.customNotes && (
                    <div className="bg-black/35 border-l-2 border-[#d4af37]/45 p-3 rounded-r-lg">
                      <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Custom Notes</span>
                      <p className="text-[10px] text-zinc-300 italic mt-0.5 leading-relaxed">&quot;{item.customNotes}&quot;</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex justify-end shrink-0">
          <button
            onClick={() => setIsSpecsOpen(false)}
            className="bg-[#d4af37] text-[#090a0f] px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#bfa032] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.25)] font-mono uppercase tracking-wider cursor-pointer"
          >
            Close Specs
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
