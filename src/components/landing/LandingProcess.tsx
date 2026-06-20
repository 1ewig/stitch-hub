// ──────────────────────────────────────────────
// LandingProcess — High-Fidelity B2B Pipeline Showcase
// ──────────────────────────────────────────────

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingProcessProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export default function LandingProcess({ activeStep, setActiveStep }: LandingProcessProps) {
  const [isMainCardHovered, setIsMainCardHovered] = useState(false);

  const steps = [
    {
      num: "01",
      title: "Design & Pattern Lead",
      subtitle: "Material & Pattern Validation",
      detailLabel: "Human Oversight & Creative Strategy",
      desc: "Our dedicated Sourcing Leads, the StitchHub Team, directly manage your account. They personally review every asset, including fabric drape, vector complexity, and texture mappings, to preemptively resolve creative bottlenecks before sampling.",
      features: ["Team Asset Audit", "Creative Bottleneck Clearance", "Manual Texture Checks"],
      terminalTitle: "StitchHub Team Design Workspace",
      terminalLogs: [
        { type: "TEAM", text: "Team manual vector audit completed... [PASSED]" },
        { type: "SYSTEM", text: "Analyzing pattern alignment (Team validation check active)" },
        { type: "STATUS", text: "Pre-sampling mesh check approved by team lead..." }
      ]
    },
    {
      num: "02",
      title: "Color Matching",
      subtitle: "Color Accuracy Guarantee",
      detailLabel: "Color Accuracy Guarantee",
      desc: "We match your brand colors across different fabric types so your logo looks consistent on every material. The StitchHub Team personally reviews color calibration strips under standardized lighting to guarantee fidelity.",
      features: ["Multi-fabric Dye Lot Alignment", "Hex to Pantone Verification", "RGB Ambient Calibration"],
      terminalTitle: "Collaborative Color Matching Platform",
      terminalLogs: [
        { type: "SYSTEM", text: "Running multi-fabric color matching algorithm..." },
        { type: "TEAM", text: "Dye-lot swatch verified under D65 standard light by Team panel" },
        { type: "STATUS", text: "Color accuracy rating 105%... [LOCKED]" }
      ]
    },
    {
      num: "03",
      title: "Supplier Matching",
      subtitle: "Automated Supplier Matching",
      detailLabel: "Automated Supplier Matching",
      desc: "Orders are algorithmically matched to suppliers based on capacity, material availability, and delivery timelines, and then verified and locked by the StitchHub Team for execution.",
      features: ["Live Capacity Balancing", "Direct API Inventory Lock", "Tier-1 Pricing Interception"],
      terminalTitle: "Matrix Sourcing & Supply Hub",
      terminalLogs: [
        { type: "SYSTEM", text: "Optimizing supply-chain capacity nodes..." },
        { type: "TEAM", text: "Core facility inventory check and capacity allocation locked by Team" },
        { type: "STATUS", text: "Production pipeline batch assigned... [READY]" }
      ]
    },
    {
      num: "04",
      title: "QC & Delivery",
      subtitle: "Quality Check & Dispatch",
      detailLabel: "Quality Check & Dispatch",
      desc: "Every shipment passes a three-stage quality check before dispatch with full tracking. The StitchHub Team handles final sign-offs for premium account logistics.",
      features: ["Three-tier Visual Pass", "B2B Courier Integration", "End-to-End Auditable Logs"],
      terminalTitle: "Logistics Dispatch & QA Control",
      terminalLogs: [
        { type: "SYSTEM", text: "Initializing stage-3 compliance checks..." },
        { type: "TEAM", text: "Final physical inspection and stitching pass approved by Team" },
        { type: "STATUS", text: "Quality seal applied. Dispatch route active... [EN ROUTE]" }
      ]
    }
  ];

  return (
    <section className="bg-[#0a0a0c] py-28 px-6 md:px-12 border-t border-neutral-900/80 relative overflow-hidden">

      {/* ── HIGH-INTENSITY CONCEPTS AMBIENT BACKLIGHTS ── */}
      <div className="absolute top-12 right-[-5%] w-[650px] h-[550px] bg-gradient-to-bl from-[rgba(212,175,55,0.12)] via-[rgba(180,130,30,0.04)] to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-[rgba(139,92,246,0.04)] to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Our B2B Pipeline
          </h2>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Four steps from pattern to dispatch. Guided by automated algorithms and human mastery.
          </p>
        </div>

        {/* ── INTERACTIVE STEP GRID (Fixing the Gold Aura + Glass Reflection) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="p-6 rounded-2xl text-left transition-all duration-300 cursor-pointer relative overflow-hidden group"
              style={{
                background: activeStep === i
                  ? "linear-gradient(#1c1d22, #121316) padding-box, linear-gradient(135deg, rgba(212, 175, 55, 0.85) 0%, rgba(139, 92, 246, 0.6) 100%) border-box"
                  : "linear-gradient(#111215, #0d0e10) padding-box, linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%) border-box",
                border: "1px solid transparent",
                boxShadow: activeStep === i
                  ? "0 0 30px rgba(212, 175, 55, 0.25), 0 0 15px rgba(139, 92, 246, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                  : "none"
              }}
            >
              {/* Specular light sheen across top half from your reference photo */}
              <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

              <div className="flex justify-between items-center mb-4 relative z-10">
                <span className={`text-2xl font-black tracking-tight font-mono ${activeStep === i ? "text-[#d4af37] drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]" : "text-neutral-700"}`}>
                  {step.num}
                </span>
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === i ? "bg-[#d4af37] shadow-[0_0_10px_#d4af37,0_0_4px_#d4af37]" : "bg-neutral-800"}`} />
              </div>
              <h3 className="font-bold text-white mb-1 text-sm md:text-base relative z-10">{step.title}</h3>
              <p className="text-neutral-500 text-xs relative z-10 leading-normal">{step.subtitle}</p>
            </button>
          ))}
        </div>

        {/* ── MAIN DETAIL FRAME (Added Outward Ambient Shadow + Sharp Vector Grid Layout) ── */}
        <div
          onMouseEnter={() => setIsMainCardHovered(true)}
          onMouseLeave={() => setIsMainCardHovered(false)}
          className="relative p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-500 bg-[#101114] border overflow-hidden"
          style={{
            borderColor: isMainCardHovered ? "rgba(212, 175, 55, 0.4)" : "rgba(38, 38, 38, 0.8)",
            boxShadow: isMainCardHovered
              ? "0 30px 70px -10px rgba(0,0,0,0.9), 0 0 40px rgba(212,175,55,0.03)"
              : "0 30px 70px -10px rgba(0,0,0,0.9)"
          }}
        >
          {/* Specular overall card sheen */}
          <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {/* Perspective grid overlay directly derived from concept artwork background */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none rounded-3xl"
            style={{
              backgroundImage: "linear-gradient(rgba(212, 175, 55, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.2) 1px, transparent 1px)",
              backgroundSize: "26px 26px"
            }}
          />

          {/* Left Area Content layout */}
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-[#d4af37] font-bold tracking-wider font-mono uppercase">
                  STEP {steps[activeStep].num} • {steps[activeStep].detailLabel}
                </div>
                <h3 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  {steps[activeStep].title}
                </h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl">
                  {steps[activeStep].desc}
                </p>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {steps[activeStep].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300 font-medium bg-[#141519] border border-neutral-800/80 p-3 rounded-xl shadow-inner">
                      <span className="text-[#d4af37] font-bold">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Area Workspace Terminal Visualizer */}
          <div className="lg:col-span-5 relative z-10 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl p-6 bg-[#14161a] border border-neutral-800/90 relative overflow-hidden shadow-2xl"
              >
                {/* Mirroring top reflections inside terminal boxes */}
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                {/* Terminal Control bar */}
                <div className="flex items-center justify-between border-b border-neutral-900 pb-3.5 mb-4">
                  <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-wider">
                    {steps[activeStep].terminalTitle}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                  </div>
                </div>

                {/* Workspace visual slots rendering matching concept frames */}
                <div className="mb-4 relative z-10">
                  {activeStep === 0 && (
                    <div className="bg-[#191b20] border border-neutral-800 rounded-xl p-4 font-mono text-[10px] text-neutral-400 shadow-inner space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-11 bg-[#101114] border border-neutral-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                            <svg className="w-7 h-7 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                              <path d="M4 4h16v16H4z M4 12h16 M12 4v16" strokeDasharray="2 2" />
                              <circle cx="12" cy="12" r="4" className="text-amber-500/20" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-neutral-200 font-bold">Miniature mock vector asset</span>
                            <span className="text-neutral-500 text-[9px]">layout_blueprint.dxf</span>
                          </div>
                        </div>
                        <button className="flex items-center gap-1 bg-[#1e2025] hover:bg-[#25272d] text-neutral-300 border border-neutral-700/60 px-3 py-1.5 rounded-xl cursor-pointer text-[10px] font-sans font-medium">
                          <span>Uploader</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </button>
                      </div>

                      {/* Animated Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[8px] text-neutral-500 font-mono mb-1">
                          <span>TEAM VECTOR AUDIT IN PROGRESS</span>
                          <span>98% COMPLETE</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "98%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-amber-500 to-purple-500"
                          />
                        </div>
                      </div>

                      {/* Floating Vector Mesh */}
                      <motion.div 
                        animate={{ 
                          y: [0, -3, 0],
                          rotate: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="bg-[#101114] border border-neutral-900 rounded-xl p-3 flex items-center justify-between overflow-hidden"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span className="font-mono text-[9px] text-neutral-300">Active Mesh Validation Model</span>
                        </div>
                        <svg className="w-16 h-8 text-amber-500/40" viewBox="0 0 100 40" fill="none">
                          <motion.path
                            d="M 10,20 Q 30,5 50,20 T 90,20"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                            animate={{ strokeDashoffset: [0, -20] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <path
                            d="M 10,25 Q 30,10 50,25 T 90,25"
                            stroke="#8b5cf6"
                            strokeWidth="1"
                            strokeOpacity="0.3"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="bg-[#191b20] border border-neutral-800 rounded-xl p-4 font-mono text-[9px] shadow-inner space-y-3">
                      <div className="flex items-center justify-between text-neutral-500">
                        <span className="tracking-wider uppercase text-[8px]">BRAND SWATCH ASSIGNMENT</span>
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className="text-[#d4af37] font-bold bg-amber-500/10 px-2 py-0.5 rounded"
                        >
                          105% PRECISION MATCH
                        </motion.span>
                      </div>

                      <div className="flex items-center justify-between bg-[#101114] border border-neutral-800/60 p-2 rounded-xl relative overflow-hidden">
                        {/* Animated scanning laser line */}
                        <motion.div
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent pointer-events-none"
                        />

                        {/* Left color box */}
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2 relative z-10"
                        >
                          <div className="w-7 h-7 rounded bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                          <div className="flex flex-col font-mono text-[9px]">
                            <span className="text-neutral-300 font-bold">#exC285</span>
                            <span className="text-neutral-500">Target Hue</span>
                          </div>
                        </motion.div>

                        {/* Animated Bridge particle flow */}
                        <div className="flex-1 mx-2 relative h-4 flex items-center justify-center">
                          <svg className="w-full h-2 text-neutral-800" fill="none">
                            <path d="M 0,4 L 100,4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                          </svg>
                          <motion.div
                            animate={{ left: ["0%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_#8b5cf6]"
                          />
                        </div>

                        {/* Right color box */}
                        <motion.div
                          initial={{ x: 10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2 relative z-10"
                        >
                          <div className="w-7 h-7 rounded bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                          <div className="flex flex-col font-mono text-[9px]">
                            <span className="text-purple-400 font-bold">PANTONE 18-0937</span>
                            <span className="text-neutral-400">Team Calibrated</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Visual Spectrum calibration */}
                      <div className="bg-[#101114] border border-neutral-900 rounded-xl p-2 flex items-center justify-between gap-2">
                        <span className="text-neutral-500 text-[8px] uppercase">Spectrum Alignment</span>
                        <div className="flex-1 flex gap-1 h-3 items-end">
                          {[40, 70, 95, 60, 85, 45, 90, 100, 75, 50].map((height, index) => (
                            <motion.div
                              key={index}
                              initial={{ height: "0%" }}
                              animate={{ height: `${height}%` }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: index * 0.05
                              }}
                              className={`flex-1 rounded-sm ${index % 2 === 0 ? "bg-amber-500/80" : "bg-purple-500/80"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="bg-[#191b20] border border-neutral-800 rounded-xl p-4 font-mono text-[9px] text-neutral-400 shadow-inner space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="tracking-wider text-[8px] uppercase">TEAM PRODUCTION MATRIX LOCK</span>
                        <motion.span
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[8px]"
                        >
                          SECURED & VERIFIED
                        </motion.span>
                      </div>

                      {/* Interactive Node Map */}
                      <div className="bg-[#101114] border border-neutral-800/60 p-3 rounded-xl flex items-center justify-between relative overflow-hidden">
                        {/* StitchHub Node */}
                        <div className="flex flex-col items-center gap-1 relative z-10">
                          <div className="w-8 h-8 rounded-full bg-purple-950/40 border border-purple-500/40 flex items-center justify-center shadow-[0_0_8px_rgba(139,92,246,0.3)]">
                            <span className="text-[#8b5cf6] font-bold text-[8px]">HUB</span>
                          </div>
                          <span className="text-neutral-400 text-[7px] font-sans">StitchHub</span>
                        </div>

                        {/* Animated allocation connection line */}
                        <div className="flex-1 mx-2 relative h-6 flex items-center justify-center">
                          <svg className="w-full h-full text-neutral-800" fill="none">
                            <motion.path
                              d="M 5,12 C 25,2 60,22 80,12"
                              stroke="#d4af37"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                              animate={{ strokeDashoffset: [0, -20] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                          </svg>
                          <motion.div
                            animate={{
                              x: [-40, 40],
                              y: [-8, 6, -8]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_6px_rgba(212,175,55,0.8)]"
                          />
                        </div>

                        {/* Supplier Node */}
                        <div className="flex flex-col items-center gap-1 relative z-10">
                          <div className="w-8 h-8 rounded-full bg-amber-950/40 border border-amber-500/40 flex items-center justify-center shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                            <span className="text-[#d4af37] font-bold text-[8px]">FAC</span>
                          </div>
                          <span className="text-neutral-400 text-[7px] font-sans">Alpha Blanks</span>
                        </div>
                      </div>

                      {/* Capacity Balance Meter */}
                      <div className="bg-[#101114] border border-neutral-900 rounded-xl p-2.5">
                        <div className="flex justify-between items-center text-[8px] text-neutral-500 mb-1.5">
                          <span>FACILITY CAPACITY BALANCE</span>
                          <span className="text-neutral-300 font-bold">98% OPTIMAL</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "98%" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="bg-[#191b20] border border-neutral-800 rounded-xl p-4 font-mono text-[9px] text-neutral-400 shadow-inner space-y-3">
                      <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2">
                        <span className="tracking-wider text-[8px] uppercase">TEAM COMPLIANCE AUDIT</span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px]">APPROVED</span>
                      </div>
                      
                      {/* Interactive Staggered Checkmarks */}
                      <div className="space-y-2 text-neutral-300 bg-[#101114] border border-neutral-800/60 p-2.5 rounded-xl">
                        {[
                          "Physical Spec Alignment Verification",
                          "Fabric Stretch & Weight Audit Passed",
                          "Logistics Transit Routing Affirmed"
                        ].map((label, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.25, duration: 0.3 }}
                            className="flex items-center gap-2.5"
                          >
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: idx * 0.25 + 0.15, type: "spring" }}
                              className="text-emerald-500 font-bold bg-emerald-500/10 w-4 h-4 rounded-full flex items-center justify-center text-[8px]"
                            >
                              ✓
                            </motion.span>
                            <span className="text-neutral-300">{label}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Transit Line Animation */}
                      <div className="bg-[#101114] border border-neutral-900 rounded-xl p-2">
                        <div className="flex items-center justify-between text-[7px] text-neutral-500 uppercase mb-2">
                          <span>Warehouse Dispatch</span>
                          <span>B2B Courier Link</span>
                        </div>
                        <div className="relative h-2 bg-neutral-950 rounded-full flex items-center">
                          <motion.div
                            animate={{ left: ["4%", "90%", "4%"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute z-10 -top-1 w-4 h-4 bg-amber-500/20 border border-amber-500 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-2.5 h-2.5 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-3.5H16.5v-2h3v2zm-1.5 3.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                            </svg>
                          </motion.div>
                          <div className="w-full h-0.5 bg-neutral-800" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full h-[1px] bg-neutral-900 mb-4" />

                {/* Console Log area code formatting with Typing/Stagger */}
                <motion.div
                  key={`logs-${activeStep}`}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.15 }
                    }
                  }}
                  className="bg-[#0b0c0e] border border-neutral-900 rounded-xl p-3.5 font-mono text-[9px] text-neutral-500 space-y-1 leading-normal relative z-10"
                >
                  {steps[activeStep].terminalLogs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: -5 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-start gap-1.5"
                    >
                      {log.type === "TEAM" && (
                        <>
                          <span className="text-[#d4af37] font-bold shrink-0">[TEAM]:</span>
                          <span className="text-neutral-300">{log.text}</span>
                        </>
                      )}
                      {log.type === "SYSTEM" && (
                        <>
                          <span className="text-neutral-500 font-bold shrink-0">[SYSTOR]:</span>
                          <span className="text-neutral-500">{log.text}</span>
                        </>
                      )}
                      {log.type === "STATUS" && (
                        <>
                          <span className="text-neutral-600 font-bold shrink-0">[STATUS]:</span>
                          <span className="text-neutral-400">{log.text}</span>
                        </>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer Profile Box structure mapping */}
                <div className="flex items-center justify-between mt-5 border-t border-neutral-900 pt-4 relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Overlapping Avatar Stack */}
                    <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-[#14161a] flex items-center justify-center text-[9px] font-bold text-white shadow-md select-none">
                        DS
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 border-2 border-[#14161a] flex items-center justify-center text-[9px] font-bold text-white shadow-md select-none">
                        SL
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-[#14161a] flex items-center justify-center text-[9px] font-bold text-white shadow-md select-none">
                        QA
                      </div>
                    </div>
                    <div className="flex flex-col font-sans">
                      <span className="text-[11px] font-bold text-white leading-tight">StitchHub Team</span>
                      <span className="text-[9px] text-neutral-500">Sourcing & QC Specialists</span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono text-[7px] text-[#d4af37] font-bold ml-1">
                      <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                      <span>4 ACTIVE</span>
                    </div>
                  </div>

                  {/* Animated diagnostics scrolling wave */}
                  <div className="w-20 h-8 overflow-hidden opacity-30 invisible sm:block">
                    <svg className="w-full h-full text-[#d4af37]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth={1}>
                      <motion.path
                        d="M 0,20 C 15,5 25,35 40,20 C 55,5 65,35 80,20 C 95,5 105,35 120,20"
                        animate={{ x: [0, -40] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </svg>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}