"use client";

import { useState, useEffect } from "react";

export interface SupplierQuote {
  id: string;
  orderId: string;
  supplierName: string;
  quotedCostPerUnit: string;
  estimatedDeliveryDays: number;
  status: string;
  createdAt: string;
  clientTotalPrice: string | null;
  clientUnitPrice: string | null;
  clientItems: any;
  clientSubject: string | null;
}

export function useAdminSupplierQuotes() {
  const [quotes, setQuotes] = useState<SupplierQuote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<SupplierQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/admin/supplier-quotes");
      if (res.ok) {
        const data = await res.json();
        setQuotes(data.quotes || []);
        if (data.quotes && data.quotes.length > 0) {
          setSelectedQuote(data.quotes[0]);
        } else {
          setSelectedQuote(null);
        }
      }
    } catch (error) {
      console.error("Failed to load supplier quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDecision = async (decision: "approve" | "reject") => {
    if (!selectedQuote) return;
    setProcessing(true);

    try {
      const res = await fetch("/api/admin/supplier-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteId: selectedQuote.id,
          decision,
        }),
      });

      if (res.ok) {
        alert(`Supplier quote has been successfully ${decision === "approve" ? "approved" : "rejected"}.`);
        const updatedList = quotes.filter((q) => q.id !== selectedQuote.id);
        setQuotes(updatedList);
        setSelectedQuote(updatedList.length > 0 ? updatedList[0] : null);
      } else {
        alert("Failed to process quote approval decision.");
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred.");
    } finally {
      setProcessing(false);
    }
  };

  const getQuantity = (quote: SupplierQuote) => {
    if (quote.clientItems && Array.isArray(quote.clientItems)) {
      return quote.clientItems.reduce((sum, item: any) => sum + (item.quantity || 0), 0);
    }
    return 0;
  };

  const calculateMargin = (quote: SupplierQuote) => {
    const qty = getQuantity(quote);
    const clientTotal = parseFloat(quote.clientTotalPrice || "0");
    const supplierUnit = parseFloat(quote.quotedCostPerUnit);
    const supplierTotal = supplierUnit * qty;
    
    const profit = clientTotal - supplierTotal;
    const marginPercent = clientTotal > 0 ? (profit / clientTotal) * 100 : 0;
    
    return {
      supplierTotal,
      profit,
      marginPercent,
    };
  };

  return {
    quotes,
    selectedQuote,
    setSelectedQuote,
    loading,
    processing,
    handleDecision,
    getQuantity,
    calculateMargin,
  };
}
