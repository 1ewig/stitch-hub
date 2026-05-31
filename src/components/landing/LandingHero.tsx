import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Activity, Layers, Bell } from "lucide-react";

export const LandingHero = () => {
  return (
    <section className="relative pt-36 pb-20 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
      {/* Dynamic ambient violet background bubble */}
      <span className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-3xl -z-10" />

      {/* Floating high-caps decorative badge */}
      <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest leading-none mb-6 animate-pulse-slow">
        <Sparkles className="w-3.5 h-3.5 text-primary-500" />
        Next-Gen B2B Apparel Command Platform
      </div>

      {/* Heading display typography */}
      <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 font-display max-w-4xl leading-tight sm:leading-none">
        Operational Control for <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">Bulk Apparel Sourcing</span>
      </h2>

      {/* Supporting body copy */}
      <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mt-6 font-medium leading-relaxed">
        StitchHub connects manufacturing networks, sourcing runs, and sales campaigns in one premium, high-contrast operational analytics dashboard. Track custom garment pipelines dynamically.
      </p>

      {/* Action triggers */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 active:scale-97 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/25 group"
        >
          Launch Live Console
          <ArrowRight className="w-4 h-4 transition-transform transform group-hover:translate-x-1" />
        </Link>
        <a
          href="#features"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-xs"
        >
          Explore Features
        </a>
      </div>

      {/* High-Fidelity Mockup Container */}
      <div className="w-full max-w-5xl mt-16 relative rounded-2xl border border-neutral-200 bg-white shadow-2xl p-6 overflow-hidden group">
        {/* Subtle mock header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-neutral-400 font-bold ml-2 tracking-widest uppercase">
              stitchhub-console-v2.0
            </span>
          </div>
          <div className="w-24 h-2 bg-neutral-100 rounded-full" />
        </div>

        {/* Mock content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Mock pipeline card */}
          <div className="md:col-span-2 border border-neutral-100 rounded-xl p-5 bg-neutral-50/50 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Pipeline Overview
                </p>
                <p className="text-xl font-black text-neutral-900 font-display mt-1">
                  $315k Sourced
                </p>
              </div>
              <Activity className="w-5 h-5 text-primary-500" />
            </div>

            {/* Mock horizontal pipeline bars */}
            <div className="space-y-3.5 mt-6">
              {[
                { label: "New Lead (Patterning)", value: 75, color: "bg-primary-500" },
                { label: "Discovery (Fabrication)", value: 45, color: "bg-neutral-400" },
                { label: "Proposal (Logo Audit)", value: 90, color: "bg-success-500" }
              ].map((step) => (
                <div key={step.label} className="space-y-1 text-left">
                  <div className="flex items-center justify-between text-[10px] font-bold text-neutral-600">
                    <span>{step.label}</span>
                    <span>{step.value}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${step.color}`} style={{ width: `${step.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock gauges sidebar */}
          <div className="border border-neutral-100 rounded-xl p-5 bg-neutral-50/50 flex flex-col justify-between items-center text-center">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                Yield Stats
              </p>
              <p className="text-xl font-black text-neutral-900 font-display mt-1">
                64.4% Active
              </p>
            </div>

            {/* Mock semicircular SVG gauge */}
            <div className="w-32 h-20 relative flex flex-col justify-end mt-4">
              <svg viewBox="0 0 100 60" className="w-full">
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="var(--color-neutral-100)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="var(--color-primary-500)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="125"
                  strokeDashoffset="45"
                />
              </svg>
              <div className="absolute inset-x-0 bottom-0 text-center flex flex-col">
                <span className="text-lg font-black text-neutral-900 font-display">64.4%</span>
                <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
                  Daily connects
                </span>
              </div>
            </div>

            {/* Mock footer alerts check */}
            <div className="w-full border-t border-neutral-100 pt-3 mt-4 flex items-center justify-between text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Bell className="w-3 h-3 text-amber-500" />
                <span>AI Sourcing alert</span>
              </div>
              <span className="text-primary-500">2 pending</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
