"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import EmptyState from "@/components/admin/EmptyState";
import type { EscalationLog } from "@/hooks/useAdminApprovals";

interface ApprovalsQueueProps {
  tickets: EscalationLog[];
  filteredTickets: EscalationLog[];
  selectedTicket: EscalationLog | null;
  setSelectedTicket: (t: EscalationLog | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  statusFilters: { label: string; value: string }[];
}

export default function ApprovalsQueue({
  tickets,
  filteredTickets,
  selectedTicket,
  setSelectedTicket,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  statusFilters,
}: ApprovalsQueueProps) {
  return (
    <GlassCard className="p-6 h-full flex flex-col overflow-hidden" glow>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-bold text-zinc-300 font-display">Awaiting Review</h3>
        <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-full">
          {filteredTickets.length} / {tickets.length}
        </span>
      </div>

      {/* Search Bar & Dropdown Filter */}
      <div className="flex gap-2 mb-4 shrink-0">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search subject or body..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/5 focus:border-[#d4af37]/45 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none placeholder-zinc-500 transition-all font-sans"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-white"
            >
              <span className="text-xs">✕</span>
            </button>
          )}
        </div>

        <div className="relative w-40 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-black/40 border border-white/5 focus:border-[#d4af37]/45 rounded-xl px-3 py-2.5 pr-8 text-xs text-zinc-200 focus:outline-none transition-all font-mono uppercase cursor-pointer appearance-none"
          >
            {statusFilters.map((filter) => (
              <option key={filter.value} value={filter.value} className="bg-[#090a0f] text-zinc-300">
                {filter.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
            <span className="text-[9px]">▼</span>
          </div>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <EmptyState message="Queue completely clear. No active interventions required." />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin">
          {filteredTickets.map((t) => {
            const isSelected = selectedTicket?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`p-4 bg-black/40 border border-white/5 rounded-xl cursor-pointer transition-all flex flex-col gap-2 ${
                  isSelected
                    ? "bg-white/[0.08] border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase ${
                    (t.status === "review_required" || t.status === "escalated" || t.status === "review required")
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20"
                  }`}>
                    {(t.status === "review_required" || t.status === "escalated" || t.status === "review required") ? "Intercept" : "Active"}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white truncate">{t.subject}</h4>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                    {t.body || "No initial metadata prompt declared."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
