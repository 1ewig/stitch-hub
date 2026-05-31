import React from "react";
import Card from "../ui/Card";
import MetricGauge from "../ui/MetricGauge";
import LinearProgress from "../ui/LinearProgress";

export const AssemblyGoal = () => {
  const statusItems = [
    {
      label: "Positive",
      value: "200.2M Discussions",
      pct: 26,
      colorClass: "bg-emerald-500",
      pctText: "26%"
    },
    {
      label: "Neutral",
      value: "200.2M Discussions",
      pct: 23,
      colorClass: "bg-sky-500",
      pctText: "23%"
    },
    {
      label: "Avarage call duration",
      value: "200.2M Discussions",
      pct: 34,
      colorClass: "bg-primary-500",
      pctText: "34%"
    }
  ];

  return (
    <section id="stitchhub-weekly-gauge" aria-labelledby="goal-heading" className="space-y-4">
      <div>
        <h3 id="goal-heading" className="text-sm font-bold uppercase tracking-wider text-neutral-400 font-display">
          Goal Tracker
        </h3>
        <p className="text-[11px] text-neutral-500 mt-0.5">
          Weekly campaign discussions metrics
        </p>
      </div>

      <Card className="p-5 flex flex-col items-center">
        {/* Semi-circular dashed gauge */}
        <MetricGauge
          value={18.4}
          subtitle="Discussions"
          type="semicircular"
          size={180}
          strokeWidth={12}
          isDashed={true}
          className="mt-2"
        />

        {/* Detailed stats stack */}
        <div className="w-full space-y-4 mt-6">
          {statusItems.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800 capitalize leading-none">
                  {item.label}
                </span>
                <span className="text-neutral-400 font-medium">
                  {item.pctText}
                </span>
              </div>
              
              <LinearProgress
                value={item.pct}
                colorClass={item.colorClass}
                height={6}
              />
              
              <div className="flex items-center justify-between text-[10px] text-neutral-400">
                <span>{item.value}</span>
                <span className="font-semibold">Target share</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default AssemblyGoal;
