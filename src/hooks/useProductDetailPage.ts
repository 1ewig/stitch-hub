"use client";

import { catalog } from "../data/products";
import { useCartStore } from "../stores/cart-store";
import { useProductDetail } from "./useProductDetail";

export function useProductDetailPage(id: string) {
  const product = catalog.find((p) => p.id === id) || null;
  const setIsOpen = useCartStore((s) => s.setIsOpen);

  const detail = useProductDetail(product, () => {
    setIsOpen(true);
  });

  return {
    product,
    detail,
  };
}
