"use client";

import { useCartStore } from "../stores/cart-store";
import CartDrawer from "./CartDrawer";

export default function CartDrawerWrapper() {
  const cart = useCartStore((s) => s.cart);
  const isOpen = useCartStore((s) => s.isOpen);
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  return (
    <CartDrawer
      cart={cart}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      updateQuantity={updateQuantity}
      removeFromCart={removeFromCart}
    />
  );
}
