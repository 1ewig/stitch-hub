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
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* HEADER */}
      <Header />

      {/* 1. HERO SECTION */}
      <LandingHero />

      {/* 2. OUR AI ADVANTAGE SECTION (Glassmorphism) */}
      <LandingAiAdvantage />

      {/* 3. B2B OPERATIONAL PROCESS FLOW */}
      <LandingProcess />

      {/* 4. WHY CHOOSE OUR PRODUCTS (High Contrast Break) */}
      <LandingProductFeatures />

      {/* 5. OUR PRODUCT LINEUP */}
      <LandingProductLineup />

      {/* 6. VERIFIED B2B TESTIMONIALS */}
      <LandingTestimonials />

      {/* 7. FREQUENTLY ANSWERED QUERIES (Accordions) */}
      <LandingFaq />

      {/* 8. BOTTOM CTA & FOOTER */}
      <LandingFooter />

    </main>
  );
}
