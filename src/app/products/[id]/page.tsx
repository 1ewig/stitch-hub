"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import LandingFooter from "../../../components/landing/LandingFooter";
import { useProductDetailPage } from "../../../hooks/useProductDetailPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { product, notFound, detail } = useProductDetailPage(id);

  if (notFound) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between font-sans">
        <section className="py-24 text-center max-w-xl mx-auto px-6">
          <svg
            className="h-16 w-16 text-zinc-700 mx-auto mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-3xl font-bold font-display mb-4">Product Not Found</h2>
          <p className="text-zinc-500 mb-8">
            The requested baseline item is either discontinued or does not exist in our sourcing directory.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 rounded-full bg-[#d4af37] text-black font-bold hover:bg-[#b38e20] transition-colors"
          >
            Back to Directory
          </Link>
        </section>
        <LandingFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Breadcrumbs & Back Link */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <Link
          href="/products"
          className="inline-flex items-center text-zinc-400 hover:text-[#d4af37] transition-colors group mb-6 text-sm font-semibold"
        >
          <svg
            className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Directory
        </Link>
      </div>

      {/* Main Container */}
      <section className="py-8 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left Side: Sticky Product Visuals (aspect-square) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="relative aspect-square w-full bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-900 shadow-xl flex items-center justify-center">
              <Image
                src={product.img}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute top-6 left-6 bg-zinc-950/80 backdrop-blur-sm border border-[#d4af37]/30 px-4 py-1.5 rounded-full text-xs font-bold text-[#d4af37] tracking-wider uppercase">
                {product.cat}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Product Customizer & Details */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-3xl backdrop-blur-md">
            {/* Title & Specs Header */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-2 leading-tight">
                {product.title}
              </h1>
              <p className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
                Sourcing MOQ: {detail.minQty} units
              </p>
            </div>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Customization Details */}
            {product.customization && (
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Eligible Customization Methods
                </label>
                <div className="text-sm font-semibold text-zinc-300 bg-zinc-900/80 rounded-xl px-4 py-3 border border-zinc-800/80">
                  {product.customization}
                </div>
              </div>
            )}

            {/* Sizes Selection (Only if Apparel/Performance) */}
            {detail.isApparel && (
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {["S", "M", "L", "XL", "XXL"].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => detail.setSize(sz)}
                      className={`h-11 w-14 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                        detail.size === sz
                          ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                          : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* B2B Sourcing Tier pricing discounts preview */}
            <div className="mb-8 bg-zinc-950/60 border border-zinc-900/80 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Sourcing Volume Matrix
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-2.5 bg-zinc-900/40 border border-zinc-900 rounded-xl">
                  <p className="text-zinc-500 mb-1">MOQ - 99</p>
                  <p className="font-semibold text-zinc-300">Standard Tier</p>
                </div>
                <div className="p-2.5 bg-zinc-900/40 border border-zinc-900 rounded-xl">
                  <p className="text-zinc-500 mb-1">100 - 249</p>
                  <p className="font-semibold text-emerald-400">10% Discount</p>
                </div>
                <div className="p-2.5 bg-zinc-900/40 border border-zinc-900 rounded-xl">
                  <p className="text-zinc-500 mb-1">250+</p>
                  <p className="font-semibold text-emerald-400">15% Discount</p>
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
                  Min. Order Quantity (MOQ): {detail.minQty}
                </span>
              </div>
              <div className="flex items-center gap-4 bg-zinc-950/80 border border-zinc-900 rounded-2xl p-2.5">
                <button
                  onClick={() => detail.setQuantity(Math.max(detail.minQty, detail.currentQty - 10))}
                  className="h-11 w-11 flex items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={detail.currentQty <= detail.minQty}
                >
                  -10
                </button>
                <span className="flex-1 text-center font-display font-bold text-white text-lg">
                  {detail.currentQty} <span className="text-xs text-zinc-500">units</span>
                </span>
                <button
                  onClick={() => detail.setQuantity(detail.currentQty + 10)}
                  className="h-11 w-11 flex items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  +10
                </button>
              </div>
            </div>

            {/* Sourcing addition summary + Add */}
            <div className="border-t border-zinc-900 pt-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs text-zinc-500">Selected Quantity</p>
                  <p className="text-xl font-bold text-white">
                    {detail.currentQty} <span className="text-xs text-zinc-500 font-normal">units</span>
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
                onClick={detail.handleAddToCart}
                className="w-full relative group overflow-hidden px-8 py-4 rounded-full font-bold text-base text-black bg-linear-to-r from-[#b38e20] via-[#ebd06f] to-[#b38e20] bg-size-[200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] cursor-pointer"
              >
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span>Add to Sourcing Cart</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </main>
  );
}
