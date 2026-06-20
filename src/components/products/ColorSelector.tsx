// ──────────────────────────────────────────────
// ColorSelector — displays the product color variants as colored circles with active rings
// ──────────────────────────────────────────────

"use client";

import React from "react";
import { Product } from "../../types";
import { getProductColor } from "../../utils/colors";

const colorHexMap: Record<string, string> = {
  black: "#000000",
  red: "#dc2626",
  blue: "#2563eb",
  grey: "#71717a",
  yellow: "#eab308",
  orange: "#f97316"
};

const colorNameMap: Record<string, string> = {
  black: "Black (Original)",
  red: "Red",
  blue: "Blue",
  grey: "Grey",
  yellow: "Yellow (Original)",
  orange: "Orange"
};

interface ColorSelectorProps {
  variants: Product[];
  currentProductId: string;
  onSelect: (productId: string) => void;
}

export default function ColorSelector({ variants, currentProductId, onSelect }: ColorSelectorProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="mb-8">
      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
        Select Color
      </label>
      <div className="flex items-center gap-3">
        {variants.map((v) => {
          const colorKey = getProductColor(v);
          const hex = colorHexMap[colorKey] || "#52525b";
          const displayName = colorNameMap[colorKey] || colorKey;
          const isActive = v.id === currentProductId;

          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              title={displayName}
              className={`w-9 h-9 rounded-full cursor-pointer transition-all border border-zinc-800 flex items-center justify-center hover:scale-110 ${
                isActive
                  ? "ring-2 ring-offset-2 ring-offset-zinc-950 ring-[#d4af37]"
                  : "hover:border-zinc-500"
              }`}
              style={{ backgroundColor: hex }}
            >
              <span className="sr-only">{displayName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
