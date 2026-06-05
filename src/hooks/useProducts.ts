"use client";

// ─────────────────────────────────────────────────────────────
// useProducts — Catalog filtering / sorting via product-filter-store selectors
// ─────────────────────────────────────────────────────────────

import { useProductFilterStore, getFilteredProducts, CATEGORIES } from "../stores/product-filter-store";
import { catalog } from "../data/products";

/**
 * Wires individual store selectors for category, search query, and sort order,
 * derives filteredProducts from the catalog, and returns everything a product grid needs.
 */
export function useProducts() {
  const selectedCategory = useProductFilterStore((s) => s.selectedCategory);
  const setSelectedCategory = useProductFilterStore((s) => s.setSelectedCategory);
  const searchQuery = useProductFilterStore((s) => s.searchQuery);
  const setSearchQuery = useProductFilterStore((s) => s.setSearchQuery);
  const sortBy = useProductFilterStore((s) => s.sortBy);
  const setSortBy = useProductFilterStore((s) => s.setSortBy);
  const clearFilters = useProductFilterStore((s) => s.clearFilters);

  // Derive the filtered/sorted list from raw catalog and current filter state
  const filteredProducts = getFilteredProducts(catalog, selectedCategory, searchQuery, sortBy);

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    clearFilters,
    filteredProducts,
    categories: CATEGORIES,
  };
}
