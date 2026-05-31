import React from "react";

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white/50 py-12 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center text-white font-black text-sm tracking-tighter">
          S
        </div>
        <span className="text-sm font-extrabold tracking-tight text-neutral-900 font-display">
          StitchHub Platform
        </span>
      </div>

      <p className="text-xs text-neutral-400 font-medium">
        © {currentYear} StitchHub. All rights reserved. Made for high-volume apparel networks.
      </p>

      <div className="flex items-center gap-6 text-xs font-semibold text-neutral-400">
        <a href="#" className="hover:text-primary-500 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-primary-500 transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default LandingFooter;
