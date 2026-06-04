import { useEffect } from "react";
import { useReducedMotionStore } from "../stores/reduced-motion-store";

export function useReducedMotion() {
  const prefersReduced = useReducedMotionStore((s) => s.prefersReduced);
  const setPrefersReduced = useReducedMotionStore((s) => s.setPrefersReduced);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [setPrefersReduced]);

  return prefersReduced;
}
