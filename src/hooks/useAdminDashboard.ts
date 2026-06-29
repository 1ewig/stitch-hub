"use client";

import { useState, useEffect } from "react";

interface EscalationAlert {
  id: string;
  subject: string;
  body: string;
  userId: string;
}

export interface SalesOverview {
  totalRevenue: string;
  growthPercent: string;
  goldPolyline: string;
  bluePolyline: string;
  months: string[];
}

export interface QuoteConversion {
  sentByAiPct: number;
  conversionRate: number;
  humanHandoffsPct: number;
}

export interface TaskBreakdownItem {
  label: string;
  height: number;
  color: string;
}

export interface TaskBreakdown {
  items: TaskBreakdownItem[];
}

export function useAdminDashboard() {
  const [escalations, setEscalations] = useState<EscalationAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch("/api/admin/escalations");
        if (res.ok) {
          const data = await res.json();
          setEscalations(data.escalations || []);
        }
      } catch {
        console.error("Failed to load alerts");
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  const salesOverview: SalesOverview = {
    totalRevenue: "$162,345",
    growthPercent: "+10%",
    goldPolyline: "0,80 20,60 40,70 60,30 80,40 100,10",
    bluePolyline: "0,90 20,80 40,85 60,50 80,55 100,30",
    months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
  };

  const quoteConversion: QuoteConversion = {
    sentByAiPct: 76,
    conversionRate: 30,
    humanHandoffsPct: 24,
  };

  const taskBreakdown: TaskBreakdown = {
    items: [
      { label: "Quotes", height: 60, color: "bg-[#d4af37]/80" },
      { label: "Supply", height: 85, color: "bg-blue-500/80" },
      { label: "Support", height: 40, color: "bg-emerald-500/80" },
      { label: "Design", height: 70, color: "bg-purple-500/80" },
    ],
  };

  return {
    salesOverview,
    quoteConversion,
    taskBreakdown,
    escalations,
    loading,
  };
}
