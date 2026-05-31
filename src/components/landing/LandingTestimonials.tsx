import React from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Star, Quote, Sparkles } from "lucide-react";

export const LandingTestimonials = () => {
  const reviews = [
    {
      quote: "StitchHub transformed our athletic jerseys procurement. Being able to track fabric sourcing delays and assembly cell output in real time eliminated standard coordination bottlenecks.",
      name: "Marcus Aurelius",
      role: "VP Sourcing",
      company: "Acme Corporate Athletics",
      runInfo: "15,000 Jersey Run",
      avatarLetter: "M"
    },
    {
      quote: "The AI smart alert feeds saved our bulk custom hoodie production. We resolved a pattern delay warning directly through the console, saving us $40k in delayed cargo charges.",
      name: "Sarah Jenkins",
      role: "Logistics Manager",
      company: "Globex Apparel Group",
      runInfo: "8,500 Hoodie Run",
      avatarLetter: "S"
    },
    {
      quote: "With StitchHub connects analytics, we finally got transparency on connects metrics and talks talk duration with our manufacturing partners. Zero black boxes.",
      name: "Ken Chen",
      role: "Director of Product",
      company: "Hooli Wearables",
      runInfo: "22,000 Custom Jersey Run",
      avatarLetter: "K"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary-500">
          Verified Reviews
        </h3>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display">
          Trusted by High-Volume Buyers
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-medium">
          Hear how manufacturing PMs and bulk buyers reduce cognitive load during complex industrial production monitoring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <Card
            key={rev.name}
            className="p-6 hover:shadow-md hover:border-neutral-300 relative group overflow-hidden flex flex-col justify-between"
          >
            {/* Top quote bubble icon decoration */}
            <div className="absolute top-4 right-4 text-neutral-100 group-hover:text-primary-50 transition-colors">
              <Quote className="w-8 h-8 transform rotate-180" />
            </div>

            <div className="space-y-4 relative z-10">
              {/* Star ratings */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-xs text-neutral-600 leading-relaxed font-medium text-left italic">
                "{rev.quote}"
              </p>
            </div>

            {/* Profile segment */}
            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-extrabold text-xs">
                  {rev.avatarLetter}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-neutral-900 leading-tight">
                    {rev.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 font-medium leading-none mt-0.5">
                    {rev.role} • {rev.company}
                  </p>
                </div>
              </div>

              <Badge variant="primary" className="text-[9px] uppercase tracking-wide">
                {rev.runInfo}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LandingTestimonials;
