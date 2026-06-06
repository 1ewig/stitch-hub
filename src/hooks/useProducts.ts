"use client";

import { useEffect, useState } from "react";
import { useProductFilterStore, getFilteredProducts, CATEGORIES } from "../stores/product-filter-store";
import { Product } from "../types";

/**
 * Wires individual store selectors for category, search query, and sort order,
 * derives filteredProducts from the database, and returns everything a product grid needs.
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = useProductFilterStore((s) => s.selectedCategory);
  const setSelectedCategory = useProductFilterStore((s) => s.setSelectedCategory);
  const searchQuery = useProductFilterStore((s) => s.searchQuery);
  const setSearchQuery = useProductFilterStore((s) => s.setSearchQuery);
  const sortBy = useProductFilterStore((s) => s.sortBy);
  const setSortBy = useProductFilterStore((s) => s.setSortBy);
  const clearFilters = useProductFilterStore((s) => s.clearFilters);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products catalog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Derive the filtered/sorted list from dynamic products and current filter state
  const filteredProducts = getFilteredProducts(products, selectedCategory, searchQuery, sortBy);

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
    loading,
  };
}
