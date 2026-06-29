"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import type { QuoteConversion } from "@/hooks/useAdminDashboard";

interface DashboardQuoteConversionProps {
  data: QuoteConversion;
}

export default function DashboardQuoteConversion({ data }: DashboardQuoteConversionProps) {
  const dashArray = `${data.sentByAiPct}, ${100 - data.sentByAiPct}`;

  return (
    <GlassCard className="p-6">
      <h3 className="text-sm font-bold text-zinc-300 mb-6">Quote Conversion</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative h-40 flex items-center justify-center drop-shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
            <path className="text-[#d4af37]" strokeDasharray={dashArray} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
          </svg>
          <div className="absolute text-center flex flex-col items-center">
            <p className="text-3xl font-bold text-white drop-shadow-md">{data.sentByAiPct}%</p>
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1">Sent by AI</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Conversion Rate</p>
              <p className="text-lg font-bold text-white">{data.conversionRate}%</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.1)]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Human Handoffs</p>
              <p className="text-lg font-bold text-white">{data.humanHandoffsPct}%</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
