import React from "react";
import Card from "../ui/Card";
import { Mail, Compass, Scissors, ShieldCheck, CheckCircle } from "lucide-react";

export const LandingProcess = () => {
  const steps = [
    {
      step: "01",
      title: "Campaign Outreach",
      description: "Start outreach campaigns, establish bulk buyer connects, and track reply metrics in real time.",
      icon: Mail,
      color: "text-primary-500 bg-primary-50"
    },
    {
      step: "02",
      title: "Design Patterning",
      description: "Set up design files, specify jersey or hoodie cuts, and generate digital mockup specs.",
      icon: Compass,
      color: "text-sky-500 bg-sky-50"
    },
    {
      step: "03",
      title: "Sourcing & Assembly",
      description: "Coordinate fabric yields, deploy team stitching lines, and monitor active cell outputs.",
      icon: Scissors,
      color: "text-amber-500 bg-amber-50"
    },
    {
      step: "04",
      title: "QA & Cargo Delivery",
      description: "Perform final quality passes, dismiss alerts, and launch final shipped bulk order runs.",
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-50"
    }
  ];

  return (
    <section id="process" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 bg-neutral-50/50 rounded-3xl border border-neutral-200/60">
      <div className="text-center space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary-500">
          How It Works
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display">
          Sourcing to Logistics, Streamlined
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-medium">
          A fully integrated bulk garment pipeline designed to reduce production friction and eliminate quality delays.
        </p>
      </div>

      {/* Process timeline cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="relative group">
              {/* Horizontal connecting line on desktop */}
              {idx < steps.length - 1 && (
                <span className="hidden lg:block absolute top-[44px] left-[70px] right-[-30px] h-[2px] bg-neutral-200 z-0 group-hover:bg-primary-300 transition-colors" />
              )}

              <Card className="h-full relative z-10 p-6 flex flex-col justify-between hover:border-neutral-300 hover:shadow-md transition-all duration-260">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-xl ${item.color} flex-shrink-0`}>
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="text-2xl font-black text-neutral-200 font-display group-hover:text-primary-200 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <div className="space-y-2 text-left">
                    <h4 className="text-sm font-bold tracking-tight text-neutral-900 font-display">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none pt-3 border-t border-neutral-100">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified stage</span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LandingProcess;
