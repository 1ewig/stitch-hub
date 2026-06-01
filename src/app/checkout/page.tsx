"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import LandingFooter from "../../components/landing/LandingFooter";
import { useCart } from "../../hooks/useCart";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, setIsOpen } = useCart();

  const [toEmail, setToEmail] = useState("stitchhub@sourcing.com");
  const [subject, setSubject] = useState("Custom Corporate Merchandise Sourcing Request");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Default editor message based on cart items
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (cart.length > 0) {
      const itemsList = cart
        .map((item) => `- ${item.product.title} (Qty: ${item.quantity} units, Size: ${item.size || "Standard"})`)
        .join("\n");
      
      const specsList = cart
        .filter((item) => item.customNotes)
        .map((item) => `- ${item.product.title}: "${item.customNotes}"`)
        .join("\n");

      setMessage(
        `Hi Stitch Hub Team,\n\nI would like to initiate a premium sourcing quote for our upcoming corporate brand launch. We are interested in ordering the following custom products:\n\n${itemsList}\n\n${
          specsList ? `Branding Specifications:\n${specsList}\n\n` : ""
        }Please provide details regarding production timelines, bulk tier pricing updates, and sample mockup approvals.\n\nBest regards,\n[Enter Your Name]\n[Enter Company Name]`
      );
    } else {
      setMessage(
        `Hi Stitch Hub Team,\n\nI would like to initiate a premium sourcing quote for custom merchandise. Please help us evaluate custom garment options, insulated drinkware, and tech organizing pouches.\n\nBest regards,\n[Enter Your Name]\n[Enter Company Name]`
      );
    }
  }, [cart]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        router.push("/");
      }, 4000);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#d4af37] selection:text-black">
      <Header />

      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest font-bold">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[#d4af37]">Sourcing Quote checkout</span>
        </div>

        {/* Split container designed precisely like reference image */}
        <div className="bg-[#0b0c0e] border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto min-h-[680px]">
          
          {/* LEFT PANEL: Email Editor Layout */}
          <div className="lg:col-span-7 p-6 md:p-8 border-r border-zinc-900 flex flex-col justify-between">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 py-16 animate-scaleIn">
                <div className="h-20 w-20 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 border border-[#d4af37]/30">
                  <svg className="h-10 w-10 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-display">
                  Sourcing Request Deployed!
                </h3>
                <p className="text-sm text-zinc-400 max-w-md">
                  Our custom logic engine is parsing your request. A dedicated sales partner will follow up shortly with pricing worksheets and production schematics. Redirecting to home...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* To: Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    To: <span className="text-zinc-300 font-semibold">{toEmail}</span>
                  </label>
                  <input
                    type="email"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    className="w-full bg-[#121316] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none"
                    placeholder="Enter sourcing email address"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Subject:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#121316] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none"
                    placeholder="Enter quote request subject title"
                  />
                </div>

                {/* Editor Rich text formatting toolbar */}
                <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-3">
                  {["B", "I", "U", "U2", ">", "S", "⋮"].map((action, i) => (
                    <button
                      key={i}
                      type="button"
                      className="h-8 w-8 flex items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs font-bold cursor-pointer"
                    >
                      {action === "U2" ? (
                        <span className="underline decoration-double">U</span>
                      ) : (
                        action
                      )}
                    </button>
                  ))}
                </div>

                {/* Editor Textarea */}
                <div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-80 bg-[#121316]/50 border border-zinc-800 rounded-xl p-5 text-sm text-zinc-300 leading-relaxed font-body focus:border-[#d4af37] focus:outline-none resize-none font-mono"
                  />
                </div>

                {/* Attach Sourcing Files Mockup */}
                <div className="border border-dashed border-zinc-800 rounded-xl p-4 flex items-center justify-center hover:border-zinc-700 transition-colors cursor-pointer bg-zinc-900/10">
                  <span className="flex items-center gap-2.5 text-xs text-zinc-400 hover:text-white font-semibold">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Attach Artwork Mockups or Sourcing Worksheets
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: AI suggestion, Summary details & Deploy */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-[#0e0f12] flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Metallic Shiny Gold Button */}
              <button
                disabled={isSubmitting || isSuccess || cart.length === 0}
                onClick={handleSubmit}
                className="w-full relative group overflow-hidden px-8 py-4 rounded-full font-bold text-base text-black bg-gradient-to-r from-[#b38e20] via-[#ebd06f] to-[#b38e20] bg-[length:200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.4)] disabled:opacity-40 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Analysing Sourcing Specs...</span>
                  </div>
                ) : (
                  <>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span>Generate Agentic Sales Response</span>
                  </>
                )}
              </button>

              {/* AI suggestions card */}
              <div className="bg-[#121418] border border-zinc-900 rounded-xl p-5 space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  AI Sourcing Suggestions
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-[#d4af37] font-medium hover:underline cursor-pointer flex items-center gap-2">
                    <span>✦</span> Draft custom follow-up worksheet
                  </li>
                  <li className="text-[#d4af37] font-medium hover:underline cursor-pointer flex items-center gap-2">
                    <span>✦</span> Upsell suggestions (insulated flasks, minimal wallets)
                  </li>
                </ul>
              </div>

              {/* Order Details summary card */}
              <div className="bg-[#121418] border border-zinc-900 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Sourcing Specifications
                </h4>
                {cart.length === 0 ? (
                  <p className="text-sm text-zinc-500 italic">No products added in sourcing list.</p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm border-b border-zinc-900 pb-2 last:border-0 last:pb-0">
                        <div>
                          <p className="font-bold text-white text-xs">{item.product.title}</p>
                          <p className="text-[10px] text-zinc-500">Size: {item.size || "Standard"}</p>
                        </div>
                        <span className="text-xs font-semibold text-zinc-300">
                          {item.quantity} units
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-t border-zinc-900 pt-3 flex justify-between items-center text-xs text-zinc-400">
                  <span>Client Company</span>
                  <span className="font-semibold text-white">Stitch Hub Corporate Inc.</span>
                </div>
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>Sourcing Status</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Draft Sourcing
                  </span>
                </div>
              </div>

              {/* Attached Assets AI-parsed */}
              <div className="bg-[#121418] border border-zinc-900 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Attached Sourcing Assets (AI-Parsed)
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 bg-[#0e0f12] rounded-lg border border-zinc-900 text-xs">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-zinc-300 font-medium">brand_sourcing_layout_v1.png</span>
                    </div>
                    <span className="text-[10px] text-zinc-600 uppercase font-bold">Image</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-[#0e0f12] rounded-lg border border-zinc-900 text-xs">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-zinc-300 font-medium">bulk_volume_specs.xlsx</span>
                    </div>
                    <span className="text-[10px] text-zinc-600 uppercase font-bold">Sheet</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
