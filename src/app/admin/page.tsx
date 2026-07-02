"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import GlassCard from "@/components/admin/GlassCard";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import DashboardSalesOverview from "@/components/admin/dashboard/DashboardSalesOverview";
import DashboardQuoteConversion from "@/components/admin/dashboard/DashboardQuoteConversion";
import DashboardTaskBreakdown from "@/components/admin/dashboard/DashboardTaskBreakdown";
import DashboardUrgentNotifications from "@/components/admin/dashboard/DashboardUrgentNotifications";
import DashboardInventoryAlerts from "@/components/admin/dashboard/DashboardInventoryAlerts";

export default function AdminDashboardPage() {
  const { 
    metrics, 
    salesOverview, 
    quoteConversion, 
    pipeline, 
    inventoryAlerts, 
    escalations, 
    loading,
    period,
    setPeriod
  } = useAdminDashboard();

  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      if (!data.success || !data.orders) throw new Error("Invalid response");

      // Generate CSV content
      const headers = ["Invoice Number", "Client Name", "Client Email", "Status", "Total Amount", "Created At"];
      const rows = data.orders.map((order: any) => [
        order.invoiceNumber || "",
        order.user?.name || "N/A",
        order.user?.email || "N/A",
        order.status || "",
        order.totalAmount || "",
        new Date(order.createdAt).toLocaleDateString(),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row: any[]) => 
          row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")
        )
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `stitchhub_orders_ledger_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export orders ledger. Please try again.");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      <AdminPageHeader title="Admin Dashboard" subtitle="Real-time B2B metrics, active sourcing pipeline, and AI logistics status.">
        <button 
          onClick={handleExport}
          className="bg-[#d4af37] text-[#090a0f] px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#bfa032] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.35)] font-mono uppercase tracking-wider cursor-pointer"
        >
          Export Ledger
        </button>
      </AdminPageHeader>

      {/* ── KPI HIGHLIGHT CARDS GRID ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI Card 1: B2B Sourcing Volume */}
        <GlassCard className="p-5 relative overflow-hidden" glow>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-full blur-2xl" />
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 font-mono">B2B Contract Volume</p>
          {loading ? (
            <div className="h-8 w-20 bg-white/5 animate-pulse rounded" />
          ) : (
            <h4 className="text-xl font-bold text-white tracking-tight">{metrics.contractVolume}</h4>
          )}
          <p className="text-[9px] text-zinc-500 font-mono mt-2 flex items-center gap-1">
            <span className="text-[#d4af37]">●</span> AI pricing models active
          </p>
        </GlassCard>

        {/* KPI Card 2: Collected Revenue */}
        <GlassCard className="p-5 relative overflow-hidden" glow>
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 font-mono">Revenue Collected</p>
          {loading ? (
            <div className="h-8 w-20 bg-white/5 animate-pulse rounded" />
          ) : (
            <h4 className="text-xl font-bold text-white tracking-tight">{metrics.collectedRevenue}</h4>
          )}
          <p className="text-[9px] text-zinc-500 font-mono mt-2 flex items-center gap-1">
            <span className="text-blue-400">●</span> Polar.sh Sandbox payouts
          </p>
        </GlassCard>

        {/* KPI Card 3: AI Sourcing Optimization Rate */}
        <GlassCard className="p-5 relative overflow-hidden" glow>
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 font-mono">AI Automation Rate</p>
          {loading ? (
            <div className="h-8 w-16 bg-white/5 animate-pulse rounded" />
          ) : (
            <h4 className="text-xl font-bold text-emerald-400 tracking-tight">{metrics.automationRate}%</h4>
          )}
          <p className="text-[9px] text-zinc-500 font-mono mt-2 flex items-center gap-1">
            <span className="text-emerald-400">●</span> No human takeover required
          </p>
        </GlassCard>

        {/* KPI Card 4: Inventory Warning Alerts */}
        <GlassCard className="p-5 relative overflow-hidden" glow>
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 font-mono">Material Shortages</p>
          {loading ? (
            <div className="h-8 w-10 bg-white/5 animate-pulse rounded" />
          ) : (
            <h4 className={`text-xl font-bold tracking-tight ${metrics.stockAlertsCount > 0 ? "text-amber-400 animate-pulse" : "text-white"}`}>
              {metrics.stockAlertsCount} Alerts
            </h4>
          )}
          <p className="text-[9px] text-zinc-500 font-mono mt-2 flex items-center gap-1">
            <span className={metrics.stockAlertsCount > 0 ? "text-amber-400" : "text-emerald-500"}>●</span> Inventory tracking system
          </p>
        </GlassCard>
      </div>

      {/* ── MAIN DASHBOARD DETAILS SECTION ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Sourcing sales trend and funnel overview */}
        <div className="xl:col-span-2 space-y-6">
          <DashboardSalesOverview data={salesOverview} period={period} setPeriod={setPeriod} />
          <DashboardTaskBreakdown data={pipeline} />
        </div>

        {/* Right Column: AI Metrics, Inventory Status, and Notifications */}
        <div className="space-y-6">
          <DashboardQuoteConversion data={quoteConversion} />
          <DashboardInventoryAlerts alerts={inventoryAlerts} loading={loading} />
          <DashboardUrgentNotifications escalations={escalations} loading={loading} />
        </div>
      </div>
    </div>
  );
}
