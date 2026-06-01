import { create } from "zustand";
import type { Product } from "../types";

export const CATEGORIES = ["All", "Apparel", "Drinkware", "Performance", "Accessories"];

interface ProductFilterState {
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  selectedProduct: Product | null;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  clearFilters: () => void;
}

export const useProductFilterStore = create<ProductFilterState>()((set) => ({
  selectedCategory: "All",
  searchQuery: "",
  sortBy: "price-asc",
  selectedProduct: null,

  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),

  clearFilters: () => set({ searchQuery: "", selectedCategory: "All" }),
}));

export function getFilteredProducts(
  catalog: Product[],
  selectedCategory: string,
  searchQuery: string,
  sortBy: string
): Product[] {
  return catalog
    .filter((product) => {
      const matchCat = selectedCategory === "All" || product.cat === selectedCategory;
      const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.title.localeCompare(b.title);
      return 0;
    });
}
