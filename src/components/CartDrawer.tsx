"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../stores/cart-store";

export default function CartDrawer() {
  const cart = useCartStore((s) => s.cart);
  const isOpen = useCartStore((s) => s.isOpen);
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const cartTotal = useCartStore((s) => s.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmitQuote = () => {
    setIsSubmitting(true);
    // Simulate complex AI logistics computation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        setIsOpen(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md transform bg-zinc-950 border-l border-zinc-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 px-6 py-6">
            <h2 className="text-xl font-bold font-display text-white">
              Sourcing Cart
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-scaleIn">
                <div className="h-16 w-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 border border-[#d4af37]/30">
                  <svg
                    className="h-8 w-8 text-[#d4af37]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  Quote Request Submitted!
                </h3>
                <p className="text-sm text-zinc-400">
                  Our advanced AI logic engine has initiated manufacturing physics calculations. A sourcing manager will contact you with material specs within 15 minutes.
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <svg
                  className="h-12 w-12 text-zinc-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <p className="text-zinc-500 font-medium">Your sourcing cart is empty.</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-sm font-semibold text-[#d4af37] hover:underline cursor-pointer"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-zinc-900 pb-6 last:border-b-0 animate-scaleIn"
                  >
                    <div className="relative h-20 w-16 flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.product.img}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {item.product.title}
                        </h4>
                        <span className="text-sm font-semibold text-zinc-500">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">
                        Category: {item.product.cat}
                        {item.size && ` | Size: ${item.size}`}
                      </p>

                      {item.customNotes && (
                        <p className="text-xs text-zinc-400 bg-zinc-900/50 border border-zinc-900 px-2 py-1 rounded mt-1.5 line-clamp-1 italic">
                          "{item.customNotes}"
                        </p>
                      )}

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-zinc-800 rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.title,
                                item.size,
                                item.quantity - 5
                              )
                            }
                            className="px-2 py-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -5
                          </button>
                          <span className="px-3 text-xs font-semibold text-white">
                            {item.quantity} units
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.title,
                                item.size,
                                item.quantity + 5
                              )
                            }
                            className="px-2 py-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +5
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.product.title, item.size)
                          }
                          className="text-xs text-red-500 hover:text-red-400 transition-colors font-medium cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer controls */}
          {cart.length > 0 && !isSuccess && (
            <div className="border-t border-zinc-900 bg-zinc-950 p-6 space-y-4">
              <div className="flex justify-between items-center text-zinc-400">
                <span className="text-sm font-medium">Sourcing Quote Status</span>
                <span className="text-sm font-bold text-[#d4af37] uppercase tracking-wider">
                  Pending Verification
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Quote calculations are completed dynamically by our engine based on branding specs, material availability, and production timeline requirements.
              </p>

              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="w-full relative group overflow-hidden px-6 py-3.5 rounded-full font-bold text-sm text-black bg-gradient-to-r from-[#b38e20] via-[#ebd06f] to-[#b38e20] bg-[length:200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer text-center"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span>Begin Sourcing Checkout</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
