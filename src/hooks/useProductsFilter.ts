"use client";

import { useState } from "react";
import { catalog } from "../data/products";
import { Product } from "./useCart";

export function useProductsFilter() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["All", "Apparel", "Drinkware", "Performance", "Accessories"];

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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedProduct,
    setSelectedProduct,
    filteredProducts,
    categories,
    clearFilters,
  };
}
