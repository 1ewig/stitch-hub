import { create } from "zustand";
import { Order, Alert } from "../types";
import { initialOrders, initialAlerts } from "../data/mockData";

interface OrderState {
  orders: Order[];
  activeAlerts: Alert[];
  selectedOrderId: string | null;
  pipelineFilters: string[];
  setOrders: (orders: Order[]) => void;
  setSelectedOrderId: (id: string | null) => void;
  toggleFilter: (stage: string) => void;
  clearFilters: () => void;
  dismissAlert: (id: string) => void;
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: initialOrders,
  activeAlerts: initialAlerts,
  selectedOrderId: null,
  pipelineFilters: [],
  setOrders: (orders) => set({ orders }),
  setSelectedOrderId: (id) => set({ selectedOrderId: id }),
  toggleFilter: (stage) =>
    set((state) => {
      const alreadyFiltered = state.pipelineFilters.includes(stage);
      const nextFilters = alreadyFiltered
        ? state.pipelineFilters.filter((s) => s !== stage)
        : [...state.pipelineFilters, stage];
      return { pipelineFilters: nextFilters };
    }),
  clearFilters: () => set({ pipelineFilters: [] }),
  dismissAlert: (id) =>
    set((state) => ({
      activeAlerts: state.activeAlerts.filter((a) => a.alertId !== id),
    })),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
}));
