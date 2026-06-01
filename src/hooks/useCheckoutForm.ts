"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../stores/cart-store";
import { useCheckoutFormStore, generateMessageFromCart } from "../stores/checkout-form-store";

export function useCheckoutForm() {
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);
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

  useEffect(() => {
    setMessage(generateMessageFromCart(cart));
  }, [cart, setMessage]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        router.push("/");
      }, 4000);
    }, 2500);
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
  };
}
