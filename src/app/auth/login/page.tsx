"use client";

import { useAuth } from "../../../hooks/useAuth";
import AuthBrandHeader from "../../../components/auth/AuthBrandHeader";
import AuthAlert from "../../../components/auth/AuthAlert";
import AuthForm from "../../../components/auth/AuthForm";

export default function AuthPage() {
  const auth = useAuth();

  return (
    <div className="min-h-screen bg-[#090a0c] flex items-center justify-center px-4 relative overflow-hidden font-sans select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#121316] border border-zinc-900 rounded-3xl p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 relative">
        <AuthBrandHeader isLogin={auth.isLogin} />

        {auth.error && <AuthAlert type="error" message={auth.error} />}
        {auth.success && <AuthAlert type="success" message={auth.success} />}

        <AuthForm
          isLogin={auth.isLogin}
          loading={auth.loading}
          name={auth.name}
          setName={auth.setName}
          email={auth.email}
          setEmail={auth.setEmail}
          password={auth.password}
          setPassword={auth.setPassword}
          rememberMe={auth.rememberMe}
          setRememberMe={auth.setRememberMe}
          handleSubmit={auth.handleSubmit}
          handleForgotPassword={auth.handleForgotPassword}
        />

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={auth.toggleMode}
            className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            {auth.isLogin ? (
              <span>
                Don&apos;t have an account?{" "}
                <span className="text-[#d4af37] font-medium hover:underline">Sign up</span>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <span className="text-[#d4af37] font-medium hover:underline">Sign in</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
