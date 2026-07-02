"use client";

import { useState, useEffect } from "react";

export interface EscalationAlert {
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
  values: number[];
  counts: number[];
}

export interface QuoteConversion {
  sentByAiPct: number;
  conversionRate: number;
  humanHandoffsPct: number;
}

export interface PipelineCounts {
  sourcing: number;
  review: number;
  approved: number;
  processing: number;
  shipping: number;
  delivered: number;
}

export interface InventoryAlert {
  productName: string;
  stockQuantity: number;
  reorderLevel: number;
}

export interface DashboardMetrics {
  contractVolume: string;
  collectedRevenue: string;
  automationRate: number;
  conversionRate: number;
  activeSourcingCount: number;
  totalOrdersCount: number;
  stockAlertsCount: number;
}

export function useAdminDashboard() {
  const [escalations, setEscalations] = useState<EscalationAlert[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    contractVolume: "$0.00",
    collectedRevenue: "$0.00",
    automationRate: 100,
    conversionRate: 0,
    activeSourcingCount: 0,
    totalOrdersCount: 0,
    stockAlertsCount: 0,
  });

  const [salesOverview, setSalesOverview] = useState<SalesOverview>({
    totalRevenue: "$0",
    growthPercent: "+0%",
    goldPolyline: "0,90 20,90 40,90 60,90 80,90 100,90",
    bluePolyline: "0,90 20,90 40,90 60,90 80,90 100,90",
    months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    values: [0, 0, 0, 0, 0, 0],
    counts: [0, 0, 0, 0, 0, 0],
  });

  const [quoteConversion, setQuoteConversion] = useState<QuoteConversion>({
    sentByAiPct: 0,
    conversionRate: 0,
    humanHandoffsPct: 0,
  });

  const [pipeline, setPipeline] = useState<PipelineCounts>({
    sourcing: 0,
    review: 0,
    approved: 0,
    processing: 0,
    shipping: 0,
    delivered: 0,
  });

  const [inventoryAlerts, setInventoryAlerts] = useState<InventoryAlert[]>([]);
  const [supplierStats, setSupplierStats] = useState({
    totalQuotesCount: 0,
    avgDeliveryDays: 0,
  });

  const [period, setPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // Fetch dashboard metrics
        const dashRes = await fetch(`/api/admin/dashboard?period=${period}`);
        if (dashRes.ok) {
          const dashData = await dashRes.json();
          if (dashData.success) {
            setMetrics(dashData.metrics);
            setSalesOverview(dashData.salesOverview);
            setQuoteConversion(dashData.quoteConversion);
            setPipeline(dashData.pipeline.counts);
            setInventoryAlerts(dashData.inventoryAlerts);
            setSupplierStats(dashData.supplierStats);
          }
        }

        // Fetch escalations
        const escRes = await fetch("/api/admin/escalations");
        if (escRes.ok) {
          const escData = await escRes.json();
          setEscalations(escData.escalations || []);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [period]);

  return {
    metrics,
    salesOverview,
    quoteConversion,
    pipeline,
    inventoryAlerts,
    supplierStats,
    escalations,
    loading,
    period,
    setPeriod,
  };
}
