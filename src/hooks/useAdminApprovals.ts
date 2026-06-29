"use client";

import { useState, useEffect } from "react";

export interface EscalationLog {
  id: string;
  subject: string;
  body: string;
  status: string;
  aiResponseDraft: string;
  createdAt: string;
  metadata?: { recipientEmail?: string; itemCount?: number };
  finalQuoteAmount?: string | null;
  unitPrice?: string | null;
  totalPrice?: string | null;
  items?: any;
}

export function useAdminApprovals() {
  const [tickets, setTickets] = useState<EscalationLog[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<EscalationLog | null>(null);
  const [editableResponse, setEditableResponse] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Helper function to strip out structural tags for human previewing
  const cleanAiResponse = (rawStr: string) => {
    let text = rawStr;
    try {
      const parsed = JSON.parse(rawStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const lastMsg = [...parsed].reverse().find((m) => m.role === "assistant") || parsed[parsed.length - 1];
        text = lastMsg ? lastMsg.content : "";
      } else if (parsed && typeof parsed === "object") {
        if (parsed.ai_response) text = parsed.ai_response;
        else if (parsed.aiResponse) text = parsed.aiResponse;
        else if (parsed.content) text = parsed.content;
        else if (parsed.response) text = parsed.response;
        else if (parsed.message) text = parsed.message;
      }
    } catch {
      // Plain text fallback
    }
    return text
      .replace(/<action>PAUSE<\/action>/gi, "")
      .replace(/escalate_to_admin:?/gi, "")
      .trim();
  };

  // Sync tickets list on mount
  useEffect(() => {
    async function loadEscalations() {
      try {
        const res = await fetch("/api/admin/escalations");
        if (res.ok) {
          const data = await res.json();
          setTickets(data.escalations || []);
          if (data.escalations && data.escalations.length > 0) {
            const ticket = data.escalations[0];
            setSelectedTicket(ticket);
            setEditableResponse(cleanAiResponse(ticket.aiResponseDraft));
            setQuoteAmount(ticket.finalQuoteAmount || "");
            setUnitPrice(ticket.unitPrice || "");
            setTotalPrice(ticket.totalPrice || "");
          }
        }
      } catch (error) {
        console.error("Failed syncing admin approvals queue:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEscalations();
  }, []);

  // Sync text area when switching selected tickets
  useEffect(() => {
    if (selectedTicket) {
      setEditableResponse(cleanAiResponse(selectedTicket.aiResponseDraft));
      setQuoteAmount(selectedTicket.finalQuoteAmount || "");
      setUnitPrice(selectedTicket.unitPrice || "");
      setTotalPrice(selectedTicket.totalPrice || "");
    } else {
      setEditableResponse("");
      setQuoteAmount("");
      setUnitPrice("");
      setTotalPrice("");
    }
  }, [selectedTicket]);

  const getQuantity = () => {
    if (selectedTicket?.items && Array.isArray(selectedTicket.items)) {
      return selectedTicket.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
    }
    return selectedTicket?.metadata?.itemCount || 0;
  };

  const handleUnitPriceChange = (val: string) => {
    setUnitPrice(val);
    const parsedUnit = parseFloat(val);
    const qty = getQuantity();
    if (!isNaN(parsedUnit) && qty > 0) {
      setTotalPrice((parsedUnit * qty).toFixed(2));
    }
  };

  const handleTotalPriceChange = (val: string) => {
    setTotalPrice(val);
    const parsedTotal = parseFloat(val);
    const qty = getQuantity();
    if (!isNaN(parsedTotal) && qty > 0) {
      setUnitPrice((parsedTotal / qty).toFixed(2));
    }
  };

  const handleProcessDecision = async (decision: "approve" | "reject") => {
    if (!selectedTicket) return;
    setProcessing(true);
    try {
      const res = await fetch("/api/admin/process-approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logId: selectedTicket.id,
          decision,
          finalText: editableResponse,
          unitPrice,
          totalPrice,
        }),
      });

      if (res.ok) {
        alert(`Ticket successfully ${decision === "approve" ? "approved and dispatched" : "rejected"}.`);
        const updatedList = tickets.filter((t) => t.id !== selectedTicket.id);
        setTickets(updatedList);
        setSelectedTicket(updatedList.length > 0 ? updatedList[0] : null);
      } else {
        alert("Failed to compile operational override decision.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProcessing(false);
    }
  };

  // Derive Chat History Transcript
  const getChatHistory = () => {
    if (!selectedTicket) return [];
    let chatHistory: { role: string; content: string }[] = [];
    try {
      const parsed = JSON.parse(selectedTicket.aiResponseDraft || "");
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].role) {
        chatHistory = parsed;
      } else {
        throw new Error();
      }
    } catch {
      let bodyText = selectedTicket.body || "";
      try {
        const parsed = JSON.parse(selectedTicket.aiResponseDraft || "");
        if (parsed && typeof parsed === "object" && parsed.user_request) {
          bodyText = parsed.user_request;
        }
      } catch {}
      chatHistory = [
        { role: "user", content: bodyText || "No initial metadata prompt declared." },
        { role: "assistant", content: cleanAiResponse(selectedTicket.aiResponseDraft || "") }
      ];
    }
    return chatHistory;
  };

  return {
    tickets,
    selectedTicket,
    setSelectedTicket,
    editableResponse,
    setEditableResponse,
    quoteAmount,
    setQuoteAmount,
    unitPrice,
    totalPrice,
    loading,
    processing,
    getQuantity,
    handleUnitPriceChange,
    handleTotalPriceChange,
    handleProcessDecision,
    chatHistory: getChatHistory(),
  };
}
