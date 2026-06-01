"use client";

import React from "react";
import Header from "../../components/Header";
import LandingFooter from "../../components/landing/LandingFooter";
import ProductFilters from "../../components/products/ProductFilters";
import ProductCard from "../../components/products/ProductCard";
import ProductDetailModal from "../../components/products/ProductDetailModal";
import { catalog } from "../../data/products";
import { useProductFilterStore, getFilteredProducts, CATEGORIES } from "../../stores/product-filter-store";

export default function ProductsPage() {
  const selectedCategory = useProductFilterStore((s) => s.selectedCategory);
  const setSelectedCategory = useProductFilterStore((s) => s.setSelectedCategory);
  const searchQuery = useProductFilterStore((s) => s.searchQuery);
  const setSearchQuery = useProductFilterStore((s) => s.setSearchQuery);
  const sortBy = useProductFilterStore((s) => s.sortBy);
  const setSortBy = useProductFilterStore((s) => s.setSortBy);
  const selectedProduct = useProductFilterStore((s) => s.selectedProduct);
  const setSelectedProduct = useProductFilterStore((s) => s.setSelectedProduct);
  const clearFilters = useProductFilterStore((s) => s.clearFilters);

  const filteredProducts = getFilteredProducts(catalog, selectedCategory, searchQuery, sortBy);

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
        <ProductFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={CATEGORIES}
        />

        {/* Results grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <svg
              className="h-12 w-12 text-zinc-700 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-zinc-500 font-medium">No sourcing matches found.</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-sm text-[#d4af37] hover:underline font-semibold cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
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
