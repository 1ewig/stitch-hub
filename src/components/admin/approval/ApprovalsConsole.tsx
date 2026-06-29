"use client";

import React from "react";
import type { EscalationLog } from "@/hooks/useAdminApprovals";

interface ApprovalsConsoleProps {
  selectedTicket: EscalationLog | null;
  editableResponse: string;
  setEditableResponse: (val: string) => void;
  unitPrice: string;
  totalPrice: string;
  getQuantity: () => number;
  handleUnitPriceChange: (val: string) => void;
  handleTotalPriceChange: (val: string) => void;
  handleProcessDecision: (decision: "approve" | "reject") => Promise<void>;
  processing: boolean;
  chatHistory: { role: string; content: string }[];
}

export default function ApprovalsConsole({
  selectedTicket,
  editableResponse,
  setEditableResponse,
  unitPrice,
  totalPrice,
  getQuantity,
  handleUnitPriceChange,
  handleTotalPriceChange,
  handleProcessDecision,
  processing,
  chatHistory,
}: ApprovalsConsoleProps) {
  return (
    <div className="lg:col-span-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-full p-6 flex flex-col">
      {selectedTicket ? (
        <div className="space-y-4 flex flex-col h-full overflow-y-auto">
          <div className="border-b border-white/10 pb-3 flex justify-between items-start gap-4">
            <div>
              <span className={`text-[9px] font-mono uppercase tracking-widest block font-bold ${
                (selectedTicket.status === "review_required" || selectedTicket.status === "escalated" || selectedTicket.status === "review required") ? "text-red-400" : "text-[#d4af37]"
              }`}>
                {(selectedTicket.status === "review_required" || selectedTicket.status === "escalated" || selectedTicket.status === "review required") ? "Priority Resolution Intercept" : "Active Thread Monitoring"}
              </span>
              <h2 className="text-sm font-bold text-white mt-0.5">{selectedTicket.subject}</h2>
            </div>
            <div className="text-right font-mono text-[9px] text-zinc-500">
              <p>Ref ID: {selectedTicket.id.slice(0, 8)}</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-1 text-xs">
            {/* Scrollable Chat History Log */}
            <div className="space-y-3 bg-black/30 border border-white/5 p-4 rounded-xl max-h-[220px] overflow-y-auto">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 font-mono">Conversation Thread</span>
              <div className="space-y-3">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs leading-relaxed max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-zinc-900/50 border-zinc-800 mr-auto text-zinc-300"
                        : "bg-[#d4af37]/5 border-[#d4af37]/10 ml-auto text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 border-b border-white/5 pb-1">
                      <span className={`text-[8px] font-bold uppercase tracking-wider ${
                        msg.role === "user" ? "text-zinc-500" : "text-[#d4af37]"
                      }`}>
                        {msg.role === "user" ? "Client" : "Agentic AI / Override"}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap font-sans">{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Items in Quote Section */}
            {selectedTicket.items && Array.isArray(selectedTicket.items) && selectedTicket.items.length > 0 && (
              <div className="space-y-2 bg-black/30 border border-white/5 p-4 rounded-xl max-h-[150px] overflow-y-auto">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 font-mono">Items In Quote</span>
                <div className="space-y-2">
                  {selectedTicket.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                      <div>
                        <span className="font-bold text-zinc-200">{item.product?.title || "Custom Product"}</span>
                        <span className="text-zinc-500 ml-2">({item.size || "Standard"}, {item.color || "Default"})</span>
                      </div>
                      <div className="text-zinc-400">
                        <span className="font-mono">{item.quantity} units</span>
                        <span className="text-zinc-600 font-mono ml-2">@ ${item.product?.price || 0}/unit</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Override Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              <div className="space-y-2 flex flex-col">
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">
                  Unit Price ($)
                </span>
                <input
                  type="text"
                  value={unitPrice}
                  onChange={(e) => handleUnitPriceChange(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors"
                  placeholder="e.g. 38.00"
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">
                  Total Price ($)
                </span>
                <input
                  type="text"
                  value={totalPrice}
                  onChange={(e) => handleTotalPriceChange(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors"
                  placeholder="e.g. 1900.00"
                />
              </div>
              <div className="space-y-2 flex flex-col">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Total Quantity
                </span>
                <div className="w-full bg-zinc-900/30 border border-white/5 rounded-xl px-4 py-3 text-xs text-zinc-400 select-none">
                  {getQuantity()} units
                </div>
              </div>
            </div>

            {/* Drafting Override Response Panel */}
            <div className="space-y-2 flex flex-col font-mono">
              <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-wider block">
                {selectedTicket.status === "escalated"
                  ? "Drafting Override Response Panel"
                  : "Send Reply / Interference Message"}
              </span>
              <textarea
                value={editableResponse}
                onChange={(e) => setEditableResponse(e.target.value)}
                className="w-full h-24 min-h-24 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:border-[#d4af37] focus:outline-none resize-none transition-colors leading-relaxed"
                placeholder="Type response override..."
              />
            </div>
          </div>

          {/* Action Operations Execution Buttons Trigger Footer Layout */}
          <div className="flex gap-3 pt-3 border-t border-white/10 mt-auto bg-transparent">
            <button
              onClick={() => handleProcessDecision("reject")}
              disabled={processing}
              className="bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all disabled:opacity-40"
            >
              Dismiss Thread
            </button>
            <button
              onClick={() => handleProcessDecision("approve")}
              disabled={processing}
              className="flex-1 bg-[#d4af37] text-[#090a0f] hover:bg-[#bfa032] px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] text-center disabled:opacity-40"
            >
              {processing ? "Authorizing Security Dispatch Loop..." : "Approve & Send Quote"}
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-xs text-zinc-600 font-mono">
          Select an item context from the left intercept layout matrix.
        </div>
      )}
    </div>
  );
}
