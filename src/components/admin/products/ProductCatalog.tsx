"use client";

import React from "react";
import Image from "next/image";
import GlassCard from "@/components/admin/GlassCard";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import EmptyState from "@/components/admin/EmptyState";
import type { Product } from "@/types";

interface ProductCatalogProps {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  categoryFilters: { label: string; value: string }[];
  handleEditClick: (product: Product) => void;
  handleDeleteClick: (productId: string) => void;
}

export default function ProductCatalog({
  products,
  filteredProducts,
  loading,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categoryFilters,
  handleEditClick,
  handleDeleteClick,
}: ProductCatalogProps) {
  return (
    <GlassCard className="p-6 h-full flex flex-col overflow-hidden" glow>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-bold text-zinc-300 font-display">Product Catalog</h3>
        <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-400 px-2 py-0.5 rounded-full">
          {filteredProducts.length} / {products.length}
        </span>
      </div>

      {/* Search Bar & Dropdown Filter */}
      <div className="flex gap-2 mb-4 shrink-0">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/5 focus:border-[#d4af37]/45 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none placeholder-zinc-500 transition-all font-sans"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-white"
            >
              <span className="text-xs">✕</span>
            </button>
          )}
        </div>

        <div className="relative w-40 shrink-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-black/40 border border-white/5 focus:border-[#d4af37]/45 rounded-xl px-3 py-2.5 pr-8 text-xs text-zinc-200 focus:outline-none transition-all font-mono uppercase cursor-pointer appearance-none"
          >
            {categoryFilters.map((filter) => (
              <option key={filter.value} value={filter.value} className="bg-[#090a0f] text-zinc-300">
                {filter.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
            <span className="text-[9px]">▼</span>
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex-1 flex justify-center items-center">
          <EmptyState message="No products found. Use the panel on the left to add your first product." />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 relative z-10 space-y-3 scrollbar-thin">
          <div className="flex flex-col gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition-all flex gap-4 relative group">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEditClick(product)} title="Edit Product"
                    className="p-1.5 bg-white/5 border border-white/10 hover:bg-[#d4af37]/20 hover:border-[#d4af37]/40 rounded-lg text-zinc-300 hover:text-[#d4af37] transition-all cursor-pointer">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button onClick={() => handleDeleteClick(product.id)} title="Delete Product"
                    className="p-1.5 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 rounded-lg text-zinc-300 hover:text-red-400 transition-all cursor-pointer">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="h-16 w-16 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shrink-0">
                  <Image src={product.img} alt={product.title} width={64} height={64} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider bg-[#d4af37]/10 px-2 py-0.5 rounded-full">{product.cat}</span>
                  <h4 className="text-xs font-bold text-white mt-1.5 truncate pr-14">{product.title}</h4>
                  <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-zinc-400">
                    <span>Minimum: {product.moq} units</span>
                    <span className="text-white font-bold">{product.priceRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
}
