"use client";

import React from "react";
import OrderCenter from "../../components/sections/OrderCenter";
import PipelineGrid from "../../components/sections/PipelineGrid";
import StitchAlerts from "../../components/sections/StitchAlerts";
import AssemblyGoal from "../../components/sections/AssemblyGoal";
import LineLeaderboard from "../../components/sections/LineLeaderboard";
import YieldAnalytics from "../../components/sections/YieldAnalytics";
import { useProductionData } from "../../hooks/useProductionData";

export default function DashboardPage() {
  // Activate simulated real-time updates (8000ms intervals)
  const { yieldStats, isLoading } = useProductionData();

  return (
    <div className="space-y-6">
      {/* Top Banner section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-neutral-200 rounded-lg p-6 relative overflow-hidden">
        {/* Decorative subtle visual pattern background */}
        <span className="absolute top-0 right-0 w-48 h-48 bg-primary-50 rounded-full blur-2xl transform translate-x-12 -translate-y-12" />

        <div className="relative">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
            Operational Overview
          </h1>
          <p className="text-sm text-neutral-500 font-medium mt-1">
            Manufacturing cell output stand, pipeline volumes, and active marketing outreach.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          <span className="flex h-3.5 w-3.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest leading-none">
            Live Feed Active
          </span>
        </div>
      </div>

      {/* Main Asymmetric Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Primary Columns: Core Analytics and Pipelines */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 3: Sales Command Center metrics */}
          <OrderCenter />

          {/* Section 4: Pipeline Overview */}
          <PipelineGrid />

          {/* Side-by-side secondary grid for alerts and daily efficiency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 5: AI Smart Alerts */}
            <StitchAlerts />

            {/* Section 6: Yield Analytics (Email & Call Stats) */}
            <YieldAnalytics />
          </div>
        </div>

        {/* Right / Secondary Sidebar Column: Long term goals and STAND stands */}
        <div className="lg:col-span-1 space-y-6">
          {/* Section 7: Goal Tracker (Weekly Garment Count) */}
          <AssemblyGoal />

          {/* Section 8: Production Team Leaderboard stands */}
          <LineLeaderboard />
        </div>
      </div>
    </div>
  );
}
