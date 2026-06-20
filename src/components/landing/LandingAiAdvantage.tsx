// ──────────────────────────────────────────────
// LandingAiAdvantage — High-fidelity premium redesign matching the concept art
// ──────────────────────────────────────────────

"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

interface InteractiveCardProps {
  children: React.ReactNode;
}

function InteractiveCard({ children }: InteractiveCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between min-h-[500px] group shadow-2xl"
      style={{
        background: isHovered
          ? "linear-gradient(#07080c, #07080c) padding-box, linear-gradient(135deg, rgba(212, 175, 55, 0.45) 0%, rgba(139, 92, 246, 0.25) 100%) border-box"
          : "linear-gradient(#07080c, #07080c) padding-box, linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(139, 92, 246, 0.1) 100%) border-box",
        border: "1px solid transparent",
      }}
    >
      {/* Radial Hover Flare */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.07), rgba(139, 92, 246, 0.04) 50%, transparent 100%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function LandingAiAdvantage() {
  return (
    <section className="bg-[#050507] py-32 px-6 md:px-12 relative overflow-hidden">
      
      {/* ── AMBIENT BACKGROUND GLOWS ── */}
      {/* Left side warm gold/amber glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      {/* Right side cool purple/indigo glow */}
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#8b5cf6]/10 via-[#8b5cf6]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      
      {/* ── HIGH-TECH TEXTURE LAYERS ── */}
      {/* Left side Wireframe Grid Mesh */}
      <svg className="absolute top-0 left-0 w-[45%] h-full opacity-20 pointer-events-none text-zinc-800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-20 80 C 80 50, 160 180, 240 100 C 320 20, 360 220, 500 150 M-20 160 C 80 130, 160 260, 240 180 C 320 100, 360 300, 500 230 M-20 240 C 80 210, 160 340, 240 260 C 320 180, 360 380, 500 310 M-20 320 C 80 290, 160 420, 240 340 M-20 400 C 80 370, 160 500, 240 420" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
        <path d="M60 -20 C 100 80, 50 160, 150 240 C 250 320, 120 400, 220 500 M140 -20 C 180 80, 130 160, 230 240 C 330 320, 200 400, 300 500 M220 -20 C 260 80, 210 160, 310 240 M300 -20 C 340 80, 290 160, 390 240" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
      </svg>

      {/* Right side Hexagon Wireframe Pattern */}
      <div 
        className="absolute top-0 right-0 w-[45%] h-full opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cpath d='M14 0 L28 8 L28 24 L14 32 L0 24 L0 8 Z M14 49 L28 41 L28 25 L14 17 L0 25 L0 41 Z' fill='none' stroke='%238b5cf6' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "28px 49px",
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            Our AI Advantage
          </h2>
        </motion.div>

        {/* Dynamic Card Container Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          
          {/* Card 1 — Color Matching */}
          <InteractiveCard>
            <div>
              {/* Logo / Icon Container */}
              <div className="relative w-16 h-16 flex items-center justify-center mb-6 shrink-0">
                {/* Orbital dashed ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700/40 scale-[1.15] animate-spin-slow" />
                {/* Orbital dots */}
                <div className="absolute -top-1 -right-0.5 w-1 h-1 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(212,175,55,0.8)] animate-pulse" />
                <div className="absolute -bottom-1 -left-0.5 w-1 h-1 rounded-full bg-purple-500/80 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />

                {/* Main glass circle */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-950/80 border border-zinc-800 shadow-inner relative z-10">
                  <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white font-display">Color Matching</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Validates Pantone color accuracy across different fabric blends before the order reaches the supplier.
              </p>
            </div>
            
            {/* MINI PREVIEW 1: Pantone Palette & Linked Hex Codes */}
            <div className="relative mt-8 bg-neutral-950/60 border border-neutral-900/80 rounded-2xl p-4 font-mono text-[9px] w-full">
              {/* Pantone Palette Bar */}
              <div className="w-full h-3 rounded-md overflow-hidden flex mb-6 border border-neutral-950">
                <div className="w-[20%] bg-[#1a233d]" />
                <div className="w-[20%] bg-[#f5d290]" />
                <div className="w-[20%] bg-[#e3a869]" />
                <div className="w-[20%] bg-[#ca8a04]" />
                <div className="w-[20%] bg-[#7c3aed]" />
              </div>

              {/* Slider lists with curves */}
              <div className="relative space-y-4">
                {/* Row 1 */}
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="w-12 text-zinc-400">Pantone</span>
                  <div className="flex-1 mx-2 relative h-1 flex items-center">
                    <div className="w-full h-[1px] bg-zinc-800/80" />
                    {/* Wavy curve link */}
                    <svg className="absolute -top-6 left-[60%] w-8 h-8 opacity-40 pointer-events-none text-[#d4af37]" fill="none" viewBox="0 0 32 32">
                      <path d="M 0 0 C 16 0, 16 24, 32 24" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    <div className="absolute left-[70%] w-2.5 h-2.5 rounded-full bg-[#d4af37] border border-neutral-950 shadow-md" />
                  </div>
                  <span className="text-[#d4af37] font-semibold w-16 text-right">#exC285</span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="w-12 text-zinc-400">Pantone</span>
                  <div className="flex-1 mx-2 relative h-1 flex items-center">
                    <div className="w-full h-[1px] bg-zinc-800/80" />
                    {/* Wavy curve link */}
                    <svg className="absolute -top-7 left-[45%] w-8 h-8 opacity-40 pointer-events-none text-purple-400" fill="none" viewBox="0 0 32 32">
                      <path d="M 0 0 C 16 0, 16 28, 32 28" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    <div className="absolute left-[55%] w-2.5 h-2.5 rounded-full bg-purple-400 border border-neutral-950 shadow-md" />
                  </div>
                  <span className="text-purple-400 font-semibold w-16 text-right">hex0052</span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="w-12" />
                  <div className="flex-1 mx-2 relative h-1 flex items-center">
                    <div className="w-full h-[1px] bg-zinc-800/80" />
                    <div className="absolute left-[35%] w-2.5 h-2.5 rounded-full bg-zinc-600 border border-neutral-950 shadow-md" />
                  </div>
                  <span className="text-zinc-500 w-16 text-right">#exC006</span>
                </div>

                {/* Row 4 */}
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="w-12" />
                  <div className="flex-1 mx-2 relative h-1 flex items-center">
                    <div className="w-full h-[1px] bg-zinc-800/80" />
                    <div className="absolute left-[20%] w-2.5 h-2.5 rounded-full bg-zinc-600 border border-neutral-950 shadow-md" />
                  </div>
                  <span className="text-zinc-500 w-16 text-right">hex0025</span>
                </div>
              </div>
            </div>
          </InteractiveCard>

          {/* Card 2 — Smart Alerts */}
          <InteractiveCard>
            <div>
              {/* Logo / Icon Container */}
              <div className="relative w-16 h-16 flex items-center justify-center mb-6 shrink-0">
                {/* Orbital dashed ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700/40 scale-[1.15] animate-spin-slow" />
                {/* Orbital dots */}
                <div className="absolute -top-1 -right-0.5 w-1 h-1 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(212,175,55,0.8)] animate-pulse" />
                <div className="absolute -bottom-1 -left-0.5 w-1 h-1 rounded-full bg-purple-500/80 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />

                {/* Main glass circle */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-950/80 border border-zinc-800 shadow-inner relative z-10">
                  <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white font-display">Smart Alerts</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Flags tight timelines or pricing disputes and routes them to an administrator instantly.
              </p>
            </div>

            {/* MINI PREVIEW 2: Warning Sound Box & List */}
            <div className="mt-8 bg-neutral-950/60 border border-neutral-900/80 rounded-2xl p-4 flex items-center gap-4 font-mono text-[9px] h-28 relative overflow-hidden">
              {/* Left warning sound-brackets box */}
              <div className="w-16 h-16 rounded-xl bg-red-950/20 border border-red-900/30 flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                <span className="text-red-500/40 text-[7px] tracking-widest font-bold mb-1">ALERT</span>
                <div className="flex items-center gap-1">
                  <span className="text-red-500 opacity-60 text-[8px] animate-ping">((</span>
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-red-500 opacity-60 text-[8px] animate-ping">))</span>
                </div>
              </div>

              {/* Right list of updates */}
              <div className="flex-1 h-full overflow-y-auto pr-2 space-y-1.5 scrollbar-thin">
                <div className="flex items-center justify-between text-zinc-500 py-0.5">
                  <span>12:35 PM</span>
                  <span className="flex items-center gap-1 text-red-500/80">
                    🚩 Admin Notified
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 py-0.5">
                  <span>12:33 PM</span>
                  <span className="flex items-center gap-1 text-red-500/80">
                    🚩 Admin Notified
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-500 py-0.5">
                  <span>12:33 PM</span>
                  <span className="flex items-center gap-1 text-red-500/80">
                    🚩 Admin Notified
                  </span>
                </div>
                <div className="flex items-center justify-between bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] px-2 py-1 rounded-lg font-bold shadow-[0_0_12px_rgba(212,175,55,0.08)]">
                  <span>12:39 PM</span>
                  <span className="flex items-center gap-1">
                    🔔 Admin Notified
                  </span>
                </div>
              </div>

              {/* Custom scrollbar track */}
              <div className="absolute right-2 top-4 bottom-4 w-1 bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-1/2 bg-[#d4af37]/50 rounded-full" />
              </div>
            </div>
          </InteractiveCard>

          {/* Card 3 — Live Inventory */}
          <InteractiveCard>
            <div>
              {/* Logo / Icon Container */}
              <div className="relative w-16 h-16 flex items-center justify-center mb-6 shrink-0">
                {/* Orbital dashed ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700/40 scale-[1.15] animate-spin-slow" />
                {/* Orbital dots */}
                <div className="absolute -top-1 -right-0.5 w-1 h-1 rounded-full bg-amber-500/80 shadow-[0_0_6px_rgba(212,175,55,0.8)] animate-pulse" />
                <div className="absolute -bottom-1 -left-0.5 w-1 h-1 rounded-full bg-purple-500/80 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />

                {/* Main glass circle */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-950/80 border border-zinc-800 shadow-inner relative z-10">
                  <svg className="w-5 h-5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white font-display">Live Inventory</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Real-time supplier inventory checks ensure bulk orders ship without delays.
              </p>
            </div>

            {/* MINI PREVIEW 3: Stock Quantity Stepper & Line Wave Spline */}
            <div className="mt-8 bg-neutral-950/60 border border-neutral-900/80 rounded-2xl p-4 flex flex-col gap-3 font-mono text-[9px] text-zinc-400">
              {/* Stock quantity stepper */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <span>Stock quantity:</span>
                  <span className="text-[#d4af37] font-bold text-xs">126</span>
                  {/* Up/down chevrons */}
                  <div className="flex flex-col gap-0.5 text-zinc-600 scale-90">
                    <svg className="w-2.5 h-2.5 hover:text-[#d4af37] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    <svg className="w-2.5 h-2.5 hover:text-[#d4af37] cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <span className="text-[7.5px] text-zinc-600">LIVE SYNC // DB</span>
              </div>

              {/* Spline chart container */}
              <div className="relative h-20 w-full mt-1 bg-neutral-900/40 border border-neutral-800/40 rounded-xl overflow-hidden">
                {/* Reorder Threshold dashed line with pointer cursor */}
                <div className="absolute top-[48%] left-0 right-0 border-t border-dashed border-amber-500/50 z-10 flex items-center justify-end pr-2 pointer-events-none">
                  {/* Pointer cursor */}
                  <svg className="w-2.5 h-2.5 text-amber-500/90 -translate-x-1 translate-y-0.5 rotate-[45deg]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 3L3 10.53v.98l6.84 2.84L12.68 21h.98L21 3z" />
                  </svg>
                  <span className="bg-[#07080c] px-1 text-[6.5px] text-amber-500/80 -translate-y-1.5 font-mono uppercase tracking-wider scale-90 origin-right">
                    Reorder Threshold
                  </span>
                </div>
                
                {/* SVG Spline */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="inventory-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Filled area */}
                  <path d="M 0 65 Q 40 45, 80 35 T 160 55 T 200 25 L 200 80 L 0 80 Z" fill="url(#inventory-glow)" />
                  {/* Wave spline stroke */}
                  <path d="M 0 65 Q 40 45, 80 35 T 160 55 T 200 25" fill="none" stroke="#d4af37" strokeWidth="1.2" />
                  
                  {/* Warning blinking dot (where stock drops below threshold) */}
                  <circle cx="160" cy="55" r="4.5" fill="#ef4444" className="animate-ping origin-center" />
                  <circle cx="160" cy="55" r="2.5" fill="#ef4444" />
                </svg>
              </div>
            </div>
          </InteractiveCard>
        </motion.div>
      </div>
    </section>
  );
}
