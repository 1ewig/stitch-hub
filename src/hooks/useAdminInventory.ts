"use client";

import { useState, useEffect, useCallback } from "react";

interface InventoryItem {
  id: number;
  productName: string;
  stockQuantity: number;
  reorderLevel: number;
}

export function useAdminInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  const [adjustments, setAdjustments] = useState<Record<number, { stock: string; reorder: string }>>({});
  const [generalMessage, setGeneralMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchInventory = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/inventory");
      if (res.ok) {
        const data = await res.json();
        setInventory(data.inventory || []);
        const initialAdjustments: Record<number, { stock: string; reorder: string }> = {};
        data.inventory?.forEach((item: InventoryItem) => {
          initialAdjustments[item.id] = {
            stock: String(item.stockQuantity),
            reorder: String(item.reorderLevel),
          };
        });
        setAdjustments(initialAdjustments);
      } else {
        setGeneralMessage({ type: "error", text: "Failed to load materials inventory." });
      }
    } catch (error) {
      console.error("Failed to load inventory:", error);
      setGeneralMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleUpdate = async (id: number) => {
    const adj = adjustments[id];
    if (!adj) return;

    const stockVal = parseInt(adj.stock, 10);
    const reorderVal = parseInt(adj.reorder, 10);

    if (isNaN(stockVal) || isNaN(reorderVal) || stockVal < 0 || reorderVal < 0) {
      alert("Please enter valid non-negative integer numbers for stock and reorder level.");
      return;
    }

    setSubmittingId(id);
    setGeneralMessage(null);

    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stockQuantity: stockVal, reorderLevel: reorderVal }),
      });

      if (res.ok) {
        setGeneralMessage({ type: "success", text: "Inventory successfully updated." });
        setInventory(prev =>
          prev.map(item =>
            item.id === id
              ? { ...item, stockQuantity: stockVal, reorderLevel: reorderVal }
              : item
          )
        );
      } else {
        const data = await res.json();
        setGeneralMessage({ type: "error", text: data.error || "Failed to update inventory." });
      }
    } catch {
      setGeneralMessage({ type: "error", text: "An error occurred during update." });
    } finally {
      setSubmittingId(null);
    }
  };

  const handleInputChange = (id: number, field: "stock" | "reorder", value: string) => {
    setAdjustments(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const clearMessage = () => setGeneralMessage(null);

  const totalStock = inventory.reduce((sum, item) => sum + item.stockQuantity, 0);
  const lowStockCount = inventory.filter(item => item.stockQuantity <= item.reorderLevel).length;

  return {
    inventory,
    loading,
    submittingId,
    adjustments,
    generalMessage,
    totalStock,
    lowStockCount,
    handleUpdate,
    handleInputChange,
    clearMessage,
  };
}
