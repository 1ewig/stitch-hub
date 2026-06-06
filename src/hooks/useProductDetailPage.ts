"use client";

import { useEffect, useState } from "react";
import { Product } from "../types";
import { useCartStore } from "../stores/cart-store";
import { useProductDetail } from "./useProductDetail";

/**
 * Looks up a product by id from the database dynamically, wraps useProductDetail with an
 * onClose that opens the cart, and returns both the product and the detail hook's return value.
 */
export function useProductDetailPage(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const setIsOpen = useCartStore((s) => s.setIsOpen);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.products) {
          const found = data.products.find((p: Product) => p.id === id) || null;
          setProduct(found);
        }
      } catch (err) {
        console.error("Failed to fetch product detailed data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // Compose useProductDetail; on add-to-cart, open the cart slide-over instead of closing it
  const detail = useProductDetail(product, () => {
    setIsOpen(true);
  });

  return {
    product,
    detail,
    loading,
  };
}
