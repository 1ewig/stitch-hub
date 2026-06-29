"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";

interface InventoryItem {
  id: number;
  productName: string;
  stockQuantity: number;
  reorderLevel: number;
}

interface InventoryTableProps {
  inventory: InventoryItem[];
  submittingId: number | null;
  adjustments: Record<number, { stock: string; reorder: string }>;
  onInputChange: (id: number, field: "stock" | "reorder", value: string) => void;
  onUpdate: (id: number) => void;
}

function getStatusBadge(item: InventoryItem) {
  const isDepleted = item.stockQuantity === 0;
  const isLow = item.stockQuantity <= item.reorderLevel;

  if (isDepleted) {
    return {
      label: "Depleted",
      className: "bg-red-500/10 text-red-400 border border-red-500/20",
    };
  }
  if (isLow) {
    return {
      label: "Low Stock",
      className: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    };
  }
  return {
    label: "In Stock",
    className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  };
}

function StepperInput({
  value,
  onChange,
  onStep,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  onStep: (delta: number) => void;
  className?: string;
}) {
  return (
    <div className="flex items-center bg-black/40 border border-white/10 rounded overflow-hidden">
      <button
        type="button"
        onClick={() => onStep(-1)}
        className="px-1.5 py-1 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold cursor-pointer"
      >
        −
      </button>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-14 text-center font-mono font-bold bg-transparent border-x border-white/10 py-1 text-xs focus:outline-none ${className || "text-white"}`}
      />
      <button
        type="button"
        onClick={() => onStep(1)}
        className="px-1.5 py-1 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

export default function InventoryTable({
  inventory,
  submittingId,
  adjustments,
  onInputChange,
  onUpdate,
}: InventoryTableProps) {
  const handleStep = (id: number, field: "stock" | "reorder", delta: number) => {
    const current = parseInt(adjustments[id]?.[field] || "0", 10);
    const next = Math.max(0, current + delta);
    onInputChange(id, field, String(next));
  };

  return (
    <GlassCard className="p-6">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
              <th className="pb-3 font-semibold">Raw Material Title</th>
              <th className="pb-3 font-semibold text-center">Status</th>
              <th className="pb-3 font-semibold text-center">Stock Count</th>
              <th className="pb-3 font-semibold text-center">Reorder Trigger</th>
              <th className="pb-3 font-semibold text-right">Quick Inventory Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {inventory.map(item => {
              const badge = getStatusBadge(item);

              return (
                <tr key={item.id} className="text-xs text-zinc-200">
                  <td className="py-4 pr-4 font-semibold text-white">{item.productName}</td>
                  <td className="py-4 text-center">
                    <span
                      className={`inline-block text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-4 text-center font-mono font-bold text-sm">{item.stockQuantity}</td>
                  <td className="py-4 text-center font-mono text-zinc-400">{item.reorderLevel}</td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase">Stock:</span>
                        <StepperInput
                          value={adjustments[item.id]?.stock ?? "0"}
                          onChange={v => onInputChange(item.id, "stock", v)}
                          onStep={d => handleStep(item.id, "stock", d)}
                          className="text-white"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase">Alert At:</span>
                        <StepperInput
                          value={adjustments[item.id]?.reorder ?? "0"}
                          onChange={v => onInputChange(item.id, "reorder", v)}
                          onStep={d => handleStep(item.id, "reorder", d)}
                          className="text-zinc-400"
                        />
                      </div>
                      <button
                        disabled={submittingId === item.id}
                        onClick={() => onUpdate(item.id)}
                        className="px-3 py-1 rounded bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/35 hover:border-[#d4af37]/65 text-[#d4af37] text-[10px] font-bold font-mono uppercase tracking-wider transition-all disabled:opacity-50"
                      >
                        {submittingId === item.id ? "Syncing..." : "Update"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
