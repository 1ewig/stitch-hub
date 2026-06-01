"use client";

import React from "react";
import Image from "next/image";
import type { Product } from "../../types";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  size: string;
  customNotes: string;
  minQty: number;
  currentQty: number;
  isApparel: boolean;
  setQuantity: (qty: number) => void;
  setSize: (sz: string) => void;
  setCustomNotes: (notes: string) => void;
  handleAddToCart: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  size,
  customNotes,
  minQty,
  currentQty,
  isApparel,
  setQuantity,
  setSize,
  setCustomNotes,
  handleAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 animate-scaleIn">
        {/* Left Side: Product Visuals */}
        <div className="relative aspect-square md:aspect-auto md:h-full bg-zinc-900 flex items-center justify-center overflow-hidden border-r border-zinc-900">
          <Image
            src={product.img}
            alt={product.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-sm border border-[#d4af37]/30 px-3 py-1 rounded-full text-xs font-bold text-[#d4af37]">
            {product.cat}
          </div>
        </div>

        {/* Right Side: Product Customizer */}
        <div className="p-6 md:p-8 flex flex-col justify-between h-full max-h-[85vh] overflow-y-auto">
          {/* Header & Close */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold font-display text-white">
                  {product.title}
                </h3>
                <p className="text-[#d4af37] font-semibold text-xs uppercase tracking-wider mt-1">
                  Sourcing MOQ: {minQty} units
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Sizes Selection (Only if Apparel/Performance) */}
            {isApparel && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Select Size
                </label>
                <div className="flex gap-2.5">
                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSize(sz)}
                      className={`h-10 w-12 rounded-lg border text-sm font-bold transition-all cursor-pointer ${
                        size === sz
                          ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Logo Upload Spec */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Branding Specifications
              </label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="E.g., Front chest logo print, metallic gold embroider detail on sleeve..."
                className="w-full h-20 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-[#d4af37] focus:outline-none resize-none"
              />
            </div>

            {/* B2B Sourcing Tier pricing discounts preview */}
            <div className="mb-6 bg-zinc-900/40 border border-zinc-900/80 rounded-xl p-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                Sourcing Volume Matrix
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-zinc-950 border border-zinc-900 rounded">
                  <p className="text-zinc-500">MOQ - 99</p>
                  <p className="font-semibold text-zinc-300">Standard Tier</p>
                </div>
                <div className="p-2 bg-zinc-950 border border-zinc-900 rounded">
                  <p className="text-zinc-500">100 - 249</p>
                  <p className="font-semibold text-emerald-400">High Volume Tier</p>
                </div>
                <div className="p-2 bg-zinc-950 border border-zinc-900 rounded">
                  <p className="text-zinc-500">250+</p>
                  <p className="font-semibold text-emerald-400">Enterprise Tier</p>
                </div>
              </div>
            </div>

            {/* Volume Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Configure Volume Units
                </label>
                <span className="text-xs font-medium text-zinc-500">
                  Min. Order Quantity (MOQ): {minQty}
                </span>
              </div>
              <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-2">
                <button
                  onClick={() => setQuantity(Math.max(minQty, currentQty - 10))}
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-950 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  disabled={currentQty <= minQty}
                >
                  -10
                </button>
                <span className="flex-1 text-center font-display font-bold text-white text-lg">
                  {currentQty} <span className="text-xs text-zinc-500">units</span>
                </span>
                <button
                  onClick={() => setQuantity(currentQty + 10)}
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-950 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  +10
                </button>
              </div>
            </div>
          </div>

          {/* Sourcing addition summary + Add */}
          <div className="border-t border-zinc-900 pt-6 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-zinc-500">Selected Quantity</p>
                <p className="text-lg font-bold text-white">
                  {currentQty} <span className="text-xs text-zinc-500 font-normal">units</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">Estimated Quote</p>
                <p className="text-[#d4af37] font-semibold text-xs uppercase tracking-wider mt-1">
                  Calculated on Submission
                </p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full relative group overflow-hidden px-8 py-4 rounded-full font-bold text-base text-black bg-gradient-to-r from-[#b38e20] via-[#ebd06f] to-[#b38e20] bg-[length:200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span>Add to Sourcing Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
