"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await api.post("/Auth/login", form);
      localStorage.setItem("token", res.data.token);

      const decoded = jwtDecode<JwtPayload>(res.data.token);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (role === "Admin") router.push("/admin/dashboard");
      else if (role === "Driver") router.push("/driver/dashboard");
      else router.push("/passenger/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    const nextjsCallback = "http://localhost:3000/auth/callback";
    window.location.href = `https://localhost:7170/api/auth/login-google?redirectUrl=${encodeURIComponent(
      nextjsCallback
    )}`;
  };

  const loginWithFacebook = () => {
    const nextjsCallback = "http://localhost:3000/auth/callback";
    window.location.href = `https://localhost:7170/api/Auth/login-facebook?redirectUrl=${encodeURIComponent(
      nextjsCallback
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

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full border text-gray-900 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border text-gray-900 rounded-md px-3 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
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

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black text-white rounded-md py-3 text-sm font-semibold transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social login */}
        <div className="flex gap-3">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 border rounded-md py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <img src="/google.svg" className="w-5 h-5" />
            Continue with Google
          </button>

          <button
            onClick={loginWithFacebook}
            className="w-full flex items-center justify-center gap-3 border rounded-md py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <img src="/facebook.svg" className="w-5 h-5" />
            Continue with Facebook
          </button>
        </div>

        {/* Register link */}
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
