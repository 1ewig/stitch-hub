"use client";

import React from "react";

interface QuoteRequisitionSpecsProps {
  items: any;
}

export default function QuoteRequisitionSpecs({ items }: QuoteRequisitionSpecsProps) {
  return (
    <div>
      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 font-mono">Requisition Specifications</h3>
      <div className="space-y-2 bg-black/20 border border-white/5 p-4 rounded-xl max-h-[160px] overflow-y-auto font-sans">
        {items && Array.isArray(items) && items.length > 0 ? (
          items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
              <div>
                <span className="font-bold text-zinc-200">{item.product?.title || "Custom Product"}</span>
                <span className="text-zinc-500 ml-2">({item.size || "Standard"}, {item.color || "Default"})</span>
              </div>
              <span className="font-mono text-zinc-400">{item.quantity} units</span>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 italic text-xs">No specifications parsed.</p>
        )}
      </div>
    </div>
  );
}
