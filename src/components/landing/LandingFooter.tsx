// ──────────────────────────────────────────────
// LandingFooter — Footer with logo, navigation links, and copyright
// ──────────────────────────────────────────────

import Link from "next/link";

/** Site footer with brand logo, nav links, and copyright line */
export default function LandingFooter() {
  return (
    <footer className="bg-black pb-12 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-black tracking-widest text-white">STITCH<span className="text-[#d4af37]"> HUB</span></div>
        <div className="flex gap-8 text-sm font-medium text-zinc-400">
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <a href="#" className="hover:text-white transition-colors">Logistics</a>
          <a href="#" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#" className="hover:text-white transition-colors">Admin Login</a>
        </div>
        <div className="text-xs text-zinc-600">
          © 2026 Stitch Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
