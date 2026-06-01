export default function LandingTestimonials() {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "VP of Brand Strategy",
      company: "Linear Technologies",
      quote: "Stitch Hub transformed our entire corporate merch lifecycle. The AI color validation matched our exact hex codes perfectly across cotton hoodies and polyester polos. Absolute game changer.",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Head of Operations",
      company: "Vercel Labs",
      quote: "We needed 1,200 branded water-resistant organizers for our global team with custom stitching. Stitch Hub balanced inventory and cleared customs in record time. Phenomenal operational transparency.",
      rating: 5
    },
    {
      name: "Darnell Sterling",
      role: "Creative Director",
      company: "Stripe Design",
      quote: "The fabric physics simulation is no joke. Seeing exactly how our embroidery layouts sit on high-tension performance wear before manufacturing saved us weeks of prototype iterations.",
      rating: 5
    }
  ];

  return (
    <section className="bg-black py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Soft background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-[#d4af37]/3 blur-[140px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Trusted by Brand Leaders</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Discover why modern design departments and logistics operations scale their bulk sourcing runs using Stitch Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="bg-white/3 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-[#d4af37]/30 hover:bg-white/6 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Gold Stars */}
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, starIdx) => (
                    <svg key={starIdx} className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-zinc-300 text-base leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-8 border-t border-white/5 mt-8 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">{review.name}</h4>
                  <p className="text-zinc-500 text-xs">{review.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20 uppercase">
                    {review.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
