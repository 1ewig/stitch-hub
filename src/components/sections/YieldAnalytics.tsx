import React from "react";
import Card from "../ui/Card";
import MetricGauge from "../ui/MetricGauge";
import { Phone, Users, Clock } from "lucide-react";

export const YieldAnalytics = () => {
  const legendItems = [
    {
      label: "Call/hour",
      value: "24.5",
      colorDot: "bg-primary-500",
      icon: Phone
    },
    {
      label: "Connects",
      value: "14.2",
      colorDot: "bg-secondary-500",
      icon: Users
    },
    {
      label: "Avg talk",
      value: "6.8 min",
      colorDot: "bg-accent-500",
      icon: Clock
    }
  ];

  return (
    <section id="stitchhub-fabric-stats" aria-labelledby="fabric-stats-heading" className="space-y-4">
      <div>
        <h3 id="fabric-stats-heading" className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-display">
          Email & Call Stats
        </h3>
        <p className="text-[11px] text-neutral-500 mt-0.5">
          Fabric Yield and customer connect analytics
        </p>
      </div>

      <Card className="p-5 flex flex-col items-center">
        {/* Thick semi-circular arc progress bar */}
        <MetricGauge
          value={64.4}
          subtitle="Daily trend"
          type="semicircular"
          size={180}
          strokeWidth={16}
          isDashed={false}
          className="mt-2"
        />

        {/* Legend pills array */}
        <div className="w-full grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-neutral-100">
          {legendItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="text-center space-y-1.5">
                <div className="flex items-center justify-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${item.colorDot}`} />
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest leading-none">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-extrabold text-neutral-900 leading-none">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
};

export default YieldAnalytics;
