"use client";

import Image from "next/image";
import { Product } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="w-full aspect-[4/5] bg-zinc-900 rounded-2xl mb-4 overflow-hidden border border-zinc-900 group-hover:border-[#d4af37]/40 transition-colors flex items-center justify-center relative shadow-sm">
          <Image
            src={product.img}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
            <span className="bg-[#d4af37] text-black text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Quick Sourcing Spec
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-bold group-hover:text-[#d4af37] transition-colors leading-snug">
            {product.title}
          </h4>
          <span className="text-[#d4af37] font-semibold text-sm">
            ${product.price}
          </span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900/60 pt-3">
        <span>Category: {product.cat}</span>
        <span>Min Qty: {product.moq}</span>
      </div>
    </div>
  );
}
