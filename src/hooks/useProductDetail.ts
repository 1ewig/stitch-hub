"use client";

import { useState } from "react";
import type { Product } from "../types";
import { useCartStore } from "../stores/cart-store";

export function useProductDetail(product: Product | null, onClose: () => void) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [quantity, setQuantity] = useState(50);
  const [size, setSize] = useState("M");
  const [customNotes, setCustomNotes] = useState("");

  const minQty = product?.moq ?? 25;
  const currentQty = Math.max(quantity, minQty);

  const getDiscountedPrice = (qty: number) => {
    if (qty >= 250) return product!.price * 0.85;
    if (qty >= 100) return product!.price * 0.9;
    return product!.price;
  };

  const currentPrice = product ? getDiscountedPrice(currentQty) : 0;

  const handleAddToCart = () => {
    if (!product) return;
    const finalProduct = { ...product, price: currentPrice };
    addToCart(finalProduct, currentQty, size, customNotes);
    onClose();
  };

  const isApparel =
    product?.cat === "Apparel" || product?.cat === "Performance";

  return {
    quantity,
    size,
    customNotes,
    minQty,
    currentQty,
    currentPrice,
    isApparel,
    setQuantity,
    setSize,
    setCustomNotes,
    handleAddToCart,
  };
}
