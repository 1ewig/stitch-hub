import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const LandingCta = () => {
  return (
    <section id="cta" className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="bg-neutral-900 rounded-3xl p-8 sm:p-16 relative overflow-hidden text-center text-white border border-neutral-800 shadow-2xl flex flex-col items-center">
        {/* Deep ambient background overlays */}
        <span className="absolute top-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl transform -translate-x-12 -translate-y-12" />
        <span className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl transform translate-x-12 translate-y-12" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 text-neutral-300 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest leading-none mb-2">
            <Sparkles className="w-3 h-3 text-primary-400" />
            STITCHHUB ACCESS
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display leading-tight sm:leading-none">
            Ready to Take Control of Your Apparel Runs?
          </h2>

          <p className="text-sm text-neutral-400 max-w-xl mx-auto font-medium">
            Gain full operational visibility. Streamline discovery campaigns, patterning, and final shipping counts with our premium analytical console.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 active:scale-97 text-white font-extrabold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-primary-500/25 group"
            >
              Launch Operational Console
              <ArrowRight className="w-4 h-4 transition-transform transform group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:support@stitchhub.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-sm px-8 py-4 rounded-xl transition-all"
            >
              Contact Sales Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCta;
