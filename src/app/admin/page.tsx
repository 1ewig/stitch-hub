"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import DashboardSalesOverview from "@/components/admin/dashboard/DashboardSalesOverview";
import DashboardQuoteConversion from "@/components/admin/dashboard/DashboardQuoteConversion";
import DashboardTaskBreakdown from "@/components/admin/dashboard/DashboardTaskBreakdown";
import DashboardUrgentNotifications from "@/components/admin/dashboard/DashboardUrgentNotifications";

export default function AdminDashboardPage() {
  const { salesOverview, quoteConversion, taskBreakdown, escalations, loading } = useAdminDashboard();

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      <AdminPageHeader title="Admin Dashboard" subtitle="Overview of sales, orders, and system activity.">
        <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">
          Export Report
        </button>
        <button className="bg-[#d4af37] text-[#090a0f] px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-[#bfa032] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)] font-mono uppercase tracking-wider">
          Manage Agents
        </button>
      </AdminPageHeader>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <DashboardSalesOverview data={salesOverview} />
          <DashboardQuoteConversion data={quoteConversion} />
        </div>

        <div className="space-y-6">
          <DashboardTaskBreakdown data={taskBreakdown} />
          <DashboardUrgentNotifications escalations={escalations} loading={loading} />
        </div>
      </div>
    </div>
  );
}
