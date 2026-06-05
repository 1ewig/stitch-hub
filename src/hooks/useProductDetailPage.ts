"use client";

// ─────────────────────────────────────────────────────────────
// useProductDetailPage — Page-level composition wrapping useProductDetail
// ─────────────────────────────────────────────────────────────

import { catalog } from "../data/products";
import { useCartStore } from "../stores/cart-store";
import { useProductDetail } from "./useProductDetail";

/**
 * Looks up a product by id, wraps useProductDetail with an onClose that opens the cart,
 * and returns both the product and the detail hook's return value.
 */
export function useProductDetailPage(id: string) {
  const product = catalog.find((p) => p.id === id) || null;
  const setIsOpen = useCartStore((s) => s.setIsOpen);

  // Compose useProductDetail; on add-to-cart, open the cart slide-over instead of closing it
  const detail = useProductDetail(product, () => {
    setIsOpen(true);
  });

  return {
    product,
    detail,
  };
}
