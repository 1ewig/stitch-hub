"use client";

import React from "react";
import { useAuth } from "../../../hooks/useAuth";

export default function AuthPage() {
  const {
    isLogin,
    loading,
    error,
    success,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    handleSubmit,
    toggleMode,
    handleForgotPassword,
  } = useAuth();

  return (
    <div className="min-h-screen bg-[#090a0c] flex items-center justify-center px-4 relative overflow-hidden font-sans select-none">
      {/* Background radial gold glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#121316] border border-zinc-900 rounded-3xl p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 relative">
        
        {/* Universal Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-xl tracking-wider uppercase font-display">
            <span className="h-6 w-6 rounded-lg bg-linear-to-br from-[#b38e20] to-[#ebd06f] flex items-center justify-center text-black text-xs font-black">S</span>
            STITCH<span className="text-[#d4af37]">HUB</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium pt-1">
            {isLogin ? "Sign in to your B2B account" : "Create a new partner account"}
          </p>
        </div>

        {/* Dynamic Warning & Success Alerts */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl font-medium animate-scaleIn">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-3 rounded-xl font-medium animate-scaleIn">
            {success}
          </div>
        )}

        {/* Dynamic Form Field Layout */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sign Up Field: Only shows when isLogin is false */}
          {!isLogin && (
            <div className="transition-all duration-300 transform origin-top animate-scaleIn">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#18191d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#18191d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#18191d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Login Extras: Checkbox and Recovery options (Hidden during Sign Up) */}
          {isLogin && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-zinc-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#d4af37] rounded border-zinc-800 bg-[#18191d]"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#d4af37] hover:underline cursor-pointer font-medium"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Main Form Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-6 py-3.5 rounded-full font-bold text-sm text-black bg-linear-to-r from-[#b38e20] via-[#ebd06f] to-[#b38e20] bg-size-[200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.25)] disabled:opacity-40 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
            )}
          </button>
        </form>

        {/* Switcher Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={toggleMode}
            className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            {isLogin ? (
              <span>Don&apos;t have an account? <span className="text-[#d4af37] font-medium hover:underline">Sign up</span></span>
            ) : (
              <span>Already have an account? <span className="text-[#d4af37] font-medium hover:underline">Sign in</span></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
