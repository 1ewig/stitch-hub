"use client";

import React, { useState, useEffect } from "react";

interface OrderItem {
  product: {
    title: string;
    img: string;
    cat: string;
  };
  quantity: number;
  size: string;
  customNotes?: string;
}

interface Order {
  id: string;
  invoiceNumber: string;
  totalAmount: string;
  status: string;
  itemsSnapshot: OrderItem[];
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  } | null;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  // Edit Quote State
  const [quoteValue, setQuoteValue] = useState("");
  const [isEditingQuote, setIsEditingQuote] = useState(false);

  const glassCardClass = "bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden";
  const tableHeaderClass = "text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-4 py-3 text-left border-b border-white/5";
  const tableCellClass = "px-4 py-4 text-xs font-sans border-b border-white/5 text-zinc-300";

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        if (data.orders.length > 0 && !selectedOrder) {
          setSelectedOrder(data.orders[0]);
          setQuoteValue(data.orders[0].totalAmount);
        }
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setQuoteValue(order.totalAmount);
    setIsEditingQuote(false);
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh local orders list
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => prev ? { ...prev, status } : null);
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    
    setUpdatingId(selectedOrder.id);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedOrder.id, totalAmount: quoteValue }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === selectedOrder.id ? { ...o, totalAmount: quoteValue } : o))
        );
        setSelectedOrder((prev) => prev ? { ...prev, totalAmount: quoteValue } : null);
        setIsEditingQuote(false);
      }
    } catch (err) {
      console.error("Failed to update quote price:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "shipping":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white font-display tracking-tight drop-shadow-md">Active Orders</h2>
          <p className="text-xs text-zinc-400 mt-1">Review active customer B2B procurement flows and dynamic pricing quotes.</p>
        </div>
      </div>

      {/* ── MAIN CONTENT SPLIT GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT TWO COLUMNS: Orders Table */}
        <div className="xl:col-span-2 space-y-6">
          <div className={`${glassCardClass} p-6 h-[720px] flex flex-col`}>
            {/* Ambient golden glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-sm font-bold text-zinc-300 mb-6 relative z-10">B2B Requisitions</h3>
            
            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d4af37] mb-3"></div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Querying registry database...</span>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 relative z-10">
                {orders.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-zinc-500 text-xs">
                    No active B2B orders or quotes found.
                  </div>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={tableHeaderClass}>Invoice #</th>
                        <th className={tableHeaderClass}>Client</th>
                        <th className={tableHeaderClass}>Total Quote</th>
                        <th className={tableHeaderClass}>Status</th>
                        <th className={tableHeaderClass}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr 
                          key={order.id} 
                          onClick={() => handleSelectOrder(order)}
                          className={`cursor-pointer transition-colors ${selectedOrder?.id === order.id ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"}`}
                        >
                          <td className={`${tableCellClass} font-mono font-bold text-[#d4af37]`}>
                            {order.invoiceNumber}
                          </td>
                          <td className={tableCellClass}>
                            <p className="font-bold text-white truncate max-w-[150px]">{order.user?.name || "Unregistered User"}</p>
                            <p className="text-[10px] text-zinc-500 truncate max-w-[150px]">{order.user?.email || "No Email"}</p>
                          </td>
                          <td className={`${tableCellClass} font-mono font-medium truncate max-w-[120px]`}>
                            {order.totalAmount}
                          </td>
                          <td className={tableCellClass}>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wide ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className={`${tableCellClass} font-mono text-zinc-500`}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Order Details Drawer/Panel */}
        <div className="space-y-6">
          <div className={`${glassCardClass} p-6 flex flex-col h-[720px]`}>
            {selectedOrder ? (
              <div className="flex-1 flex flex-col overflow-hidden h-full">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <span className="text-[10px] font-mono font-bold text-[#d4af37] tracking-wider uppercase">Order Specifications</span>
                  <h3 className="text-lg font-bold text-white mt-1 font-display tracking-tight">{selectedOrder.invoiceNumber}</h3>
                </div>

                {/* Details Scrollable Content */}
                <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6">
                  {/* Client Metadata */}
                  <div>
                    <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Client Details</h4>
                    <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1">
                      <p className="text-xs font-bold text-white">{selectedOrder.user?.name || "Unregistered User"}</p>
                      <p className="text-[10px] text-zinc-400 font-mono">{selectedOrder.user?.email}</p>
                      <p className="text-[9px] text-zinc-600 font-mono mt-1">Submitted: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Pricing Matrix details */}
                  <div>
                    <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Dynamic Quote Lock</h4>
                    <div className="bg-black/20 border border-white/5 p-4 rounded-xl">
                      {isEditingQuote ? (
                        <form onSubmit={handleUpdateQuote} className="space-y-2">
                          <input 
                            type="text" 
                            value={quoteValue}
                            onChange={(e) => setQuoteValue(e.target.value)}
                            className="w-full bg-black/60 border border-[#d4af37]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
                            placeholder="e.g. $1,420.00"
                          />
                          <div className="flex gap-2 justify-end">
                            <button 
                              type="button" 
                              onClick={() => setIsEditingQuote(false)} 
                              className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold hover:bg-white/10"
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="px-2.5 py-1.5 bg-[#d4af37] text-[#090a0f] rounded-md text-[10px] font-bold hover:bg-[#bfa032]"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-mono font-bold text-white">{selectedOrder.totalAmount}</span>
                          <button 
                            onClick={() => setIsEditingQuote(true)}
                            className="text-[10px] text-[#d4af37] hover:underline font-mono"
                          >
                            Update Quote
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Routing Actions */}
                  <div>
                    <h4 className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Operational Dispatch Status</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["unpaid", "paid", "shipping"].map((status) => (
                        <button
                          key={status}
                          disabled={updatingId === selectedOrder.id}
                          onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                          className={`py-2 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider border transition-all ${
                            selectedOrder.status === status
                              ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]"
                              : "bg-white/2 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Items snapshot */}
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
                              <p className="text-[10px] text-zinc-300 italic mt-0.5 leading-relaxed">"{item.customNotes}"</p>
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
          </div>
        </div>

      </div>
    </div>
  );
}
