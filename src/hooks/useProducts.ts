"use client";

import { useProductFilterStore, getFilteredProducts, CATEGORIES } from "../stores/product-filter-store";
import { catalog } from "../data/products";

export function useProducts() {
  const selectedCategory = useProductFilterStore((s) => s.selectedCategory);
  const setSelectedCategory = useProductFilterStore((s) => s.setSelectedCategory);
  const searchQuery = useProductFilterStore((s) => s.searchQuery);
  const setSearchQuery = useProductFilterStore((s) => s.setSearchQuery);
  const sortBy = useProductFilterStore((s) => s.sortBy);
  const setSortBy = useProductFilterStore((s) => s.setSortBy);
  const clearFilters = useProductFilterStore((s) => s.clearFilters);

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
