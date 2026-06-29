"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import InboxQueue from "@/components/admin/order/InboxQueue";
import ConversationCenter from "@/components/admin/order/ConversationCenter";
import SpecificationsModal from "@/components/admin/order/SpecificationsModal";

const statusFilters = [
  { label: "All Orders", value: "all" },
  { label: "Review Required", value: "review required" },
  { label: "Sourcing Drafts", value: "draft sourcing" },
  { label: "Approved", value: "approved" },
  { label: "Processing", value: "processing" },
  { label: "Shipping", value: "shipping" },
  { label: "Delivered", value: "delivered" },
];

export default function AdminOrdersPage() {
  const {
    orders, loading, selectedOrder, updatingId,
    quoteValue, isEditingQuote,
    messages, threadId, agentOverride, chatLoading, adminMessage,
    setQuoteValue, setIsEditingQuote, setAdminMessage,
    handleSelectOrder, handleUpdateStatus, handleUpdateQuote,
    toggleTakeover, sendAdminMessage,

    // Supplier state and mutation functions from the refactored hook
    supplierMessages, supplierChatText, supplierChatLoading, supplierStatusMessage,
    setSupplierChatText, sendSupplierMessage,
  } = useAdminOrders();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [isSpecsOpen, setIsSpecsOpen] = React.useState(false);
  const [activeDetailTab, setActiveDetailTab] = React.useState<"details" | "supplier">("details");

  // Reset modal when order switches
  React.useEffect(() => {
    setIsSpecsOpen(false);
  }, [selectedOrder]);

  // Filter orders based on search input and status filter chips
  const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.user?.email || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      <AdminPageHeader title="Orders Desk" subtitle="Review active requisitions, manage customer threads, and sync with suppliers." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ── LEFT COLUMN: LARGE DETAILS WORKSPACE (8 COLS) ── */}
        <div className="lg:col-span-8 flex flex-col h-[780px]">
          {selectedOrder ? (
            <ConversationCenter
              selectedOrder={selectedOrder}
              activeDetailTab={activeDetailTab}
              setActiveDetailTab={setActiveDetailTab}
              messages={messages}
              chatLoading={chatLoading}
              agentOverride={agentOverride}
              toggleTakeover={toggleTakeover}
              adminMessage={adminMessage}
              setAdminMessage={setAdminMessage}
              sendAdminMessage={sendAdminMessage}
              supplierMessages={supplierMessages}
              supplierChatText={supplierChatText}
              setSupplierChatText={setSupplierChatText}
              supplierChatLoading={supplierChatLoading}
              supplierStatusMessage={supplierStatusMessage}
              sendSupplierMessage={sendSupplierMessage}
              setIsSpecsOpen={setIsSpecsOpen}
            />
          ) : (
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl h-full flex flex-col justify-center items-center text-zinc-500 text-xs py-20">
              Select an order from the right inbox queue to open the workspace.
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: ORDERS INBOX (4 COLS) ── */}
        <div className="lg:col-span-4 flex flex-col h-[780px]">
          <InboxQueue
            orders={orders}
            filteredOrders={filteredOrders}
            selectedOrder={selectedOrder}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            handleSelectOrder={handleSelectOrder}
            statusFilters={statusFilters}
          />
        </div>

      </div>

      {/* ── SPECIFICATIONS MODAL ── */}
      {selectedOrder && (
        <SpecificationsModal
          selectedOrder={selectedOrder}
          isSpecsOpen={isSpecsOpen}
          setIsSpecsOpen={setIsSpecsOpen}
          updatingId={updatingId}
          handleUpdateStatus={handleUpdateStatus}
          isEditingQuote={isEditingQuote}
          setIsEditingQuote={setIsEditingQuote}
          quoteValue={quoteValue}
          setQuoteValue={setQuoteValue}
          handleUpdateQuote={handleUpdateQuote}
        />
      )}
    </div>
  );
}
