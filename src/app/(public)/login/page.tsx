"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setError("");
    setShowForgot(false);

    try {
      setLoading(true);
      const res = await api.post("/Auth/login", form);
      login(res.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
      setShowForgot(true);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    const callback = "http://localhost:3000/auth/callback";
    window.location.href = `https://localhost:7170/api/Auth/login-google?redirectUrl=${encodeURIComponent(
      callback
    )}`;
  };

  const loginWithFacebook = () => {
    const callback = "http://localhost:3000/auth/callback";
    window.location.href = `https://localhost:7170/api/Auth/login-facebook?redirectUrl=${encodeURIComponent(
      callback
    )}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-sm border p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-1">
          Welcome back
        </h1>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Log in to continue to GoBet
        </p>

        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}



        <div className="space-y-5">
          <Input
            name="email"
            type="email"
            required = {true}
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            
          />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="flex flex-col  justify-between gap-3 items-center">
            <Button onClick={submit} disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>

            {showForgot && (
              <div className="mb-4 text-sm text-right">
                <Link
                  href="/forgot-password"
                  className="text-gray-900 font-medium hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex flex-col sm:flex-row  gap-6">
          <Button variant="secondary" onClick={loginWithGoogle}>
            <img src="/google.svg" className="w-5 h-5" />
            Continue with Google
          </Button>

          <Button variant="secondary" onClick={loginWithFacebook}>
            <img src="/facebook.svg" className="w-5 h-5" />
            Continue with Facebook
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-gray-900 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
