import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // 🎯 The inline style guarantees the image loads from your public folder
    <div 
      className="fixed inset-0 z-50 flex text-zinc-100 font-body overflow-hidden bg-[#090a0f]"
      style={{
        backgroundImage: "url('/admin-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay to ensure the glassmorphism pops and text is readable */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      
      {/* ── LEFT SIDEBAR NAVIGATION ── */}
      <aside className="w-64 bg-[#0a0a0f]/40 backdrop-blur-3xl border-r border-white/10 flex flex-col hidden md:flex shrink-0 relative z-10 shadow-2xl">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-8 border-b border-white/10">
          <h1 className="text-xl font-bold font-display tracking-tight text-white flex items-center gap-2">
            <span className="text-[#d4af37]">S</span> STITCH<span className="font-light">HUB</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-4 mb-4">Core Systems</div>
          
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-colors backdrop-blur-md">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="text-sm font-medium">Active Orders</span>
          </Link>

          <Link href="/admin/approvals" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-sm font-medium">Escalated Approvals</span>
            <span className="ml-auto bg-red-500/20 border border-red-500/30 text-red-400 py-0.5 px-2 rounded-full text-[10px] font-bold shadow-[0_0_8px_rgba(239,68,68,0.2)]">3</span>
          </Link>

          <Link href="/admin/agent" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span className="text-sm font-medium">Agent Operations</span>
          </Link>
        </nav>

        {/* Admin Profile Footer */}
        <div className="p-4 border-t border-white/10 mt-auto bg-black/20">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-8 w-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-xs font-bold text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.2)]">AD</div>
            <div>
              <p className="text-xs font-bold text-white">System Admin</p>
              <p className="text-[10px] text-zinc-400">Superuser Node</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE AREA ── */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 bg-transparent">
        <div className="p-8 relative w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}