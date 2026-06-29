"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { useAdminSupplierQuotes } from "@/hooks/useAdminSupplierQuotes";
import QuotesQueue from "@/components/admin/supplier-quote/QuotesQueue";
import QuotesConsole from "@/components/admin/supplier-quote/QuotesConsole";

const statusFilters = [
  { label: "All Quotes", value: "all" },
  { label: "Under Review", value: "under review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

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

  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const filteredQuotes = React.useMemo(() => {
    return quotes.filter((q) => {
      const qry = searchTerm.toLowerCase();
      const matchesSearch =
        q.orderId.toLowerCase().includes(qry) ||
        q.supplierName.toLowerCase().includes(qry) ||
        (q.clientSubject || "").toLowerCase().includes(qry);
      const matchesStatus =
        statusFilter === "all" || q.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [quotes, searchTerm, statusFilter]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      <AdminPageHeader 
        title="Supplier Quote Reviews" 
        subtitle="Evaluate bulk wholesale bids, check margins, and sync client order queues." 
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Supplier Quotes Left Details Console (2/3 width) */}
          <div className="lg:col-span-8 flex flex-col h-[calc(100vh-175px)] min-h-[580px]">
            <QuotesConsole
              selectedQuote={selectedQuote}
              calculateMargin={calculateMargin}
              handleDecision={handleDecision}
              processing={processing}
            />
          </div>

          {/* Supplier Quotes Right Queue List (1/3 width) */}
          <div className="lg:col-span-4 flex flex-col h-[calc(100vh-175px)] min-h-[580px]">
            <QuotesQueue
              quotes={quotes}
              filteredQuotes={filteredQuotes}
              selectedQuote={selectedQuote}
              setSelectedQuote={setSelectedQuote}
              calculateMargin={calculateMargin}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              statusFilters={statusFilters}
            />
          </div>
          
        </div>
      )}
    </div>
  );
}
