import { Product } from "../types";

export const getBaseTitle = (title: string): string => {
  let base = title.replace(/\s*\(Stitch Hub Original\)/gi, "");
  base = base.split("|")[0].trim();
  if (base === "Matte Black Tumbler") {
    return "Insulated Matte Tumbler";
  }
  return base;
};

export const getProductColor = (product: Product): string => {
  const titleLower = product.title.toLowerCase();
  if (titleLower.includes("red")) return "red";
  if (titleLower.includes("blue")) return "blue";
  if (titleLower.includes("grey") || titleLower.includes("gray")) return "grey";
  if (titleLower.includes("orange")) return "orange";
  
  if (titleLower.includes("acoustic") || titleLower.includes("art panel")) {
    return "yellow";
  }
  return "black";
};

export const getColorOrder = (color: string): number => {
  const order: Record<string, number> = {
    black: 1,
    yellow: 1, // original color for acoustic panel
    red: 2,
    blue: 3,
    grey: 4,
    orange: 5,
  };
  return order[color] || 99;
};
