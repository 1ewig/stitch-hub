"use client";

import { useState, useEffect } from "react";
import type { Order } from "@/types";

export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [quoteValue, setQuoteValue] = useState("");
  const [isEditingQuote, setIsEditingQuote] = useState(false);

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
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
        setSelectedOrder((prev) => prev && prev.id === orderId ? { ...prev, status } : prev);
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
      console.error("Failed to update quote:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return {
    orders, loading, selectedOrder, updatingId,
    quoteValue, isEditingQuote,
    setQuoteValue, setIsEditingQuote,
    handleSelectOrder, handleUpdateStatus, handleUpdateQuote,
  };
}
