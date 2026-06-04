"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../stores/cart-store";
import { useCheckoutFormStore, generateMessageFromCart } from "../stores/checkout-form-store";

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

  // Automatically construct initial template guidelines whenever items inside the cart array update
  useEffect(() => {
    setMessage(generateMessageFromCart(cart));
  }, [cart, setMessage]);

  // 🎯 CONNECT FRONTEND TO SECURE BACKEND CORE API NODE
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
          message,   // Sent as the custom specifications payload to your system prompt
          toEmail,
          subject,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An integration failure occurred during agent processing.");
      }

      // 🧠 Feed the calculated AI response back into your friend's store to update the text box live!
      setMessage(data.generatedMessage);
      setIsSuccess(true);

      // Give your customer exactly 5 seconds to look at their freshly minted invoice notification before clean context reset
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        setAttachedFiles([]); // Reset attachments
        router.push("/");
      }, 5000);

    } catch (err: any) {
      console.error("Agent communication failure:", err);
      alert(`AI Operations Node Exception: ${err.message || "Network Timeout"}`);
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