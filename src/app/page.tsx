import React from "react";
import LandingHeader from "../components/landing/LandingHeader";
import LandingHero from "../components/landing/LandingHero";
import LandingProcess from "../components/landing/LandingProcess";
import LandingFeatures from "../components/landing/LandingFeatures";
import LandingTestimonials from "../components/landing/LandingTestimonials";
import LandingPricing from "../components/landing/LandingPricing";
import LandingFaq from "../components/landing/LandingFaq";
import LandingCta from "../components/landing/LandingCta";
import LandingFooter from "../components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between overflow-x-hidden font-body">
      {/* 01. Dynamic sticky navbar */}
      <LandingHeader />

      <main className="flex-1 w-full space-y-4">
        {/* 02. High-impact Hero & mockup dashboards */}
        <LandingHero />

        {/* 03. Interactive Step Process flow */}
        <LandingProcess />

        {/* 04. Core Platform Capabilities list */}
        <LandingFeatures />

        {/* 05. verified corporate testimonials */}
        <LandingTestimonials />

        {/* 06. Toggle pricing matrices */}
        <LandingPricing />

        {/* 07. FAQ accordions support */}
        <LandingFaq />

        {/* 08. Launch CTA console triggers */}
        <LandingCta />
      </main>

      {/* 09. Footer credits */}
      <LandingFooter />
    </div>
  );
}
