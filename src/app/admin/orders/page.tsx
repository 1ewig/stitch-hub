"use client";
import React from "react";
import Image from "next/image";
import GlassCard from "@/components/admin/GlassCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import EmptyState from "@/components/admin/EmptyState";
import StatusBadge from "@/components/admin/StatusBadge";
import { useAdminOrders } from "@/hooks/useAdminOrders";

const statusFilters = [
  { label: "All Orders", value: "all" },
  { label: "Review Required", value: "review required" },
  { label: "Sourcing Drafts", value: "draft sourcing" },
  { label: "Approved", value: "approved" },
  { label: "Processing", value: "processing" },
  { label: "Shipping", value: "shipping" },
  { label: "Delivered", value: "delivered" },
];

export default function AdminOrdersPage() {
  const {
    orders, loading, selectedOrder, updatingId,
    quoteValue, isEditingQuote,
    messages, threadId, agentOverride, chatLoading, adminMessage,
    setQuoteValue, setIsEditingQuote, setAdminMessage,
    handleSelectOrder, handleUpdateStatus, handleUpdateQuote,
    toggleTakeover, sendAdminMessage,

    // Supplier state and mutation functions from the refactored hook
    supplierMessages, supplierChatText, supplierChatLoading, supplierStatusMessage,
    setSupplierChatText, sendSupplierMessage,
  } = useAdminOrders();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [isSpecsOpen, setIsSpecsOpen] = React.useState(false);
  const [activeDetailTab, setActiveDetailTab] = React.useState<"details" | "supplier">("details");

  // Reset modal when order switches
  React.useEffect(() => {
    setIsSpecsOpen(false);
  }, [selectedOrder]);

  // Filter orders based on search input and status filter chips
  const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user?.email || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      <AdminPageHeader title="Orders Desk" subtitle="Review active requisitions, manage customer threads, and sync with suppliers." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ── LEFT COLUMN: LARGE DETAILS WORKSPACE (8 COLS) ── */}
        <div className="lg:col-span-8 flex flex-col h-[780px]">
          <GlassCard className="h-full flex overflow-hidden p-0" glow>
            {selectedOrder ? (
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
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-zinc-500 text-xs py-20">
                Select an order from the right inbox queue to open the workspace.
              </div>
            )}
          </GlassCard>
        </div>

        {/* ── RIGHT COLUMN: ORDERS INBOX (4 COLS) ── */}
        <div className="lg:col-span-4 flex flex-col h-[780px]">
          <GlassCard className="p-6 h-full flex flex-col overflow-hidden" glow>
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="text-sm font-bold text-zinc-300 font-display">Inbox Queue</h3>
              <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-full">
                {filteredOrders.length} / {orders.length}
              </span>
            </div>

            {/* Search Bar & Dropdown Filter */}
            <div className="flex gap-2 mb-4 shrink-0">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search client or invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-[#d4af37]/45 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none placeholder-zinc-500 transition-all font-sans"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-white"
                  >
                    <span className="text-xs">✕</span>
                  </button>
                )}
              </div>

              {/* Native Dropdown Filter */}
              <div className="relative w-40 shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 focus:border-[#d4af37]/45 rounded-xl px-3 py-2.5 pr-8 text-xs text-zinc-200 focus:outline-none transition-all font-mono uppercase cursor-pointer appearance-none"
                >
                  {statusFilters.map((filter) => (
                    <option key={filter.value} value={filter.value} className="bg-[#090a0f] text-zinc-300">
                      {filter.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                  <span className="text-[9px]">▼</span>
                </div>
              </div>
            </div>

            {/* Scrollable Order List Feed */}
            {loading ? (
              <div className="flex-1 flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="flex-1 flex justify-center items-center">
                <EmptyState message="No orders match your filter criteria." />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
                {filteredOrders.map((order) => {
                  const isSelected = selectedOrder?.id === order.id;

                  return (
                    <div
                      key={order.id}
                      onClick={() => handleSelectOrder(order)}
                      className={`p-4 bg-black/40 border border-white/5 rounded-xl cursor-pointer transition-all flex flex-col gap-2 ${
                        isSelected
                          ? "bg-white/[0.08] border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-[#d4af37]">{order.invoiceNumber}</span>
                        <span className="text-[9px] font-mono text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white truncate">{order.user?.name || "Unregistered User"}</h4>
                        <p className="text-[10px] text-zinc-400 truncate mt-0.5">{order.user?.email || "No Email"}</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-mono font-bold text-zinc-200">{order.totalAmount}</span>
                        <StatusBadge status={order.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </GlassCard>
        </div>

      </div>

      {/* ── SPECIFICATIONS MODAL ── */}
      {isSpecsOpen && selectedOrder && (
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
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors font-mono uppercase tracking-wider cursor-pointer appearance-none animate-pulse-once"
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
      )}
    </div>
  );
}
