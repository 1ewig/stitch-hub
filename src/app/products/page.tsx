"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import LandingFooter from "../../components/landing/LandingFooter";
import ProductDetailModal from "../../components/ProductDetailModal";
import { Product } from "../../hooks/useCart";

import { catalog } from "../../data/products";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filters & Sorting logic
  const filteredProducts = catalog
    .filter((product) => {
      const matchCat =
        selectedCategory === "All" || product.cat === selectedCategory;
      const matchSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.title.localeCompare(b.title);
      return 0;
    });

  const categories = ["All", "Apparel", "Drinkware", "Performance", "Accessories"];

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Navigation Header */}
      <Header />

      {/* Main Container */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Page title with nice gradient accent */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-white">
            B2B Sourcing <span className="text-[#d4af37]">Directory</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm md:text-base max-w-xl">
            Choose high-end customizable baseline materials. Optimize pricing via direct volume discount brackets computed in real-time.
          </p>
        </div>

        {/* Dynamic Filters Area */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-zinc-900 pb-8 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#d4af37] text-black font-black shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Panel */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:border-[#d4af37] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2.5 pr-10 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none cursor-pointer"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <svg className="h-12 w-12 text-zinc-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-zinc-500 font-medium">No sourcing matches found.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-2 text-sm text-[#d4af37] hover:underline font-semibold cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, i) => (
              <div
                key={i}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-[4/5] bg-zinc-900 rounded-2xl mb-4 overflow-hidden border border-zinc-900 group-hover:border-[#d4af37]/40 transition-colors flex items-center justify-center relative shadow-sm">
                    <Image
                      src={product.img}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <span className="bg-[#d4af37] text-black text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Quick Sourcing Spec
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold group-hover:text-[#d4af37] transition-colors leading-snug">
                      {product.title}
                    </h4>
                    <span className="text-[#d4af37] font-semibold text-sm">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900/60 pt-3">
                  <span>Category: {product.cat}</span>
                  <span>Min Qty: {product.moq}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <LandingFooter />

      {/* Product Sourcing Spec modal overlay */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
