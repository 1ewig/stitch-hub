"use client";

import React, { useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import AuthAlert from "../../../components/auth/AuthAlert";
import GoldButton from "../../../components/ui/GoldButton";
import AuthInput from "../../../components/auth/AuthInput";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message || "Failed to update password.");
        setLoading(false);
      } else {
        setSuccess("Password updated successfully! Redirecting to workspace...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0c] flex items-center justify-center px-4 relative overflow-hidden font-sans select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#121316] border border-zinc-900 rounded-3xl p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 relative">
        <div className="text-center space-y-2">
          <div className="text-xl font-black tracking-widest text-white select-none">
            STITCH<span className="text-[#d4af37]">HUB</span>
          </div>
          <h2 className="text-lg font-bold text-zinc-100">Set New Password</h2>
          <p className="text-xs text-zinc-500">Provide your secure new credential below.</p>
        </div>

        {error && <AuthAlert type="error" message={error} />}
        {success && <AuthAlert type="success" message={success} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="New Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />

          <GoldButton
            type="submit"
            disabled={loading}
            loading={loading}
            size="md"
            className="w-full mt-2 shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
            shimmer={!loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </GoldButton>
        </form>
      </div>
    </div>
  );
}
