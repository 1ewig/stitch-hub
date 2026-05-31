import { create } from "zustand";

interface UiState {
  sidebarOpen: boolean;
  isSearchActive: boolean;
  activeMenuId: string;
  setSidebarOpen: (open: boolean) => void;
  toggleSearch: (active?: boolean) => void;
  setActiveMenuId: (menuId: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  isSearchActive: false,
  activeMenuId: "dashboard",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSearch: (active) =>
    set((state) => ({
      isSearchActive: active !== undefined ? active : !state.isSearchActive,
    })),
  setActiveMenuId: (menuId) => set({ activeMenuId: menuId }),
}));
