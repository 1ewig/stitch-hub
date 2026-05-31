import LandingHero from "../components/landing/LandingHero";
import LandingAiAdvantage from "../components/landing/LandingAiAdvantage";
import LandingProductFeatures from "../components/landing/LandingProductFeatures";
import LandingProductLineup from "../components/landing/LandingProductLineup";
import LandingFooter from "../components/landing/LandingFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* 1. HERO SECTION */}
      <LandingHero />

      {/* 2. OUR AI ADVANTAGE SECTION (Glassmorphism) */}
      <LandingAiAdvantage />

      {/* 3. WHY CHOOSE OUR PRODUCTS (High Contrast Break) */}
      <LandingProductFeatures />

      {/* 4. OUR PRODUCT LINEUP */}
      <LandingProductLineup />

      {/* 5. BOTTOM CTA & FOOTER */}
      <LandingFooter />

    </main>
  );
}
