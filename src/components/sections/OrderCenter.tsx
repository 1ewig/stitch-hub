import React from "react";
import Card from "../ui/Card";
import { Mail, CheckCircle, Percent } from "lucide-react";

export const OrderCenter = () => {
  const stats = [
    {
      title: "Sent",
      value: "1,280",
      change: "+12% this week",
      icon: Mail,
      iconColor: "text-primary-500 bg-primary-50"
    },
    {
      title: "Open rate",
      value: "44.8%",
      change: "+2.4% avg open",
      icon: Percent,
      iconColor: "text-sky-500 bg-sky-50"
    },
    {
      title: "Reply care",
      value: "1,280%",
      change: "Outstanding replies",
      icon: CheckCircle,
      iconColor: "text-emerald-500 bg-emerald-50"
    }
  ];

  return (
    <section id="stitchhub-overview" aria-labelledby="overview-heading" className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 id="overview-heading" className="text-2xl font-extrabold tracking-tight text-neutral-900 font-display">
            Sales Command Center
          </h2>
          <p className="text-xs text-neutral-500 font-medium">
            Active Outreach Campaign • Operational analytics monitor
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden group hover:border-primary-300 transition-all duration-260 ease-smooth"
            >
              {/* Subtle accent border line inside */}
              <span className="absolute top-0 left-0 right-0 h-1 bg-neutral-100 group-hover:bg-primary-500 transition-colors" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-extrabold tracking-tight text-neutral-900 font-display mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.iconColor} transition-transform duration-260 group-hover:scale-110`}>
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-medium">{stat.change}</span>
                <span className="text-primary-600 font-semibold group-hover:underline cursor-pointer">
                  View campaign
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default OrderCenter;
