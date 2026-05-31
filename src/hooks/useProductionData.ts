import { useEffect, useState } from "react";
import { useOrderStore } from "../store/useOrderStore";
import { Order } from "../types";

export function useProductionData(orderId?: string) {
  const { orders, setOrders } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);
  const [yieldStats, setYieldStats] = useState({
    value: 64.4,
    trend: "up" as "up" | "down",
    percentage: 1.2
  });

  // Calculate dynamic groups
  const pipelineGroups = orders.reduce((acc, order) => {
    if (!acc[order.stage]) {
      acc[order.stage] = [];
    }
    acc[order.stage].push(order);
    return acc;
  }, {} as Record<string, Order[]>);

  useEffect(() => {
    // Establish dynamic connection simulation
    const interval = setInterval(() => {
      // Randomly update order values slightly to simulate live tracking
      const updatedOrders = orders.map((o) => {
        // Only update active stage orders occasionally
        if (Math.random() > 0.6) {
          const valueChange = Math.floor((Math.random() - 0.45) * 2000);
          return {
            ...o,
            totalValue: Math.max(10000, o.totalValue + valueChange),
            timestamp: "Just updated"
          };
        }
        return o;
      });

      setOrders(updatedOrders);

      // Randomly fluctuate yield stats
      setYieldStats((prev) => {
        const change = parseFloat(((Math.random() - 0.5) * 0.4).toFixed(1));
        const nextVal = Math.min(100, Math.max(30, parseFloat((prev.value + change).toFixed(1))));
        return {
          value: nextVal,
          trend: change >= 0 ? "up" : "down",
          percentage: Math.abs(parseFloat((change * 10).toFixed(1)))
        };
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [orders, setOrders]);

  return {
    yieldStats,
    pipelineGroups,
    isLoading
  };
}
