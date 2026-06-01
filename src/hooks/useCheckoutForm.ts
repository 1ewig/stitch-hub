"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./useCart";

export function useCheckoutForm() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [toEmail, setToEmail] = useState("stitchhub@sourcing.com");
  const [subject, setSubject] = useState("Custom Corporate Merchandise Sourcing Request");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (cart.length > 0) {
      const itemsList = cart
        .map((item) => `- ${item.product.title} (Qty: ${item.quantity} units, Size: ${item.size || "Standard"})`)
        .join("\n");
      
      const specsList = cart
        .filter((item) => item.customNotes)
        .map((item) => `- ${item.product.title}: "${item.customNotes}"`)
        .join("\n");

      setMessage(
        `Hi Stitch Hub Team,\n\nI would like to initiate a premium sourcing quote for our upcoming corporate brand launch. We are interested in ordering the following custom products:\n\n${itemsList}\n\n${
          specsList ? `Branding Specifications:\n${specsList}\n\n` : ""
        }Please provide details regarding production timelines, bulk volume updates, and sample mockup approvals.\n\nBest regards,\n[Enter Your Name]\n[Enter Company Name]`
      );
    } else {
      setMessage(
        `Hi Stitch Hub Team,\n\nI would like to initiate a premium sourcing quote for custom merchandise. Please help us evaluate custom garment options, insulated drinkware, and tech organizing pouches.\n\nBest regards,\n[Enter Your Name]\n[Enter Company Name]`
      );
    }
  }, [cart]);

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
