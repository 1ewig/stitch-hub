"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../hooks/useCart";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, setIsOpen } = useCart();

  const isLinkActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "/products" && pathname.startsWith("/products")) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            className="h-8 w-8 text-[#d4af37] transition-transform duration-300 group-hover:rotate-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span className="font-display text-xl font-extrabold tracking-wider text-white">
            STITCH<span className="text-[#d4af37]">HUB</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`font-body text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-white ${
              isLinkActive("/") ? "text-[#d4af37]" : "text-zinc-400"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`font-body text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-white ${
              isLinkActive("/products") ? "text-[#d4af37]" : "text-zinc-400"
            }`}
          >
            Products
          </Link>

          {/* Cart Icon / Action */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
            aria-label="Open cart"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            {/* Cart Items count badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-black text-black animate-scaleIn">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
