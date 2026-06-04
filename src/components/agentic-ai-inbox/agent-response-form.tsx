"use client";

import React from "react";

interface CheckoutFormProps {
  toEmail: string;
  setToEmail: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
  isSuccess: boolean;
}

export default function CheckoutForm({
  toEmail,
  setToEmail,
  subject,
  setSubject,
  message,
  setMessage,
  isSuccess,
}: CheckoutFormProps) {
  
  // 🔍 Check if your custom Qwen model triggered an engineering escalation freeze
  const isEscalated = message.includes("<action>PAUSE</action>") || message.includes("escalate_to_admin");

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-4 py-16 animate-scaleIn">
        {isEscalated ? (
          // 🔥 LUXURY CRITICAL ESCALATION PRESENTATION GRID
          <>
            <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)] animate-pulse">
              <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-display tracking-tight">
              Sourcing Matrix Intercepted
            </h3>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Your custom instructions or timeline parameters require direct human evaluation. The automation matrix has been **PAUSED** and routed straight to an enterprise tier admin log for priority calculation verification.
            </p>
          </>
        ) : (
          // STANDARD SUCCESS PRESENTATION GRID
          <>
            <div className="h-20 w-20 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 border border-[#d4af37]/30">
              <svg className="h-10 w-10 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-display">
              Sourcing Request Deployed!
            </h3>
            <p className="text-sm text-zinc-400 max-w-md">
              Our custom logic engine is parsing your request. A dedicated sales partner will follow up shortly with pricing worksheets and production schematics. Redirecting to home...
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-scaleIn">
      {/* To: Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
          To: <span className="text-zinc-300 font-semibold">{toEmail}</span>
        </label>
        <input
          type="email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          className="w-full bg-[#121316] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none"
          placeholder="Enter sourcing email address"
        />
      </div>

      {/* Subject Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
          Subject:
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-[#121316] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none"
          placeholder="Enter quote request subject title"
        />
      </div>

      {/* Editor Rich text formatting toolbar */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-3">
        {["B", "I", "U", "U2", ">", "S", "⋮"].map((action, i) => (
          <button
            key={i}
            type="button"
            className="h-8 w-8 flex items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs font-bold cursor-pointer"
          >
            {action === "U2" ? <span className="underline decoration-double">U</span> : action}
          </button>
        ))}
      </div>

      {/* Editor Textarea */}
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full h-80 border rounded-xl p-5 text-sm leading-relaxed font-body focus:outline-none resize-none transition-colors duration-300 ${
            isEscalated 
              ? "bg-red-500/5 border-red-500/30 text-red-300 focus:border-red-500 font-mono" 
              : "bg-[#121316]/50 border-zinc-800 text-zinc-300 focus:border-[#d4af37]"
          }`}
        />
      </div>

      {/* Attach Sourcing Files Mockup */}
      <div className="border border-dashed border-zinc-800 rounded-xl p-4 flex items-center justify-center hover:border-zinc-700 transition-colors cursor-pointer bg-zinc-900/10">
        <span className="flex items-center gap-2.5 text-xs text-zinc-400 hover:text-white font-semibold">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          Attach Artwork Mockups or Sourcing Worksheets
        </span>
      </div>
    </div>
  );
}