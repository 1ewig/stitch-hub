"use client";

import React from "react";

interface QuoteSupplierInfoProps {
  supplierName: string;
  estimatedDeliveryDays: number;
}

export default function QuoteSupplierInfo({ supplierName, estimatedDeliveryDays }: QuoteSupplierInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Supplier Profile</h3>
        <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1 text-xs">
          <p className="text-white font-bold">{supplierName}</p>
          <p className="text-zinc-400 font-mono">Matches client specifications</p>
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Delivery Schedule</h3>
        <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-1 text-xs">
          <p className="text-white font-bold">{estimatedDeliveryDays} Days to Warehouse</p>
          <p className="text-zinc-400 font-mono">Fulfillment Lead Time Estimate</p>
        </div>
      </div>
    </div>
  );
}
