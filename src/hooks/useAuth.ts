"use client";

import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";

export function useAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Check if email was remembered on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("remembered_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (e) {
      console.warn("Failed to read from localStorage:", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const supabase = createClient();

    if (isLogin) {
      try {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message || "Invalid email or password. Please try again.");
          setLoading(false);
        } else {
          // Handle "Remember me" on successful login
          try {
            if (rememberMe) {
              localStorage.setItem("remembered_email", email);
            } else {
              localStorage.removeItem("remembered_email");
            }
          } catch (e) {
            console.warn("Failed to write to localStorage:", e);
          }

          setSuccess("Success! Directing to workspace...");

          setTimeout(() => {
            window.location.href = "/";
          }, 800);
        }
      } catch {
        setError("An unexpected error occurred during login.");
        setLoading(false);
      }
    } else {
      try {
        // Registering a user through Supabase Auth
        // Pass name in user metadata options
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
              role: "client", // Assigns them the default B2B client tier in metadata
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message || "Registration failed.");
          setLoading(false);
        } else {
          // Note: If email confirmation is enabled on Supabase, the user might need to check their inbox.
          // By default, if auto-confirm is enabled, it returns the user directly.
          if (data.session) {
            setSuccess("Account created and logged in! Directing to workspace...");
            setTimeout(() => {
              window.location.href = "/";
            }, 800);
          } else {
            setSuccess("Account created successfully! Please check your email for verification, or switch to sign in.");
            setTimeout(() => {
              setIsLogin(true);
              setSuccess("");
              setPassword("");
            }, 3000);
          }
        }
      } catch {
        setError("Supabase communication failure during registration.");
        setLoading(false);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first to request a password reset.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    const supabase = createClient();
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) {
        setError(resetError.message || "Failed to trigger password reset process.");
      } else {
        setSuccess("Success! A password reset link has been dispatched to your email.");
      }
    } catch {
      setError("An unexpected error occurred during password reset.");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
