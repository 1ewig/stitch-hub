import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/75 backdrop-blur-md border-b border-neutral-200/60 z-50 flex items-center justify-between px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Brand logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-md shadow-primary-500/20">
          S
        </div>
        <span className="text-xl font-extrabold tracking-tight text-neutral-900 font-display">
          StitchHub
        </span>
      </div>

      {/* Navigation options */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-500">
        <a href="#features" className="hover:text-primary-500 transition-colors">
          Platform Features
        </a>
        <a href="#metrics" className="hover:text-primary-500 transition-colors">
          Yield Analytics
        </a>
        <a href="#cta" className="hover:text-primary-500 transition-colors">
          Pricing
        </a>
      </nav>

      {/* CTA Trigger */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 active:scale-97 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all shadow-md shadow-primary-500/10"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Launch Console
        </Link>
      </div>
    </header>
  );
};

export default LandingHeader;
