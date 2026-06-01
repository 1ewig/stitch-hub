"use client";

import React from "react";
import { CartItem } from "../../hooks/useCart";

interface CheckoutSidebarProps {
  cart: CartItem[];
  isSubmitting: boolean;
  isSuccess: boolean;
  handleSubmit: () => void;
}

export default function CheckoutSidebar({
  cart,
  isSubmitting,
  isSuccess,
  handleSubmit,
}: CheckoutSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Metallic Shiny Gold Button */}
      <button
        disabled={isSubmitting || isSuccess || cart.length === 0}
        onClick={handleSubmit}
        className="w-full relative group overflow-hidden px-8 py-4 rounded-full font-bold text-base text-black bg-gradient-to-r from-[#b38e20] via-[#ebd06f] to-[#b38e20] bg-[length:200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.4)] disabled:opacity-40 cursor-pointer"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Analysing Sourcing Specs...</span>
          </div>
        ) : (
          <>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span>Generate Agentic Sales Response</span>
          </>
        )}
      </button>

      {/* AI suggestions card */}
      <div className="bg-[#121418] border border-zinc-900 rounded-xl p-5 space-y-3.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          AI Sourcing Suggestions
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="text-[#d4af37] font-medium hover:underline cursor-pointer flex items-center gap-2">
            <span>✦</span> Draft custom follow-up worksheet
          </li>
          <li className="text-[#d4af37] font-medium hover:underline cursor-pointer flex items-center gap-2">
            <span>✦</span> Upsell suggestions (insulated flasks, minimal wallets)
          </li>
        </ul>
      </div>

      {/* Order Details summary card */}
      <div className="bg-[#121418] border border-zinc-900 rounded-xl p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Sourcing Specifications
        </h4>
        {cart.length === 0 ? (
          <p className="text-sm text-zinc-500 italic">No products added in sourcing list.</p>
        ) : (
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm border-b border-zinc-900 pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-bold text-white text-xs">{item.product.title}</p>
                  <p className="text-[10px] text-zinc-500">Size: {item.size || "Standard"}</p>
                </div>
                <span className="text-xs font-semibold text-zinc-300">{item.quantity} units</span>
              </div>
            ))}
          </div>
        )}
        <div className="border-t border-zinc-900 pt-3 flex justify-between items-center text-xs text-zinc-400">
          <span>Client Company</span>
          <span className="font-semibold text-white">Stitch Hub Corporate Inc.</span>
        </div>
        <div className="flex justify-between items-center text-xs text-zinc-400">
          <span>Sourcing Status</span>
          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            Draft Sourcing
          </span>
        </div>
      </div>

      {/* Attached Assets AI-parsed */}
      <div className="bg-[#121418] border border-zinc-900 rounded-xl p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Attached Sourcing Assets (AI-Parsed)
        </h4>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-2.5 bg-[#0e0f12] rounded-lg border border-zinc-900 text-xs">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span className="text-zinc-300 font-medium">brand_sourcing_layout_v1.png</span>
            </div>
            <span className="text-[10px] text-zinc-600 uppercase font-bold">Image</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[#0e0f12] rounded-lg border border-zinc-900 text-xs">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span className="text-zinc-300 font-medium">bulk_volume_specs.xlsx</span>
            </div>
            <span className="text-[10px] text-zinc-600 uppercase font-bold">Sheet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
