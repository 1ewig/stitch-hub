"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { useAdminInventory } from "@/hooks/useAdminInventory";
import InventoryMetrics from "@/components/admin/inventory/InventoryMetrics";
import InventoryTable from "@/components/admin/inventory/InventoryTable";

export default function AdminInventoryPage() {
  const {
    inventory,
    loading,
    submittingId,
    adjustments,
    generalMessage,
    totalStock,
    lowStockCount,
    handleUpdate,
    handleInputChange,
  } = useAdminInventory();

  return (
    <div className="space-y-6 animate-fadeIn w-full">
      <AdminPageHeader
        title="Materials Stock Control"
        subtitle="Manage blank raw materials, track stock levels, and set custom reorder warning thresholds."
      />

      {generalMessage && (
        <div
          className={`p-4 rounded-xl text-xs border ${
            generalMessage.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}
        >
          {generalMessage.text}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-6">
          <InventoryMetrics
            inventory={inventory}
            totalStock={totalStock}
            lowStockCount={lowStockCount}
          />
          <InventoryTable
            inventory={inventory}
            submittingId={submittingId}
            adjustments={adjustments}
            onInputChange={handleInputChange}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}
