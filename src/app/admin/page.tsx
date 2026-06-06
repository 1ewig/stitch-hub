"use client";

import React from "react";

export default function AdminDashboardPage() {
  const urgentAlerts = [
    { id: 1, type: "escalation", title: "New Custom Requisition", desc: "Ali Sami • Framed Acoustic Art Panel", time: "10 mins ago" },
    { id: 2, type: "system", title: "Supplier Alert", desc: "Custom color frames out of stock", time: "1 hour ago" },
  ];

  // 🎯 THE TRICK: This class applies the frosted glass effect, blurs the constellation background, and softens borders
  const glassCardClass = "bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden";

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white font-display tracking-tight drop-shadow-md">Admin Dashboard</h2>
          <p className="text-xs text-zinc-400 mt-1">Global platform overview and agentic operational metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">
            Export Report
          </button>
          <button className="bg-[#d4af37] text-[#090a0f] px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-[#bfa032] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)] font-mono uppercase tracking-wider">
            Manage Agents
          </button>
        </div>
      </div>

      {/* ── MAIN GRID LAYOUT ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Sales Overview Widget */}
          <div className={`${glassCardClass} p-6`}>
            {/* Ambient golden internal glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-sm font-bold text-zinc-300 mb-6 relative z-10">Sales Overview</h3>
            <div className="flex items-end justify-between mb-8 relative z-10">
              <div>
                <p className="text-4xl font-display font-bold text-white drop-shadow-md">$162,345</p>
                <p className="text-xs text-emerald-400 mt-2 font-mono flex items-center gap-1">
                  <span>▲</span> +10% vs last month
                </p>
              </div>
            </div>
            
            <div className="h-48 w-full relative z-10">
              <div className="absolute inset-0 flex flex-col justify-between">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-t border-white/5 w-full"></div>
                ))}
              </div>
              <svg className="absolute inset-0 h-full w-full drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polyline fill="none" stroke="#d4af37" strokeWidth="2.5" points="0,80 20,60 40,70 60,30 80,40 100,10" />
                <polyline fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" points="0,90 20,80 40,85 60,50 80,55 100,30" />
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-mono text-zinc-500 relative z-10">
              <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
            </div>
          </div>

          {/* Agentic Quote Conversion Widget */}
          <div className={`${glassCardClass} p-6`}>
            <h3 className="text-sm font-bold text-zinc-300 mb-6">Agentic Quote Conversion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-40 flex items-center justify-center drop-shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                  <path className="text-[#d4af37]" strokeDasharray="76, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                </svg>
                <div className="absolute text-center flex flex-col items-center">
                  <p className="text-3xl font-bold text-white drop-shadow-md">76%</p>
                  <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1">Sent by AI</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white/2 border border-white/5 p-4 rounded-xl flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Conversion Rate</p>
                    <p className="text-lg font-bold text-white">30%</p>
                  </div>
                </div>
                <div className="bg-white/2 border border-white/5 p-4 rounded-xl flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Human Handoffs</p>
                    <p className="text-lg font-bold text-white">24%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* AI Task Resolution (Bar Chart) */}
          <div className={`${glassCardClass} p-6`}>
            <h3 className="text-sm font-bold text-zinc-300 mb-6">AI Task Resolution</h3>
            <div className="h-40 flex items-end justify-between gap-3 border-b border-white/10 pb-3">
              <div className="w-1/4 bg-[#d4af37]/80 h-[60%] rounded-t-lg shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
              <div className="w-1/4 bg-blue-500/80 h-[85%] rounded-t-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
              <div className="w-1/4 bg-emerald-500/80 h-[40%] rounded-t-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
              <div className="w-1/4 bg-purple-500/80 h-[70%] rounded-t-lg shadow-[0_0_15px_rgba(168,85,247,0.3)]"></div>
            </div>
            <div className="flex justify-between mt-3 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
              <span>Quotes</span><span>Supply</span><span>Support</span><span>Design</span>
            </div>
          </div>

          {/* Urgent Notifications */}
          <div className={`${glassCardClass} flex flex-col h-88`}>
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/2 z-10">
              <h3 className="text-sm font-bold text-zinc-300">Urgent Notifications</h3>
              <span className="bg-red-500/20 text-red-400 py-1 px-2.5 rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)] border border-red-500/30 font-mono">2</span>
            </div>
            <div className="p-5 flex-1 overflow-y-auto space-y-3">
              {urgentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-black/20 border border-white/5 rounded-xl hover:bg-white/4 hover:border-white/10 transition-all cursor-pointer group backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`h-2 w-2 rounded-full shadow-lg ${alert.type === "escalation" ? "bg-red-500 shadow-red-500/50 animate-pulse" : "bg-amber-500 shadow-amber-500/50"}`} />
                    <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">{alert.title}</h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 pl-4 leading-relaxed">{alert.desc}</p>
                  <p className="text-[9px] font-mono text-zinc-600 pl-4 mt-2">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}