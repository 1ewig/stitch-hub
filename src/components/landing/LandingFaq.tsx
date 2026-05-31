"use client";

import React, { useState } from "react";
import Card from "../ui/Card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export const LandingFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What types of custom apparel runs can we track?",
      a: "StitchHub is optimized for bulk apparel manufacturing—specifically high-volume runs of custom jerseys, hoodies, activewear, and corporate merch. You can customize your pipeline steps to match embroidery, dye-sublimation, or fabric sourcing lines."
    },
    {
      q: "How do AI Smart Alerts prevent manufacturing delays?",
      a: "The system monitors the time spent in each stage. If a pattern design remains unsubmitted past schedule or fabric supply volumes drop below threshold, it immediately flags a warning. You can dismiss resolved warnings directly from your dashboard."
    },
    {
      q: "Can we integrate with external fabric suppliers?",
      a: "Yes! StitchHub's Enterprise tier supports external sourcing portal connections, allowing your fabric suppliers and shipping companies to directly check active runs and update logistics data through their own user accounts."
    },
    {
      q: "What security measures protect our corporate data?",
      a: "Our B2B platform strictly follows secure coding standards: all database access is authenticated via mTLS, frontends are isolated through a Backend-for-Frontend (BFF) architecture pattern, and standard clickjacking and XSS injection filters are active on all inputs."
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-6 sm:px-12 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary-500">
          Support Center
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display">
          Frequently Answered Inquiries
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 font-medium">
          Got questions about our bulk garment pipeline command console? We have answers.
        </p>
      </div>

      <div className="space-y-4 text-left">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <Card
              key={idx}
              className={cn(
                "p-0 overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all select-none",
                isOpen && "border-primary-200 shadow-sm"
              )}
            >
              {/* Accordion trigger Header */}
              <button
                onClick={() => handleToggle(idx)}
                className="w-full flex items-center justify-between p-5 text-sm font-bold text-neutral-900 font-display focus:outline-none focus:bg-neutral-50/50"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={cn("w-4.5 h-4.5 stroke-[1.75]", isOpen ? "text-primary-500" : "text-neutral-400")} />
                  <span>{faq.q}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-neutral-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>

              {/* Collapsible Answer container */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-260 ease-smooth",
                  isOpen ? "max-h-[200px] border-t border-neutral-100 bg-neutral-50/30" : "max-h-0"
                )}
              >
                <div className="p-5 text-xs text-neutral-500 font-medium leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default LandingFaq;
