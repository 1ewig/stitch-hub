import { create } from "zustand";
import type { CartItem } from "../types";

interface CheckoutFormState {
  toEmail: string;
  subject: string;
  message: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  setToEmail: (val: string) => void;
  setSubject: (val: string) => void;
  setMessage: (val: string) => void;
  setIsSubmitting: (val: boolean) => void;
  setIsSuccess: (val: boolean) => void;
}

export const useCheckoutFormStore = create<CheckoutFormState>()((set) => ({
  toEmail: "stitchhub@sourcing.com",
  subject: "Custom Corporate Merchandise Sourcing Request",
  message: `Hi Stitch Hub Team,

I would like to initiate a premium sourcing quote for custom merchandise. Please help us evaluate custom garment options, insulated drinkware, and tech organizing pouches.

Best regards,
[Enter Your Name]
[Enter Company Name]`,
  isSubmitting: false,
  isSuccess: false,

  setToEmail: (toEmail) => set({ toEmail }),
  setSubject: (subject) => set({ subject }),
  setMessage: (message) => set({ message }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsSuccess: (isSuccess) => set({ isSuccess }),
}));

export function generateMessageFromCart(cart: CartItem[]): string {
  if (cart.length > 0) {
    const itemsList = cart
      .map(
        (item) =>
          `- ${item.product.title} (Qty: ${item.quantity} units, Size: ${item.size || "Standard"})`
      )
      .join("\n");

    const specsList = cart
      .filter((item) => item.customNotes)
      .map((item) => `- ${item.product.title}: "${item.customNotes}"`)
      .join("\n");

    return `Hi Stitch Hub Team,

I would like to initiate a premium sourcing quote for our upcoming corporate brand launch. We are interested in ordering the following custom products:

${itemsList}

${
  specsList ? `Branding Specifications:\n${specsList}\n\n` : ""
}Please provide details regarding production timelines, bulk volume updates, and sample mockup approvals.

Best regards,
[Enter Your Name]
[Enter Company Name]`;
  }

  return `Hi Stitch Hub Team,

I would like to initiate a premium sourcing quote for custom merchandise. Please help us evaluate custom garment options, insulated drinkware, and tech organizing pouches.

Best regards,
[Enter Your Name]
[Enter Company Name]`;
}
