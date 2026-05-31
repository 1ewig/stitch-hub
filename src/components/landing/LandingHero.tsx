import Image from "next/image";

export default function LandingHero() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-end items-center px-6 md:px-12 overflow-hidden bg-black pb-16 md:pb-24">
      {/* Full-bleed Background Image Box */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src="/hero-banner.png" 
          alt="Stitch Hub B2B Merchandise Banner" 
          fill 
          className="object-cover object-top" 
          priority 
        />
        {/* Gradient fading UP from the bottom to create a clean dark canvas for the text without darkening the logo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content Box - Positioned at the BOTTOM of the banner */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Intelligent Design. Distinctive Presence. <br className="hidden md:block" />
          <span className="text-[#d4af37]">Ascend Your Brand.</span>
        </h1>
        
        <p className="text-zinc-200 text-lg mb-8 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Seamless custom apparel logistics powered by an advanced Agentic AI logic engine. We handle the complex material physics so you can focus on your legacy.
        </p>
        
        {/* Metallic Shiny Gold Button */}
        <button className="relative group overflow-hidden px-12 py-4 rounded-full font-bold text-lg text-black bg-gradient-to-r from-[#b38e20] via-[#ebd06f] to-[#b38e20] bg-[length:200%_auto] hover:bg-right transition-all duration-500 transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] cursor-pointer">
          {/* Shimmer overlay light effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <span className="relative z-10">Begin Your Custom Creation</span>
        </button>
      </div>
    </section>
  );
}
