"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "../stores/cart-store";
import { useLandingProcess } from "../hooks/useLandingProcess";
import { useLandingFaq } from "../hooks/useLandingFaq";
import Header from "../components/Header";
import LandingHero from "../components/landing/LandingHero";
import LandingAiAdvantage from "../components/landing/LandingAiAdvantage";
import LandingProcess from "../components/landing/LandingProcess";
import LandingProductFeatures from "../components/landing/LandingProductFeatures";
import LandingProductLineup from "../components/landing/LandingProductLineup";
import LandingTestimonials from "../components/landing/LandingTestimonials";
import LandingFaq from "../components/landing/LandingFaq";
import LandingFooter from "../components/landing/LandingFooter";

export default function Home() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.cart.reduce((acc, item) => acc + item.quantity, 0));
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const { activeStep, setActiveStep } = useLandingProcess();
  const { openIdx, toggle } = useLandingFaq();

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* HEADER */}
      <Header cartCount={cartCount} currentPath={pathname} onCartClick={() => setIsOpen(true)} />

      {/* 1. HERO SECTION */}
      <LandingHero />

      {/* 2. OUR AI ADVANTAGE SECTION (Glassmorphism) */}
      <LandingAiAdvantage />

      {/* 3. B2B OPERATIONAL PROCESS FLOW */}
      <LandingProcess activeStep={activeStep} setActiveStep={setActiveStep} />

      {/* 4. WHY CHOOSE OUR PRODUCTS (High Contrast Break) */}
      <LandingProductFeatures />

      {/* 5. OUR PRODUCT LINEUP */}
      <LandingProductLineup />

      {/* 6. VERIFIED B2B TESTIMONIALS */}
      <LandingTestimonials />

      {/* 7. FREQUENTLY ANSWERED QUERIES (Accordions) */}
      <LandingFaq openIdx={openIdx} onToggle={toggle} />

      {/* 8. BOTTOM CTA */}
      <section className="bg-black pt-24 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Define Your Legacy?</h2>
          <Link
            href="/products"
            className="inline-block bg-[#d4af37] text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-[#ebd06f] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.2)] cursor-pointer"
          >
            Start Your Secure Project
          </Link>
        </div>
      </section>

      {/* 9. FOOTER */}
      <LandingFooter />

    </main>
  );
}
