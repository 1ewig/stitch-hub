"use client";

import React from "react";
import { useAdminApprovals } from "@/hooks/useAdminApprovals";
import ApprovalsQueue from "@/components/admin/approval/ApprovalsQueue";
import ApprovalsConsole from "@/components/admin/approval/ApprovalsConsole";

export default function AdminApprovalsPage() {
  const {
    tickets,
    selectedTicket,
    setSelectedTicket,
    editableResponse,
    setEditableResponse,
    unitPrice,
    totalPrice,
    loading,
    processing,
    getQuantity,
    handleUnitPriceChange,
    handleTotalPriceChange,
    handleProcessDecision,
    chatHistory,
  } = useAdminApprovals();

  if (loading) {
    return (
      <div className="text-xs font-mono text-zinc-500 text-center py-24 animate-pulse">
        Synchronizing Operational Escalation Ledger Threads...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      <div>
        <h2 className="text-2xl font-bold text-white font-display tracking-tight">Escalated Approvals Queue</h2>
        <p className="text-xs text-zinc-400 mt-1">Review raw agent logic, manipulate dynamic variables, and execute human overrides.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Approvals Left Console (2/3 width) */}
        <div className="lg:col-span-8 flex flex-col h-[780px]">
          <ApprovalsConsole
            selectedTicket={selectedTicket}
            editableResponse={editableResponse}
            setEditableResponse={setEditableResponse}
            unitPrice={unitPrice}
            totalPrice={totalPrice}
            getQuantity={getQuantity}
            handleUnitPriceChange={handleUnitPriceChange}
            handleTotalPriceChange={handleTotalPriceChange}
            handleProcessDecision={handleProcessDecision}
            processing={processing}
            chatHistory={chatHistory}
          />
        </div>

        {/* Approvals Right Queue (1/3 width) */}
        <div className="lg:col-span-4 flex flex-col h-[780px]">
          <ApprovalsQueue
            tickets={tickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
          />
        </div>
        
      </div>
    </div>
  );
}