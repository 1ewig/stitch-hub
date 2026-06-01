"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  title: string;
  cat: string;
  img: string;
  price: number;
  description: string;
  moq: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  customNotes: string;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity: number, size: string, customNotes: string) => void;
  removeFromCart: (title: string, size: string) => void;
  updateQuantity: (title: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("stitchhub_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("stitchhub_cart", JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number, size: string, customNotes: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.title === product.title && item.size === size
    );

    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
      newCart[existingIndex].customNotes = customNotes || newCart[existingIndex].customNotes;
    } else {
      newCart.push({ product, quantity, size, customNotes });
    }
    saveCart(newCart);
    setIsOpen(true); // Automatically open the drawer on add
  };

  const removeFromCart = (title: string, size: string) => {
    const newCart = cart.filter((item) => !(item.product.title === title && item.size === size));
    saveCart(newCart);
  };

  const updateQuantity = (title: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(title, size);
      return;
    }
    const newCart = cart.map((item) =>
      item.product.title === title && item.size === size ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
