"use client";

import React, { useState } from "react";
import Link from "next/link";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Check, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

export const LandingPricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      title: "Sourcing Pilot",
      priceMonthly: 249,
      priceAnnual: 199,
      description: "Ideal for growing brands setting up their initial bulk production lines.",
      features: [
        "Up to 3 active garment runs",
        "Basic 5-stage pipeline grid",
        "AI Smart Alerts (standard priority)",
        "Email support response",
        "1 corporate seat included"
      ],
      popular: false,
      ctaText: "Start Sourcing Pilot"
    },
    {
      title: "Production Scale",
      priceMonthly: 599,
      priceAnnual: 499,
      description: "Perfect for active manufacturing partners managing high-volume runs.",
      features: [
        "Unlimited active garment runs",
        "Comprehensive pipeline analytics",
        "AI Smart Alerts with immediate dismissal",
        "Real-time Yield Metric Gauges",
        "Priority 24/7 PM support",
        "10 corporate seats included"
      ],
      popular: true,
      ctaText: "Launch Production Scale"
    },
    {
      title: "Enterprise Network",
      priceMonthly: null, // Custom
      priceAnnual: null,
      description: "For global apparel networks requiring multi-factory synchronizations.",
      features: [
        "Multi-factory dashboard setups",
        "Custom API integrations & triggers",
        "Dedicated sourcing consultant",
        " mTLS database isolations",
        "Unlimited corporate seats"
      ],
      popular: false,
      ctaText: "Contact Enterprise Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4 flex flex-col items-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary-500">
          Transparent Tiers
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display">
          Scale Sourcing Without Hidden Charges
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-medium">
          Select the pricing structure that matches your monthly jersey or hoodie bulk run pipelines.
        </p>

        {/* Pricing Toggle Switcher */}
        <div className="inline-flex items-center gap-3 bg-neutral-100 p-1.5 rounded-full border border-neutral-200 mt-6 select-none">
          <button
            onClick={() => setIsAnnual(false)}
            className={cn(
              "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all",
              !isAnnual ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-700"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={cn(
              "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all relative flex items-center gap-1.5",
              isAnnual ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-700"
            )}
          >
            Annually
            <span className="bg-primary-500 text-white font-black text-[8px] px-1.5 py-0.5 rounded-full uppercase leading-none">
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const price = plan.priceMonthly !== null
            ? (isAnnual ? plan.priceAnnual : plan.priceMonthly)
            : null;

          return (
            <Card
              key={plan.title}
              className={cn(
                "p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-260 hover:shadow-md",
                plan.popular ? "border-primary-500 ring-1 ring-primary-500 shadow-lg" : "hover:border-neutral-300"
              )}
            >
              {/* Highlight ribbon for most popular */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Popular Choice
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold tracking-tight text-neutral-900 font-display">
                    {plan.title}
                  </h4>
                  <p className="text-xs text-neutral-400 font-medium mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pb-5 border-b border-neutral-100">
                  {price !== null ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold text-neutral-900 font-display">
                        ${price}
                      </span>
                      <span className="text-xs text-neutral-400 font-semibold ml-2">
                        / month {isAnnual && "(billed annually)"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-3xl font-extrabold text-neutral-900 font-display">
                        Enterprise
                      </span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 text-left text-xs font-medium text-neutral-600">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <div className="mt-8">
                {plan.title === "Enterprise Network" ? (
                  <a
                    href="mailto:sales@stitchhub.com"
                    className="w-full inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 active:scale-97 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all text-center"
                  >
                    {plan.ctaText}
                  </a>
                ) : (
                  <Link
                    href="/dashboard"
                    className={cn(
                      "w-full inline-flex items-center justify-center active:scale-97 font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all text-center",
                      plan.popular
                        ? "bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-500/20"
                        : "border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 shadow-xs"
                    )}
                  >
                    {plan.ctaText}
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default LandingPricing;
