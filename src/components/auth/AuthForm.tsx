"use client";

import GoldButton from "../ui/GoldButton";
import AuthInput from "./AuthInput";

interface AuthFormProps {
  isLogin: boolean;
  loading: boolean;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleForgotPassword: () => void;
}

export default function AuthForm({
  isLogin,
  loading,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  handleSubmit,
  handleForgotPassword,
}: AuthFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div className="transition-all duration-300 transform origin-top animate-scaleIn">
          <AuthInput
            label="Full Name"
            type="text"
            value={name}
            onChange={setName}
            placeholder="John Doe"
            required
            autoComplete="name"
          />
        </div>
      )}

      <AuthInput
        label="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="name@company.com"
        required
        autoComplete="email"
      />

      <AuthInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
        required
        autoComplete={isLogin ? "current-password" : "new-password"}
      />

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

      <GoldButton
        type="submit"
        disabled={loading}
        loading={loading}
        size="md"
        className="w-full mt-2 shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
        shimmer={!loading}
      >
        {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
      </GoldButton>
    </form>
  );
}
