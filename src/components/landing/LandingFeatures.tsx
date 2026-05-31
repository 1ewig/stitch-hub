import React from "react";
import Card from "../ui/Card";
import { GitPullRequest, ShieldAlert, PieChart, Layers, Settings, Users } from "lucide-react";

export const LandingFeatures = () => {
  const features = [
    {
      title: "Garment Pipeline Tracker",
      description: "Monitor orders through 5 standard industrial stages: Design Patterning, Fabrication, Logo, Assembly Stitching, and Shipped Bulk.",
      icon: GitPullRequest,
      color: "text-primary-500 bg-primary-50"
    },
    {
      title: "AI Smart Alerts",
      description: "Proactive warnings for sourcing holds, quality checks, and customer campaigns designed to prevent delays.",
      icon: ShieldAlert,
      color: "text-amber-500 bg-amber-50"
    },
    {
      title: "Real-Time Yield Connect",
      description: "Dynamic connection calculations simulating connects, daily efficiency ratings, and talks talk duration in real time.",
      icon: PieChart,
      color: "text-sky-500 bg-sky-50"
    },
    {
      title: "Multi-Campaign Outreach",
      description: "Establish connects, monitor campaign open rates, and log buyer reply metrics from a single interface.",
      icon: Users,
      color: "text-emerald-500 bg-emerald-50"
    },
    {
      title: "BFF Architecture Safety",
      description: "Secure Backend-for-Frontend setups preventing server token leaks, XSS boundaries, and clickjack defenses.",
      icon: Layers,
      color: "text-indigo-500 bg-indigo-50"
    },
    {
      title: "Workspace Customization",
      description: "Fully responsive layouts transitioning between sliding menu drawers and rigid desktop sidebars with hotkey controls.",
      icon: Settings,
      color: "text-neutral-500 bg-neutral-50"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary-500">
          Core Capabilities
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display">
          Everything You Need to Manage Custom Runs
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-medium">
          Eliminate coordination friction. StitchHub provides transparent dashboard analytics for team cells and B2B apparel buyers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="relative overflow-hidden group hover:border-primary-200 hover:shadow-md transition-all duration-260"
            >
              {/* Top ambient color strip */}
              <span className="absolute top-0 left-0 right-0 h-1 bg-neutral-100 group-hover:bg-primary-500 transition-colors" />

              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-xl ${feature.color} flex-shrink-0 transition-transform duration-260 group-hover:scale-105`}>
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight text-neutral-900 font-display">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-2 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default LandingFeatures;
