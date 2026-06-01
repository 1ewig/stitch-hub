"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "../../components/Header";
import LandingFooter from "../../components/landing/LandingFooter";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import CheckoutSidebar from "../../components/checkout/CheckoutSidebar";
import { useCartStore } from "../../stores/cart-store";
import { useCheckoutForm } from "../../hooks/useCheckoutForm";

export default function CheckoutPage() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.cart.reduce((acc, item) => acc + item.quantity, 0));
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const {
    cart,
    toEmail,
    setToEmail,
    subject,
    setSubject,
    isSubmitting,
    isSuccess,
    message,
    setMessage,
    handleSubmit,
  } = useCheckoutForm();

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#d4af37] selection:text-black">
      <Header cartCount={cartCount} currentPath={pathname} onCartClick={() => setIsOpen(true)} />

      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest font-bold">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-[#d4af37]">Sourcing Quote checkout</span>
        </div>

        {/* Split container designed precisely like reference image */}
        <div className="bg-[#0b0c0e] border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto min-h-[680px]">
          {/* LEFT PANEL: Email Editor Layout */}
          <div className="lg:col-span-7 p-6 md:p-8 border-r border-zinc-900 flex flex-col justify-between">
            <CheckoutForm
              toEmail={toEmail}
              setToEmail={setToEmail}
              subject={subject}
              setSubject={setSubject}
              message={message}
              setMessage={setMessage}
              isSuccess={isSuccess}
            />
          </div>

          {/* RIGHT PANEL: AI suggestion, Summary details & Deploy */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-[#0e0f12] flex flex-col justify-between">
            <CheckoutSidebar
              cart={cart}
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
