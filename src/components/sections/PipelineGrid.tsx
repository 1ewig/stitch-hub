import React, { useEffect, useState } from "react";
import { useOrderStore } from "../../store/useOrderStore";
import { Order } from "../../types";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { TrendingUp, Folder, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface PipelineColumn {
  id: "pattern" | "fabric" | "logo" | "stitch" | "shipped";
  title: string;
  amount: string;
  dealsCount: number;
  gradientClass: string;
  textClass: string;
  barHeightPct: number; // calculated relative size
}

export const PipelineGrid = () => {
  const { orders, pipelineFilters, toggleFilter, setSelectedOrderId, selectedOrderId } = useOrderStore();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Columns definition mapping from copy
  const columns: PipelineColumn[] = [
    {
      id: "pattern",
      title: "New Lead",
      amount: "$150k",
      dealsCount: 6,
      gradientClass: "bg-primary-500",
      textClass: "text-primary-700",
      barHeightPct: 75
    },
    {
      id: "fabric",
      title: "Discovery",
      amount: "$120k",
      dealsCount: 2,
      gradientClass: "bg-neutral-400",
      textClass: "text-neutral-600",
      barHeightPct: 60
    },
    {
      id: "logo",
      title: "Proposal",
      amount: "$90k",
      dealsCount: 4,
      gradientClass: "bg-success-400",
      textClass: "text-emerald-700",
      barHeightPct: 45
    },
    {
      id: "stitch",
      title: "Mapdlation",
      amount: "$45k",
      dealsCount: 2,
      gradientClass: "bg-accent-400",
      textClass: "text-amber-700",
      barHeightPct: 22
    },
    {
      id: "shipped",
      title: "Closed",
      amount: "$180k",
      dealsCount: 4,
      gradientClass: "bg-success-500",
      textClass: "text-emerald-800",
      barHeightPct: 90
    }
  ];

  return (
    <section id="stitchhub-pipeline" aria-labelledby="pipeline-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="pipeline-heading" className="text-2xl font-extrabold tracking-tight text-neutral-900 font-display">
            Pipeline Overview
          </h2>
          <p className="text-xs text-neutral-500 font-medium">
            Track garment runs from Design Patterning down to Shipped Bulk. Click a stage to filter orders list.
          </p>
        </div>

        {pipelineFilters.length > 0 && (
          <button
            onClick={() => useOrderStore.getState().clearFilters()}
            className="text-xs font-semibold text-primary-500 hover:text-primary-600 active:scale-97 select-none"
          >
            Clear active filters ({pipelineFilters.length})
          </button>
        )}
      </div>

      {/* 5-Column Grid with Horizontal scroll on Tablet/Mobile */}
      <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto pb-4 lg:pb-0 scroll-smooth snap-x snap-mandatory">
        {columns.map((col) => {
          const isFilterActive = pipelineFilters.includes(col.id);
          const colOrders = orders.filter((o) => o.stage === col.id);

          return (
            <div
              key={col.id}
              className={cn(
                "min-w-[280px] lg:min-w-0 flex-1 snap-start transition-all duration-260",
                isFilterActive && "ring-2 ring-primary-500 rounded-lg bg-primary-50/10"
              )}
            >
              <Card
                interactive
                onClick={() => toggleFilter(col.id)}
                className={cn(
                  "p-4 h-full flex flex-col justify-between hover:border-neutral-300 relative group overflow-hidden select-none",
                  isFilterActive && "border-primary-300 shadow-md bg-white"
                )}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
                      {col.title}
                    </span>
                    <Badge variant={col.id === "stitch" ? "warning" : col.id === "pattern" ? "primary" : "success"}>
                      {col.dealsCount} runs
                    </Badge>
                  </div>

                  <div className="mt-3">
                    <p className="text-2xl font-extrabold tracking-tight text-neutral-900 font-display">
                      {col.amount}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-medium mt-0.5">Projected stage volume</p>
                  </div>
                </div>

                {/* Animated Bottom Origin Scaling Indicator Bar */}
                <div className="mt-6 h-32 w-full bg-neutral-50 rounded-md relative overflow-hidden border border-neutral-100 flex flex-col justify-end">
                  <div
                    className={cn(
                      "w-full rounded-t-sm transition-all duration-480 ease-spring opacity-85 group-hover:opacity-100 transform origin-bottom",
                      col.gradientClass
                    )}
                    style={{
                      height: animate ? `${col.barHeightPct}%` : "0%",
                      transitionDelay: `${col.id === "pattern" ? 0 : col.id === "fabric" ? 100 : col.id === "logo" ? 200 : col.id === "stitch" ? 300 : 400}ms`
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-neutral-600/80 uppercase tracking-wider bg-white/95 px-2 py-1 rounded shadow-xs border border-neutral-200">
                      {col.barHeightPct}%
                    </span>
                  </div>
                </div>

                {/* View Stage orders list */}
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span>List orders</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors transform group-hover:translate-x-1" />
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Dynamic orders sub-list display under the pipeline grid for detailed audit */}
      <div className="bg-white border border-neutral-200 rounded-lg p-5 mt-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
          <h3 className="text-sm font-bold tracking-tight text-neutral-900 uppercase tracking-wider font-display">
            Active Manufacturing Pipeline Runs
          </h3>
          <span className="text-xs text-neutral-400">
            {pipelineFilters.length > 0
              ? `Filtered by stages: ${pipelineFilters.join(", ")}`
              : "Showing all active garment runs"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 font-bold uppercase tracking-wider">
                <th className="py-2.5">ID</th>
                <th className="py-2.5">Buyer name</th>
                <th className="py-2.5">Garment run</th>
                <th className="py-2.5">Production stage</th>
                <th className="py-2.5 text-right">Run value</th>
                <th className="py-2.5 text-right">Volume</th>
                <th className="py-2.5 text-right">Updated</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((o) => pipelineFilters.length === 0 || pipelineFilters.includes(o.stage))
                .map((order) => (
                  <tr
                    key={order.orderId}
                    onClick={() => setSelectedOrderId(order.orderId)}
                    className={cn(
                      "border-b border-neutral-50 hover:bg-neutral-50/50 cursor-pointer transition-colors",
                      selectedOrderId === order.orderId && "bg-primary-50/20 font-semibold"
                    )}
                  >
                    <td className="py-3 font-mono font-bold text-neutral-600">{order.orderId}</td>
                    <td className="py-3 text-neutral-900">{order.buyerName}</td>
                    <td className="py-3">
                      <span className="capitalize">{order.garmentType}</span>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          order.stage === "shipped"
                            ? "success"
                            : order.stage === "stitch"
                            ? "warning"
                            : order.stage === "pattern"
                            ? "primary"
                            : "info"
                        }
                      >
                        {order.stage}
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-bold text-neutral-900">
                      ${order.totalValue.toLocaleString()}
                    </td>
                    <td className="py-3 text-right text-neutral-500">
                      {order.unitVolume.toLocaleString()} units
                    </td>
                    <td className="py-3 text-right text-neutral-400 font-medium">{order.timestamp}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PipelineGrid;
