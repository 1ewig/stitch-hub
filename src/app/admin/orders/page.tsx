"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import EmptyState from "@/components/admin/EmptyState";
import StatusBadge from "@/components/admin/StatusBadge";
import { useAdminOrders } from "@/hooks/useAdminOrders";

export default function AdminOrdersPage() {
  const {
    orders, loading, selectedOrder, updatingId,
    quoteValue, isEditingQuote,
    setQuoteValue, setIsEditingQuote,
    handleSelectOrder, handleUpdateStatus, handleUpdateQuote,
  } = useAdminOrders();

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      <AdminPageHeader title="Active Orders" subtitle="Review active customer B2B procurement flows and dynamic pricing quotes." />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <GlassCard className="p-6 h-[720px] flex flex-col" glow>
            <h3 className="text-sm font-bold text-zinc-300 mb-6 relative z-10">B2B Requisitions</h3>
            
            {loading ? (
              <LoadingSpinner />
            ) : orders.length === 0 ? (
              <EmptyState message="No active B2B orders or quotes found." />
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 relative z-10">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {["Invoice #", "Client", "Total Quote", "Status", "Date"].map((h) => (
                        <th key={h} className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 py-3 text-left border-b border-white/5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        onClick={() => handleSelectOrder(order)}
                        className={`cursor-pointer transition-colors ${selectedOrder?.id === order.id ? "bg-white/[0.05]" : "hover:bg-white/5"}`}
                      >
                        <td className="px-4 py-4 text-xs font-sans border-b border-white/5 text-zinc-300 font-mono font-bold text-[#d4af37]">
                          {order.invoiceNumber}
                        </td>
                        <td className="px-4 py-4 text-xs font-sans border-b border-white/5 text-zinc-300">
                          <p className="font-bold text-white truncate max-w-37.5">{order.user?.name || "Unregistered User"}</p>
                          <p className="text-[10px] text-zinc-500 truncate max-w-37.5">{order.user?.email || "No Email"}</p>
                        </td>
                        <td className="px-4 py-4 text-xs font-sans border-b border-white/5 text-zinc-300 font-mono font-medium truncate max-w-30">
                          {order.totalAmount}
                        </td>
                        <td className="px-4 py-4 text-xs font-sans border-b border-white/5 text-zinc-300">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-4 py-4 text-xs font-sans border-b border-white/5 text-zinc-300 font-mono text-zinc-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-6 flex flex-col h-[720px]">
            {selectedOrder ? (
              <div className="flex-1 flex flex-col overflow-hidden h-full">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <span className="text-[10px] font-mono font-bold text-[#d4af37] tracking-wider uppercase">Order Specifications</span>
                  <h3 className="text-lg font-bold text-white mt-1 font-display tracking-tight">{selectedOrder.invoiceNumber}</h3>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6">
                  <div>
                    <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Client Details</h4>
                    <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1">
                      <p className="text-xs font-bold text-white">{selectedOrder.user?.name || "Unregistered User"}</p>
                      <p className="text-[10px] text-zinc-400 font-mono">{selectedOrder.user?.email}</p>
                      <p className="text-[9px] text-zinc-600 font-mono mt-1">Submitted: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Dynamic Quote Lock</h4>
                    <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                      {isEditingQuote ? (
                        <form onSubmit={handleUpdateQuote} className="space-y-2">
                          <input
                            type="text" value={quoteValue}
                            onChange={(e) => setQuoteValue(e.target.value)}
                            className="w-full bg-black/60 border border-[#d4af37]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                            placeholder="e.g. $1,420.00"
                          />
                          <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => setIsEditingQuote(false)}
                              className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold hover:bg-white/10">Cancel</button>
                            <button type="submit"
                              className="px-2.5 py-1.5 bg-[#d4af37] text-[#090a0f] rounded-md text-[10px] font-bold hover:bg-[#bfa032]">Save</button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-mono font-bold text-white">{selectedOrder.totalAmount}</span>
                          <button onClick={() => setIsEditingQuote(true)}
                            className="text-[10px] text-[#d4af37] hover:underline font-mono">Update Quote</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Operational Dispatch Status</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["unpaid", "paid", "shipping"].map((status) => (
                        <button key={status} disabled={updatingId === selectedOrder.id}
                          onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                          className={`py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider border transition-all ${
                            selectedOrder.status === status
                              ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                          }`}>{status}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Requisition items ({selectedOrder.itemsSnapshot.length})</h4>
                    <div className="space-y-3">
                      {selectedOrder.itemsSnapshot.map((item, idx) => (
                        <div key={idx} className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-3">
                          <div className="flex gap-3">
                            <div className="h-10 w-10 bg-zinc-900 border border-white/10 rounded-md overflow-hidden shrink-0">
                              <img src={item.product.img} alt={item.product.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">{item.product.cat}</span>
                              <h5 className="text-xs font-bold text-white truncate">{item.product.title}</h5>
                              <div className="flex justify-between mt-1 text-[10px] font-mono text-zinc-400">
                                <span>Qty: {item.quantity}</span>
                                <span>Size: {item.size || "Standard"}</span>
                              </div>
                            </div>
                          </div>
                          {item.customNotes && (
                            <div className="bg-black/30 border border-white/5 p-2.5 rounded-lg">
                              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Custom Notes</span>
                              <p className="text-[10px] text-zinc-300 italic mt-0.5 leading-relaxed">&quot;{item.customNotes}&quot;</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col justify-center items-center text-zinc-500 text-xs">
                Select an order from the list to view specifications.
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
