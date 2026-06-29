"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";

interface InventoryItem {
  id: number;
  productName: string;
  stockQuantity: number;
  reorderLevel: number;
}

interface InventoryMetricsProps {
  inventory: InventoryItem[];
  totalStock: number;
  lowStockCount: number;
}

export default function InventoryMetrics({ inventory, totalStock, lowStockCount }: InventoryMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GlassCard className="p-5 flex flex-col space-y-1">
        <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">Total Categories</span>
        <p className="text-2xl font-bold text-white font-mono">{inventory.length}</p>
        <span className="text-[9px] text-zinc-400">Core manufacturing items tracked</span>
      </GlassCard>

      <GlassCard className="p-5 flex flex-col space-y-1">
        <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">Aggregate Blanks Stock</span>
        <p className="text-2xl font-bold text-white font-mono">{totalStock}</p>
        <span className="text-[9px] text-zinc-400">Total units available across all categories</span>
      </GlassCard>

      <GlassCard
        className={`p-5 flex flex-col space-y-1 border ${
          lowStockCount > 0 ? "border-amber-500/30 bg-amber-500/5" : ""
        }`}
      >
        <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">Low Stock Warnings</span>
        <p className={`text-2xl font-bold font-mono ${lowStockCount > 0 ? "text-amber-400" : "text-emerald-400"}`}>
          {lowStockCount}
        </p>
        <span className="text-[9px] text-zinc-400">Items at or below reorder threshold levels</span>
      </GlassCard>
    </div>
  );
}
