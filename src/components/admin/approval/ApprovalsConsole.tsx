"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
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
    <GlassCard className="h-full flex overflow-hidden p-0" glow>
      {selectedTicket ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20 shrink-0">
            <div className="min-w-0 flex-1">
              <span className={`text-[9px] font-mono uppercase tracking-widest block font-bold ${
                (selectedTicket.status === "review_required" || selectedTicket.status === "escalated" || selectedTicket.status === "review required") ? "text-red-400" : "text-[#d4af37]"
              }`}>
                {(selectedTicket.status === "review_required" || selectedTicket.status === "escalated" || selectedTicket.status === "review required") ? "Priority Intercept" : "Monitoring Thread"}
              </span>
              <h4 className="text-xs font-bold text-white mt-0.5 truncate">
                {selectedTicket.subject}
              </h4>
            </div>
            <div className="text-right font-mono text-[9px] text-zinc-500 shrink-0 ml-3">
              <p>Ref ID: {selectedTicket.id.slice(0, 8)}</p>
            </div>
          </div>

          {/* Conversation history & Items list */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5 min-h-0 bg-black/10 scrollbar-thin">
            
            {/* Conversation Transcript Logs */}
            <div className="space-y-4">
              {chatHistory.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div key={idx} className={`flex ${isUser ? "justify-start" : "justify-end"} w-full`}>
                    <div className={`flex gap-3 max-w-[85%] ${isUser ? "flex-row" : "flex-row-reverse"}`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-md ${
                        isUser
                          ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                          : "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/35 shadow-[0_0_10px_rgba(212,175,55,0.15)]"
                      }`}>
                        {isUser ? "CL" : "AI"}
                      </div>
                      <div className={`flex flex-col ${isUser ? "items-start" : "items-end"}`}>
                        <div className={`rounded-2xl p-3 text-xs leading-relaxed border ${
                          isUser
                            ? "bg-zinc-900 border-white/5 text-zinc-100 rounded-tl-none"
                            : "bg-[#d4af37]/10 border-[#d4af37]/20 text-white rounded-tr-none"
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        <span className="text-[8px] font-mono text-zinc-500 mt-1">
                          {isUser ? "Client" : "Agentic AI / Override"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Items Snapshot Requisition list */}
            {selectedTicket.items && Array.isArray(selectedTicket.items) && selectedTicket.items.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-2 font-mono">Items In Quote ({selectedTicket.items.length})</span>
                <div className="space-y-2">
                  {selectedTicket.items.map((item: any, idx: number) => (
                    <div key={idx} className="bg-black/20 border border-white/5 p-3 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-zinc-200">{item.product?.title || "Custom Product"}</span>
                        <span className="text-zinc-500 ml-2">({item.size || "Standard"}, {item.color || "Default"})</span>
                      </div>
                      <div className="text-zinc-400 font-mono text-[11px]">
                        <span>{item.quantity} units</span>
                        <span className="text-zinc-600 font-mono ml-2">@ ${item.product?.price || 0}/unit</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Pricing & Textarea Controls Panel */}
          <div className="p-4 border-t border-white/10 bg-black/20 shrink-0 space-y-4">
            
            {/* Quick pricing override boxes */}
            <div className="grid grid-cols-3 gap-3 text-[10px] font-mono">
              <div className="space-y-1">
                <span className="text-zinc-500 uppercase tracking-wider block font-bold">Unit Price ($)</span>
                <input
                  type="text"
                  value={unitPrice}
                  onChange={(e) => handleUnitPriceChange(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors"
                  placeholder="Unit Price"
                />
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 uppercase tracking-wider block font-bold">Total Price ($)</span>
                <input
                  type="text"
                  value={totalPrice}
                  onChange={(e) => handleTotalPriceChange(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors"
                  placeholder="Total Price"
                />
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 uppercase tracking-wider block font-bold">Quantity</span>
                <div className="w-full bg-zinc-900/40 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-zinc-400 select-none text-center h-[34px] flex items-center justify-center font-bold">
                  {getQuantity()} units
                </div>
              </div>
            </div>

            {/* Response Area and CTA Buttons */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-wider block font-mono">
                {selectedTicket.status === "escalated" ? "Drafting Override Response Panel" : "Override Response"}
              </span>
              <div className="flex gap-2.5">
                <textarea
                  rows={2}
                  value={editableResponse}
                  onChange={(e) => setEditableResponse(e.target.value)}
                  placeholder="Type response override..."
                  className="flex-grow bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]/45 font-sans resize-none"
                />
                <div className="flex flex-col gap-2 shrink-0 w-28">
                  <button
                    onClick={() => handleProcessDecision("approve")}
                    disabled={processing}
                    className="bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-30 text-[#090a0f] font-mono font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-xl transition-all cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.15)] flex-1 flex items-center justify-center text-center"
                  >
                    {processing ? "Sending..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleProcessDecision("reject")}
                    disabled={processing}
                    className="bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 text-zinc-400 hover:text-white px-3 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 flex items-center justify-center text-center"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center text-zinc-500 text-xs py-20 font-mono">
          Select an item context from the right queue layout to open the review.
        </div>
      )}
    </GlassCard>
  );
}
