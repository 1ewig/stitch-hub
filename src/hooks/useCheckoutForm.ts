"use client";

// ─────────────────────────────────────────────────────────────
// useCheckoutForm — Cart review, message generation, and agent submission
// ─────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../stores/cart-store";
import { useCheckoutFormStore, generateMessageFromCart } from "../stores/checkout-form-store";

/**
 * Returns cart data, form fields, a file-attachment array, and a handleSubmit that POSTs
 * to /api/agent. On success it displays the AI response for 5 s then redirects to "/".
 */
export function useCheckoutForm() {
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);
  
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const {
    toEmail,
    subject,
    message,
    isSubmitting,
    isSuccess,
    setToEmail,
    setSubject,
    setMessage,
    setIsSubmitting,
    setIsSuccess,
  } = useCheckoutFormStore();

  // Sync the message text area with a cart-derived template whenever the cart changes
  useEffect(() => {
    setMessage(generateMessageFromCart(cart));
  }, [cart, setMessage]);

  // POST cart + message to /api/agent, display AI response, then redirect after 5 s
  const handleSubmit = async () => {
    if (cart.length === 0) {
      alert("Your sourcing manifest is currently empty. Add catalog styles before requesting optimization.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          message,
          toEmail,
          subject,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An integration failure occurred during agent processing.");
      }

      // Overwrite message with the AI-generated response returned from the agent
      setMessage(data.generatedMessage);
      setIsSuccess(true);

      // Show success state for 5 s, then reset cart and redirect to home
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        setAttachedFiles([]);
        router.push("/");
      }, 5000);

    } catch (err) {
      console.error("Agent communication failure:", err);
      const message = err instanceof Error ? err.message : "Network Timeout";
      alert(`AI Operations Node Exception: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    cart,
    toEmail,
    setToEmail,
    subject,
    setSubject,
    isSubmitting,
    isSuccess,
    message,
    setMessage,
    handleSubmit,
    attachedFiles,
    setAttachedFiles,
  };
}