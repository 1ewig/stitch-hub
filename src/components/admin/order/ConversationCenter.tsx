"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import type { Order } from "@/types";

interface ConversationCenterProps {
  selectedOrder: Order;
  activeDetailTab: "details" | "supplier";
  setActiveDetailTab: (tab: "details" | "supplier") => void;
  messages: any[];
  chatLoading: boolean;
  agentOverride: boolean;
  toggleTakeover: () => void;
  adminMessage: string;
  setAdminMessage: (msg: string) => void;
  sendAdminMessage: () => void;
  supplierMessages: any[];
  supplierChatText: string;
  setSupplierChatText: (msg: string) => void;
  supplierChatLoading: boolean;
  supplierStatusMessage: string | null;
  sendSupplierMessage: () => void;
  setIsSpecsOpen: (open: boolean) => void;
}

export default function ConversationCenter({
  selectedOrder,
  activeDetailTab,
  setActiveDetailTab,
  messages,
  chatLoading,
  agentOverride,
  toggleTakeover,
  adminMessage,
  setAdminMessage,
  sendAdminMessage,
  supplierMessages,
  supplierChatText,
  setSupplierChatText,
  supplierChatLoading,
  supplierStatusMessage,
  sendSupplierMessage,
  setIsSpecsOpen,
}: ConversationCenterProps) {
  return (
    <GlassCard className="h-full flex overflow-hidden p-0" glow>
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Tabs Toggle Header */}
        <div className="flex border-b border-white/10 shrink-0">
          <button
            onClick={() => setActiveDetailTab("details")}
            className={`flex-1 py-4 text-[10px] font-bold font-mono uppercase tracking-widest transition-all border-b-2 cursor-pointer text-center ${
              activeDetailTab === "details"
                ? "border-[#d4af37] text-[#d4af37] bg-white/[0.02]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            💬 Client Correspondence
          </button>
          <button
            onClick={() => setActiveDetailTab("supplier")}
            className={`flex-1 py-4 text-[10px] font-bold font-mono uppercase tracking-widest transition-all border-b-2 cursor-pointer text-center ${
              activeDetailTab === "supplier"
                ? "border-[#d4af37] text-[#d4af37] bg-white/[0.02]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            🏭 Supplier Negotiation
          </button>
        </div>

        {/* Conversation Information Sub-Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20 shrink-0">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Active Channel</p>
            <h4 className="text-xs font-bold text-white mt-0.5 truncate">
              {activeDetailTab === "details"
                ? `Client Context: ${selectedOrder.user?.name || "Unregistered User"}`
                : `Supplier ID: ${selectedOrder.invoiceNumber}`}
            </h4>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* View Specifications button */}
            <button
              onClick={() => setIsSpecsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-mono font-bold transition-all border border-[#d4af37]/35 bg-[#d4af37]/5 text-[#d4af37] hover:bg-[#d4af37]/15 hover:border-[#d4af37]/60 cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.05)]"
            >
              <span>📋</span>
              <span>VIEW SPECS</span>
            </button>

            {activeDetailTab === "details" ? (
              <button
                onClick={toggleTakeover}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-mono font-bold transition-all border shrink-0 ${
                  agentOverride
                    ? "bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.2)] hover:bg-red-500/20"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${agentOverride ? "bg-red-500 animate-pulse shadow-[0_0_8px_red]" : "bg-zinc-500"}`} />
                <span>{agentOverride ? "TAKEOVER ON" : "TAKE OVER CHAT"}</span>
              </button>
            ) : (
              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1.5 rounded-full font-bold">
                B2B LINKED
              </span>
            )}
          </div>
        </div>

        {/* Messaging History Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 bg-black/10 scrollbar-thin">
          {activeDetailTab === "details" ? (
            /* Client Chat logs */
            chatLoading ? (
              <div className="flex flex-col justify-center items-center h-full gap-2">
                <LoadingSpinner />
                <span className="text-[10px] text-zinc-500 font-mono">Loading client chat logs...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-xs text-zinc-500 italic text-center py-20 font-mono bg-black/20 rounded-xl border border-white/5 mx-4">
                No messages logged for this order thread.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg: any, idx: number) => {
                  const isUser = msg.role === "user";
                  return (
                    <div key={idx} className={`flex ${isUser ? "justify-start" : "justify-end"} w-full`}>
                      <div className={`flex gap-3 max-w-[85%] ${isUser ? "flex-row" : "flex-row-reverse"}`}>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-md ${
                          isUser
                            ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                            : "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/35 shadow-[0_0_10px_rgba(212,175,55,0.15)]"
                        }`}>
                          {isUser ? (selectedOrder.user?.name?.slice(0, 2).toUpperCase() || "CL") : "SH"}
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
                            {isUser ? "Client" : (agentOverride ? "Admin (Manual)" : "Stitchhub Agent (AI)")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Supplier Chat logs */
            supplierChatLoading ? (
              <div className="flex flex-col justify-center items-center h-full gap-2">
                <LoadingSpinner />
                <span className="text-[10px] text-zinc-500 font-mono">Loading supplier channel...</span>
              </div>
            ) : supplierMessages.length === 0 ? (
              <div className="text-xs text-zinc-500 italic text-center py-20 font-mono bg-black/20 rounded-xl border border-white/5 mx-4">
                No messages exchanged with suppliers.
              </div>
            ) : (
              <div className="space-y-4">
                {supplierMessages.map((msg: any) => {
                  const isAdmin = msg.sender === "admin";
                  return (
                    <div key={msg.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"} w-full`}>
                      <div className={`flex gap-3 max-w-[85%] ${isAdmin ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 shadow-md ${
                          isAdmin
                            ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                            : "bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/35 shadow-[0_0_10px_rgba(212,175,55,0.15)]"
                        }`}>
                          {isAdmin ? "AD" : "SU"}
                        </div>
                        <div className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
                          <div className={`rounded-2xl p-3 text-xs leading-relaxed border ${
                            isAdmin
                              ? "bg-[#090a0f]/80 border-white/5 text-zinc-100 rounded-tr-none"
                              : "bg-[#d4af37]/10 border-[#d4af37]/20 text-white rounded-tl-none"
                          }`}>
                            <p className="whitespace-pre-wrap">{msg.message_text}</p>
                          </div>
                          <span className="text-[8px] font-mono text-zinc-500 mt-1">
                            {isAdmin ? "Admin" : "Supplier"} • {new Date(msg.createdAt || msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Input / Reply Editor Panel */}
        <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
          {activeDetailTab === "details" ? (
            /* Client replying inputs */
            agentOverride ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest font-mono flex items-center gap-1.5 animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-md" />
                    Human Takeover Engaged
                  </span>
                  <span className="text-[8px] text-zinc-500 font-mono">Bypassing automatic operations</span>
                </div>
                <div className="flex gap-2.5">
                  <textarea
                    rows={2}
                    value={adminMessage}
                    onChange={(e) => setAdminMessage(e.target.value)}
                    placeholder="Type a manual reply to the client..."
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/40 font-sans resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendAdminMessage();
                      }
                    }}
                  />
                  <button
                    onClick={sendAdminMessage}
                    disabled={!adminMessage.trim()}
                    className="bg-red-600 hover:bg-red-500 disabled:opacity-30 text-white font-mono font-bold text-[10px] uppercase tracking-wider px-5 rounded-xl transition-all h-auto cursor-pointer shadow-[0_0_12px_rgba(220,38,38,0.15)]"
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center bg-white/[0.02] border border-white/5 rounded-xl px-4 flex flex-col items-center justify-center">
                <p className="text-xs text-zinc-400">Automatic AI Agent is managing communication for this ticket.</p>
                <button
                  onClick={toggleTakeover}
                  className="mt-2 text-[10px] font-mono font-bold text-[#d4af37] border border-[#d4af37]/35 hover:border-[#d4af37] px-3.5 py-2 rounded-lg bg-[#d4af37]/5 transition-all cursor-pointer hover:bg-[#d4af37]/10"
                >
                  Take Over to Compose Reply Manually
                </button>
              </div>
            )
          ) : (
            /* Supplier replies input */
            <div className="space-y-3">
              {supplierStatusMessage && (
                <div className="text-[10px] text-emerald-400 font-bold font-mono uppercase tracking-wider">
                  ✓ {supplierStatusMessage}
                </div>
              )}
              <div className="flex gap-2.5">
                <textarea
                  rows={2}
                  value={supplierChatText}
                  onChange={(e) => setSupplierChatText(e.target.value)}
                  placeholder="Type a message to the supplier..."
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]/40 font-sans resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendSupplierMessage();
                    }
                  }}
                />
                <button
                  onClick={sendSupplierMessage}
                  disabled={!supplierChatText.trim()}
                  className="bg-[#d4af37] hover:bg-[#bfa032] disabled:opacity-30 text-[#090a0f] font-mono font-bold text-[10px] uppercase tracking-wider px-5 rounded-xl transition-all h-auto cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
