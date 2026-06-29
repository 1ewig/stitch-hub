"use client";

import { useState, useEffect } from "react";
import type { Order } from "@/types";
import { createClient } from "@/utils/supabase/client";

export function useAdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [quoteValue, setQuoteValue] = useState("");
  const [isEditingQuote, setIsEditingQuote] = useState(false);

  // Takeover & Correspondence Chat States
  const [messages, setMessages] = useState<any[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [agentOverride, setAgentOverride] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");

  // Supplier chat integration
  const [supplierMessages, setSupplierMessages] = useState<any[]>([]);
  const [supplierChatText, setSupplierChatText] = useState("");
  const [supplierChatLoading, setSupplierChatLoading] = useState(false);
  const [supplierStatusMessage, setSupplierStatusMessage] = useState<string | null>(null);

  const refreshChatLog = async (invoiceId: string) => {
    setChatLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/chat-log?invoiceId=${invoiceId}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
        setThreadId(data.threadId);
        setAgentOverride(data.agentOverride);
      } else {
        setMessages([]);
        setThreadId(null);
        setAgentOverride(false);
      }
    } catch (err) {
      console.error("Failed to load chat logs:", err);
      setMessages([]);
      setThreadId(null);
      setAgentOverride(false);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOrder) {
      refreshChatLog(selectedOrder.id);
    } else {
      setMessages([]);
      setThreadId(null);
      setAgentOverride(false);
    }
  }, [selectedOrder]);

  const toggleTakeover = async () => {
    if (!selectedOrder) return;
    const targetOverride = !agentOverride;
    setAgentOverride(targetOverride);

    try {
      const res = await fetch("/api/admin/orders/takeover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
          invoiceId: selectedOrder.id,
          agentOverride: targetOverride,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setAgentOverride(!targetOverride);
        alert("Failed to toggle takeover override: " + (data.error || "unknown error"));
      }
    } catch (err) {
      console.error("Failed to toggle takeover:", err);
      setAgentOverride(!targetOverride);
    }
  };

  const sendAdminMessage = async () => {
    if (!selectedOrder || !adminMessage.trim()) return;
    const msg = adminMessage.trim();
    setAdminMessage("");

    const optimisticMsg = { role: "assistant" as const, content: msg };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const res = await fetch("/api/admin/orders/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
          invoiceId: selectedOrder.id,
          message: msg,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      } else {
        setMessages((prev) => prev.filter((m) => m !== optimisticMsg));
        alert("Failed to send message: " + (data.error || "unknown error"));
      }
    } catch (err) {
      console.error("Failed to send admin message:", err);
      setMessages((prev) => prev.filter((m) => m !== optimisticMsg));
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (!cancelled && data.success) {
          setOrders(data.orders);
          if (data.orders.length > 0) {
            setSelectedOrder(data.orders[0]);
            setQuoteValue(data.orders[0].totalAmount);
          }
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

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
        // Refresh chat logs in case quote triggers a status transition visible in chat
        refreshChatLog(selectedOrder.id);
      }
    } catch (err) {
      console.error("Failed to update quote:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Supplier messages fetching and realtime subscription logic
  useEffect(() => {
    if (!selectedOrder) {
      setSupplierMessages([]);
      return;
    }

    const supabase = createClient();
    const activeInvoice = selectedOrder.invoiceNumber;

    const fetchSupplierMessages = async () => {
      setSupplierChatLoading(true);
      const { data, error } = await supabase
        .from("supplier_messages")
        .select("*")
        .eq("order_id", activeInvoice)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setSupplierMessages(data);
      }
      setSupplierChatLoading(false);
    };

    fetchSupplierMessages();

    // Subscribe to new supplier_messages
    const channel = supabase
      .channel(`admin_supplier_messages:${activeInvoice}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "supplier_messages",
          filter: `order_id=eq.${activeInvoice}`,
        },
        (payload) => {
          setSupplierMessages((prev) => {
            if (prev.some(m => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedOrder]);

  const sendSupplierMessage = async () => {
    if (!selectedOrder || !supplierChatText.trim()) return;
    const textToSend = supplierChatText.trim();
    setSupplierChatText("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("supplier_messages")
        .insert({
          order_id: selectedOrder.invoiceNumber,
          sender: "admin",
          message_text: textToSend,
        })
        .select();

      if (!error && data && data.length > 0) {
        setSupplierMessages((prev) => {
          if (prev.some((m) => m.id === data[0].id)) return prev;
          return [...prev, data[0]];
        });
        setSupplierStatusMessage("Message sent to Supplier!");
        setTimeout(() => setSupplierStatusMessage(null), 3000);
      }

      if (error) {
        console.error("Error sending supplier message:", error);
      }
    } catch (err) {
      console.error("Unexpected supplier messaging error:", err);
    }
  };

  return {
    orders, loading, selectedOrder, updatingId,
    quoteValue, isEditingQuote,
    messages, threadId, agentOverride, chatLoading, adminMessage,
    setQuoteValue, setIsEditingQuote, setAdminMessage,
    handleSelectOrder, handleUpdateStatus, handleUpdateQuote,
    toggleTakeover, sendAdminMessage, refreshChatLog,
    
    // Supplier values
    supplierMessages, supplierChatText, supplierChatLoading, supplierStatusMessage,
    setSupplierChatText, sendSupplierMessage,
  };
}
