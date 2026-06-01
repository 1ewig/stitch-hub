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
        if (quantity <= 0) {
          const { removeFromCart } = get();
          removeFromCart(title, size);
          return;
        }
        const { cart } = get();
        set({
          cart: cart.map((item) =>
            item.product.title === title && item.size === size
              ? { ...item, quantity }
              : item
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
