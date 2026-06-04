"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { registerUser } from "../app/auth/signup/register";

export function useAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (isLogin) {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          setError("Invalid email or password. Please try again.");
          setLoading(false);
        } else {
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
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        const res = await registerUser(formData);

        if (res?.error) {
          setError(res.error);
        } else {
          setSuccess("Account created successfully! Switching to sign in...");
          setTimeout(() => {
            setIsLogin(true);
            setSuccess("");
            setPassword("");
          }, 2000);
        }
      } catch {
        setError("Database communication failure during registration.");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  const handleForgotPassword = () => {
    alert("Password reset route activation coming soon!");
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
