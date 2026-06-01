import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "../types";

interface CartState {
  cart: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity: number, size: string, customNotes: string) => void;
  removeFromCart: (title: string, size: string) => void;
  updateQuantity: (title: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,

      setIsOpen: (open) => set({ isOpen: open }),

      addToCart: (product, quantity, size, customNotes) => {
        const { cart } = get();
        const existingIndex = cart.findIndex(
          (item) => item.product.title === product.title && item.size === size
        );

        let newCart: CartItem[];
        if (existingIndex > -1) {
          newCart = cart.map((item, i) =>
            i === existingIndex
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  customNotes: customNotes || item.customNotes,
                }
              : item
          );
        } else {
          newCart = [...cart, { product, quantity, size, customNotes }];
        }

        set({ cart: newCart, isOpen: true });
      },

      removeFromCart: (title, size) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => !(item.product.title === title && item.size === size)) });
      },

      updateQuantity: (title, size, quantity) => {
        const { cart } = get();
        const item = cart.find(
          (i) => i.product.title === title && i.size === size
        );
        if (!item) return;

        const clamped = Math.max(quantity, item.product.moq);
        if (clamped <= 0) {
          const { removeFromCart } = get();
          removeFromCart(title, size);
          return;
        }
        set({
          cart: cart.map((i) =>
            i.product.title === title && i.size === size
              ? { ...i, quantity: clamped }
              : i
          ),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "stitchhub_cart",
    }
  )
);
