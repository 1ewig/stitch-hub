"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { useAdminSupplierQuotes } from "@/hooks/useAdminSupplierQuotes";
import QuotesQueue from "@/components/admin/supplier-quote/QuotesQueue";
import QuotesConsole from "@/components/admin/supplier-quote/QuotesConsole";

export default function SupplierQuotesPage() {
  const {
    quotes,
    selectedQuote,
    setSelectedQuote,
    loading,
    processing,
    handleDecision,
    calculateMargin,
  } = useAdminSupplierQuotes();

  return (
    <div className="space-y-6 animate-fadeIn w-full">
      <AdminPageHeader 
        title="Supplier Quote Reviews" 
        subtitle="Evaluate bulk wholesale bids, check margins, and sync client order queues." 
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-[65vh]">
          
          {/* Supplier Quotes Left Queue List */}
          <QuotesQueue
            quotes={quotes}
            selectedQuote={selectedQuote}
            setSelectedQuote={setSelectedQuote}
            calculateMargin={calculateMargin}
          />

          {/* Supplier Quotes Right Details Console */}
          <QuotesConsole
            selectedQuote={selectedQuote}
            calculateMargin={calculateMargin}
            handleDecision={handleDecision}
            processing={processing}
          />
          
        </div>
      )}
    </div>
  );
}
