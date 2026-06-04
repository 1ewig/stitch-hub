"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "../stores/cart-store";

export function useNavbar() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = useCartStore((s) => s.cart.reduce((acc, item) => acc + item.quantity, 0));
  const setIsOpen = useCartStore((s) => s.setIsOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return {
    session,
    status,
    cartCount,
    openCart: () => setIsOpen(true),
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    handleSignOut,
  };
}
