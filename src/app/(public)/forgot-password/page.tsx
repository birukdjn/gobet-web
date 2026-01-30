"use client";

import { useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    setMessage("");
    if (!email) return setError("Email is required");

    try {
      setLoading(true);
      await api.post("/Auth/forgot-password", { email });
      setMessage("Password reset link sent to your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-1">
          Forgot password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          We’ll send you a reset link
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-4 bg-gray-900 text-white rounded-md py-3 text-sm font-semibold hover:bg-black transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-gray-900 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
