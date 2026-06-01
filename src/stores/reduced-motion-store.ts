import { create } from "zustand";

interface ReducedMotionState {
  prefersReduced: boolean;
  setPrefersReduced: (value: boolean) => void;
}

export const useReducedMotionStore = create<ReducedMotionState>()((set) => ({
  prefersReduced:
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  setPrefersReduced: (prefersReduced) => set({ prefersReduced }),
}));
